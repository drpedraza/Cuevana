import { Pelicula } from "../models/Pelicula";
import apiClient from "./interceptor";

export class PeliculaService {
    getPeliculaList(search?: string) {
        return new Promise<Pelicula[]>((resolve, reject) => {
            const url = search ? `/pelicula/?search=${encodeURIComponent(search)}` : '/pelicula/';
            apiClient.get(url)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
    getPeliculaById(id: string) {
        return new Promise<Pelicula>((resolve, reject) => {
            apiClient.get('/pelicula/' + id + "/")
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
    insertPelicula(pelicula: Pelicula) {
        return new Promise<Pelicula>((resolve, reject) => {
            apiClient.post('/pelicula/', pelicula)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
    updatePelicula(id: string, peliculaData: FormData) {
        return new Promise<Pelicula>((resolve, reject) => {
            apiClient.put('/pelicula/' + id + "/", peliculaData)
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }
    deletePelicula(id: string) {
        return new Promise<Pelicula>((resolve, reject) => {
            apiClient.delete('/pelicula/' + id + "/")
                .then((response) => {
                    resolve(response.data);
                }).catch((error) => {
                    console.log(error);
                    reject(error);
                });
        });
    }

}