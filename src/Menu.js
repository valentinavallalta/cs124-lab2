import './Menu.css';
import {useState} from "react";
import AlertPage from "./AlertPage";

function Menu(props) {

    const [menuDisplay, setMenuDisplay] = useState(false);
    const [sortDisplay, setSortDisplay] = useState(false);

    function toggleMenuDisplay() {
        setMenuDisplay(!menuDisplay)
        setSortDisplay(false)
        checkNumCompleted()
    }

    function toggleSortDisplay() {
        setSortDisplay(!sortDisplay)
    }

    function hideCompleted() {
        props.toggleCompletedDisplay(false)
        toggleMenuDisplay()
    }

    function showCompleted() {
        props.toggleCompletedDisplay(true)
        toggleMenuDisplay()
    }

    const [showAlert, setShowAlert] = useState(false);

    let numCompletedItems = props.getNumCompletedItems();

    function checkNumCompleted() {
        numCompletedItems = props.getNumCompletedItems();
    }

    function changeSorted(sortType) {
        props.onSortBy(sortType)
        toggleMenuDisplay()
    }

    function changeAscending() {
        props.onAscendingChange()
        toggleMenuDisplay()
    }

    return (
        <div className="menu">
            <button type="button" onClick={() => toggleMenuDisplay()}>···</button>
            {menuDisplay && <div>
                <div className={"menuBackdrop"}
                     onClick={() => toggleMenuDisplay()}/>
                <div className="options">
                    {numCompletedItems !== 0 &&
                        <div>
                            <div>
                                {props.completedDisplay ?
                                    <button id="hideButton" onClick={() => hideCompleted()}> hide completed
                                        items</button> :
                                    <button id="showButton" onClick={() => showCompleted()}> show completed
                                        items</button>}
                            </div>
                            <div>
                                <button id="deleteButton" onClick={() => setShowAlert(true)}> delete completed items
                                </button>
                            </div>
                        </div>}
                    <span>
                    <button id="sortButton" onClick={() => toggleSortDisplay()}> sort by: {props.currSortBy} ⌄ </button>
                    </span>
                    {sortDisplay && <div className="sortOptions">
                        <div>
                            <button id="nameButton" onClick={() => changeSorted("name")}> sort by name</button>
                        </div>
                        <div>
                            <button id="priorityButton" onClick={() => changeSorted("priority")}> sort by priority
                            </button>
                        </div>
                        <div>
                            <button id="timeButton" onClick={() => changeSorted("time created")}> sort by time created
                            </button>
                        </div>
                    </div>
                    }
                    <div>
                        <button id="ascendingButton"
                                onClick={() => changeAscending()}>{(props.sortAscending === 'asc') ? "sort descending" : "sort ascending"}</button>
                    </div>
                    {showAlert &&
                        <AlertPage onDeleteCompleted={props.onDeleteCompleted}
                                   showAlert={showAlert}
                                   onShowAlert={setShowAlert}
                                   onToggleMenu={toggleMenuDisplay}
                        />}
                </div>
            </div>
            }
        </div>
    );
}

export default Menu;