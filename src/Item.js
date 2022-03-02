import './Item.css';
import {useState} from "react";

function Item(props) {
    const [completed, setCompleted] = useState(false);

    /* props taken in: content (what the list item says)
    *                  class (what class it is, i.e. uncompleted / completed / empty */
    return (<li className= {completed ? "completed": "uncompleted"}>
        <button onClick={() => setCompleted(!completed)}></button>
        {props.content} </li>);
}

export default Item;