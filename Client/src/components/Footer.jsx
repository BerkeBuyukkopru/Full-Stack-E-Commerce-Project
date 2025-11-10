import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="promotion-row">
        <div className="container">
          <div className="footer-row-wrapper">
            <div className="footer-promotion-wrapper">
              <div className="footer-promotion">
                <h2 className="promotion-title">B&B Store'a Hoş Geldiniz.</h2>
                <p className="promotion-desc-item">
                  Biz, B&B Store ailesi olarak, sizlere yalnızca en iyi hizmeti
                  değil, aynı zamanda en güncel ve kaliteli giyim ürünlerini
                  sunmak için online platformumuzda hizmet veriyoruz.
                </p>

                <p className="promotion-desc-item">
                  E-ticaret ile başlayan serüvenimizde misyonumuz, modadaki en
                  yeni trendleri yakından takip ederek, özenle seçilmiş
                  koleksiyonlarımızı sizlere ulaştırmaktır. Siz değerli
                  müşterilerimizin ilgisi ve desteği sayesinde her geçen gün
                  büyüdük ve markamızı daha da güçlendirdik.
                </p>

                <p className="promotion-desc-item">
                  B&B Store'u bir hayalden gerçeğe dönüştürme yolculuğumuzda
                  yanımızda olduğunuz için size sonsuz teşekkür ederiz.
                </p>
                <p className="signature-line">
                  <strong>Sevgi ve saygılarımızla,</strong>
                </p>
                <h3 className="promotion-bottom-title">B&B STORE</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

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
