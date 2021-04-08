import React from 'react';
import './signIn.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../firebase/firebaseConfig';
import { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Container } from '@material-ui/core';
import { useContext } from 'react';
import { UserContext } from '../../App';
firebase.initializeApp(firebaseConfig);

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [newUser, setNewUser] = useState(false)
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false,
        matchedPassword: false
    })
    const [loggedinUser, setLoggedInUser] = useContext(UserContext);
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const provider = new firebase.auth.GoogleAuthProvider();
    var fbProvider = new firebase.auth.FacebookAuthProvider();

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
            .then(res => {
                const { displayName, photoURL, email } = res.user
                console.log(displayName, photoURL, email);
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                }
                setUser(signedInUser)
                setLoggedInUser(signedInUser)
                history.replace(from);
            })
            .catch(err => {
                console.log(err);
            })
    }
    const handleFbSignIn = () => {
        firebase
            .auth()
            .signInWithPopup(fbProvider)
            .then((res) => {
                /** @type {firebase.auth.OAuthCredential} */
                const { displayName, email } = res.user
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email
                }
                setUser(signedInUser)
                setLoggedInUser(signedInUser)
                history.replace(from);
            })
            .catch((error) => {
                const newUserInfo = { ...user }
                newUserInfo.error = error.message
                newUserInfo.success = false
                setUser(newUserInfo);
            });
    }
    let isFromValid = true;
    const [validPassword, setValidPassword] = useState('')
    const handleChange = (e) => {
        if (e.target.name === 'name') {
            user.name = e.target.value
        }
        if (e.target.name === 'email') {
            var re = /\S+@\S+\.\S+/;
            isFromValid = re.test(e.target.value)
            setUser[e.target.name] = e.target.value
        }
        if (e.target.name === 'password') {
            setValidPassword(e.target.value)
            const passwordLengthVaildation = e.target.value.length > 6
            const PasswordNumberValidation = /\d{1}/.test(e.target.value);
            isFromValid = (passwordLengthVaildation && PasswordNumberValidation);
        }
        if (isFromValid) {
            const newUserInfo = { ...user }
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }
    const matchPassword = (e) => {
        if (e.target.name === 'confirmPassword') {
            if (e.target.value === validPassword) {
                const newUserInfo = { ...user }
                newUserInfo.error = 'Password Matched'
                newUserInfo.matchedPassword = true
                setUser(newUserInfo);
            }
            else {
                const newUserInfo = { ...user }
                newUserInfo.error = 'Password is not matching'
                newUserInfo.matchedPassword = false
                setUser(newUserInfo);
            }
        }
    }
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password && user.matchedPassword) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    console.log(res);
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    updateUserName(user.name)
                })
                .catch((error) => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo);
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user }
                    newUserInfo.error = ''
                    newUserInfo.success = true
                    setUser(newUserInfo);
                    setLoggedInUser(newUserInfo);
                    history.replace(from);
                    const userName = res.user.displayName
                    user.name = userName
                })
                .catch((error) => {
                    console.log(error.message);
                    const newUserInfo = { ...user }
                    newUserInfo.error = error.message
                    newUserInfo.success = false
                    setUser(newUserInfo);
                });
        }
        e.preventDefault();
    }
    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name
        }).then(function () {
            console.log('updated');
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <Container className="bg-light pb-5 rounded" component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} >
                    {
                        newUser && <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Your Name"
                            name="name"
                            autoFocus
                            onBlur={handleChange}
                        />
                    }
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onBlur={handleChange}
                        autoFocus
                    />
                    <TextField
                        variant="outlined"
                        onBlur={handleChange}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                    />
                    {
                        newUser && <TextField
                            variant="outlined"
                            onChange={matchPassword}
                            margin="normal"
                            required
                            fullWidth
                            name="confirmPassword"
                            label="Confirm Password"
                            type="password"
                        />
                    }
                    {
                        newUser ? <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit}>Sign Up</Button>
                            : <Button type="submit" fullWidth variant="contained" color="primary" onClick={handleSubmit}>Sign In</Button>
                    }
                    <p>{user.error}</p>
                    {
                        user.success && <p style={{ color: 'green' }}>{newUser ? 'Signed Up' : 'Logged In'} Successfully</p>
                    }
                    <Grid container>
                        <Grid item xs>
                            <Link variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <input type="checkbox" name="newUser" onChange={() => setNewUser(!newUser)} value="" />
                            <label htmlFor="newUser">New user Sign Up</label>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <div className='iconContainer'>
                <h5>Sign In with</h5>
                <FontAwesomeIcon className='signInIcon' onClick={handleSignIn} icon={faGoogle} />
                <FontAwesomeIcon className='signInIcon' onClick={handleFbSignIn} icon={faFacebook} />
            </div>
        </Container>
    );
}