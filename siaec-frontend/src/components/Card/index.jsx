import './styles.css';

export default function Card({ image, children }) {
  return (
    <div className="card">
      <img src={image} className="card-image" />
      <div>{children}</div>
    </div>
  );
}
