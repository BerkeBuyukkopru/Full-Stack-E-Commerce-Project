const Login = () => {
  return (
    <div className="account-column">
      <h2>Giriş Yap</h2>
      <form>
        <div>
          <label>
            <span>
              Email <span className="required">*</span>
            </span>
            <input type="email" />
          </label>
        </div>
        <div>
          <label>
            <span>
              Şifre <span className="required">*</span>
            </span>
            <input type="password" />
          </label>
        </div>
        <p className="login">
          <button className="btn btn-sm">Giriş Yap</button>
        </p>
        <a href="#" className="form-link">
          Şifremi Unuttum
        </a>
      </form>
    </div>
  );
};

export default Login;