import { UserLocalRepositoryImpl } from "../../../Data/repositories/UserLocalRepository";

const {getUser} = new UserLocalRepositoryImpl()

export const getUserLocalUseCase = async () =>{

    return await getUser();

}