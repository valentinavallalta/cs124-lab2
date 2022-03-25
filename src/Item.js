import './Item.css';

function Item(props) {

    return (<li className={props.class}>
        <button onClick={() => props.onItemCompleted(props.id)}/>
        <input
            type="text"
            className="textBox"
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => props.onContentChange(props.id, e.target.value)}
            defaultValue={props.content}
            placeholder="add an item here"
        />
        <span>
        <button className={"priorityButton priority" + props.priority.toString()}
                onClick={() => props.onPriorityChange(props.id)}>{props.priority < 2? "!" : "!!"}</button>
        </span>
        <button className={"deleteItemButton"} onClick={() => props.onDeleteItem(props.id)}>+</button>
    </li>);
}

export default Item;