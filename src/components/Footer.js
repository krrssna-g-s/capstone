import { NavLink } from "react-router-dom";
import { FaFacebook, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">

        <div className="footer-logo-panel">
          <img src="/Logo.svg" alt="Little Lemon" className="footer-logo-img" />
        </div>

        <div className="footer-links-panel">
          <div className="footer-links-content">

            <nav className="footer-nav">
              <p className="footer-section-title">Navigation</p>
              <ul>
                <li><NavLink to="/" end>Home</NavLink></li>
                <li><NavLink to="/about">About</NavLink></li>
                <li><NavLink to="/menu">Menu</NavLink></li>
                <li><NavLink to="/reservations">Reservations</NavLink></li>
                <li><NavLink to="/order-online">Order Online</NavLink></li>
                <li><NavLink to="/login">Login</NavLink></li>
              </ul>
            </nav>

            <div className="footer-contact">
              <p className="footer-section-title">Contact</p>
              <p>263 W Lemon Ave, Chicago, IL</p>
              <p>+1 (312) 555-0192</p>
              <p>hello@littlelemon.com</p>
            </div>

            <div className="footer-social">
              <p className="footer-section-title">Follow Us</p>
              <div className="footer-social-icons">
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                  <FaFacebook />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                  <FaInstagram />
                </a>
                <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
                  <FaXTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                  <FaYoutube />
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
