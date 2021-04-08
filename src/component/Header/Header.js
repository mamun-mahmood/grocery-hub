import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { UserContext } from '../../App';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    let auth = loggedInUser;
    return (
        <>
            <Navbar className="rounded" sticky="top" bg="light" expand="lg">
                <Link to="/"><Navbar.Brand>Grocery Hub</Navbar.Brand></Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="">
                        <Link to="/"><Button className="ml-2" variant="outline-info">Home</Button></Link>
                        <Link to={"/orderStatus"}><Button className="ml-2" variant="outline-info">Orders</Button></Link>
                        <Link to="/manageShop"><Button className="ml-2" variant="outline-info">Admin</Button></Link>
                        <Link to="/"><Button className="ml-2" variant="outline-info">Deals</Button></Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 ml-2" />
                        <Button variant="outline-success" className="ml-2">Search</Button>
                        {
                            auth.name ? <div>
                                <Button variant="outline-info" className="ml-2">{auth.name}</Button>
                                <Button variant="outline-info" color="secondary" className="ml-2">Sign Out</Button>
                            </div>
                                :
                                <Link to="/login">
                                    <Button variant="outline-info" className="ml-2">Log In</Button>
                                </Link>
                        }
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        </>
    );
};

export default Header;