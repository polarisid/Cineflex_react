import './assets/reset.css'
import './assets/style.css'
import TopBar from './components/TopBar';
import HomePage from './HomePage/HomePage';
import SessaoPage from './SessoesPage/SessoesPage';
import AssentosPage from './AssentosPage/AssentosPage';
import SucessoPage from './SucessoPage/SucessoPage';
import BackButton from './components/BackButton';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from 'react';
export default function App(){
     const {state,setState}=useState(null)
     
   
    return(
        
        <BrowserRouter>
         
            <TopBar/>
            {<BackButton/>}
            <Routes>
               

                <Route path="/" element={<HomePage />}/>
                <Route path="/sessoes/:idFilme" element={<SessaoPage />}/>
                <Route path="/assentos/:idSessao" element={<AssentosPage />}/>
                <Route path="/sucesso" element={<SucessoPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}


