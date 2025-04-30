import { useState } from "react";
import { UserService } from "../services/UserService";
import { TOKEN_KEY, REFRESH_KEY } from "../utils/CONSTANTS";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { loginUser } from "../slices/userSlice";
import { NavMenu } from "../components/NavMenu";
import { setLocalStorage } from "../utils/LocalStorageUtils";
import { Button, Card, Container, Form } from "react-bootstrap";

export const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const onLoginClick = () => {
        new UserService().login(email, password).then((response) => {
            dispatch(loginUser(email));
            setLocalStorage(TOKEN_KEY, response.access);
            setLocalStorage(REFRESH_KEY, response.refresh);
            navigate('/personas');
        });
    }
    return (
        <div>
            <NavMenu />
            <Container className="px-4 py-5">
                <Card className="border-0 shadow-sm" style={{ maxWidth: '700px', margin: 'auto' }}>
                    <Card.Header className="text-center">
                        <h5 className="mb-0">Iniciar Sesión</h5>
                    </Card.Header>
                    <Card.Body>
                        <Form className="mt-4" onSubmit={(e) => e.preventDefault()}>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="name@mail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="*********"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            <div className="d-flex justify-content-center">
                                <Button variant="primary" type="button" onClick={onLoginClick}>
                                    Iniciar sesión
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};