import  "./css/reset.css"
import "./css/styles.css"
import ReactDOM from 'react-dom'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import MoviePage from './components/MoviePage'
import Session from './components/Session'
import Ticket from './components/Ticket'


function App(){

    const [movies, setMovies] = useState([])
    const [selected, setSelected] = React.useState([])
    const [selectedSeats, setSelectedSeats] = React.useState([])
    const [userName, setUserName] = React.useState("");
    const [cpf, setCpf] = React.useState("");

    useEffect(() => {
        const promisse = axios.get("https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies");

        promisse.then(answer => {
            setMovies(answer.data);
        })

    },[]);

    return(
        <>
            <BrowserRouter>
                <Navbar/>
                <Switch>
                    <Route path="/" exact>
                        <Home movies={movies}/>    
                    </Route>    
                    <Route path="/movie/:movieId" exact>
                        <MoviePage selected={selected} setSelected={setSelected}/>
                    </Route>
                    <Route path="/session/showtime/:showtimeId" exact>
                        <Session selected={selected} setSelected={setSelected} selectedSeats={selectedSeats} setSelectedSeats={setSelectedSeats} userName={userName} setUserName={setUserName} cpf={cpf} setCpf={setCpf}/>
                    </Route>
                    <Route path="/success/" exact>
                        <Ticket selected={selected} selectedSeats={selectedSeats} userName={userName} cpf={cpf} setSelected={setSelected} setSelectedSeats={setSelectedSeats} setUserName={setUserName} setCpf={setCpf}/>
                    </Route>

                </Switch>
            </BrowserRouter>
        </>
    )
}

ReactDOM.render(<App/>, document.querySelector('.root'));