import "./UserListsHeader.css"
import {signOut, sendEmailVerification} from "firebase/auth";
import {useState} from "react";


function UserListsHeader(props) {

    const [emailVerifySent, setEmailVerifySent] = useState(false);

    function verifyEmail() {
        sendEmailVerification(props.user);
        setEmailVerifySent(true);
    }
    return (


        <div className={"ListHeader"}>
            <h3 className= "Title" aria-label="Lists"> Lists </h3>
            <p className={"currently"}>{props.email}&nbsp;</p>
            <button className="SignOutButton" onClick={() => signOut(props.auth)}> sign out</button>
            {!props.emailVerified && <button className="VerifyEmailButton" type="button" onClick={verifyEmail}>verify email</button>}
            {emailVerifySent && <div className={"VerificationPopUpBG"}>
                <p className = "VerificationPopUp"> email verification sent to {props.email}<br/>
                <button className= "VerificationPopUpButton" onClick={() => setEmailVerifySent(false)}> OK </button></p></div>}
         </div>);
}

export default UserListsHeader;
