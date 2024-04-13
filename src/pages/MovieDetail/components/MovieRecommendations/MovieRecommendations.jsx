import React, { useState } from "react";
import { useRecommendationsMovieQuery } from "../../../../hooks/useRecommendationsMovie";
import { useParams } from "react-router-dom";
import MovieCard from "../../../Homepage/components/MovieCard/MovieCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import { Alert } from "bootstrap";
import ReactPaginate from "react-paginate";

const MovieRecommendations = () => {
  const { id } = useParams();
  const [recommendPage, setRecommendPage] = useState(1);
  console.log(recommendPage);
  const { data, isLoading, isError, error } = useRecommendationsMovieQuery({
    id: Number(id),
    page: recommendPage,
  });
  console.log("recommendData", data);
  const handleRecommendPageClick = ({ selected }) => {
    setRecommendPage(selected + 1);
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
      <Row>
        {data.results.map((movie, index) => (
          <Col key={index} lg={3} md={4} xs={6}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handleRecommendPageClick}
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
        forcePage={recommendPage - 1}
      />
    </div>
  );
};

export default MovieRecommendations;
