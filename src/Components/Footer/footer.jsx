import './footer.css';
import logo from '../../Assets/Imgs/Minotauro_logo.png';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logo} alt="Minotauro_Logo" className="footer-logo" />
          <div className="footer-site-name">Mythology</div>
        </div>
        <nav className="footer-nav">
          <ul className="footer-links">
            <li><a href="/termos">Termos de Uso</a></li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Mythology. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}