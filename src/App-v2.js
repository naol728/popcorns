import {useEffect, useState} from 'react';
import './App.css'
import Starrating from './Step'
const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },]

const  tempWatchedData= [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const key="b481392d"
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(tempWatchedData);
  const[isloading,setIsloading]=useState(false)
  const[error,setError]=useState("")
  const [selectedId,setSelectdid]=useState(null)
  function handleSelectedMovie(id){
    setSelectdid((selectedId)=> selectedId==id ? null :id)
  }
  function handleclose(){
    setSelectdid("")
  }
   useEffect(function (){
    setError("")
    setIsloading(true)
 async function fetchmovies(){
   try {
    const res=await fetch(`http://www.omdbapi.com/?apikey=${key}&s=${query}`)
   const data=await res.json()
   if(!res.ok){
    throw new Error ("something is wrong check your conncetion")
   }
   console.log(data)
   if(data.Response==="False") throw new Error ("movie is not found")
   setMovies(data.Search)
   
  
  }
  catch(err){
  setError(err.message)
  }finally{
    setIsloading(false)
  }
}
   if(query.length <3){
    setMovies([])
    setError("")
    setIsloading(false)
    return;
   }
  fetchmovies()
 },[query])
  return (
    <>
    
   <Navbar>
       <Logo />
       <Search query={query} setQuery={setQuery}/>
       <Numresult movies={movies}/> 
   </Navbar>
    <Main> 
       <Box>
           {/* {isloading ? <Loading/>:<Movielist movies={movies} />} */}
           {isloading && <Loading />}
           {!isloading && !error && <Movielist movies={movies} onSelectdid={handleSelectedMovie}/> }
           {error && <Errormessage message={error} />}
       </Box>
       <Box>
            { selectedId?<Moviedetails selectedId={selectedId} onclose={handleclose}/> :
            <>
            <Watchedsummery  watched={watched}/>
            <WatchedMovielist  watched={watched} />
            </>
            }
       </Box>
    </Main>
    </>
  );
}

function Loading(){
  return <p className='loader'>Loading...</p>
}



function Errormessage({message}){
  return <p className='error'>
    <span>{message}</span>
  </p>
}
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);


function Logo(){
  return   <div className="logo">
  <span role="img">🍿</span>
  <h1>usePopcorn</h1>
</div>}

function Navbar({children}){
  return   <nav className="nav-bar">
  {children}
</nav>
}

function Search({query,setQuery}){
  
  return  <input
  className="search"
  type="text"
  placeholder="Search movies..."
  value={query}
  onChange={(e) => setQuery(e.target.value)}
/>
}

function Numresult({movies}){
  return <p className="num-results">
  Found <strong>{movies.length}</strong> results
</p>
}

function Main({children}){
  return ( <main className="main">{children}</main>)
}

function Box({children}){
  const [isOpen1, setIsOpen1] = useState(true);

  return <div className="box">
  <button
    className="btn-toggle"
    onClick={() => setIsOpen1((open) => !open)}
  >
    {isOpen1 ? "–" : "+"}
  </button>
  {isOpen1 && children }
</div>
}
function Moviedetails({selectedId,onclose}){
const [movie,setMovie]=useState({})
const {
  Title:title,
  Year:year,
  Poster:poster,
  Runtime:runtime,
  imdbRating,
  Plot,plot,
  Released:released,
  Actors,actors,
  Director,director,
  Genre,gener,
}=movie
console.log(title,movie)
  useEffect(
    function (){
      async function getMovies(){
        const res=await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`)
        const data=await res.json()
        setMovie(data)
      }
      getMovies()
    }
 ,[] )
  return <div className='details'>
    <header>
      <button className='btn-back' onClick={onclose}>&larr;</button>
      {selectedId}
      <img src={poster} alt={`poster of ${movie} movie`} />
      <div className='details-overview'>
<h2>{title}</h2>
<p>
  {released} &bull;{runtime}
</p>
<p>{Genre}</p>
<p><span>⭐</span>{imdbRating} IDMB Rating</p>
      </div>
      </header>

      <section>
        <Starrating />
        <p>
          <em>{Plot}</em>
        </p>
        <p>Staring {Actors}</p>
        <p>Directed by {Director}</p>
      </section>
  </div>
}
function Movielist({movies,onSelectdid}){
  return   <ul className="list list-movies">
  {movies?.map((movie) => (
     
     <Movie movie={movie}  key={Movie.imdbID} onSelectdid={onSelectdid}/>
  ))}
</ul>
}
function Movie({movie,onSelectdid}){
  return  <li key={movie.imdbID} onClick={()=>onSelectdid(movie.imdbID)}>
  <img src={movie.Poster} alt={`${movie.Title} poster`} />
  <h3>{movie.Title}</h3>
  <div>
    <p>
      <span>🗓</span>
      <span>{movie.Year}</span>
    </p>
  </div>
</li>
}

function Watchedsummery({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return <div className="summary">
  <h2>Movies you watched</h2>
  <div>
    <p>
      <span>#️⃣</span>
      <span>{watched.length} movies</span>
    </p>
    <p>
      <span>⭐️</span>
      <span>{avgImdbRating}</span>
    </p>
    <p>
      <span>🌟</span>
      <span>{avgUserRating}</span>
    </p>
    <p>
      <span>⏳</span>
      <span>{avgRuntime} min</span>
    </p>
  </div>
</div>
}

function WatchedMovielist({watched}){
  return   <ul className="list">
  {watched.map((movie) => (
    <Watchedmovies movie={watched} key={movie.imdbID}/>
  ))}
</ul>
}
function Watchedmovies({movie}){
  return <li key={movie.imdbID}>
  <img src={movie.Poster} alt={`${movie.Title} poster`} />
  <h3>{movie.Title}</h3>
  <div>
    <p>
      <span>⭐️</span>
      <span>{movie.imdbRating}</span>
    </p>
    <p>
      <span>🌟</span>
      <span>{movie.userRating}</span>
    </p>
    <p>
      <span>⏳</span>
      <span>{movie.runtime} min</span>
    </p>
  </div>
</li>
}