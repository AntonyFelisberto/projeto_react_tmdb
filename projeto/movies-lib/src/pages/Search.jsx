import {useEffect,useState} from 'react'
import {useSearchParams} from 'react-router-dom'
import MovieCard from '../components/MovieCard';
import "./MovieGrid.css"

const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY

const headerConfig = {
    headers : {
        Accept: "application/json",
        Authorization: `Bearer ${apiKey}`
    }
}

const Search = () => {
    const [searchParams] = useSearchParams();
    const [movies,setMovies] = useState([]);
    const query = searchParams.get("q");

    const getSearchMovies = async (url) => {
        const res = await fetch(url,headerConfig);
        const data = await res.json();

        setMovies(data.results)
    }

    useEffect(() =>{        
        const searchByMovie = `${searchUrl}?query=${query}`
        getSearchMovies(searchByMovie)
    },[query])

    return (
        <div>
            <div className="container">
                    <h2 className="title">Resultados Para: <span className='query-text'>{query}</span> </h2>
                    <div className="movies-container">
                        {movies.length === 0 && <p>Carregando...</p>}
                        {movies.length > 0 && movies.map((movie)=><MovieCard key={movie.id} movie={movie}/>)}
                    </div>
            </div>
        </div>
    );
}

export default Search;