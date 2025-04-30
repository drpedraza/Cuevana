import { Pelicula } from "./Pelicula";
import { Persona } from "./Persona";

export interface Reparto {
    id?: number;
    roles: number;
    pelicula: Pelicula;
    persona: Persona;
}