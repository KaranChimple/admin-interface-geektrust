import React from 'react';

const SelectAllCheckbox = ({ onSelectAll = () => { }, allRowsSelected = false }) => {
    const handleSelectAllChange = (event) => {
        onSelectAll(event.target.checked);
    };

    return (
        <th className="select-all-checkbox">
            <input
                type="checkbox"
                onChange={handleSelectAllChange}
                checked={allRowsSelected}
                value="all"
            />
        </th>
    );
};

export default SelectAllCheckbox;
