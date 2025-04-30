import { useEffect, useState } from 'react';
import { Reparto } from '../../models/Reparto';
import { RepartoService } from '../../services/RepartoService';
import { NavMenu } from '../../components/NavMenu';
import { Card, Button, Row, Col } from 'react-bootstrap';

export const ListReparto = () => {
    const [repartos, setRepartos] = useState<Reparto[]>([]);

    useEffect(() => {
        getRepartoList();
    }, []);

    const getRepartoList = () => {
        new RepartoService().getRepartoList()
            .then((response) => {
                setRepartos(response);
            });
    };

    const onEliminarClick = (reparto: Reparto) => {
        const confirmation = confirm('¿Está seguro que desea eliminar este reparto?');
        if (!confirmation) {
            return;
        }
        new RepartoService().deleteReparto(reparto.id?.toString() ?? "0")
            .then(() => {
                getRepartoList();
            });
    };

    return (
        <div>
            <NavMenu />
            <div className="container my-4">
                <h1>Listado de Repartos</h1>
                <Row>
                    {repartos.map((reparto) => (
                        <Col md={4} className="mb-4" key={reparto.id}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{reparto.persona.nombre} - {reparto.roles === 1 ? 'Director' : 'Actor'}</Card.Title>
                                    <Card.Text>
                                        Película: {reparto.pelicula.titulo}
                                    </Card.Text>
                                    <div className="d-flex justify-content-between mt-2">
                                        <Button
                                            variant="danger"
                                            onClick={() => onEliminarClick(reparto)}
                                            size="sm"
                                        >
                                            Eliminar
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </div>
        </div>
    );
};
