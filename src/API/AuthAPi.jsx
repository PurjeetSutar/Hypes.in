import { signInWithEmailAndPassword, getAuth } from "firebase/auth";


let auth = getAuth()

export const LoginApi = (email, password) =>{


    try{
        signInWithEmailAndPassword(auth, email, password)
    }
    catch (err) {
            console.error("Login error: ", err);
         }
    
}