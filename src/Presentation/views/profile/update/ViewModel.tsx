import { useState,useContext } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { SaveUserLocalUseCase } from '../../../../Domain/useCases/userLocal/SaveUserLocal';
import { useUserLocal } from '../../../hooks/useUserLocal';
import { UpdateUserUseCase } from '../../../../Domain/useCases/user/UpdateUser';
import { UpdateWithImageUserUseCase } from '../../../../Domain/useCases/user/UpdateWithImageUser';
import { User } from '../../../../Domain/entities/User';
import { ReponseAPIMooving } from '../../../../Data/sources/remote/models/ResponseApiMooving';
import { UserContext } from '../../../context/UserContext';

const ProfileUpdateViewModel = (user:User) => {


    const [erroMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [values, setValues] = useState(user)
    const [loading,setLoading] = useState(false)
    const [file,setFile] = useState<ImagePicker.ImagePickerAsset>()
    const {getUserSession} = useUserLocal()
    const {saveUserSession} = useContext(UserContext)
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

    const onChangeInfoUpdate = (name:string, lastname:string, phone:string) => {
        setValues({ ...values, name:name,lastname:lastname,phone:phone})
    }

    const update = async () => {
        try {
          let response = {} as ReponseAPIMooving;
      
          if (isValidForm()) {
            setLoading(true);
      
            console.log(response);

      
            if (values.image?.includes('https://')) {
              response = await UpdateUserUseCase(values);

            } else {
              response = await UpdateWithImageUserUseCase(values, file!);
            }
      
            setLoading(false);
            console.log('RESULT: ' + JSON.stringify(response) + 'aqui esta la otra');
      
            if (response.success) {
              saveUserSession(response.data)
              setSuccessMessage(response.message)
            } else {
              setErrorMessage(response.message);
            }
          }
        } catch (error) {
          console.error('Error in update:', error);
        }
      };
      

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

        return true
    }

    return {
        ...values,
        onChange,
        update,
        pickImage,
        takePhoto,
        onChangeInfoUpdate,
        successMessage,
        erroMessage,
        loading,
        user,
        
    }
}

export default ProfileUpdateViewModel
