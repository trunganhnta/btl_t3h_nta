import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import SignUp from "./components/signUp/SignUp";
import SignIn from "./components/signIn/SignIn";
import { history } from "./helper/history";
import AuthProvider from "./contexts/AuthContext";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import View from "./pages/viewUser/View";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import SearchUser from "./pages/searchUser/SearchUser";
import ViewProduct from "./pages/viewProduct/ViewProduct";
import SearchProduct from "./pages/searchProduct/SearchProduct";

function App() {
  return (
    <Router history={history}>
      <AuthProvider>
        <ToastContainer position="top-center"/>
        <Switch>
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/sign-up" component={SignUp} />
          <PrivateRoute exact path="/" component={Home} />
          <Route exact path="/users" component={UserList} />
          <Route exact path="/user/:id" component={User} />
          <Route exact path="/newUser" component={NewUser } />
          <Route exact path="/viewUser/:id" component={View } />
          <Route exact path="/searchUser" component={SearchUser } />
          <Route exact path="/products" component={ProductList} />
          <Route exact path="/product/:id" component={Product} />
          <Route exact path="/newProduct" component={NewProduct} />
          <Route exact path="/viewProduct/:id" component={ViewProduct } />
          <Route exact path="/searchProduct" component={SearchProduct } />


        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
