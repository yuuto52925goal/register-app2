import React,{useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { dataState } from '../recoilState'
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '../FirebaseConfig';


export default function WatchList({user}) {

    const [movies,setMovies] = useRecoilState(dataState);

    const fetchMovieAndSetState = async(userUid) => {
            try {
                const userDocRef = doc(db, 'users', userUid);
                const movieCollectionRef = collection(userDocRef, 'movies');
                const querySnapshot = await getDocs(movieCollectionRef);

                const moviesData = [];
                querySnapshot.forEach((doc) => {
                    moviesData.push({ id: doc.id, ...doc.data() });
                });

                setMovies(moviesData);
            } catch (error) {
                console.error('Error fetching movies', error);
            }
        
    }

    useEffect(() => {
        fetchMovieAndSetState(user.uid)
    },[user,movies])

    const deleteWatchList = (movie, user) => {
        const collectionPath = 'movie';
        const documentPath = `${user.uid}_${movie.id}`;

        db.collection(collectionPath)
        .doc(documentPath)
        .delete()
            .then(() => {
              console.log('ドキュメントが削除されました');
            })
            .catch((error) => {
              console.error('エラーが発生しました: ', error);
        });
    }

    const IMAGE_PATH = "https://image.tmdb.org/t/p/w342/"
  return (
    <div>
        <ol>
            {
            movies.map((movie) =>{return(
                <li key={movie.id} className='watch-list-show'>
                        {movie.poster_path ? <img className='saved-movie' src={`${IMAGE_PATH}${movie.poster_path}`} alt='' />
                        : <div className='movie-placeholder-watch-list'>No Image Found</div>}
                        <div className='watch-list-overview'><h3>{movie.title}</h3><br/>{movie.overview}</div>
                        <div className='watch-list-review'>{movie.vote_average}</div>
                        <button className='watch-list-delete-button' onClick={() => deleteWatchList(movie, user)}>Delete</button>
                </li>
            )})
            }
        </ol>
    </div>
  )
}
