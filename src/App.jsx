import { useDispatch } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { fetchUserFromTokenAPI } from "./redux/authSlice";
import { detectLocationAPI } from "./redux/locationSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromTokenAPI());
    dispatch(detectLocationAPI());
  }, []);
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
