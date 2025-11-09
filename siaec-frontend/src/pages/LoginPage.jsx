import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth(); 
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        
        if (!email || !password) {
            setError("Email e senha são obrigatórios.");
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await login(email, password);
            
            navigate('/'); 
        } catch (error) {
            setError('Email ou senha incorretos.'); //
            console.error(error);
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Senha:</label>
                    <input 
                        type="password" 
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>
            </form>
            <div style={{ marginTop: '1rem' }}>
                <p>
                    Não tem uma conta? 
                    <Link to="/register"> Cadastre-se aqui</Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;