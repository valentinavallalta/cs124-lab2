import './AlertPage.css'

function AlertPage(props) {

    function onDelete() {
        if (props.listID === null) {
            props.onDeleteCompleted();
            props.onToggleMenu();
        } else if (props.email === null) {
            props.onDeleteCompleted(props.listID)
        } else {
            props.onDeleteCompleted(props.email)
        }
        props.onShowAlert(false);
    }

    return (
        <div>
            {props.showAlert && <div className={"backdrop"} onClick={() => props.onShowAlert(false)}>
                <div className="modal">
                    {props.message}
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