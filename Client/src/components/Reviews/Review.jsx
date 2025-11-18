import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";
import PropTypes from "prop-types";
import "./Review.css";

const Review = ({ active }) => {
  return (
    <div className={`tab-panel-reviews ${active}`}>
      <h3>2 Yorum</h3>
      <div className="comments">
        <ol className="comment-list">
          <ReviewItem />
        </ol>
      </div>
      <div className="review-form-wrapper">
        <h2>Yorum Yaz</h2>
        <ReviewForm />
      </div>
    </div>
  );
};

export default Review;

Review.propTypes = {
  active: PropTypes.string,
};
