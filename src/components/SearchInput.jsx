import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../redux/filterSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state) => state.filters.searchTerm);

  const handleChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <input
      type="text"
      className="form-control"
      placeholder="Buscar eventos..."
      style={{ width: "200px" }}
      value={searchTerm}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
