
import React,{createContext,useEffect,useState} from 'react'
import { User } from "../../Domain/entities/User";
import { SaveUserLocalUseCase } from '../../Domain/useCases/userLocal/SaveUserLocal';
import { getUserLocalUseCase } from '../../Domain/useCases/userLocal/GetUserLocal';
import { RemoveUserLocalUseCase } from '../../Domain/useCases/userLocal/RemoveUserLocal';

export const userInitialState: User = {

    id: '',
    name: '',
    lastname: '',
    phone: '',
    email: '',
    image: '',
    role: '',
    password: '',
    confirmPassword: '',
}

export interface UserContextProps{
    user:User,
    saveUserSession:(user:User)=>Promise<void>
    getUserSession:()=>Promise<void>
    removeUserSession:()=>Promise<void>
}

export const UserContext = createContext ({} as UserContextProps)

export const UserProvider = ({children}:any) =>{

    const [user, setUser] = useState(userInitialState)

    useEffect(() => {
        getUserSession()
      
      }, [])

    const saveUserSession = async(user:User)=>{
        await SaveUserLocalUseCase(user);
        setUser(user)
    }

    const getUserSession = async () =>{
        const user = await getUserLocalUseCase()
        setUser(user)
    }

    const removeUserSession = async()=>{
        await RemoveUserLocalUseCase();
        setUser(userInitialState)
    }

    return(
        <UserContext.Provider value={{
            user,
            saveUserSession,
            getUserSession,
            removeUserSession
        }}>
        {children}
        </UserContext.Provider>
    )
}