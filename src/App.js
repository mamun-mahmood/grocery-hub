import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Header from './component/Header/Header';
import Home from './component/Home/Home';
import PrivateRoute from "./component/privateRoute/PrivateRoute";
import Checkout from "./component/checkout/Checkout";
import SignIn from "./component/SignIn/SignIn";
import { createContext, useState } from 'react';
import ManageShop from "./component/manageShop/ManageShop";
import ManageProduct from "./component/manageProduct/ManageProduct";
import AddProduct from "./component/addProduct/AddProduct";
import OrderStatus from "./component/orderStatus/OrderStatus";
export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <PrivateRoute path="/productId/:selectedProduct">
            <Checkout></Checkout>
          </PrivateRoute>
          <Route path="/login">
            <SignIn></SignIn>
          </Route>
          <PrivateRoute path="/manageShop">
            <ManageShop></ManageShop>
          </PrivateRoute>
          <Route path="/manageProduct">
            <ManageShop></ManageShop>
            <ManageProduct></ManageProduct>
          </Route>
            <Route path="/addProduct">
              <ManageShop></ManageShop>
              <AddProduct></AddProduct>
            </Route>
            <PrivateRoute path="/orderStatus">
              <OrderStatus></OrderStatus>
            </PrivateRoute>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}
export default App;