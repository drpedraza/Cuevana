import { Reparto } from "../models/Reparto";
import apiClient from "./interceptor";

export class RepartoService {
    getRepartoList() {
        return new Promise<Reparto[]>((resolve, reject) => {
            apiClient.get('/reparto/')
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    getRepartoById(id: string) {
        return new Promise<Reparto>((resolve, reject) => {
            apiClient.get('/reparto/' + id + "/")
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    /*getRepartoByPelicula(peliculaId: string) {
        return new Promise<Reparto[]>((resolve, reject) => {
            apiClient.get(`/reparto/${peliculaId}/pelicula/`)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }*/

    insertReparto(reparto: Reparto) {
        return new Promise<Reparto>((resolve, reject) => {
            apiClient.post('/reparto/', reparto)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    updateReparto(id: string, repartoData: Reparto) {
        return new Promise<Reparto>((resolve, reject) => {
            apiClient.put('/reparto/' + id + "/", repartoData)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

    deleteReparto(id: string) {
        return new Promise<Reparto>((resolve, reject) => {
            apiClient.delete('/reparto/' + id + "/")
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
}
