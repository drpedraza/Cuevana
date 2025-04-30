import { useNavigate } from 'react-router-dom';
import { Persona } from '../../models/Persona';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PersonaService } from '../../services/PersonaService';
import { NavMenu } from '../../components/NavMenu';
import { Button, Table, Container, Image } from 'react-bootstrap';

export const ListPersona = () => {
    const navigate = useNavigate();
    const [personas, setPersonas] = useState<Persona[]>([]);
    const { userEmail } = useAuth({ redirectWithoutToken: true });

    useEffect(() => {
        if (!userEmail) return;
        getPersonaList();
    }, [userEmail]);

    const getPersonaList = () => {
        new PersonaService().getPersonaList()
            .then((response) => {
                setPersonas(response);
            });
    };

    const onEditarclick = (persona: Persona) => {
        navigate('/personas/' + persona.id);
    };

    const onEliminarClick = (persona: Persona) => {
        const confirmation = confirm('¿Está seguro que desea eliminar?');
        if (!confirmation) {
            return;
        }
        new PersonaService().deletePersona(persona.id?.toString() ?? "0")
            .then(() => {
                getPersonaList();
            });
    };

    return (
        <div>
            <NavMenu />
            <Container className="mt-5">
                <h1 className="mb-4 text-center">Listado de Personas</h1>
                <Table striped bordered hover responsive className="text-center">
                    <thead className="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Imagen de perfil</th>
                            <th>Nombre</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((persona) => (
                            <tr key={persona.id}>
                                <td>{persona.id}</td>
                                <td>
                                    {persona.imagen_persona ? (
                                        <Image
                                            src={persona.imagen_persona}
                                            alt={persona.nombre}
                                            roundedCircle
                                            style={{ width: "75px", height: "75px", objectFit: "cover" }}
                                        />
                                    ) : (
                                        <span>Sin imagen</span>
                                    )}
                                </td>
                                <td>{persona.nombre}</td>
                                <td>
                                    <Button
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => onEditarclick(persona)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => onEliminarClick(persona)}
                                    >
                                        Eliminar
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};
