import axios from "axios"
import { useEffect } from "react";
import {useParams, useHistory} from 'react-router-dom'
import React from 'react'
import Bottom from './Bottom'

export default function Session(props){

    const {showtimeId} = useParams()
    const {selected, setSelected, userName, setUserName, cpf, setCpf, selectedSeats, setSelectedSeats} = props
    const [movie,setMovie] = React.useState([])
    const history = useHistory(); 

    useEffect(()=>{
        const promisse=axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/showtimes/${showtimeId}/seats`)
        
        promisse.then((answer)=>{
            setSelected(answer.data)
            setMovie(answer.data.seats)
        })

    },[]);   // eslint-disable-line react-hooks/exhaustive-deps

    function toggleSelected(selectedSeat,i){
        if (!selectedSeat.isAvailable){
            alert("Esse assento não está disponível");
            return
        } else {
            movie[i].selected = !movie[i].selected
            setSelectedSeats([...selectedSeats,movie[i]])
        }
        setMovie([...movie])
    }

    function getValueOfName(event){
        setUserName(event.target.value);
    }

    function getValueOfCPF(event){
        setCpf(event.target.value);
    }

    function confirmTickets(){
        if(selectedSeats.lenght === 0 || userName === "" || cpf === ""){
            alert("Um ou mais campos não foram preenchidos")
            return;
        }
        const seatIds = [];
        selectedSeats.forEach((seat)=>{seatIds.push(seat.id)})
        const confirmation = { ids:seatIds, name:userName, cpf:cpf}
        const promisse = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/seats/book-many", confirmation);
        promisse.then(()=>{
            history.push("/success");
        })
    }
    
    return(
        <>
            <div className="session title">
                Selecione o(s) assento(s)
            </div>
            <div className="content">
                <div className="center">    
                    <div className="seats-container">
                        {movie.map((seat,i)=>(
                            
                            <button className = {seat.isAvailable? !seat.selected ? "seat ": "seat selected" : "seat unavailable"} key={i} onClick={()=> toggleSelected(seat,i)}>
                                    {seat.name}
                                </button>

                        ))}
                    </div>
                </div>
                <div className="seats-label">
                    <span>
                        <div className="green label"></div>
                        <p>Selecionado</p>
                    </span>
                    <span>
                        <div className="grey label"></div>
                        <p>Disponível</p>
                    </span>
                    <span>
                        <div  className="yellow label"></div>
                        <p>Indisponível</p>
                    </span>
                </div>
                <div className="info">
                    <p>Nome do comprador:</p>
                    <input onChange = {getValueOfName} placeholder="Digite seu nome..."></input>
                    <p>CPF do comprador:</p>
                    <input onChange = {getValueOfCPF} placeholder="Digite seu CPF..."></input>
                </div>
            </div>
            <div className="center confirm">
                {/* <Link to={`/success`} movie={movie}>  */}
                    <button onClick={confirmTickets}>Resevar assesnto(s)</button>
                {/* </Link> */}
            </div>
            <Bottom selected={selected}/>
        </>
    )
}