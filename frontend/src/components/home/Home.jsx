import "./Home.css"
import spaceShip from "./../../designs/spaceShip.png"
import Card from "./../card/Card"
function Home(){
    return (
    <div className="backHome">
    <div className="home">

        <div className="section spaceShip">
            <div className="spaceShipDiv">
                <img src={spaceShip} alt="spaceShip logo" className="spaceShipLogo"/>
            </div>
            <div className="spaceShipText">
                <h3>Productive</h3>
                <h3>Simple</h3>
                <h3>Fast</h3>
            </div>
            <button className="spaceStart">Start</button>
        </div>
        <div className="section cards">
            <div className="cardsText">
                <h3>Presented</h3>
                <p>in simple check-able cards with description for a nice and friendly interface</p>
            </div>
            <div className="cards">
                <Card color="Red" tittle="ir al dentista" description="tengo que ir o sino se me pudre" date="2022-03-01"/>
                <Card/>
            </div>
        </div>
        <div className="section workTable">
            <div className="workTableDivisions">
            <div className="divisonWorkTable">

            </div>
            <div className="divisonWorkTable">

            </div>
            <div className="divisonWorkTable">

            </div>
            </div>
            <div className="worckTableText">
                <h3>Organizated</h3>
                <p>in a task <strong>board</strong>, separated by stask status </p>
            </div>
        </div>
    </div>
    </div>)
}

export default Home