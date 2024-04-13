import React from "react";
import "./MovieReview.style.css";
import { useReviewMovieQuery } from "../../../../hooks/useReviewMovie";
import Spinner from "react-bootstrap/Spinner";
import { Alert } from "bootstrap";
import { useParams } from "react-router-dom";
import { useState } from "react";
import ReactPaginate from "react-paginate";


const MovieReview = () => {
  const [reviewPage, setReviewPage] = useState(1);
  const handleReviewPageClick = ({ selected }) => {
    setReviewPage(selected + 1);
  };
  const { id } = useParams();
  const { data, isLoading, isError, error } = useReviewMovieQuery({
    id: Number(id),
    page: reviewPage,
  });
  console.log("reviewData", data);

  const [showFullReview, setShowFullReview] = useState(new Array(data?.results.length).fill(false));
  const toggleReview = (index) => {
    const newShowFullReview = [...showFullReview];
    newShowFullReview[index] = !newShowFullReview[index];
    setShowFullReview(newShowFullReview);
  };

  if (isLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }
  if (isError) {
    return <Alert varient="danger">{error.message}</Alert>;
  }
  return (
    <div>
        <h1>Reviews</h1>
      <div>
        {data?.results.map((review, index) => (
          <div key={index} className="review-area">
            <h3>{review.author}</h3>
            <h6>
              {showFullReview[index] ? review.content : review.content.slice(0, 700)}
            </h6>
            {/* 더 보기 / 접기 버튼 */}
            {review.content.length > 700 && (
              <button className="review-btn"onClick={() => toggleReview(index)}>
                {showFullReview[index] ? "접기" : "더 보기"}
              </button>
            )}
          </div>
        ))}
      </div>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handleReviewPageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={reviewPage - 1}
      />
    </div>
  );
};

export default MovieReview;
