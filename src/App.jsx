import { useDispatch } from "react-redux";
import AppRouter from "./routes/AppRouter";
import { fetchUserFromToken } from "./redux/authSlice";
import { useEffect } from "react";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUserFromToken());
  }, []);
  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
