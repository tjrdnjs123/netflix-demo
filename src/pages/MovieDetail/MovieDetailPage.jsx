import React, { useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Alert } from "bootstrap";
import { useParams } from "react-router-dom";
import { useDetailMovieQuery } from "../../hooks/useDetailMovie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./MovieDetailPage.style.css";
import { Badge } from "react-bootstrap";
import MovieReview from "./components/MovieReview/MovieReview";
import MovieRecommendations from "./components/MovieRecommendations/MovieRecommendations";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import MovieVideo from "./components/MovieVideo/MovieVideo";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useDetailMovieQuery(Number(id));
  const [showReview, setShowReview] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  console.log("detailddd", data);
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
      <Container>
        <Row>
          <Col lg={4} md={6} xs={12}>
            <img
              src={`https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`}
              className="detail-img"
            />
          </Col>
          <Col lg={8} md={6} xs={12} className="text-area">
            <div>
              {data?.genres.map((genre, index) => (
                <Badge bg="danger" className="genre" key={index}>
                  {genre.name}
                </Badge>
              ))}
            </div>
            <h1 className="title">{data.title}</h1>
            <h4>{data.tagline}</h4>
            <div className="rating">
              <div className="rating-div">
                <img
                  src="https://i.pinimg.com/736x/dc/75/bb/dc75bbe02ac10b0032faacab46c5a662.jpg"
                  className="vote"
                />
                {data.vote_average}
              </div>
              <div className="popularity-div">
                <img
                  src="https://cdn-icons-png.freepik.com/512/5058/5058216.png"
                  className="popularity"
                />
                {data.popularity}
              </div>
              <div className="adult-div">
                <img
                  src={
                    data.adult
                      ? "https://t4.ftcdn.net/jpg/05/32/29/13/360_F_532291309_n3pSV78DUKV9uSajqR00x42xn7KFvaVv.jpg"
                      : "https://cdn-icons-png.flaticon.com/512/5622/5622900.png"
                  }
                  className="adult"
                />
              </div>
            </div>
            <hr />
            <div>
              <h6>{data.overview}</h6>
            </div>
            <hr />
            <div>
              <Badge className="badge" bg="danger">
                Budget
              </Badge>
              $ {Number(data.budget).toLocaleString()}
            </div>
            <div>
              <Badge className="badge" bg="danger">
                Revenue
              </Badge>
              $ {Number(data.revenue).toLocaleString()}
            </div>
            <div>
              <Badge className="badge" bg="danger">
                Release Date
              </Badge>
              {data.release_date}
            </div>
            <div>
              <Badge className="badge" bg="danger">
                Rue time
              </Badge>
              {data.runtime}분
            </div>
            <div className="button-container">
              <button
                className="rr-btn"
                onClick={() => {
                  setShowReview(!showReview);
                  setShowRecommendations(false);
                }}
              >
                REVIEWS
              </button>
              <button
                className="rr-btn"
                onClick={() => {
                  setShowRecommendations(!showRecommendations);
                  setShowReview(false);
                }}
              >
                RELATED MOVIES
              </button>
              <Button variant="primary" onClick={handleShow}>
                Trailer
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        {/* 리뷰 및 추천 영화 컴포넌트 */}
        {showReview && <MovieReview />}
        {showRecommendations && <MovieRecommendations />}
      </Container>
      <div>
        <Modal
          show={show}
          onHide={handleClose}
          contentClassName="modal-video"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <MovieVideo />
          </Modal.Body>
        </Modal>
      </div>

      {/* 리뷰 및 추천 영화 컴포넌트 */}
    </div>
  );
};

export default MovieDetailPage;
