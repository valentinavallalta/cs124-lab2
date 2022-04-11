import './Item.css';

function Item(props) {

    let classNameThing = (props.completed === true? "completed" : "uncompleted")

    return (<li className={classNameThing}>
        {/*<span className="firstHalf">*/}
            <button
                aria-label={(props.completed ? "uncompleted " : "completed ") + (props.content ? props.content : "new item")}
                className="checkButton"
                onClick={() => props.onItemCompleted(props.id)}
            />
            <input
                aria-label={(props.content ? props.content : "new item")}
                type="text"
                className="textBox"
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => props.onContentChange(props.id, e.target.value)}
                defaultValue={props.content}
                placeholder="add an item here"
            />
        {/*</span>*/}
        <span className="itemSpan">
        <button
            aria-label={"priority " + props.priority.toString() + "for " + (props.content ? props.content : "new item")}
            className={"priorityButton priority" + props.priority.toString()}
                onClick={() => props.onPriorityChange(props.id)}>{props.priority < 2 ? "!" : "!!"}</button>
        <button
            aria-label={"delete " + (props.content ? props.content : "new item")}
            className={"deleteItemButton"} onClick={() => props.onDeleteItem(props.id)}>+</button>
        </span>
    </li>);
}

export default Item;