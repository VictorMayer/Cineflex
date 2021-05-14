import axios from "axios"
import { useEffect } from "react";
import {Link, useParams} from 'react-router-dom'
import React from 'react'
import Bottom from './Bottom'

export default function MoviePage(props){
    
    const {movieId} = useParams();  
    const {selected, setSelected} = props
    const [sessions, setSessions] = React.useState([]);


    useEffect(()=>{
        const promisse = axios.get(`https://mock-api.bootcamp.respondeai.com.br/api/v2/cineflex/movies/${movieId}/showtimes`);
        
        promisse.then(answer => {
            
            setSelected(answer.data)
            setSessions(answer.data.days)
        })

    },[])
    

    return(
        <>
            <div className="movie title">
                Selecione o horário
            </div>
            <div className="sessions-container">
                {sessions.map((session)=>(
                    
                    <div className="session-box" key={session.id}>
                        <p>{session.weekday+" - "+session.date}</p>
                        <div className ="session-hour">
                            <span>
                                {session.showtimes.map((showtime) =>(
                                    <Link to={`/session/showtime/${showtime.id}`} key={showtime.id}>
                                        <button>{showtime.name}</button>
                                    </Link>
                                ))}
                            </span>
                        </div>
                    </div>

                ))}
            </div>

            <Bottom selected={selected}/>
        </>
    )
}