import {Link} from 'react-router-dom'

export default function Ticket(props){

    const {selected, selectedSeats, userName, cpf, setSelected, setSelectedSeats, setUserName, setCpf} = props

    function resetStates(){
        setUserName("");
        setCpf("");
        setSelected([]);
        setSelectedSeats([]);
    }

    return(
        <>
            <div className="ticket title">Pedido feito <br/> com sucesso!</div>
            <div className="ticket-content">
                <p className="section-title">Filme e sessão</p>
                <p className="data">{selected.movie.title}</p>
                <p className="data">{selected.day.weekday +" "+selected.name}</p>
            </div>

            <div className="ticket-content">
                <p className="section-title">Ingressos</p>
                {selectedSeats.map((seat,i)=>(
                    <p className="data" key={i}>Assento {seat.name}</p>
                ))}
            </div>

            <div className="ticket-content">
                <p className="section-title">Comprador</p>
                <p className="data">Nome: {userName}</p>
                <p className="data">CPF: {cpf}</p>
            </div>
            <div className="center confirm">
            <Link to="/">
                <button onClick={resetStates}>Voltar pra Home</button>
            </Link>
            </div>
        </>
    )
}