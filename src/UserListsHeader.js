import "./UserListsHeader.css"

function UserListsHeader(props) {

    return (


        <div className={"ListHeader"}>
            <h3 className= "Title" aria-label="Lists"> Lists </h3>
            <p className={"currently"}>{props.email} &nbsp;</p>
            <button className="SignOutButton" onClick={() => signOut(props.auth)}> sign out</button>
        </div>);
}

export default UserListsHeader;
