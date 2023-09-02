import React,{useEffect, useState} from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { dataState, switchChangeState } from '../recoilState'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';


export default function WatchList({user}) {

    const [watchMovie, setWatchMovie] = useState([]);
    const updateWatchList = useRecoilValue(switchChangeState)
    const setUpdateWatchList = useSetRecoilState(switchChangeState)

    const fetchMovieAndSetState = async(userUid) => {
            try {
                const userDocRef = doc(db, 'users', userUid);
                const movieCollectionRef = collection(userDocRef, 'movies');
                const querySnapshot = await getDocs(movieCollectionRef);
                const moviesData = [];
                querySnapshot.forEach((doc) => {
                    moviesData.push({ Id: doc.id, ...doc.data() });
                });
                setWatchMovie(moviesData);
                setUpdateWatchList(true)
            } catch (error) {
                console.error('Error fetching movies', error);
            }
        
    }

    useEffect(() => {
        fetchMovieAndSetState(user.uid)
    },[])

    useEffect(()=>{
        if (updateWatchList === false){
            fetchMovieAndSetState(user.uid)
        }
    },[updateWatchList])

    const deleteWatchList = async(movie, user) => {
        try {
            const documentPath = `users/${user.uid}/movies/${movie.Id}`;
            const docRef = doc(db, documentPath);
            await deleteDoc(docRef);
            const newMovies = watchMovie.filter((m) => m.id !== movie.id)
            setWatchMovie(newMovies)
        } catch (error) {
            console.error('Error deleting movie', error);
        }
    }

    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342/"
  return (
    <div>
        <ol>
            {
            watchMovie.map((movie) =>{return(
                <li key={movie.Id} className='watch-list-show'>
                        {movie.poster_path ? <img className='saved-movie' src={`${IMAGE_PATH}${movie.poster_path}`} alt='' />
                        : <div className='movie-placeholder-watch-list'>No Image Found</div>}
                        <div className='watch-list-overview'><h3>{movie.title}</h3><br/>{movie.overview}</div>
                        <div className='watch-list-review'>{movie.vote_average / 2}</div>
                        <button className='watch-list-delete-button' onClick={() => deleteWatchList(movie, user)}>Delete</button>
                </li>
            )})
            }
        </ol>
    </div>
  )
}
