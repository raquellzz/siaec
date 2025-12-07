import { Link } from 'react-router-dom';
import './styles.css';

export default function NotFound() {
  return (
    <div className="page">
      <h1 className="title">Desculpe, esta página não está disponível.</h1>
      <Link className="link" to="/">
        Ir para a página inicial
      </Link>
    </div>
  );
}
