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
import MyEventsPage from './pages/MyEvents/MyEventsPage.jsx';
import EventFormPage from './pages/EventForm/EventFormPage.jsx';
import CartPage from './pages/Cart/CartPage.jsx';
import ArtisanDetailPage from './pages/ArtisanDetail/ArtisanDetailPage.jsx';
import { useAuth } from './hooks/useAuth.jsx';
import { roleEnum } from './enums/RoleEnum.js';
import NotFound from './pages/NotFound/index.jsx';
import EventDetailPage from './pages/EventDetail/EventDetailPage.jsx';
import ClientDashboardPage from './pages/ClientDashboard/ClientDashboardPage.jsx';
import ManageUsersPage from './pages/ManageUsers/ManageUsersPage.jsx';
import ArtisanDashboardPage from './pages/ArtisanDashboard/ArtisanDashboardPage.jsx';
import FavoriteEventsPage from './pages/FavoriteEvents/FavoriteEventsPage.jsx';
import EditProfileArtisanPage from './pages/EditProfileArtisan/EditProfileArtisanPage.jsx';
import OrderHistoryPage from './pages/OrderHistory/OrderHistoryPage.jsx';
import OrderDetailPage from './pages/OrderDetail/OrderDetailPage.jsx';

function App() {
  const { user, isAuthenticated } = useAuth();
  const isArtisan = isAuthenticated && user.role === roleEnum.artisan;
  const isClient = isAuthenticated && user.role === roleEnum.client;
  const isEventPlanner = isAuthenticated && user.role === roleEnum.eventPlanner;
  const isAdmin = isAuthenticated && user.role === roleEnum.admin;

  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProductListPage />} />
          <Route path="/produtos/:productId" element={<ProductDetailPage />} />
          <Route path="/artesaos" element={<ArtisanListPage />} />
          <Route path="/artesaos/:artisanId" element={<ArtisanDetailPage />} />
          <Route path="/eventos" element={<EventListPage />} />
          <Route path="/eventos/:eventId" element={<EventDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cadastro" element={<RegisterPage />} />
          {isArtisan && (
            <>
              <Route path="/meus-produtos" element={<MyProductsPage />} />
              <Route path="/meus-produtos/novo" element={<ProductFormPage />} />
              <Route path="/meus-produtos/editar/:productId" element={<ProductFormPage />} />
              <Route path="/perfil" element={<ArtisanDashboardPage />} />
              <Route path="/perfil/editar" element={<EditProfileArtisanPage />} />
            </>
          )}
          {isEventPlanner && (
            <>
              <Route path="/meus-eventos" element={<MyEventsPage />} />
              <Route path="/meus-eventos/novo" element={<EventFormPage />} />
              <Route path="/meus-eventos/editar/:EventId" element={<EventFormPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
            </>
          )}
          {isAdmin && (
            <>
              <Route path="/admin/usuarios" element={<ManageUsersPage />} />
              <Route path="/perfil" element={<ProfilePage />} />
              {/* <Route path="/admin/usuarios/:id" element={<UserDetailPage />} /> */}
            </>
          )}
          {isClient || isArtisan ? <Route path="/meus-eventos-salvos" element={<FavoriteEventsPage />} /> : null}
          {isClient && (
            <>
              <Route path="/carrinho" element={<CartPage />} />
              <Route path="/perfil" element={<ClientDashboardPage />} />
              <Route path="/pedidos" element={<OrderHistoryPage />} />
              <Route path="/pedidos/:id" element={<OrderDetailPage />} />
            </>
          )}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
