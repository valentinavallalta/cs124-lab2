import './Menu.css';

function Menu() {
    return <div className="menu">
        <button type="button">···</button>
        <div className="options">
            <p id="hideButton"> hide completed items</p>
            <p id="showButton"> show completed items</p>
            <p id="deleteButton"> delete completed items</p>
        </div>
    </div>;
}

export default Menu;