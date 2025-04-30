import { Persona } from "../models/Persona";
import apiClient from "./interceptor";

export class PersonaService {
    getPersonaList() {
        return new Promise<Persona[]>((resolve, reject) => {
            apiClient.get('/persona/')
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
    getPersonaById(id: string) {
        return new Promise<Persona>((resolve, reject) => {
            apiClient.get('/persona/' + id + "/")
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    insertPersona(persona: Persona) {
        return new Promise<Persona>((resolve, reject) => {
            apiClient.post('/persona/', persona)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
    updatePersona(id: string, personaData: FormData) {
        return new Promise<Persona>((resolve, reject) => {
            apiClient.put('/persona/' + id + "/", personaData)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
    deletePersona(id: string) {
        return new Promise<Persona>((resolve, reject) => {
            apiClient.delete('/persona/' + id + "/")
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

}