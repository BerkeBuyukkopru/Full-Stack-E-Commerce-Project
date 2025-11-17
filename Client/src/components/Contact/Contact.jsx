import "./Contact.css"

const Contact = () => {
  return (
    <section className="contact">
      <div className="contact-bottom">
        <div className="container">
          <div className="contact-titles">
            <h2>Bize Ulaşın</h2>
            <p>
              Görüş, öneri ya da şikayetiniz paylaşmak isterseniz, "İletişim Formu"nu doldurarak bize ulaştırabilirsiniz.
              <br/>
              En kısa sürede değerlendirip size geri döneceğiz. 
            </p>
          </div>
          <div className="contact-elements">
            <form className="contact-form">
              <div className="">
                <label>
                  Ad
                  <span> *</span>
                </label>
                <input type="text" required />
              </div>
              <div className="">
                <label>
                  Soyad
                  <span> *</span>
                </label>
                <input type="text" required />
              </div>
              <div className="">
                <label>
                  Email
                  <span> *</span>
                </label>
                <input type="email" required />
              </div>
              <div className="">
                <label>
                  Mesaj
                  <span> *</span>
                </label>
                <textarea
                  id="author"
                  name="author"
                  required=""
                ></textarea>
              </div>
              <button className="btn btn-sm form-button">Gönder</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;