import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button, Card, Col } from 'react-bootstrap';
import './product.css'
const Products = (props) => {
    const { name, img, _id, price, weight } = props.data
    console.log(_id);
    return (
        <>
            {/* className="mt-5 col-md-3 col-xs-12  col-sm-6" */}
            <Col xs={12} md={4} lg-={3} sm={6}>
                    <Card style={{ width: '15rem' }} className="h-100 mt-4 card">
                        <Card.Img className="" variant="top" src={img} />
                        <Card.Body>
                            <Card.Title>{name}</Card.Title>
                            <div className="d-flex">
                                <Card.Text className="mr-5 ml-3">{price} tk</Card.Text>
                                <Card.Text className="ml-4">{weight}</Card.Text>
                            </div>
                            <Link to={"/productId/" + _id}><Button className="mb-2 btn btn-success w-100">Buy Now</Button></Link>
                        </Card.Body>
                    </Card>
            </Col>
        </>
    );
};

export default Products;