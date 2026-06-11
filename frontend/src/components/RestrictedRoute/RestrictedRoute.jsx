import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectIsRefreshing } from "../../redux/auth/authSelectors";

export const RestrictedRoute = ({ children, redirectTo = "/home" }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return null;
  }

  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};
