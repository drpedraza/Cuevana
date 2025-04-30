import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PersonaService } from '../../services/PersonaService';
import { RepartoService } from '../../services/RepartoService';
import { Persona } from '../../models/Persona';
import { Reparto } from '../../models/Reparto';
import { Container, Row, Col } from 'react-bootstrap';
import { NavMenu } from '../../components/NavMenu';

export const VerPersona = () => {
    const { id } = useParams<{ id: string }>();
    const [persona, setPersona] = useState<Persona | null>(null);
    const [reparto, setReparto] = useState<Reparto[]>([]);

    useEffect(() => {
        if (id) {
            new PersonaService().getPersonaById(id)
                .then((response) => {
                    setPersona(response);
                });

            new RepartoService().getRepartoList()
                .then((response) => {
                    const repartoPersona = response.filter((r) => r.persona.id === parseInt(id));
                    setReparto(repartoPersona);
                });
        }
    }, [id]);

    if (!persona) {
        return <p>Cargando detalles de la persona...</p>;
    }

    const peliculasDirigidas = reparto.filter((r) => r.roles === 1);
    const peliculasActuadas = reparto.filter((r) => r.roles === 2);

    return (
        <div>
            <NavMenu />
            <Container className="my-4">
                <Row>
                    <Col xs={12} md={4} className="mb-4">
                        <img
                            src={persona.imagen_persona || 'https://via.placeholder.com/200x300'}
                            alt={persona.nombre}
                            style={{ width: "100%", height: "auto", objectFit: "cover", maxHeight: "400px" }}
                        />
                    </Col>
                    <Col xs={12} md={8}>
                        <h2>{persona.nombre}</h2>

                        <h3>Películas dirigidas</h3>
                        {peliculasDirigidas.length > 0 ? (
                            <ul>
                                {peliculasDirigidas.map((reparto) => (
                                    <li key={reparto.pelicula.id}>
                                        <Link to={`/peliculas/detalles/${reparto.pelicula.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                            fontWeight: 'bold',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'gray'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                                    >
                                            {reparto.pelicula.titulo}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No ha dirigido ninguna película.</p>
                        )}

                        <h3>Películas como actor</h3>
                        {peliculasActuadas.length > 0 ? (
                            <ul>
                                {peliculasActuadas.map((reparto) => (
                                    <li key={reparto.pelicula.id}>
                                        <Link to={`/peliculas/detalles/${reparto.pelicula.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                            fontWeight: 'bold',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'gray'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                                    >
                                            {reparto.pelicula.titulo}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No ha actuado en ninguna película.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
