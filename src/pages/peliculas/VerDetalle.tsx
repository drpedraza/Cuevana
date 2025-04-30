import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PeliculaService } from '../../services/PeliculaService';
import { RepartoService } from '../../services/RepartoService';
import { Pelicula } from '../../models/Pelicula';
import { Reparto } from '../../models/Reparto';
import { Row, Col, Container } from 'react-bootstrap';
import { NavMenu } from '../../components/NavMenu';

export const VerDetalle = () => {
    const { id } = useParams<{ id: string }>();
    const [pelicula, setPelicula] = useState<Pelicula | null>(null);
    const [reparto, setReparto] = useState<Reparto[]>([]);

    useEffect(() => {
        if (id) {
            new PeliculaService().getPeliculaById(id)
                .then((response) => {
                    setPelicula(response);
                });

            new RepartoService().getRepartoList()
                .then((response) => {
                    const repartoPelicula = response.filter((r) => r.pelicula.id === parseInt(id));
                    setReparto(repartoPelicula);
                });
        }
    }, [id]);

    if (!pelicula) {
        return <p>Cargando detalles de la película...</p>;
    }

    const directores = reparto.filter((r) => r.roles === 1);
    const actores = reparto.filter((r) => r.roles === 2);

    return (
        <div>
            <NavMenu />
            <Container className="my-4">
                <Row>
                    <Col xs={12} md={4} className="mb-4">
                        <img
                            src={pelicula.imagen_pelicula || 'https://via.placeholder.com/200x300'}
                            alt={pelicula.titulo}
                            style={{ width: "100%", height: "auto", objectFit: "cover", maxHeight: "400px" }}
                        />
                    </Col>
                    <Col xs={12} md={8}>
                        <h2>{pelicula.titulo}</h2>
                        <p><strong>Sinopsis:</strong> {pelicula.sinopsis}</p>
                        <p><strong>Fecha de Lanzamiento:</strong> {pelicula.fecha_lanzamiento}</p>
                        <p><strong>Clasificación Rotten Tomatoes:</strong> {pelicula.clasificacion_rotten}%</p>

                        <h3>Directores</h3>
                        {directores.length > 0 ? (
                            <ul>
                                {directores.map((director) => (
                                    <li key={director.id} style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={director.persona.imagen_persona || 'https://via.placeholder.com/50'}
                                        alt={director.persona.nombre}
                                        style={{ width: '70px', height: 'auto', borderRadius: '70%', marginRight: '10px' }}
                                    />
                                    <Link to={`/personas/detalles/${director.persona.id}`}
                                            style={{
                                                textDecoration: 'none',
                                                color: 'black',
                                                fontWeight: 'bold',
                                            }}
                                            onMouseEnter={(e) => e.currentTarget.style.color = 'gray'}
                                            onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                                        >
                                        {director.persona.nombre}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay directores listados.</p>
                        )}

                        <h3>Actores</h3>
                        {actores.length > 0 ? (
                            <ul>
                                {actores.map((actor) => (
                                    <li key={actor.id} style={{ display: 'flex', alignItems: 'center' }}>
                                    <img
                                        src={actor.persona.imagen_persona || 'https://via.placeholder.com/50'}
                                        alt={actor.persona.nombre}
                                        style={{ width: '70px', height: 'auto', borderRadius: '70%', marginRight: '10px' }}
                                    />
                                    <Link
                                        to={`/personas/detalles/${actor.persona.id}`}
                                        style={{
                                            textDecoration: 'none',
                                            color: 'black',
                                            fontWeight: 'bold',
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = 'gray'}
                                        onMouseLeave={(e) => e.currentTarget.style.color = 'black'}
                                    >
                                        {actor.persona.nombre}
                                    </Link>
                                </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No hay actores listados.</p>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};
