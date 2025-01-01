import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { login } from '../services/api';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await login(username, password);
            localStorage.setItem('token', response.token);
            navigate('/users');
        } catch (err) {
            setError('Kullanıcı adı veya şifre hatalı');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-lg-4">
                        <div className="card">
                            <div className="card-body p-4">
                                <div className="text-center mb-4">
                                    <div className="avatar-circle mb-3">
                                        <FontAwesomeIcon icon={faUser} size="2x" />
                                    </div>
                                    <h4 className="mb-1">Hoş Geldiniz</h4>
                                    <p className="text-muted">Lütfen giriş yapın</p>
                                </div>

                                <form onSubmit={handleSubmit}>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faUser} />
                                        </span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Kullanıcı Adı"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faLock} />
                                        </span>
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Şifre"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    {error && (
                                        <div className="alert alert-danger" role="alert">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                        ) : (
                                            <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                                        )}
                                        {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login; 