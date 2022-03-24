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

    return (
        <div className="menu">
            <button type="button" onClick={() => toggleMenuDisplay()}>···</button>
            {menuDisplay && <div>
                <div className={"menuBackdrop"}
                     onClick={() => toggleMenuDisplay()}/>
                <div className="options">
                    {props.numCompletedItems !== 0 &&
                    <div>
                    {props.completedDisplay ?
                        <p id="hideButton" onClick={() => hideCompleted()}> hide completed items</p> :
                        <p id="showButton" onClick={() => showCompleted()}> show completed items</p>}
                    <p id="deleteButton" onClick={() => setShowAlert(true)}> delete completed items</p>
                    </div>}

                    <p id="nameButton" onClick={() => props.onSortBy("name")}> sort by name </p>
                    <p id="priorityButton" onClick={() => props.onSortBy("priority")}> sort by priority </p>
                    <p id="timeButton" onClick={() => props.onSortBy("timeCreated")}> sort by time created </p>

                    <p id="ascendingButton" onClick={() => props.onAscendingChange()}>{(props.sortAscending === 'asc') ? "sort descending" : "sort ascending"}</p>
                    {showAlert &&
                        <AlertPage onDeleteCompleted={props.onDeleteCompleted}
                                   showAlert={showAlert}
                                   onShowAlert={setShowAlert}
                                   onToggleMenu={toggleMenuDisplay}
                        />}
                </div>
            </div>
            }
        </div>);
}

export default Menu;