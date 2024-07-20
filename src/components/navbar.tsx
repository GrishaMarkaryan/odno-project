import { Link } from "react-router-dom";
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from "firebase/auth";
import './navbar.css'

export const Navbar = () => {
    const [user] = useAuthState(auth);

    const logOut = async () => {
        await signOut(auth)
    }

    return (
        <div className="navbar">
            <div className="links">
                <Link to='/' className="dd"> Home </Link>
                {
                !user? <Link to='/login'> Login </Link>  // т.е. если user не зареган, то вернет Login, в противном случае вернет Create Post
                : <Link to='/createpost'> Create post </Link>
                }
            </div>
            
            {user? 
            
            <div className="user">
                <p> {user?.displayName} </p>
                <img src={user?.photoURL || ''} width='100' height='100' alt='nkar chka'/>
                <button onClick={logOut}> Log out </button>
            </div> 
            : <div className="x"> Please sign in </div>
            }
        </div>
    )
}
