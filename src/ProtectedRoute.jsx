import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = ({ user, ...rest }) => {
  return user ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default ProtectedRoute;
