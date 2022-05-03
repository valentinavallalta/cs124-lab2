import "./SignInPage.css";

function SignInPage() {

    return (<div className={"login"}>
        <div className={"signIn"}>
            <form>
                <label for="email">email:</label>
                <input type="text" id="email" name="email"/><br/>
                <label for="password">password:</label>
                <input type={"text"} id={"password"}/><br/><br/>
                <input type="submit" value="sign in"/>
            </form>
            <h1> Sign in </h1>

            <h1> Sign in with Google </h1>
        </div>
        <div className={"signUp"}>
            <h1> Sign up </h1>
        </div>
    </div>
)
}

export default SignInPage;