import React, { useState, useEffect, useMemo } from 'react';
import Pagination from './components/pagination';
import ColumnTitles from './components/ColumnTitles';
import SearchBar from './components/SearchBar';
import UserRow from './components/UserRow';
import DeleteSelectedButton from './components/DeleteSelectedButton';


const PageSize = 10;

const MainScreen = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState('');
    const [editUser, setEditUser] = useState({});
    const [selectedRows, setSelectedRows] = useState([]);

    useEffect(() => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then(res => res.json())
            .then(resp => {
                setData(resp);
            })
    }, [])

    const currentTableData = useMemo(() => {
        let dataToBeShown = data || [];
        if (search !== '') {
            dataToBeShown = dataToBeShown.filter(item =>
                ((item?.name || '').toLowerCase()).includes(search)
                || (item?.email || '').toLowerCase().includes(search)
                || (item?.role || '').toLowerCase().includes(search)
            )
        }
        if (Object.keys(editUser).length !== 0) {
            const index = dataToBeShown.findIndex(item => item?.id === editUser?.id);
            dataToBeShown[index] = { ...editUser };
            setData(dataToBeShown);
            setEditUser({})
        }
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return dataToBeShown.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, data, search, editUser]);

    const onChangeSearch = (text) => {
        setSearch(text);
    }

    const onDeleteItem = (itemToBeDeleted) => {
        let dataList = [];
        dataList = data.filter(item => item?.id !== itemToBeDeleted?.id);
        setData(dataList);
    }

    const onEditItem = (user) => {
        setEditUser(user)
    }

    const handleRowSelect = (userId, isChecked) => {
        setSelectedRows(prevSelectedRows => {
            if (isChecked) {
                return [...prevSelectedRows, userId];
            } else {
                return prevSelectedRows.filter(id => id !== userId);
            }
        });
    };

    const handleSelectAllChange = (isChecked = false) => {
        if (isChecked) {
            const selectedUserIds = currentTableData.map(item => item?.id);
            setSelectedRows(selectedUserIds);
        } else {
            setSelectedRows([])
        }
    }

    const onDeleteSelected = () => {
        const updatedUsers = data.filter(user => !selectedRows.includes(user?.id));
        setData(updatedUsers);
        setSelectedRows([])
    }

    const allRowsSelected = (selectedRows || []).length === (currentTableData || []).length;

    return (
        <div>
            <SearchBar onSearch={onChangeSearch} />
            <table class="Table-Normal">
                <ColumnTitles
                    allRowsSelected={allRowsSelected}
                    setIsAllChecked={handleSelectAllChange}
                />
                {currentTableData.map((item) =>
                    <UserRow
                        key={`${item?.id}-${item?.name}`}
                        user={item}
                        onDelete={onDeleteItem}
                        onEdit={onEditItem}
                        onSelect={handleRowSelect}
                        isSelected={selectedRows.includes(item?.id)}
                    />
                )}
            </table>

            <div className='bottom-container'>
                <DeleteSelectedButton onDeleteSelected={onDeleteSelected} />
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={(data || [])?.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            </div>

        </div>
    )
}

export default MainScreen;