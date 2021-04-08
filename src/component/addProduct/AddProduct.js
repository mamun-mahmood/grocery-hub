import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Container, LinearProgress } from '@material-ui/core';
import { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
const AddProduct = () => {
    const [product,] = useState({
        name: '',
        price: '',
        weight: '',
        img: ''
    })
    const handleBlur = (e) => {
        if (e.target.name === 'name') {
            product.name = e.target.value
        }
        if (e.target.name === 'price') {
            product.price = e.target.value
        }
        if (e.target.name === 'weight') {
            product.weight = e.target.value
        }
    }
    const [imgLoad, setImgLoad] = useState(false)
    const handleImgUpload = event => {
        const imgData = new FormData();
        imgData.set('key', 'c52ef286d44538b5e35cd23b4743904e');
        imgData.append('image', event.target.files[0]);
        setImgLoad(true)
        console.log(imgData);
        axios.post('https://api.imgbb.com/1/upload',
            imgData)
            .then(res => {
                product.img = res.data.data.display_url
                setImgLoad(false)
            })
            .catch(err => {
                setImgLoad(false)
                console.log(err);
            })
    }
    const addProduct = (e) => {
        if (product.name !== '' && product.price !== '' && product.img !== '') {
            const url = 'https://fathomless-crag-64163.herokuapp.com/addProduct'
            fetch(url, {
                method: 'POST',
                body: JSON.stringify(product),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(res => res.json())
                .then(data => {
                    swal("Product Has Been Added!");
                })
                .catch(err => {
                    console.log(err);
                })
        }
        e.preventDefault();
    }
    return (
        <div>
            <Container className="bg-light pb-5 rounded" component="main" maxWidth="xs">
                <div>
                    <Typography component="h1" variant="h5">Add Product</Typography>
                    <form>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Product Name"
                            name="name"
                            autoFocus
                            onBlur={handleBlur}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="price"
                            label="Product Price"
                            name="price"
                            autoComplete="email"
                            onBlur={handleBlur}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="weight"
                            label="Weight (kg/gm/pcs)"
                            type="text"
                            onBlur={handleBlur}
                        />
                        <Button
                            className="mb-3 mt-2"
                            variant="contained"
                            component="label"
                        >
                            Upload Image
                             <input
                                name="img"
                                type="file"
                                hidden
                                required
                                onChange={handleImgUpload}
                            />
                        </Button>
                        {
                            imgLoad && <LinearProgress />
                        }
                        <Button className="mt-2" type="submit" onClick={addProduct} fullWidth variant="contained" color="primary">Add to your shop</Button>
                    </form>
                </div>
            </Container>
        </div>
    );
};

export default AddProduct;