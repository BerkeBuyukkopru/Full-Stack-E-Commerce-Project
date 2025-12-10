import "./Breadcrumb.css";

const Breadcrumb = () => {
  return (
    <div className="single-topbar">
      <nav className="breadcrumb">
        <ul>
          <li>
            <a href="#">Anasayga</a>
          </li>
          <li>
            <a href="#">Erkek</a>
          </li>
          <li>
            <a href="#">Pantalon</a>
          </li>
          <li>Sweatshirt 1</li>
        </ul>
      </nav>
    </div>
  );
};

export default Breadcrumb;