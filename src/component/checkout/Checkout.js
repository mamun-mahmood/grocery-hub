import React, { useContext, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './checkout.css'
import { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { Button, Container, Grid, List, ListItem, ListItemText, TextField, Typography } from '@material-ui/core';
import swal from 'sweetalert';
import { UserContext } from '../../App';
const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const productId = useParams();
    const [selectedProduct, setSelectedProduct] = useState([{}])
    useEffect(() => {
        axios.get('https://fathomless-crag-64163.herokuapp.com/products')
            .then(res => {
                const product = res.data.filter(dat => dat._id === productId.selectedProduct)
                setSelectedProduct(product)
            })
            .catch(err => {
                console.log(err);
            })
    }, [productId.selectedProduct])
    const { name, price, weight } = selectedProduct[0];
    const [orderDate, setOrderDate] = useState({
      date: new Date().toDateString('dd/mm/yyyy')
    })
    let userOrderInfo = {
        name: '',
        address1: '',
        city: '',
        zipCode: '',
        phoneNumber: '',
        email: loggedInUser.email,
        orderedProduct: name,
        price: price,
        weight: weight
    }
    const handleBlur = (e) => {
        if (e.target.name === 'name') {
            userOrderInfo.name = (e.target.value)
        }
        if (e.target.name === 'address1') {
            userOrderInfo.address1 = (e.target.value)
        }
        if (e.target.name === 'number') {
            userOrderInfo.phoneNumber = (e.target.value)
        }
        if (e.target.name === 'city') {
            userOrderInfo.city = (e.target.value)
        }
        if (e.target.name === 'zip') {
            userOrderInfo.zipCode = (e.target.value)
        }
    }
    const placeOrder = (e) => {
        const newOrder = { ...userOrderInfo};
        newOrder.date = orderDate.date
        if (userOrderInfo.address1 !== '' && userOrderInfo.name !== '' && userOrderInfo.phoneNumber) {
            fetch('https://fathomless-crag-64163.herokuapp.com/placeOrder', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(newOrder)
            })
            .then(res => res.json())
            .then(data => {
                swal("Your Order Has Been Placed!", "Thank you for shopping with us."); 
            })
        }
        console.log(new Date());
        e.preventDefault();
    }
    return (
        <div className="container">
            <Container className="bg-light pb-5 rounded mt-2" component="main" maxWidth="xs">
                <div>
                    <Typography component="h1" variant="h5">Checkout</Typography>
                    <form>
                        <Typography variant="h6" gutterBottom>
                            Shipping address
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="name"
                                    name="name"
                                    label="Full Name"
                                    fullWidth
                                    placeholder={loggedInUser.name}
                                    autoComplete="given-name"
                                    onBlur={handleBlur}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    id="name"
                                    name="number"
                                    label="Phone Number"
                                    fullWidth
                                    autoComplete="given-name"
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    id="address1"
                                    name="address1"
                                    label="Address line"
                                    fullWidth
                                    autoComplete="shipping address-line1"
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="city"
                                    name="city"
                                    label="City"
                                    fullWidth
                                    autoComplete="shipping address-level2"
                                    onBlur={handleBlur}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    id="zip"
                                    name="zip"
                                    label="Zip / Postal code"
                                    fullWidth
                                    autoComplete="shipping postal-code"
                                    onBlur={handleBlur}
                                />
                            </Grid>
                        </Grid>
                            <Typography variant="h6" gutterBottom>
                                Order summary
                             </Typography>
                            <List disablePadding>
                                <ListItem>
                                    <ListItemText primary={name} />
                                    <Typography variant="body2">{price}</Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Quantity' />
                                    <Typography variant="body2">{weight}</Typography>
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary='Shipping' />
                                    <Typography variant="body2">Free</Typography>
                                </ListItem>
                                <ListItem >
                                    <ListItemText primary="Total" />
                                    <Typography variant="subtitle1">{price} Taka</Typography>
                                </ListItem>
                            </List>
                        <Button className="mt-2" type="submit" fullWidth onClick={placeOrder} variant="contained" color="primary">Place Order</Button>
                    </form>
                </div>
            </Container>
        </div>
    );
};
export default Checkout;