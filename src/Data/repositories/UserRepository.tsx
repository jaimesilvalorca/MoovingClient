import * as ImagePicker from 'expo-image-picker'
import { User } from "../../Domain/entities/User";
import { UserRepository } from "../../Domain/repositories/UserRepository";
import { ReponseAPIMooving } from "../sources/remote/models/ResponseApiMooving";
import { AxiosError } from "axios";
import { ApiMooving, ApiMoovingForImage } from "../sources/remote/api/ApiMooving";
import mime from "mime";

export class UserRepositoryImpl implements UserRepository {

    async update(user: User): Promise<ReponseAPIMooving> {

        try {
            const response = await ApiMooving.put<ReponseAPIMooving>('/users/updatewithoutimage', user)
            return Promise.resolve(response.data)

        } catch (error) {
            let err = (error as AxiosError)
            console.log('ERROR: ', JSON.stringify(err.response?.data))
            const apiError: ReponseAPIMooving = JSON.parse(JSON.stringify(err.response?.data))
            return Promise.resolve(apiError)
        }



    }

    async updateWithImage(user: User, file: ImagePicker.ImagePickerAsset): Promise<ReponseAPIMooving> {

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
            console.log(data)
            const response = await ApiMoovingForImage.put<ReponseAPIMooving>('/users/updatewithimage',data)
            return Promise.resolve(response.data)

            
        } catch (error) {
            let err = (error as AxiosError)
            console.log(err)
            console.log('ERROR: al responder', JSON.stringify(err.response?.data))
            const apiError:ReponseAPIMooving = JSON.parse(JSON.stringify(err.response?.data))
            return Promise.resolve(apiError)
        }


    }

}