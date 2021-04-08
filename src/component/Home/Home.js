import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Products from '../products/Products';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { LinearProgress } from '@material-ui/core';
import { Container, Row } from 'react-bootstrap';
const Home = () => {
    const [dataLoading, setDataLoading] = useState(true)
    const [products, setProducts] = useState([{}])
    useEffect(() => {
        axios.get('https://fathomless-crag-64163.herokuapp.com/products')
            .then(res => {
                setDataLoading(false)
                setProducts(res.data)
            })
            .catch(err => {
                setDataLoading(false)
                console.log(err);
            })
    }, [])
    return (
        <Container>
            {
                dataLoading && <div>
                    <br/><LinearProgress/><LinearProgress color="secondary" />
                </div>
            }
            <Row className="">
                {
                    products.map(data => <Products
                        key={data._id}
                        data={data}
                    ></Products>)
                }
            </Row>
        </Container>
    );
};

export default Home;