const Register = () => {
  return (
    <div className="account-column">
      <h2>Kayıt Ol</h2>
      <form>
        <div>
          <label>
            <span>
              Ad
              <span className="required"> *</span>
            </span>
            <input type="text" />
          </label>
          <label>
            <span>
              Soyad
              <span className="required"> *</span>
            </span>
            <input type="text" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Email
              <span className="required"> *</span>
            </span>
            <input type="email" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Şifre
              <span className="required"> *</span>
            </span>
            <input type="password" />
          </label>
        </div>
        <div className="register login">
          <button className="btn btn-sm">Kayıt Ol</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
