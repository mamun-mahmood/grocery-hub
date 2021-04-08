import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'react-bootstrap';
const ManageProduct = () => {
    const url = 'https://fathomless-crag-64163.herokuapp.com/addedProduct'
    const [addedProduct, setAddedProduct] = useState([])
    useEffect(() => {
        axios.get(url)
            .then(res => {
                const addedProduct = res.data
                setAddedProduct(addedProduct)
            })
    }, [])
    const deleteProduct = (event, id) => {
        fetch(`https://fathomless-crag-64163.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(result => {
                if (result) {
                    event.target.parentNode.style.display = 'none';
               }
            })
    }
    let serialNum = 1;
    return (
        <div>
            <div style={{}}>
                <div className="productList w-100">
                    <h5 className="bg-info rounded mb-1" style={{ textAlign: 'center' }}>Manage Product</h5>
                    <Table striped bordered hover variant="info" responsive>
                        <thead>
                            <tr style={{textAlign: 'center'}}>
                                <th>Number</th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            addedProduct.map(pd =>
                                <tbody key={pd._id}>
                                    <tr style={{textAlign: 'center'}}>
                                        <td>{serialNum++}</td>
                                        <td>{pd.name}</td>
                                        <td>{pd.price}</td>
                                        <td>{pd.weight}</td>
                                        <td><DeleteForeverIcon onClick={(event) => deleteProduct(event, pd._id)}></DeleteForeverIcon></td>
                                    </tr>
                                </tbody>)
                        }
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default ManageProduct;