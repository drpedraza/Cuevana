import axios from "axios";
import { TokenResponse } from "../models/TokenResponse";

export class UserService {
    login(email: string, password: string) {
        return new Promise<TokenResponse>((resolve, reject) => {
            axios.post('http://localhost:8000/api/token/', {
                username: email,
                password: password
            }).then((response) => {
                resolve(response.data);
            }).catch((error) => {
                console.log(error);
                reject(error);
            });
        });
    }
}