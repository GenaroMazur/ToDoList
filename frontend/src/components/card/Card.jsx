import "./Card.css"
import {useRef} from "react"
function Card(props){
    let defaultColor = "#3842ff"
    let color={
            backgroundColor:props.color||defaultColor
        }
    
    return (
        <div className="card">
            <div className="colorCard" style={color}>
                <img src={props.image} alt="" />
            </div>
            <div className="cardBody">
                <div className="cardTittle">
                    <h5>{props.tittle}</h5>
                </div>
                <div className="cardDescription">
                    <p>{props.description}</p>
                </div>
            </div>
            <div className="cardDate">
                <p>{props.date}</p>
            </div>
        </div>
    )
}
export default Card