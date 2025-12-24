import PropTypes from "prop-types";
import "./Breadcrumb.css";
import { Link } from "react-router-dom";

const Breadcrumb = ({ singleProduct }) => {
  return (
    <div className="single-topbar">
      <nav className="breadcrumb">
        <ul>
          <li>
            <Link to="/">Anasayfa</Link>
          </li>
          <li>
            <Link to="/shop">Mağaza</Link>
          </li>
          {singleProduct?.category && (
               <li>
               <Link to={`/categories?categoryId=${singleProduct.category._id || singleProduct.category.id}`}>
                {singleProduct.category.name}
               </Link>
             </li>
          )}
          <li>{singleProduct?.name}</li>
        </ul>
      </nav>
    </div>
  );
};

Breadcrumb.propTypes = {
  singleProduct: PropTypes.object,
};

export default Breadcrumb;