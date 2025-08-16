import { useDispatch } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { fetchUserFromTokenAPI } from "./redux/authSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromTokenAPI());
  }, []);
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
