export default function Bottom(props){

    const {selected} = props

    return(
        <>
            <div className ="bottom">
                <div className="movie-box-tiny">
                    <img src={selected.movie?selected.movie.posterURL:selected.posterURL} alt="movie cover"/>
                </div>
                <div className="bottom-text">
                    <p>{selected.movie?selected.movie.title:selected.title}</p>
                    <p>{(selected.movie?selected.day.weekday:"")+(selected.movie?" - ":"")+(selected.movie?selected.name:"")}</p>
                </div>
            </div>
        </>
    )
}