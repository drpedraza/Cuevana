import { createBrowserRouter } from "react-router-dom";
import { DashboardPage } from "../pages/DashboardPage";
import { LoginPage } from "../pages/LoginPage";
import { FormPersona } from "../pages/personas/FormPersona";
import { ListPersona } from "../pages/personas/ListPersona";
import { FormPelicula } from "../pages/peliculas/FormPelicula";
import { ListPelicula } from "../pages/peliculas/ListPelicula";
import { VerDetalle } from "../pages/peliculas/VerDetalle";
import { FormReparto } from "../pages/repartos/FormReparto";
import { ListReparto } from "../pages/repartos/ListReparto";
import { VerPersona } from "../pages/personas/VerPersona";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <DashboardPage />,
    },
    {
        path: '/login',
        element: <LoginPage />
    },
    {
        path: "/personas/create",
        element: <FormPersona />
    },
    {
        path: "/personas",
        element: <ListPersona />
    },
    {
        path: "/personas/:id",
        element: <FormPersona />
    },
    {
        path: "/peliculas/create",
        element: <FormPelicula />
    },
    {
        path: "/peliculas",
        element: <ListPelicula />
    },
    {
        path: "/peliculas/:id",
        element: <FormPelicula />
    },
    {
        path: "/peliculas/detalles/:id",
        element: <VerDetalle />
    },
    {
        path: "/repartos",
        element: <ListReparto />
    },
    {
        path: "/repartos/create",
        element: <FormReparto />
    },
    {
        path: "/personas/detalles/:id",
        element: <VerPersona />
    }

]);