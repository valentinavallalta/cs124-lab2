import './List.css';
import Item from "./Item"

function List(props) {

    return (
        <div id="List">
            <ul>
                {props.items.length === 0 && <small>No Items</small>}
                {props.items.map(p =>
                    <Item onItemCompleted={props.onItemCompleted}
                          class={p.completed === true? "completed" : "uncompleted"}
                          id={p.id}
                          priority={p.priority}
                          content={p.content}
                          onContentChange={props.onContentChange}
                          key={p.id}
                          onDeleteItem={props.onDeleteItem}
                          onPriorityChange={props.onPriorityChange}
                    />
                )}

                <li onClick={() => props.onAddItem("")}
                    className="empty">
                    <button>+</button>
                </li>
            </ul>
        </div>)
}

export default List;