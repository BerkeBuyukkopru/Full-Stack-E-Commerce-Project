import "./BlogItem.css"

const BlogItem = () => {
  return (
    <li className="blog-item">
      <a href="#" className="blog-image">
        <img src="" alt="" />
      </a>
      <div className="blog-info">
        <div className="blog-info-top">
          <span>1 Kasımi 2025 </span>-<span>0 Yorum</span>
        </div>
        <div className="blog-info-center">
          <a href="#">T-Shirt Alırken Nelere Dikkat Edilmeli?</a>
        </div>
        <div className="blog-info-bottom">
          <a href="#">Devamını Oku</a>
        </div>
      </div>
    </li>
  );
};

export default BlogItem;