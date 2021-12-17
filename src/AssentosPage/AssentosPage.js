import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './style.css'
import Rodape from '../components/Rodape'
import { useState,useEffect } from 'react';
import axios from 'axios';
export default function AssentosPage(){
    const {idSessao} = useParams();
    const API = "https://mock-api.driven.com.br/api/v4/cineflex/showtimes/"+idSessao+"/seats"

    const [items, setItems] = useState(null);
    const [click,setClick]=useState(null);
    useEffect(() => {
        const requisicao = axios.get(API);

        requisicao.then(resposta => {setItems(resposta.data);});
    }, []);
    
    if(items === null) {
		return ( <div className="voider"><img className="loading-image" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        )
        
	}

    function verificar(event){
        if(event.target.id=='true'){
            setClick(event.target.value); 
            event.target.id='clicked';
            console.log(event.target)
        }
        else if(event.target.id=='clicked'){
            event.target.id='true';
            setClick(event.target.value); 
        }
        else{
            alert('Esse assento não está disponível')
        }
    }

    // {setClick(event.target.value); event.target.id='clicked';}
    
    return (
        <>
        <div className="content">
            <div className="title-section">
                <p>Selecione o(s) assento(s)</p>
            </div>
            <div className="assentos-container">
                <ul>
                {(items.seats).map((item)=> <li type="checkbox" value={item.name} onClick={(event)=> verificar(event) } id={item.isAvailable.toString()}> {item.name}</li>)}
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

const Option = styled.option`
display: flex;
align-items: center;
justify-content: center;
width: 30px;
height: 30px;
list-style-type: none;
margin: 15px 5px;
background-color: blue;
border-radius: 50%;
`;