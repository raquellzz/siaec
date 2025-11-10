import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import './App.css'
import Header from './components/Header.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ArtisanListPage from './pages/ArtisanListPage.jsx';
import EventListPage from './pages/EventListPage.jsx';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage.jsx';
import MyProductsPage from './pages/MyProductsPage.jsx';
import ProductFormPage from './pages/ProductFormPage.jsx';

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/artisans" element={<ArtisanListPage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/meus-produtos" element={<MyProductsPage />} />
          <Route path="/meus-produtos/novo" element={<ProductFormPage />} />
          <Route path="/meus-produtos/editar/:productId" element={<ProductFormPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
