import "./SignInPage.css";
import {
    getAuth,
    sendEmailVerification,
    signOut } from "firebase/auth";
import {
    useAuthState,
    useCreateUserWithEmailAndPassword,
    useSignInWithEmailAndPassword,
    useSignInWithGoogle
} from 'react-firebase-hooks/auth';
import {useState} from "react";

function SignInPage(props) {


    // const [
    //     signInWithEmailAndPassword,
    //     user1, loading1, error1
    // ] = useSignInWithEmailAndPassword(props.auth);
    // const [
    //     signInWithGoogle,
    //     user2, loading2, error2
    // ] = useSignInWithGoogle(props.auth);
    // const [
    //     createUserWithEmailAndPassword,
    //     userCredential, signUploading, signUperror
    // ] = useCreateUserWithEmailAndPassword(props.auth);
    // const [email, setEmail] = useState("");
    // const [pw, setPw] = useState("");



    return (<div className={"login"}>
            <div className={"signIn"}>
                {/*<h1> Sign In </h1>*/}
                {/*{error1 && <p>"Error logging in: " {error1.message}</p>}*/}
                {/*{error2 && <p>"Error logging in: " {error2.message}</p>}*/}
                {/*<label htmlFor='email'>email: </label>*/}
                {/*<br/>*/}
                {/*<input type="text" id='email' value={email}*/}
                {/*       onChange={e=>setEmail(e.target.value)}/>*/}
                {/*<br/>*/}
                {/*<label htmlFor='pw'>password: </label>*/}
                {/*<br/>*/}
                {/*<input type="text" id='pw' value={pw}*/}
                {/*       onChange={e=>setPw(e.target.value)}/>*/}
                {/*<br/>*/}
                {/*<button onClick={() =>signInWithEmailAndPassword(email, pw)}>*/}
                {/*    Sign in*/}
                {/*</button>*/}

                {/*<hr/>*/}
                {/*<button onClick={() => signInWithGoogle()}>*/}
                {/*    Sign in with Google*/}
                {/*</button>*/}
                <SignIn auth={props.auth}/>
            </div>

            <div className={"signUp"}>
                {/*<h1> Sign up </h1>*/}
                {/*{signUperror && <p>"Error signing up: " {signUperror.message}</p>}*/}
                {/*<label htmlFor='email'>email: </label>*/}
                {/*<br/>*/}
                {/*<input type="text" id='email' value={email}*/}
                {/*       onChange={e=>setEmail(e.target.value)}/>*/}
                {/*<br/>*/}
                {/*<label htmlFor='pw'>password: </label>*/}
                {/*<br/>*/}
                {/*<input type="text" id='pw' value={pw}*/}
                {/*       onChange={e=>setPw(e.target.value)}/>*/}
                {/*<br/>*/}
                {/*<button onClick={() =>*/}
                {/*    createUserWithEmailAndPassword(email, pw)}>*/}
                {/*    Sign Up*/}
                {/*</button>*/}
                <SignUp auth={props.auth}/>
            </div>
        </div>
    )
}

function SignIn(props) {
    const [
        signInWithEmailAndPassword,
        user1, loading1, error1
    ] = useSignInWithEmailAndPassword(props.auth);
    const [
        signInWithGoogle,
        user2, loading2, error2
    ] = useSignInWithGoogle(props.auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (user1 || user2) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading1 || loading2) {
        return <p>Logging in…</p>
    }
    return <div>
        {error1 && <p>"Error logging in: " {error1.message}</p>}
        {error2 && <p>"Error logging in: " {error2.message}</p>}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button onClick={() =>signInWithEmailAndPassword(email, pw)}>
            Sign in with email/pw
        </button>

        <hr/>
        <button onClick={() => signInWithGoogle()}>
            Sign in with Google
        </button>
    </div>
}

function SignUp(props) {
    const [
        createUserWithEmailAndPassword,
        userCredential, loading, error
    ] = useCreateUserWithEmailAndPassword(props.auth);
    const [email, setEmail] = useState("");
    const [pw, setPw] = useState("");

    if (userCredential) {
        // Shouldn't happen because App should see that
        // we are signed in.
        return <div>Unexpectedly signed in already</div>
    } else if (loading) {
        return <p>Signing up…</p>
    }
    return <div>
        {error && <p>"Error signing up: " {error.message}</p>}
        <label htmlFor='email'>email: </label>
        <input type="text" id='email' value={email}
               onChange={e=>setEmail(e.target.value)}/>
        <br/>
        <label htmlFor='pw'>pw: </label>
        <input type="text" id='pw' value={pw}
               onChange={e=>setPw(e.target.value)}/>
        <br/>
        <button onClick={() =>
            createUserWithEmailAndPassword(email, pw)}>
            Create test user
        </button>

    </div>
}

export default SignInPage;