import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/Home/HomePage.jsx';
import './App.css';
import Header from './components/Header/Header.jsx';
import ProductListPage from './pages/ProductList/ProductListPage.jsx';
import ArtisanListPage from './pages/ArtisanList/ArtisanListPage.jsx';
import EventListPage from './pages/EventList/EventListPage.jsx';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
