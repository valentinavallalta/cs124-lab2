import './AlertPage.css'
import {useState} from "react";

function AlertPage(props) {

    function onDelete() {
        props.onDeleteCompleted();
        props.onShowAlert(false);
        props.onToggleMenu();
    }

    return (
        <div>
            {props.showAlert && <div className={"backdrop"} onClick={() => props.onShowAlert(false)}>
                <div className="modal">
                    Are you sure you want to delete completed items?
                    <div className="alert-buttons">
                        <button className={"alert-button alert-cancel"} type={"button"}
                                onClick={() => props.onShowAlert(false)}>
                            Cancel
                        </button>
                        <button className={"alert-button alert-delete"} type={"button"}
                                onClick={() => onDelete()}>
                            Delete
                        </button>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default AlertPage;