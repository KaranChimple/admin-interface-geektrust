import React from 'react';

const DeleteSelectedButton = ({ onDeleteSelected = () => { } }) => {
    const handleDeleteSelected = () => {
        onDeleteSelected();
    };

    return (
        <button className="delete-selected-button" onClick={handleDeleteSelected}>
            Delete Selected
        </button>
    );
};

export default DeleteSelectedButton;
