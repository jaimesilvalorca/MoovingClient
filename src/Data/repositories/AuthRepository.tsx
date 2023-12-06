import {AxiosError} from 'axios'
import { User } from "../../Domain/entities/User";
import { AuthRepository } from "../../Domain/repositories/AuthRepository";
import { ApiMooving, ApiMoovingForImage } from "../sources/remote/api/ApiMooving";
import { ReponseAPIMooving } from "../sources/remote/models/ResponseApiMooving";
import * as ImagePicker from 'expo-image-picker'
import mime from 'mime'

export class AuthRepositoryImpl implements AuthRepository{

    async register(user:User): Promise<ReponseAPIMooving> {

    try {
        
        
            const response = await ApiMooving.post<ReponseAPIMooving>('/users/create',user)
            return Promise.resolve(response.data)
            
        } catch (error) {
            let err = (error as AxiosError)
            console.log('ERROR: ', JSON.stringify(err.response?.data))
            const apiError:ReponseAPIMooving = JSON.parse(JSON.stringify(err.response?.data))
            return Promise.resolve(apiError)
        }
    }

    async registerWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ReponseAPIMooving> {
        try {
            const data = new FormData();

            // @ts-ignore
            data.append('image', {
              uri: file.uri,
              name: file.uri.split('/').pop(),
              type: mime.getType(file.uri),
            });
            
            
            Object.keys(user).forEach((key) => {
            // @ts-ignore
              data.append(key, user[key]);
            });

            const response = await ApiMoovingForImage.post<ReponseAPIMooving>('/users/createwithimage',data)
            console.log(response)
            return Promise.resolve(response.data)

            
        } catch (error) {
            let err = (error as AxiosError)
            console.log('ERROR: ', JSON.stringify(err.response?.data))
            const apiError:ReponseAPIMooving = JSON.parse(JSON.stringify(err.response?.data))
            return Promise.resolve(apiError)
        }
        
    }

    async login(email:string,password:string): Promise<ReponseAPIMooving> {

        try {
            
            
                const response = await ApiMooving.post<ReponseAPIMooving>('/users/login',{
                    email: email,
                    password:password
                })
                return Promise.resolve(response.data)
                
            } catch (error) {
                let err = (error as AxiosError)
                console.log('ERROR: ', JSON.stringify(err.response?.data))
                const apiError:ReponseAPIMooving = JSON.parse(JSON.stringify(err.response?.data))
                return Promise.resolve(apiError)
            }
        }


}