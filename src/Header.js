import './Header.css';
import Menu from "./Menu"
import {useState} from "react";

function Header(props) {
    const [content, setContent] = useState("To Do Items");

    return (
        <div id="Header">
            <h1>
                <input
                    className="titleTextbox"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    value={content}/></h1>
            {/*> To Do List </input>*/}
            <Menu
                toggleCompletedDisplay={props.toggleCompletedDisplay}
                completedDisplay={props.completedDisplay}
                onDeleteCompleted={props.onDeleteCompleted}
                onSortByPriority={props.onSortByPriority}
                sortAscending={props.sortAscending}
                onAscendingChange={props.onAscendingChange}
            />
        </div>);
}

export default Header;