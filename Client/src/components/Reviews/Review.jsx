import "./Review.css";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem";

const Review = () => {
  return (
    <div className="tab-panel-reviews">
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
