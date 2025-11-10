import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

function ProfilePage() {
    const { user, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/login'); 
    };


    if (!user) {
        return <div>Carregando perfil...</div>;
    }

    return (
        <div>
            <h1>Perfil de {user.name}</h1>

            <section>
                <h2>Minhas Informações</h2>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Telefone:</strong> {user.phone}</p>
                <p><strong>CPF/CNPJ:</strong> {user.taxId}</p>
                <p><strong>Tipo de Conta:</strong> {user.role}</p>
            </section>

            <section>
                <h2>Minhas Ações</h2>
                {/* (Lógica condicional baseada em user.role, como antes) */}
                {user.role === 'ARTISAN' && (
                    <Link to="/meus-produtos">Gerenciar Meus Produtos</Link>
                )}
                {/* ... */}
            </section>

            {/* --- BOTÃO DE LOGOUT --- */}
            <button 
                onClick={handleLogout} 
                style={{ marginTop: '20px', backgroundColor: 'orange', color: 'white', marginRight: '10px' }}
            >
                Sair (Logout)
            </button>

            {/* (Botão de Delete Opcional) */}
            {/* <button 
                onClick={handleDeleteAccount} 
                style={{ marginTop: '20px', backgroundColor: 'red', color: 'white' }}
            >
                Deletar Minha Conta
            </button> */}
        </div>
    );
}

export default ProfilePage;