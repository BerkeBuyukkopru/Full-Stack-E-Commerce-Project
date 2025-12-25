import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./CategoryItem.css";

const CategoryItem = ({ category, forceLink }) => {
  const linkTo = forceLink || `/shop?categoryId=${category._id || category.id}`;

  return (
    <li className="category-item">
      <Link to={linkTo} className="category-link">
        <img
          src={category.img}
          alt={category.name}
          className="category-image"
        />
        <span className="category-title">{category.name}</span>
      </Link>
    </li>
  );
};

export default CategoryItem;

CategoryItem.propTypes = {
  category: PropTypes.object.isRequired,
};
