import { useNavigate, useLocation } from 'react-router-dom';
import { Pelicula } from '../../models/Pelicula';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { PeliculaService } from '../../services/PeliculaService';
import { NavMenu } from '../../components/NavMenu';
import { Card, Button, Row, Col } from 'react-bootstrap';

export const ListPelicula = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const { userEmail } = useAuth({ redirectWithoutToken: false });
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('search') || '';
        setSearchQuery(query);
        getPeliculaList(query);
    }, [location.search]);

    const getPeliculaList = (query: string) => {
        new PeliculaService().getPeliculaList(query)
            .then((response) => {
                setPeliculas(response);
            });
    };

    const onVerDetallesClick = (pelicula: Pelicula) => {
        navigate('/peliculas/detalles/' + pelicula.id);
    };

    const onEditarClick = (pelicula: Pelicula) => {
        navigate('/peliculas/' + pelicula.id);
    };

    const onEliminarClick = (pelicula: Pelicula) => {
        const confirmation = confirm('¿Está seguro que desea eliminar la película?');
        if (!confirmation) {
            return;
        }
        new PeliculaService().deletePelicula(pelicula.id?.toString() ?? "0")
            .then(() => {
                getPeliculaList(searchQuery);
            });
    };

    return (
        <div>
            <NavMenu />
            <div className="container my-4">
                <h1>Cartelera</h1>
                <Row>
                    {peliculas.length === 0 ? (
                        <p>No se encontraron películas con el término "{searchQuery}".</p>
                    ) : (
                        peliculas.map((pelicula) => (
                            <Col md={4} className="mb-4" key={pelicula.id}>
                                <Card>
                                    <Card.Img
                                        variant="top"
                                        src={pelicula.imagen_pelicula || 'https://via.placeholder.com/100'}
                                        alt={pelicula.titulo}
                                        style={{ width: "100%", height: "200px", objectFit: "cover", maxHeight: "400px" }}
                                    />
                                    <Card.Body className="d-flex flex-column">
                                        <Card.Title>{pelicula.titulo}</Card.Title>
                                        <div className="d-flex justify-content-between mt-2">
                                            <Button
                                                variant="primary"
                                                href={pelicula.video_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                size="sm"
                                            >
                                                Ver Trailer
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                onClick={() => onVerDetallesClick(pelicula)}
                                                size="sm"
                                            >
                                                Ver Detalles
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                                {userEmail && (
                                    <div className="mt-2 d-flex justify-content-between">
                                        <Button variant="warning" onClick={() => onEditarClick(pelicula)} size="sm">
                                            Editar
                                        </Button>
                                        <Button variant="danger" onClick={() => onEliminarClick(pelicula)} size="sm">
                                            Eliminar
                                        </Button>
                                    </div>
                                )}
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </div>
    );
};
