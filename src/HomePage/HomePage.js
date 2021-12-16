import './style.css'
export default function HomePage(){
    return(
        <>
            <div className="content">
                <div className="title-section">
                    <p>Selecione o filme</p>
                </div>

                <div className="films-container">
                    <Film/>
                    <Film/>
                    <Film/>
                    <Film/>
                    <Film/>
                    <Film/>
                    <Film/>
                    <Film/>
                </div>
            </div>
        </>
    )
}

function Film(){
    return (
        <>
            <div className="film">
                <img src="https://img.estadao.com.br/fotos/politica/eleicoes-2020/MA/FMA100000850735_div.jpg"/>
            </div>
        </>
    )
}