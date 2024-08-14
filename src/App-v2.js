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
  const [watched, setWatched] = useState([]);
  const[isloading,setIsloading]=useState(false)
  const[error,setError]=useState("")
  const [selectedId,setSelectdid]=useState(null)
  function handleSelectedMovie(id){
    setSelectdid((selectedId)=> selectedId==id ? null :id)
  }
  function handleclose(){
    setSelectdid("")
  }
  function handleAddwatched(movie){
    setWatched((watched) => [...watched, movie])
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
            { selectedId?<Moviedetails selectedId={selectedId} onclose={handleclose} onaddWatched={handleAddwatched}/> :
            <>
            <Watchedsummery  watched={watched}/>
            <WatchedMoviesList  watched={watched} />
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
function Moviedetails({selectedId,onclose,onaddWatched}){
const [movie,setMovie]=useState({})
const [isloading,setIsloading]=useState(false)
const {
  Title: title,
  Year: year,
  Poster: poster,
  Runtime: runtime,
  imdbRating,
  Plot: plot,
  Released: released,
  Actors: actors,
  Director: director,
  Genre: genre,
} = movie;
console.log(title,movie)
  useEffect(
    function (){
      async function getMovies(){
        setIsloading(true)
        const res=await fetch(`http://www.omdbapi.com/?apikey=${key}&i=${selectedId}`)
        const data=await res.json()
        setMovie(data)
        setIsloading(false)
      }
      getMovies()
    }
 ,[selectedId] )


 function handleaddwatchedmovie(){
  const newWatchedMovie = {
    imdbID: selectedId,
    title,
    year,
    poster,
    imdbRating: Number(imdbRating),
    runtime: Number(runtime.split(" ").at(0)),
  };

  onaddWatched(newWatchedMovie)
 }

  return <div className='details'>
   {isloading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onclose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
             
          
                  <Starrating
                    maxRating={10}
                    size={24} />
          
                
                 
                    <button className="btn-add" onClick={handleaddwatchedmovie}>
                      + Add to list
                    </button>
         
            
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
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

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
        />
      ))}
    </ul>
  );
}
function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
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
  );
}