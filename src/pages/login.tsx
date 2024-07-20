import { auth, provider } from "../config/firebase";
import { signInWithPopup } from "firebase/auth"; // это один из методов чтобы зарегаться (их много, на вкус и цвет)
import { useNavigate } from "react-router-dom";


export const Login = () => {
    const navigate = useNavigate();

    const signInwithGoogle = async () => {    // эта функция сработает, когда мы нажмем на кнопку "зарегистрироваться"
        const result = await signInWithPopup(auth, provider);
        console.log(result);
        navigate('/')
    }
    return (
        <div> 
            <p> Sign in </p>
            <button onClick={signInwithGoogle}> Sign in with Google </button>
        </div>
    );
}