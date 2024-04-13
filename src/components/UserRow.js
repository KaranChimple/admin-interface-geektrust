import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const UserRow = ({
    user = {},
    onDelete = () => { },
    onEdit = () => { },
    onSelect = () => { },
    isSelected = false
}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedUser, setEditedUser] = useState(user);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);
        onEdit(editedUser);
    };

    const handleDelete = () => {
        onDelete(user);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleCheckboxChange = (event) => {
        onSelect(user?.id, event.target.checked);
    };

    return (
        <tr className="user-row">
            <td>
                <input type="checkbox" onChange={handleCheckboxChange} checked={isSelected ? true : false} value={user?.name} />
                <span class="checkmark"></span>
            </td>
            <td>{isEditing ? <input type="text" name="name" value={editedUser.name} onChange={handleChange} /> : user?.name}</td>
            <td>{isEditing ? <input type="text" name="email" value={editedUser.email} onChange={handleChange} /> : user?.email}</td>
            <td>{isEditing ? <input type="text" name="role" value={editedUser.role} onChange={handleChange} /> : user?.role}</td>
            <td>
                {isEditing ? (
                    <button className="action-button save" onClick={handleSave}>
                        <FontAwesomeIcon icon={faFloppyDisk} />
                    </button>
                ) : (
                    <button className="action-button edit" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                )}
                <button className="action-button delete" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} style={{ marginLeft: "16px" }} color='red' />
                </button>
            </td>
        </tr>
    );
};

export default UserRow;
