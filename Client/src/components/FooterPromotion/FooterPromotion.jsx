import "./FooterPromotion.css";

const FooterPromotion = () => {
  return (
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
  );
};

export default FooterPromotion;