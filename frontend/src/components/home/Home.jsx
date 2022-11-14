import "./Home.css"
import spaceShip from "./../../designs/spaceShip.png"
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
                <h3>presented</h3>
                <p>in simple check-able cards with description for a nice and friendly interface</p>
            </div>
            <div className="cards">
                <div className="card"></div>
                <div className="card"></div>
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