import { useState } from 'react'
// import { ApiMooving } from '../../../Data/sources/remote/api/ApiMooving'
// import { RegisterAuthUseCase } from '../../../Domain/useCases/auth/RegisterAuth';
import * as ImagePicker from 'expo-image-picker'
import { RegisterWithImageAuthUseCase } from '../../../Domain/useCases/auth/RegisterWithImageAuth';
import { SaveUserLocalUseCase } from '../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../hooks/useUserLocal';

const RegisterViewModel = () => {

    const[erroMessage, setErrorMessage] = useState('')

    const [values, setValues] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        image: '',
        role: '',
        car: '',
        password: '',
        confirmPassword: '',

    })

    const [loading,setLoading] = useState(false)

    const [file,setFile] = useState<ImagePicker.ImagePickerAsset>()

    const {user,getUserSession} =  useUserLocal();


    const pickImage = async () =>{
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            quality:1
        })

        if(!result.canceled){
            onChange('image',result.assets[0].uri)
            setFile(result.assets[0])
        }
    }

    const takePhoto = async () =>{
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            quality:1
        })

        if(!result.canceled){
            onChange('image',result.assets[0].uri)
            setFile(result.assets[0])
        }
    }


    const onChange = (property: string, value: any) => {
        setValues({ ...values, [property]: value })
    }

    const register = async ()=>{
            if(isValidForm()){
                setLoading(true)
                // const response = await  RegisterAuthUseCase(values)
                const response = await RegisterWithImageAuthUseCase(values,file!)
                setLoading(false)
                if(response.success){
                    await SaveUserLocalUseCase(response.data)
                    getUserSession()
                    console.log('Result: ' + JSON.stringify(response))
                }else{
                    setErrorMessage(response.message)
                }
                
            }
    }

    const isValidForm = () =>{
        if(values.name === ''){
            setErrorMessage('Ingresa tu nombre')
            return false;
        }
        if(values.lastname === ''){
            setErrorMessage('Ingresa tu apellido')
            return false;
        }
        if(values.phone === ''){
            setErrorMessage('Ingresa tu telefono')
            return false;
        }
        if(values.email === ''){
            setErrorMessage('Ingresa tu email')
            return false;
        }
        if(values.password === ''){
            setErrorMessage('Ingresa la contraseña')
            return false;
        }
        if(values.confirmPassword === ''){
            setErrorMessage('Ingresa la confirmacion del password')
            return false;
        }

        if(values.password !== values.confirmPassword){
            setErrorMessage('las contraseñas son distintas')
            return false;
        }

        if(values.image === ''){
            setErrorMessage('Selecciona una imagen')
            return false
        }

        return true
    }

    return {
        ...values,
        onChange,
        register,
        erroMessage,
        pickImage,
        takePhoto,
        user,
        loading
    }
}

export default RegisterViewModel
