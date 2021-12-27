import { Redirect,Route } from "react-router";

export const PrivateRouter = ({ components: Component, role, ...rest }) => {
  <Route
    {...rest}
    render={(props) => {
      const local = JSON.parse(localStorage.getItem("auth"));
        if(local){
            return <Redirect to ={{pathname :'/sign-in',from : props.location}}/>
        }
        
    }}
  />;
};
