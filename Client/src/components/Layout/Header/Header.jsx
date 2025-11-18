import "./Header.css";
import Proptypes from "prop-types";

const Header = ({ setIsSearchShow }) => {
  return (
    <header>
      <div className="global-notification">
        <p>B&B Store’a Hoş Geldiniz...</p>
      </div>

      <div className="header-row">
        <div className="container">
          <div className="header-wrapper">
            <div className="header-mobile">
              <i className="bi bi-list" id="btn-menu"></i>
            </div>

            <div className="header-left">
              <a href="#" className="logo">
                <img src="logo.png" alt="Logo" />
              </a>
            </div>

            <div className="header-center" id="sidebar">
              <nav className="navigation">
                <ul className="menu-list">
                  <li className="menu-list-item">
                    <a href="#" className="menu-link">
                      Anasayfa
                    </a>
                  </li>

                  <li className="menu-list-item">
                    <a href="#" className="menu-link">
                      Ürünler
                      <i className="bi bi-chevron-down"></i>
                    </a>

                    <div className="menu-dropdown-wrapper">
                      <ul className="menu-dropdown-content">
                        <li>
                          <a href="#">Erkek</a>
                        </li>
                        <li>
                          <a href="#">Kadın</a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  <li className="menu-list-item">
                    <a href="#" className="menu-link">
                      Blog
                    </a>
                  </li>

                  <li className="menu-list-item">
                    <a href="#" className="menu-link">
                      iletişim
                    </a>
                  </li>
                </ul>
              </nav>

              <i className="bi-x-circle" id="close-sidebar"></i>
            </div>

            <div className="header-right">
              <div className="header-right-links">
                <button
                  className="search-button"
                  onClick={() => setIsSearchShow(true)}
                >
                  <i className="bi bi-search"></i>
                </button>

                <div>
                  <a href="#" className="header-account">
                    <i className="bi bi-person"></i>
                  </a>
                </div>

                <a href="#">
                  <i className="bi bi-heart"></i>
                </a>

                <div className="header-cart">
                  <a href="#" className="header-cart-link">
                    <i className="bi bi-bag"></i>
                    <span className="header-cart-count">0</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
Header.propTypes = {
  setIsSearchShow: Proptypes.func,
};
