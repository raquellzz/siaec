import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.jsx';
import './App.css';
import Header from './components/Header/Header.jsx';
import ProductListPage from './pages/ProductList/ProductListPage.jsx';
import ArtisanListPage from './pages/ArtisanList/ArtisanListPage.jsx';
import EventListPage from './pages/EventList/EventListPage.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import RegisterPage from './pages/Register/RegisterPage.jsx';
import ProfilePage from './pages/Profile/ProfilePage.jsx';
import MyProductsPage from './pages/MyProducts/MyProductsPage.jsx';
import ProductFormPage from './pages/ProductForm/ProductFormPage.jsx';
import ProductDetailPage from './pages/ProductDetail/ProductDetailPage.jsx';
import CartPage from './pages/Cart/CartPage.jsx';
import ArtisanDetailPage from './pages/ArtisanDetail/ArtisanDetailPage.jsx';
import { useAuth } from './hooks/useAuth.jsx';
import { roleEnum } from './enums/RoleEnum.js';
import NotFound from './pages/NotFound/index.jsx';
import EventDetailPage from './pages/EventDetail/EventDetailPage.jsx';

function App() {
  const { user } = useAuth();
  const isUserLoggedIn = Boolean(user);
  const isArtisan = isUserLoggedIn && user.role === roleEnum.artisan;
  const isClient = isUserLoggedIn && user.role === roleEnum.client;

  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/artisans" element={<ArtisanListPage />} />
          <Route path="/artisans/:artisanId" element={<ArtisanDetailPage />} />
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {isUserLoggedIn && <Route path="/profile" element={<ProfilePage />} />}
          {isArtisan && (
            <>
              <Route path="/meus-produtos" element={<MyProductsPage />} />
              <Route path="/meus-produtos/novo" element={<ProductFormPage />} />
              <Route path="/meus-produtos/editar/:productId" element={<ProductFormPage />} />
            </>
          )}
          {isClient && <Route path="/cart" element={<CartPage />} />}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
