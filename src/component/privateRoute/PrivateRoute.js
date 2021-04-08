import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { UserContext } from '../../App';

function PrivateRoute({ children, ...rest }) {
    const [loggedInUser, setLogginUser]= useContext(UserContext);
    let auth = loggedInUser;
    return (
        <Route
            {...rest}
            render={({ location }) =>
                auth.email ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default PrivateRoute;