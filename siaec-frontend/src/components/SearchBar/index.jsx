import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import ButtonUI from '../ButtonUI';
import './styles.css';

export default function SearchBar({ placeholder, onSearch }) {
  const [value, setValue] = useState('');

  return (
    <div className="search-bar-container">
      <FaSearch className="search-icon" />
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onSearch(value);
          }
        }}
      />
      <ButtonUI onClick={() => onSearch(value)} text="Pesquisar" styles={{ marginLeft: 9, borderRadius: 20 }} />
    </div>
  );
}
