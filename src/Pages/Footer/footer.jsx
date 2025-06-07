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
        <div className="footer-social">
          {/* Add social media links here if you have them */}
          {/* Example: */}
          {/* <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a> */}
          {/* <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a> */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} Mythology. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}