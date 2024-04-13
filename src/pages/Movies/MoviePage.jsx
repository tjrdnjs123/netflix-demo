import React, { useState } from "react";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import { useSearchParams } from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";
import { Alert } from "bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MovieCard from "../Homepage/components/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import Dropdown from "react-bootstrap/Dropdown";
import "./MoviePage.style.css"
import Button from "react-bootstrap/Button";
import { useMoviesGenreQuery } from "../../hooks/useMovieGenre";

//페이지네이션 설치
//page state 만들기
//페이지네이션 클릭할 때마다 바꿔주기
//page값이 바뀔때마다 useSearchMovie에 page까지 넣어서 fetch
// 경로 2가지
// nav바에서 클릭해서 넘어온 경우 => popularMovies보여주기
// keyword를 입력해서 온 경우 => keyword와 관련된 영화들을 보여줌
const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const [sortedLow, setSortedLow] = useState(false);
  const [genreId,setGenreId] = useState(null);
  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };
  const keyword = query.get("q");
  console.log(keyword);
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
    sortedLow,
    genreId,
  });
  const { data:genreData } = useMoviesGenreQuery();
  const searchGenre = (genreId) =>{
    console.log("genre.id",genreId)
    setGenreId(genreId)
  }
  console.log("genreData", genreData);
  console.log("searchddd", data);
  const popularityLow = () => {
    setSortedLow(true);
  };
  const popularityHigh = () =>{
    setSortedLow(false);
  }
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
    <Container>
      <Row>
        <Col lg={4} xs={12}>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Sort
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1"onClick={popularityHigh}>인기도 높은 순</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={popularityLow}>
                인기도 낮은 순
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Row>
          {genreData?.map((genre,index) => (
          <Col key={index} lg={4} xs={4}>
             <Button onClick={() => searchGenre(genre.id)} className="genre-btn" variant="danger">{genre.name}</Button>
          </Col>
        ))}
          </Row>
          
        </Col>
        <Col lg={8} xs={12}>
          <Row>
            {data.results.map((movie, index) => (
              <Col key={index} lg={4} xs={6}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
          <ReactPaginate
            nextLabel="next >"
            onPageChange={handlePageClick}
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
            forcePage={page - 1}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default MoviePage;
