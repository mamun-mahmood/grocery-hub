import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav, Navbar } from 'react-bootstrap';
const ManageShop = () => {
    return (
        <div className="container">
            <Navbar className="mt-1 mb-2 w-100 rounded " bg="success" variant="light">
                <div className="row">
                    <Navbar.Brand className="ml-3">Shop Management</Navbar.Brand>
                    <Nav className="">
                        <Link to="/manageProduct"><button className="btn btn-primary" style={{ fontSize: '14px' }}>Manage Product</button></Link>
                        <Link to="/addProduct"><button className="ml-2 btn btn-primary" style={{ fontSize: '14px' }}>Add Product</button></Link>
                    </Nav>
                </div>
            </Navbar>
        </div>
    );
};

export default ManageShop;