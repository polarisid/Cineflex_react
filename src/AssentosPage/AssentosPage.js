import { Link, useParams } from 'react-router-dom';
import './style.css'
import Rodape from '../components/Rodape'
import { useState,useEffect } from 'react';
import axios from 'axios';
export default function AssentosPage(){
    const {idSessao} = useParams();
    const API = "https://mock-api.driven.com.br/api/v4/cineflex/showtimes/"+idSessao+"/seats"
    
    const [items, setItems] = useState(null);
    useEffect(() => {
        const requisicao = axios.get(API);

        requisicao.then(resposta => {setItems(resposta.data);});
    }, []);
    
    if(items === null) {
		return ( <div className="voider"><img className="loading-image" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        )
        
	}
    
    return (
        <>
        <div className="content">
            <div className="title-section">
                <p>Selecione o(s) assento(s)</p>
            </div>
            <div className="assentos-container">
                <ul>
                {(items.seats).map((item)=> <li id={item.isAvailable.toString()}> {item.name}</li>)}
                </ul>
            </div>
            <div className="legenda">
                <div><div className="selecionado"></div> Selecionado</div>
                <div><div className="disponivel"></div> Disponível</div>
                <div><div className="indisponivel"></div> Indisponivel</div>
            </div>
            <div className="form-container">
                <div>Nome do comprador:</div>
                <input placeholder="Digite seu nome..."/>
                <div>CPF do comprador:</div>
                <input placeholder="Digite seu CPF..."/>
            </div>

            <button >Reservar assento(s)</button>
            <Rodape items={items.movie}/>
        </div>
        </>
    )
}