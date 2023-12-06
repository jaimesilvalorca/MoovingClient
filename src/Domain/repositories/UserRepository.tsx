import * as ImagePicker from 'expo-image-picker'
import { ReponseAPIMooving } from "../../Data/sources/remote/models/ResponseApiMooving";
import { User } from "../entities/User";

export interface UserRepository{

    update(user:User):Promise<ReponseAPIMooving>
    updateWithImage(user:User,file:ImagePicker.ImagePickerAsset):Promise<ReponseAPIMooving>

}