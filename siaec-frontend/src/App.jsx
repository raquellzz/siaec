import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import './App.css'
import Header from './components/Header.jsx';
import ProductListPage from './pages/ProductListPage.jsx';
import ArtisanListPage from './pages/ArtisanListPage.jsx';
import EventListPage from './pages/EventListPage.jsx';


function App() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/artisans" element={<ArtisanListPage />} />
          <Route path="/events" element={<EventListPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
