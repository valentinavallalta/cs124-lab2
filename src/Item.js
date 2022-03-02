import './Item.css';

function Item(props) {
    /* props taken in: content (what the list item says)
    *                  class (what class it is, i.e. uncompleted / completed / empty */
    return (<li className="uncompleted"> <button></button>{props.content} </li>);
}

export default Item;