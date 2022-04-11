import './Item.css';

function Item(props) {

    return (<li className={props.class}>
        {/*<span className="firstHalf">*/}
            <button className="checkButton"
                    onClick={() => props.onItemCompleted(props.id)}/>
            <input
                type="text"
                className="textBox"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => props.onContentChange(props.id, e.target.value)}
                defaultValue={props.content}
                placeholder="add an item here"
            />
        {/*</span>*/}
        <span className="itemSpan">
        <button className={"priorityButton priority" + props.priority.toString()}
                onClick={() => props.onPriorityChange(props.id)}>{props.priority < 2 ? "!" : "!!"}</button>
        <button className={"deleteItemButton"} onClick={() => props.onDeleteItem(props.id)}>+</button>
        </span>
    </li>);
}

export default Item;