import React,{useEffect} from 'react'
import { useRecoilState } from 'recoil'
import { dataState } from '../recoilState'
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from '../FirebaseConfig';


export default function WatchList({user}) {

    // このstateはウォッチリストですよね？？
    // わざわざRecoil使ってグローバル変数にする必要ないと思うのでuseStateで良いと思います！
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

    const deleteWatchList = async (movie, user) => {
        const documentPath = `${user.uid}_${movie.id}`;
    
        const docRef = doc(db, 'movie', documentPath);
        // 削除の方法が間違っていたので修正しました！firebaseのバージョンによって記述方法が異なるのでバージョンに合った記述方法を確認してみてください！
        await deleteDoc(docRef);
        // 削除は修正したが、moviesのstateを更新する処理がないので、ここでstateからも削除する記述を追記
        console.log('ドキュメントが削除されました');
    };

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
