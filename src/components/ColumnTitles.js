import React from 'react';
import SelectAllCheckbox from './SelectAllCheckbox';


const ColumnTitles = ({ setIsAllChecked = () => { }, allRowsSelected = false }) => {
    return (
        <tr class="column-titles table-row">
            <SelectAllCheckbox
                onSelectAll={setIsAllChecked}
                allRowsSelected={allRowsSelected}
            />
            <th className="column-title">Name</th>
            <th className="column-title">Email</th>
            <th className="column-title">Role</th>
            <th className="column-title">Actions</th>
        </tr>
    );
};

export default ColumnTitles;
