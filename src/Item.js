import './Item.css';

function Item(props) {

    return (<li className={props.class}>
        <button onClick={() => props.onItemCompleted(props.id)}/>
        <input
            type = "text"
            className = "textBox"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => props.onContentChange(props.id, e.target.value)}
            value={props.content}
            placeholder="add an item here"
        />
        <button className={"priorityButton priority" + props.priority.toString()} onClick={() => props.onPriorityChange(props.id)}>!</button>
        <button className={"deleteItemButton"} onClick={()=> props.onDeleteItem(props.id)}>+</button>
    </li>);
}

export default Item;