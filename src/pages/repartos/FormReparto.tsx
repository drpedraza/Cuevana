import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RepartoService } from "../../services/RepartoService";
import { PeliculaService } from "../../services/PeliculaService";
import { PersonaService } from "../../services/PersonaService";
import { useNavigate } from "react-router-dom";
import { Button, Form, Col, Row, Container, Card } from "react-bootstrap";
import { Pelicula } from "../../models/Pelicula";
import { Persona } from "../../models/Persona";
import { NavMenu } from "../../components/NavMenu";

type Inputs = {
    rolesRequired: number;
    peliculaRequired: string;
    personaRequired: string;
};

export const FormReparto = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const [peliculas, setPeliculas] = useState<Pelicula[]>([]);
    const [personas, setPersonas] = useState<Persona[]>([]);

    useEffect(() => {
        const loadPeliculas = () => {
            new PeliculaService().getPeliculaList().then(setPeliculas);
        };
        const loadPersonas = () => {
            new PersonaService().getPersonaList().then(setPersonas);
        };
        loadPeliculas();
        loadPersonas();
    }, []);

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const repartoData = {
            roles: data.rolesRequired,
            pelicula_id: Number(data.peliculaRequired),
            persona_id: Number(data.personaRequired)
        };
        new RepartoService().insertReparto(repartoData as unknown).then(() => {
            navigate('/repartos');
        });
    };

    return (
        <div>
            <NavMenu />
            <Container className="mt-5">
                <Card>
                    <Card.Header>
                        <h2>Crear Reparto</h2>
                    </Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formRoles">
                                        <Form.Label>Rol</Form.Label>
                                        <Form.Control
                                            as="select"
                                            {...register("rolesRequired", { required: true })}
                                            isInvalid={!!errors.rolesRequired}
                                        >
                                            <option value="">Selecciona el rol</option>
                                            <option value="1">Director</option>
                                            <option value="2">Actor</option>
                                        </Form.Control>
                                        {errors.rolesRequired && (
                                            <Form.Control.Feedback type="invalid">
                                                El rol es requerido.
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formPelicula">
                                        <Form.Label>Película</Form.Label>
                                        <Form.Control
                                            as="select"
                                            {...register("peliculaRequired", { required: true })}
                                            isInvalid={!!errors.peliculaRequired}
                                        >
                                            <option value="">Selecciona la película</option>
                                            {peliculas.map((pelicula) => (
                                                <option key={pelicula.id} value={pelicula.id}>
                                                    {pelicula.titulo}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        {errors.peliculaRequired && (
                                            <Form.Control.Feedback type="invalid">
                                                La película es requerida.
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formPersona">
                                        <Form.Label>Persona</Form.Label>
                                        <Form.Control
                                            as="select"
                                            {...register("personaRequired", { required: true })}
                                            isInvalid={!!errors.personaRequired}
                                        >
                                            <option value="">Selecciona la persona</option>
                                            {personas.map((persona) => (
                                                <option key={persona.id} value={persona.id}>
                                                    {persona.nombre}
                                                </option>
                                            ))}
                                        </Form.Control>
                                        {errors.personaRequired && (
                                            <Form.Control.Feedback type="invalid">
                                                La persona es requerida.
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className="mt-3">
                                Crear Reparto
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
