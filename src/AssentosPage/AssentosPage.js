import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import './style.css'
import Rodape from '../components/Rodape'
import { useState,useEffect } from 'react';
import axios from 'axios';
let assentosSelecionados =[]
let assentosSelecionadosID =[]
export default function AssentosPage(){
    const APISEND = "https://mock-api.driven.com.br/api/v4/cineflex/seats/book-many"
    const {idSessao} = useParams();
    const API = "https://mock-api.driven.com.br/api/v4/cineflex/showtimes/"+idSessao+"/seats"
    const [items, setItems] = useState(null);
    const click=useState(null);
    const setClick =click[1]
    const [cpf,setCpf] = useState('');
    const [nome,setNome] = useState('');
    useEffect(() => {
        const requisicao = axios.get(API);
        requisicao.then(resposta => {setItems(resposta.data);});
    }, []);
    
    if(items === null) {
		return ( <div className="voider"><img className="loading-image" src="https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif" /></div>
        )
        
	}

    function verificar(event){
        if(event.target.id==='true'){
            assentosSelecionados
            .unshift(parseInt(event.target.innerText))
            assentosSelecionadosID.unshift(event.target.value)
            event.target.id='clicked';
            setClick(event.target.value);
        }
        else if(event.target.id==='clicked'){
            event.target.id='true';
            assentosSelecionados.splice(assentosSelecionados.indexOf(parseInt(event.target.innerText)), 1);
            assentosSelecionadosID.splice(assentosSelecionadosID.indexOf(event.target.value), 1);
            setClick(event.target.value[0]); 
        }
        else{
            alert('Esse assento não está disponível')
        }
    }

    function EnviarDados(){
        if(nome===''|| cpf===""){
            alert("Por favor insira Cpf ou Nome válido")
        }
        else{
            let dados ={
                ids: assentosSelecionadosID,
                name: nome,
                cpf:cpf
            }
            const request = axios.post(APISEND,dados);
            request.catch();
            request.then();

        }
    }
    
    return (
        <>
        <div className="content">
            <div className="title-section">
                <p>Selecione o(s) assento(s)</p>
            </div>
            <div className="assentos-container">
                <ul>
                {(items.seats).map((item,index)=> <li key ={index} value={[item.id]} onClick={(event)=> verificar(event)} id={item.isAvailable.toString()}>{item.name}</li>)}
                </ul>
            </div>
            <div className="legenda">
                <div><div className="selecionado"></div> Selecionado</div>
                <div><div className="disponivel"></div> Disponível</div>
                <div><div className="indisponivel"></div> Indisponivel</div>
            </div>
            <div className="form-container">
                <div>Nome do comprador:</div>
                <input onChange={(e)=>{setNome(e.target.value)}} value={nome} placeholder="Digite seu nome..."/>
                <div>CPF do comprador:</div>
                <input onChange={(e)=>{setCpf(e.target.value)}} value={cpf} placeholder="Digite seu CPF..."/>
            </div>

            <Link state={{ filme: items.movie.title, ingressos: assentosSelecionados, nome: nome, cpf: cpf, data:items.day.date,hora:items.name}} to ='/sucesso'><button onClick={()=>EnviarDados()}>Reservar assento(s)</button></Link>
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