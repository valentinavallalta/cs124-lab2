import './List.css';
import Item from "./Item"

function List(props) {

    if (props.items.length === 0) {
        return (
            <div id={"List"}>
                <ul>
                    <Item onItemCompleted={props.onItemCompleted}
                          class="empty"
                          id={1}
                          content={""}
                          onContentChange={props.onContentChange}
                          placeholder = "add an item here"
                          key={1} />
                </ul>
            </div>
        )
    }
    else {
        return (
            <div id="List">
                <ul>
                    {props.items.map(p =>
                        <Item onItemCompleted={props.onItemCompleted}
                              class={props.completedItems.includes(p.id) ? "completed" : "uncompleted"}
                              id={p.id}
                              content={p.content}
                              onContentChange={props.onContentChange}
                              key={p.id}/>
                    )}
                    {/*<li onClick={() => props.onAddItem("wormsss")}
                        className="empty">
                        <button></button>
                        <li className = "emptyTextBox"
                            placeholder={props.items.length === 0 ? "add new item here" : <div></div>}></li>
                    </li>*/}
                    {!(props.default === props.items) &&
                    <li onClick={() => props.onAddItem("")}
                        className="empty">
                        <button>+</button>
                        {props.items.length === 0 ? "add new item here" : <div></div>}
                    </li>}
                </ul>
            </div>)
    }
}

export default List;