import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { PeliculaService } from "../../services/PeliculaService";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Col, Row, Container, Card } from "react-bootstrap";
import { Pelicula } from "../../models/Pelicula";
import { NavMenu } from "../../components/NavMenu";

type Inputs = {
    tituloRequired: string;
    sinopsisRequired: string;
    fechaLanzamientoRequired: string;
    clasificacionRottenRequired: number;
    videoUrlRequired: string;
    imagenRequired: FileList;
};

export const FormPelicula = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
        const loadPelicula = () => {
            new PeliculaService().getPeliculaById(id)
                .then(res => {
                    setValue("tituloRequired", res.titulo);
                    setValue("sinopsisRequired", res.sinopsis);
                    setValue("fechaLanzamientoRequired", res.fecha_lanzamiento);
                    setValue("clasificacionRottenRequired", res.clasificacion_rotten);
                    setValue("videoUrlRequired", res.video_url);
                    setImagePreview(res.imagen_pelicula);
                });
        };
        loadPelicula();
    }, [id]);

    const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => {
        const peliculaData = new FormData();
        peliculaData.append('titulo', data.tituloRequired);
        peliculaData.append('sinopsis', data.sinopsisRequired);
        peliculaData.append('fecha_lanzamiento', data.fechaLanzamientoRequired);
        peliculaData.append('clasificacion_rotten', data.clasificacionRottenRequired.toString());
        peliculaData.append('video_url', data.videoUrlRequired);

        const imagenFile = (document.getElementById('formImagen') as HTMLInputElement)?.files?.[0];
        if (imagenFile) {
            peliculaData.append('imagen_pelicula', imagenFile);
        }

        if (id) {
            peliculaData.append('id', id);
            doUpdate(id, peliculaData);
        } else {
            doInsert(peliculaData);
        }
    };

    const doUpdate = (id: string, peliculaData: FormData) => {
        new PeliculaService().updatePelicula(id, peliculaData).then(() => {
            navigate('/peliculas');
        });
    };

    const doInsert = (peliculaData: FormData) => {
        new PeliculaService().insertPelicula(peliculaData as unknown as Pelicula).then(() => {
            navigate('/peliculas');
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
                                    <Form.Group controlId="formTitulo">
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Título de la película"
                                            {...register("tituloRequired", { required: true })}
                                            isInvalid={!!errors.tituloRequired}
                                        />
                                        {errors.tituloRequired && (
                                            <Form.Control.Feedback type="invalid">
                                                El título es requerido.
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formFechaLanzamiento">
                                        <Form.Label>Fecha de Lanzamiento</Form.Label>
                                        <Form.Control
                                            type="date"
                                            {...register("fechaLanzamientoRequired", { required: true })}
                                            isInvalid={!!errors.fechaLanzamientoRequired}
                                        />
                                        {errors.fechaLanzamientoRequired && (
                                            <Form.Control.Feedback type="invalid">
                                                La fecha de lanzamiento es requerida.
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formSinopsis">
                                        <Form.Label>Sinopsis</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Sinopsis de la película"
                                            {...register("sinopsisRequired", { required: true })}
                                            isInvalid={!!errors.sinopsisRequired}
                                        />
                                        {errors.sinopsisRequired && (
                                            <Form.Control.Feedback type="invalid">
                                                La sinopsis es requerida.
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formClasificacionRotten">
                                        <Form.Label>Clasificación Rotten</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="Clasificación en Rotten Tomatoes"
                                            {...register("clasificacionRottenRequired", { required: true, min: 0, max: 100 })}
                                            isInvalid={!!errors.clasificacionRottenRequired}
                                        />
                                        {errors.clasificacionRottenRequired && (
                                            <Form.Control.Feedback type="invalid">
                                                La clasificación debe ser un número entre 0 y 100.
                                            </Form.Control.Feedback>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="formVideoUrl">
                                        <Form.Label>URL del Video</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="URL del tráiler o video"
                                            {...register("videoUrlRequired", { required: true })}
                                            isInvalid={!!errors.videoUrlRequired}
                                        />
                                        {errors.videoUrlRequired && (
                                            <Form.Control.Feedback type="invalid">
                                                La URL del video es requerida.
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
                                                <p>Imagen actual:</p>
                                                <img
                                                    src={imagePreview}
                                                    alt="Imagen de la película"
                                                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                                                />
                                            </div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className="mt-3">
                                {id ? "Actualizar" : "Crear"}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};
