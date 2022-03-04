import './Menu.css';
import {useState} from "react";
import AlertPage from "./AlertPage";

function Menu(props) {

    const [menuDisplay, setMenuDisplay] = useState(false);

    function toggleMenuDisplay() {
        setMenuDisplay(!menuDisplay)
    }

    function hideCompleted() {
        props.toggleCompletedDisplay(false)
        toggleMenuDisplay()
    }

    function showCompleted() {
        props.toggleCompletedDisplay(true)
        toggleMenuDisplay()
    }

    const [showAlert, setShowAlert] = useState(false);

    function handleShowAlert(bool) {
        setShowAlert(bool)
    }

    return (
        <div className="menu">
            <button type="button" onClick={() => toggleMenuDisplay()}>···</button>
            {menuDisplay &&
                <div className="options">
                    {props.completedDisplay ?
                        <p id="hideButton" onClick={() => hideCompleted()}> hide completed items</p> :
                        <p id="showButton" onClick={() => showCompleted()}> show completed items</p>}
                    <p id="deleteButton" onClick={() => setShowAlert(true)}> delete completed items</p>
                    {showAlert &&
                        <AlertPage onDeleteCompleted={props.onDeleteCompleted}
                                   showAlert={showAlert}
                                   onShowAlert={setShowAlert}
                                   onToggleMenu = {toggleMenuDisplay}
                        />}
                </div>
            }
        </div>);
}

export default Menu;