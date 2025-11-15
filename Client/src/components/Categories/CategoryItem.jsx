import "./CategoryItem.css"

const CategoryItem = () => {
  return (
    <li className="category-item">
      <a href="#">
        <img
          src="img\categories\t-shirt.png"
          alt=""
          className="category-image"
        />
        <span className="category-title">T-Shirt</span>
      </a>
    </li>
  );
};

export default CategoryItem;