import "./SharePopUp.css"
import {doc, setDoc} from "firebase/firestore";
import {useState} from "react";

function SharePopUp(props) {
    const [addEmail, setAddEmail] = useState("")

    function addViewer(email) {
        if (!props.canView.includes(email)) {
            setDoc(doc(props.collectionRef, props.listId), {
                canView: [...props.canView, email]
            }, {merge: true})
        }
    }

    function addEditor(email) {
        if (!props.canView.includes(email)) {
            setDoc(doc(props.collectionRef, props.listId), {
                canView: [...props.canView, email],
                canEdit: [...props.canEdit, email]
            }, {merge: true})
        } else if (!props.canEdit.includes(email)) {
            setDoc(doc(props.collectionRef, props.listId), {
                canEdit: [...props.canEdit, email]
            }, {merge: true})
        }
    }

    function deleteViewer(email) {
        setDoc(doc(props.collectionRef, props.listId), {
            canView: props.canView.filter(p => p != email),
            canEdit: props.canEdit.filter(p => p != email)
        }, {merge: true})
    }

    function toggleToViewer(email) {
        setDoc(doc(props.collectionRef, props.listId), {
            canEdit: props.canEdit.filter(p => p != email)
        }, {merge: true})
    }

    return (
        <div className="sharePopupBG">
            <ul className="sharePopup">
                <h3> Share Settings for: {props.title} </h3>
                {props.canView.filter(p => p !== props.userEmail).map(p =>
                    <li className={"SharedWithDisplay"}>
                        <p className={"email"}>{p}</p>
                        <span>
                            <button onClick={() => toggleToViewer(p)}
                                className={props.canEdit.includes(p)? "noHighlight canViewButton" : "highlight canViewButton"}>can view</button>
                        <button onClick={() => addEditor(p)}
                                className={props.canEdit.includes(p)? "highlight canEditButton" : "noHighlight canEditButton"}>can edit</button>
                        </span>
                        <button className={"deleteViewer"} onClick={() => deleteViewer(p)}> X</button>
                    </li>
                )}
                <input type={"text"} id='email' value={addEmail}
                       onChange={e => setAddEmail(e.target.value)}
                       placeholder={"Add an email"}/>
                <button onClick={() => addViewer(addEmail)}> add as viewer</button>
                <button onClick={() => addEditor(addEmail)}> add as editor</button>
                <button onClick={() => props.toggleSharePopup(props.listId)}> Done</button>
            </ul>
        </div>
    )
}

export default SharePopUp;