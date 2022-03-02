import './Menu.css';
import {useState} from "react";


function Menu() {

    const [menuDisplay, setMenuDisplay] = useState(false);

    function toggleMenuDisplay() {
        setMenuDisplay(!menuDisplay)

    }

    return (
        <div className="menu">
            <button type="button"  onClick ={() => toggleMenuDisplay()}>···</button>
            {menuDisplay &&
                <div className="options">
                    <p id="hideButton"> hide completed items</p>
                    <p id="showButton"> show completed items</p>
                    <p id="deleteButton"> delete completed items</p>
                </div>}
        </div>);
}

export default Menu;