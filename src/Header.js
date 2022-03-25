import './Header.css';
import Menu from "./Menu"
import {useState} from "react";

function Header(props) {
    const [content, setContent] = useState("To Do Items");

    function focusPencil(){
        document.getElementById("pencil").focus()
    }

    return (
        <div id="Header">
            <h1>
                <span className={"pencil"} onClick = {()=> focusPencil()}>{"✎ "}</span>
                <input
                    id = "pencil"
                    className="titleTextbox"
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    // value={content[0] ==="✎"? content: "✎ " + content}/>
                    value = {content}/>

            </h1>
            {/*> To Do List </input>*/}
            <Menu
                toggleCompletedDisplay={props.toggleCompletedDisplay}
                completedDisplay={props.completedDisplay}
                onDeleteCompleted={props.onDeleteCompleted}
                onSortBy={props.onSortBy}
                sortAscending={props.sortAscending}
                onAscendingChange={props.onAscendingChange}
                currSortBy = {props.currSortBy}
            />
        </div>);
}

export default Header;