import './Header.css';
import Menu from "./Menu"
import {useState} from "react";

function Header(props) {
    // const [content, setContent] = useState("To Do Items");

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
                    onChange={(e) => props.onChangeTitle(props.listID, e.target.value)}
                    type="text"
                    defaultValue={props.listTitle}/>
            </h1>
            <Menu
                toggleCompletedDisplay={props.toggleCompletedDisplay}
                completedDisplay={props.completedDisplay}
                onDeleteCompleted={props.onDeleteCompleted}
                getNumCompletedItems={props.getNumCompletedItems}
                onSortBy={props.onSortBy}
                sortAscending={props.sortAscending}
                onAscendingChange={props.onAscendingChange}
                currSortBy = {props.currSortBy}
            />
        </div>);
}

export default Header;