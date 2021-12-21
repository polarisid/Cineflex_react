import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
export default function BackButton(){
    const navigate = useNavigate();
    const {state,setState}=useState(null);
    const {id} = useParams();
    return (
        <>
        {console.log(navigate)}
        <div onClick={()=> navigate(-1)} className='back-button'>
        <ion-icon name="arrow-back-outline"></ion-icon>
        </div>
        </>
    )
}