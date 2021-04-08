import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserContext } from '../../App';

const OrderStatus = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [orderedProduct, setOrderedProduct] = useState([])
    useEffect(() => {
        axios.get('https://fathomless-crag-64163.herokuapp.com/orderStatus')
            .then(res => {
                const userOrder = res.data.filter(dat => dat.email === loggedInUser.email)
                setOrderedProduct(userOrder)
            })
    }, [loggedInUser.email])
    let serialNum = 1;
    return (
        <div>
            <div className="bg-info pb-5 rounded" style={{ textAlign: 'center' }}>
                <h3>You Have {orderedProduct.length} Order:</h3>
                <Table striped bordered hover variant="info" responsive>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Number</th>
                            <th>Customer Name</th>
                            <th>Shipping Address</th>
                            <th>Phone Number</th>
                            <th>Product Name</th>
                            <th>Order Date</th>
                            <th>Price</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    {
                        orderedProduct.map(pd =>
                            <tbody key={pd._id}>
                                <tr style={{ textAlign: 'center' }}>
                                    <td>{serialNum++}</td>
                                    <td>{pd.name}</td>
                                    <td>{pd.address1}</td>
                                    <td>{pd.phoneNumber}</td>
                                    <td>{pd.orderedProduct}</td>
                                    <td>{pd.date}</td>
                                    <td>{pd.price}</td>
                                    <td>{pd.weight}</td>
                                </tr>
                            </tbody>)
                    }
                </Table>
            </div>
        </div>
    );
};

export default OrderStatus;