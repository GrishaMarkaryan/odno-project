import { auth, provider } from "../../config/firebase";
import { signInWithPopup } from "firebase/auth"; // это один из методов чтобы зарегаться (их много, на вкус и цвет)

import { useNavigate } from "react-router-dom";
import './login.css';

export const Login = () => {
    const navigate = useNavigate();

    const signInwithGoogle = async () => {    // эта функция сработает, когда мы нажмем на кнопку "зарегистрироваться"
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/');
    }

    return (
        <div className="login-container">
            <p>Sign in to see all the posts </p>
            <button onClick={signInwithGoogle}>Sign in with Google</button>
        </div>
    );
}       