import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard"
import "./MovieShowOff"

export default function MovieShowOff() {

    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({})
    const [searchKey, setSearchKey] = useState("")

    const api_key = "3caa6843eb9ade6937f6647665fc4b58"
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchKey}&include_adult=false&language=en-US&page=1`;

    const fetchFunc = async (apiURL) => {
        try {
          const response = await fetch(apiURL);
          const json = await response.json();
          setMovies(json.results);
          setSelectedMovie(json.results[0])
        } catch (err) {
          console.error('error:' + err);
        }
      };
    
    useEffect (() =>{
        fetchFunc(url)
      },[])

    const renderMovies = () => (
        movies.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            setSelectedMovie={setSelectedMovie}
          />
        ))
      )

    const searchMovie = (e) => {
      e.preventDefault();
      if(searchKey){
        fetchFunc(searchURL)
      }
    }
    
  return (
    <>
      <header className="header">
        <div className="header-content max-center">
          <span>Movie Trailer App</span>

          <form onSubmit={searchMovie}>
            <input type="text" onChange={(e) =>setSearchKey(e.target.value)} />
            <button type="submit">Search</button>
          </form>
        </div>
      </header>

      
      <div className="hero" style={{
         backgroundImage: selectedMovie.backdrop_path
         ? `url(https://image.tmdb.org/t/p/w1280${selectedMovie.backdrop_path})`
         : "none" }}>
        <div className="hero-content max-center">
          <h1 className="hero-title">{selectedMovie.title}</h1>
          <p className="hero-overview">{selectedMovie.overview}</p>
        </div>
      </div>

      <div className="movie-container max-center">
          {renderMovies()}
      </div>

    </>
  )
}
