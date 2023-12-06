import { ReponseAPIMooving } from "../../Data/sources/remote/models/ResponseApiMooving";
import { User } from "../entities/User";
import * as ImagePicker from 'expo-image-picker'


export interface AuthRepository{

    register(user:User): Promise<ReponseAPIMooving>
    login(email:string,password:string):Promise<ReponseAPIMooving>
    registerWithImage(user:User,file:ImagePicker.ImagePickerAsset):Promise<ReponseAPIMooving>
}