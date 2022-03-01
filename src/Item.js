import './Item.css';

function Item(props) {
    return <li class="uncompleted"> {props.content} </li>;
}

export default Item;