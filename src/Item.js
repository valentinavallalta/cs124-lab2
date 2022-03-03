import './Item.css';
import {useState} from "react";

function Item(props) {
    /* props taken in: content (what the list item says)
    *                  class (what class it is, i.e. uncompleted / completed / empty */
    return (<li className= {props.class}>
        <button onClick={() => props.onItemCompleted(props.id)}></button>
        <input
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => props.onContentChange(props.id, e.target.value)}
            value={props.content}/>
    </li>);
}

export default Item;