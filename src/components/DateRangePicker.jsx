import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFromDate, setToDate } from "../redux/filterSlice";

const DateRangePicker = () => {
  const dispatch = useDispatch();
  const fromDate = useSelector((state) => state.filters.fromDate);
  const toDate = useSelector((state) => state.filters.toDate);

  const handleFromChange = (e) => dispatch(setFromDate(e.target.value));
  const handleToChange = (e) => dispatch(setToDate(e.target.value));

  return (
    <div className="d-flex align-items-center gap-2" style={{ color: "white" }}>
      Desde
      <input
        type="date"
        className="form-control"
        value={fromDate}
        onChange={handleFromChange}
      />
      <span>Hasta </span>
      <input
        type="date"
        className="form-control"
        value={toDate}
        onChange={handleToChange}
      />
    </div>
  );
};

export default DateRangePicker;
