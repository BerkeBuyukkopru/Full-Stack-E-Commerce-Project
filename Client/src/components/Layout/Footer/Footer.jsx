import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="widgets-row">
        <div className="container">
          <div className="footer-widgets">
            <div className="footer-logo">
              <a href="#" className="logo">
                <img src="logo.png" alt="Logo" />
              </a>
            </div>
            <div className="widget-nav-menu">
              <h4>Kurumsal</h4>
              <ul>
                <li>
                  <a href="#">Hakkımızda</a>
                </li>
                <li>
                  <a href="#">M.S.S</a>
                </li>
                <li>
                  <a href="#">İletişim</a>
                </li>
              </ul>
            </div>
            <div className="widget-nav-menu">
              <h4>Mağaza</h4>
              <ul>
                <li>
                  <a href="#">Anasafya</a>
                </li>
                <li>
                  <a href="#">Kategoriler</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">İletişim</a>
                </li>
              </ul>
            </div>
            <div className="widget-nav-menu">
              <h4>Destek</h4>
              <ul>
                <li>
                  <a href="#">Giriş Yap/Kayıt Ol</a>
                </li>
                <li>
                  <a href="#">İletişim</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="copyright-row">
        <div className="container">
          <div className="footer-copyright-row">
            <div className="site-copyright">
              <p>Copyright 2025 © B&B Store. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
