import { FIRSEBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

type data = {
    name: string,
    phone: string,
    userName: string,
    password: string,
}
const auth = FIRSEBASE_AUTH
export const login = async (email: string, password: string): Promise<void> => {
    try {
        const res = await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)
    }
}

export const register = async (email: string, password: string): Promise<void> => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)

    } catch (error) {
        console.log(error)
    }
}