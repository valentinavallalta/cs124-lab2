import './Menu.css';
import {useState} from "react";

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

    return (
        <div className="menu">
            <button type="button"  onClick ={() => toggleMenuDisplay()}>···</button>
            {menuDisplay &&
                <div className="options">
                    {props.completedDisplay ?
                    <p id="hideButton" onClick={() => hideCompleted()}> hide completed items</p> :
                    <p id="showButton" onClick={() => showCompleted()}> show completed items</p>}
                    <p id="deleteButton"> delete completed items</p>
                </div>}
        </div>);
}

export default Menu;