import {Link} from 'react-router-dom'

export default function Home(props){

    const {movies} = props;
    
    return(
        <>
            <div className="home title">
                Selecione o filme
            </div>  

            <div className="movies-container">
                {movies.map(movie => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                        <div className="movie-box">
                            <img src={movie.posterURL} alt="movie cover"/>
                        </div>
                    </Link>
                ))}
            </div>
            
        </>
    )
}