import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PersonaService } from "../../services/PersonaService";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Col, Row, Card, Container } from "react-bootstrap";
import { Persona } from "../../models/Persona";
import { NavMenu } from "../../components/NavMenu";


type Inputs = {
    nombreRequired: string;
    imagenRequired: FileList;
};

export const FormPersona = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const loadPersona = () => {
            new PersonaService().getPersonaById(id)
                .then(res => {
                    setValue("nombreRequired", res.nombre);
                    setImagePreview(res.imagen_persona);
                });
        };
        loadPersona();
    }, [id]);

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const personaData = new FormData();
        personaData.append('nombre', data.nombreRequired);
        const imagenFile = (document.getElementById('formImagen') as HTMLInputElement)?.files?.[0];
        if (imagenFile) {
            personaData.append('imagen_persona', imagenFile);
        }
        if (id) {
            personaData.append('id', id);
            doUpdate(id, personaData);
        } else {
            doInsert(personaData);
        }
    };

    const doUpdate = (id: string, personaData: FormData) => {
        new PersonaService().updatePersona(id, personaData).then(() => {
            navigate('/personas');
        });
    };

    const doInsert = (personaData: FormData) => {
        new PersonaService().insertPersona(personaData as unknown as Persona).then(() => {
            navigate('/personas');
        });
    };

    return (
        <div>
            <NavMenu />
            <Container className="mt-5">
                <Card>
                    <Card.Header>
                        <h2>{id ? "Editar Película" : "Crear Película"}</h2>
                    </Card.Header>
                    <Card.Body>
                    <Form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                        <Row>
                            <Col md={6}>
                                <Form.Group controlId="formNombre">
                                    <Form.Label>Nombre</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Nombre de la persona"
                                        {...register("nombreRequired", { required: true })}
                                        isInvalid={!!errors.nombreRequired}
                                    />
                                    {errors.nombreRequired && (
                                        <Form.Control.Feedback type="invalid">
                                            El nombre es requerido.
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group controlId="formImagen">
                                    <Form.Label>Imagen</Form.Label>
                                    <Form.Control
                                        type="file"
                                        accept="image/*"
                                        {...register("imagenRequired")}
                                    />
                                    {imagePreview && (
                                        <div className="mt-2">
                                            <p className="text-muted">Imagen actual:</p>
                                            <div className="d-flex justify-content-center">
                                                <img
                                                    src={imagePreview}
                                                    alt="Imagen de perfil"
                                                    className="border rounded"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit" className="px-5">
                                {id ? "Actualizar" : "Crear"}
                            </Button>
                        </div>
                    </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
