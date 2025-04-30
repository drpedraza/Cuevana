import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Button, Container, Form, Nav, Navbar, NavDropdown } from "react-bootstrap";

export const NavMenu = () => {
    const navigate = useNavigate();
    const { logout, userEmail } = useAuth({ redirectWithoutToken: false });
    const [searchTerm, setSearchTerm] = useState("");

    const onLogoutClick = () => {
        logout();
    };

    const onSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        navigate(`/peliculas?search=${searchTerm}`);
    };

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand href="#home">Practico3</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!userEmail && (
                            <NavLink end className="nav-link" to="/peliculas">
                                Cartelera
                            </NavLink>
                        )}
                        {userEmail && (
                            <>
                                <NavDropdown title="Personas" id="basic-nav-dropdown">
                                    <NavLink end className="dropdown-item" to="/personas/create">
                                        Crear Persona
                                    </NavLink>
                                    <NavLink end className="dropdown-item" to="/personas">
                                        Lista de Personas
                                    </NavLink>
                                </NavDropdown>
                                <NavDropdown title="Peliculas" id="basic-nav-dropdown">
                                    <NavLink end className="dropdown-item" to="/peliculas/create">
                                        Crear Película
                                    </NavLink>
                                    <NavLink end className="dropdown-item" to="/peliculas">
                                        Lista de Películas
                                    </NavLink>
                                </NavDropdown>
                                <NavDropdown title="Repartos" id="basic-nav-dropdown">
                                    <NavLink end className="dropdown-item" to="/repartos/create">
                                        Crear Reparto
                                    </NavLink>
                                    <NavLink end className="dropdown-item" to="/repartos">
                                        Lista de Repartos
                                    </NavLink>
                                </NavDropdown>
                            </>
                        )}
                    </Nav>
                    <Form className="d-flex" onSubmit={onSearch}>
                        <Form.Control
                            type="search"
                            placeholder="Buscar"
                            className="me-2"
                            aria-label="Buscar"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button variant="outline-success" type="submit">Buscar</Button>
                    </Form>
                    <Nav className="ms-auto">
                        {userEmail ? (
                            <div className="d-flex align-items-center">
                                <span className="text-light me-3">{userEmail}</span>
                                <Button
                                    variant="dark"
                                    className="text-light"
                                    onClick={onLogoutClick}
                                >
                                    Cerrar sesión
                                </Button>
                            </div>
                        ) : (
                            <Button
                                variant="dark"
                                className="text-light"
                                onClick={() => navigate("/login")}
                            >
                                Log In
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
