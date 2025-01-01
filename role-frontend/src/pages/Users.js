import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faEdit,
    faTrash,
    faUserTag,
    faCheck,
    faTimes,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { getUsers, createUser, updateUser, deleteUser, getRoles, getUserRoles, assignRoles } from '../services/api';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [openRolesDialog, setOpenRolesDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        isActive: true
    });

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const data = await getRoles();
            setRoles(data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    const handleOpenDialog = (user = null) => {
        if (user) {
            setFormData(user);
            setSelectedUser(user);
        } else {
            setFormData({
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                isActive: true
            });
            setSelectedUser(null);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedUser(null);
    };

    const handleOpenRolesDialog = async (user) => {
        setSelectedUser(user);
        try {
            const userRoles = await getUserRoles(user.id);
            setSelectedRoles(userRoles.map(role => role.id));
        } catch (error) {
            console.error('Error fetching user roles:', error);
        }
        setOpenRolesDialog(true);
    };

    const handleCloseRolesDialog = () => {
        setOpenRolesDialog(false);
        setSelectedUser(null);
        setSelectedRoles([]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                ...formData,
                isActive: formData.isActive || false,
                userRoles: []
            };

            if (selectedUser) {
                await updateUser(selectedUser.id, userData);
            } else {
                if (!userData.username || !userData.password) {
                    alert('Kullanıcı adı ve şifre zorunludur!');
                    return;
                }
                await createUser(userData);
            }
            fetchUsers();
            handleCloseDialog();
        } catch (error) {
            console.error('Error saving user:', error);
            alert(error.response?.data || 'Kullanıcı kaydedilirken bir hata oluştu');
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
            try {
                await deleteUser(id);
                fetchUsers();
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    const handleRoleChange = (roleId) => {
        setSelectedRoles(prev =>
            prev.includes(roleId)
                ? prev.filter(id => id !== roleId)
                : [...prev, roleId]
        );
    };

    const handleSaveRoles = async () => {
        try {
            await assignRoles(selectedUser.id, selectedRoles);
            fetchUsers();
            handleCloseRolesDialog();
        } catch (error) {
            console.error('Error assigning roles:', error);
        }
    };

    return (
        <div className="users-container">
            <div className="users-content">
                <div className="page-header">
                    <h1 className="page-title">Kullanıcı Yönetimi</h1>
                    <button
                        className="add-user-btn"
                        onClick={() => handleOpenDialog()}
                    >
                        <FontAwesomeIcon icon={faUserPlus} />
                        Yeni Kullanıcı
                    </button>
                </div>

                <div className="data-card">
                    <div className="table-responsive">
                        <table className="custom-table">
                            <thead>
                                <tr>
                                    <th>Kullanıcı Adı</th>
                                    <th>Ad</th>
                                    <th>Soyad</th>
                                    <th>Email</th>
                                    <th>Durum</th>
                                    <th>İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.username}</td>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                                                <FontAwesomeIcon icon={user.isActive ? faCheck : faTimes} />
                                                {user.isActive ? 'Aktif' : 'Pasif'}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="action-buttons">
                                                <button
                                                    className="btn-action btn-edit"
                                                    onClick={() => handleOpenDialog(user)}
                                                >
                                                    <FontAwesomeIcon icon={faEdit} />
                                                    Düzenle
                                                </button>
                                                <button
                                                    className="btn-action btn-delete"
                                                    onClick={() => handleDelete(user.id)}
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                    Sil
                                                </button>
                                                <button
                                                    className="btn-action btn-roles"
                                                    onClick={() => handleOpenRolesDialog(user)}
                                                >
                                                    <FontAwesomeIcon icon={faUserTag} />
                                                    Roller
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* User Modal */}
                <div className={`modal fade ${openDialog ? 'show' : ''}`}
                    style={{ display: openDialog ? 'block' : 'none' }}
                    tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    {selectedUser ? 'Kullanıcı Düzenle' : 'Yeni Kullanıcı'}
                                </h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseDialog}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label className="form-label">Kullanıcı Adı</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.username}
                                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                    {!selectedUser && (
                                        <div className="form-group">
                                            <label className="form-label">Şifre</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                required
                                            />
                                        </div>
                                    )}
                                    <div className="form-group">
                                        <label className="form-label">Ad</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.firstName}
                                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label">Soyad</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id="isActive"
                                            checked={formData.isActive}
                                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                                        />
                                        <label className="form-check-label" htmlFor="isActive">Aktif</label>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-modal btn-secondary" onClick={handleCloseDialog}>
                                            İptal
                                        </button>
                                        <button type="submit" className="btn btn-modal btn-primary">
                                            Kaydet
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Roles Modal */}
                <div className={`modal fade ${openRolesDialog ? 'show' : ''}`}
                    style={{ display: openRolesDialog ? 'block' : 'none' }}
                    tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Kullanıcı Rolleri</h5>
                                <button type="button" className="btn-close btn-close-white" onClick={handleCloseRolesDialog}></button>
                            </div>
                            <div className="modal-body">
                                {roles.map((role) => (
                                    <div key={role.id} className="form-check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            id={`role-${role.id}`}
                                            checked={selectedRoles.includes(role.id)}
                                            onChange={() => handleRoleChange(role.id)}
                                        />
                                        <label className="form-check-label" htmlFor={`role-${role.id}`}>
                                            {role.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-modal btn-secondary" onClick={handleCloseRolesDialog}>
                                    İptal
                                </button>
                                <button type="button" className="btn btn-modal btn-primary" onClick={handleSaveRoles}>
                                    Kaydet
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Backdrop */}
                {(openDialog || openRolesDialog) && (
                    <div className="modal-backdrop fade show"></div>
                )}
            </div>
        </div>
    );
};

export default Users; 