import "./SharePopUp.css"

function SharePopUp(props) {
    return (
        <div className="sharePopupBG">
            <ul className="sharePopup">
                <h3> Share list {props.title} </h3>
                {/*{props.canView.filter(p => p != props.userEmail).map(p =>*/}
                {props.canView.map(p =>
                    <li>
                        <p>{p}</p>
                        <span><button>can view</button>
                        <button>can edit</button></span>
                    </li>
                )}
                <input type={"text"}
                placeholder={"Add an email"}/>
                <button> add as viewer </button>
                <button> add as editor </button>
                <button onClick={() => props.toggleSharePopup}> Done</button>
            </ul>
        </div>
    )
}

export default SharePopUp;