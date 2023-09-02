import React from 'react'
import { useState, useEffect } from 'react';
import MovieCard from "./MovieCard"
import { addDoc, collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';
import { useSetRecoilState } from 'recoil';
import { switchChangeState } from '../recoilState';



export default function MovieShowOff({user}) {

    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState({})
    const [searchKey, setSearchKey] = useState("")
    const setUpdateWatchLists = useSetRecoilState(switchChangeState);
    
    const api_key = "3caa6843eb9ade6937f6647665fc4b58"
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`;

    const searchURL = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${searchKey}&include_adult=false&language=en-US&page=1`;

    const fetchFunc = async (apiURL) => {
      try {
        const response = await fetch(apiURL);
        const json = await response.json();
    
        if (json.results.length === 0) {
          alert("No movie is found")
        } else {
          setMovies(json.results);
          setSelectedMovie(json.results[0]);
        }
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
      }else{
        alert("key word is required")
      }
    }


    const renderStars = (rating) => {
      const maxRating = 10;
      
      const roundedRating = Math.round(rating * 10) / 10;
      
      const starCount = Math.round((roundedRating / maxRating) * 5);
      
      const stars = [];
      for (let i = 0; i < 5; i++) {
        if (i < starCount) {
          stars.push(<span key={i}>&#9733;</span>); // 星のUnicode文字
        } else {
          stars.push(<span key={i}>&#9734;</span>); // 空の星のUnicode文字
        }
      }
      return stars
    }

    const handleAddToWatchLater = async(addingMovie) => {
      try{
          const userDocRef = doc(db, 'users', user.uid);
          const movieCollectionRef = collection(userDocRef, 'movies');

          const querySnapshot = await getDocs(movieCollectionRef);
          const movies = querySnapshot.docs.map((doc) => doc.data());
          const updateWatchList = false
          setUpdateWatchLists(updateWatchList)
          
          if (!movies.some((movie) => movie.id === addingMovie.id)) {
            await addDoc(movieCollectionRef, addingMovie);
          } else {
            alert('この映画はすでにウォッチリストに存在します。');
          }
      }catch(error){
        console.error("Error adding document", error)
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
          <div className="evaluate-text">
            <p className='star-icon'>{renderStars(selectedMovie.vote_average)}</p>
            <label className='reviewed-number'>{selectedMovie.vote_count}</label>
          </div>
          <p className="hero-overview">{selectedMovie.overview}</p>
          <button className='watch-list-button' onClick={()=>handleAddToWatchLater(selectedMovie)}>Add to Watch later</button>
        </div>
      </div>

      <div className="movie-container max-center">
          {renderMovies()}
      </div>

    </>
  )
}
