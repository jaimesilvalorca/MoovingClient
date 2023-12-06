import React, { useContext, useState } from 'react'
import { LoginAuthUseCase } from '../../../Domain/useCases/auth/LoginAuth'
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal'
import { useUserLocal } from '../../hooks/useUserLocal'
import { Linking } from 'react-native'
import { UserContext } from '../../context/UserContext'


const HomeViewModel = () => {

    // const { driver, getDriverSession } = useDriverLocal();
    const {user,saveUserSession,getUserSession} = useContext(UserContext)
    

    const [values, setValues] = useState({
        email: '',
        password: '',
    })

    const [errorMessage, setErrorMessage] = useState('')

    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const login = async () => {
        if (isValidForm()) {
            const response = await LoginAuthUseCase(values.email, values.password)
            console.log(JSON.stringify(response))
            if (!response.success) {
                setErrorMessage(response.message)
            } else {
                saveUserSession(response.data)
            }
        }
    }

    const isValidForm = () => {
        if (values.email === '') {
            setErrorMessage('Campo correo electronico vacio')
        }
        if (values.password === '') {
            setErrorMessage('Campo password vacio')
        }
        return true;
    }

    const forggotPassword = () => {
        Linking.openURL('http://45.7.231.169:3000/reset-password').catch((err) => console.error('Error al abrir el enlace', err));
    }

    return {
        ...values,
        user,
        onChange,
        errorMessage,
        login,
        forggotPassword
    }
}

export default HomeViewModel