import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategory,
  setIsFree,
  setAgeRestriction,
  setLocationType,
  resetFilters,
} from "../redux/filterSlice";

const FilterPanel = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  return (
    <div className="card p-3 mt-3 shadow-sm" style={{ background: "#f9f9f9" }}>
      <div className="d-flex flex-wrap gap-4">
        {/* Categoría */}
        <div>
          <p className="fw-bold mb-1">Categoría</p>
          {["música", "taller", "feria", "teatro"].map((cat) => (
            <div className="form-check" key={cat}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`cat-${cat}`}
                checked={filters.category === cat}
                onChange={() =>
                  dispatch(setCategory(filters.category === cat ? "" : cat))
                }
              />
              <label className="form-check-label" htmlFor={`cat-${cat}`}>
                {cat}
              </label>
            </div>
          ))}
        </div>

        {/* Gratuito o pago */}
        <div>
          <p className="fw-bold mb-1">Precio</p>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isFree"
              checked={filters.isFree === true}
              onChange={() =>
                dispatch(setIsFree(filters.isFree === true ? null : true))
              }
            />
            <label className="form-check-label" htmlFor="isFree">
              Gratuito
            </label>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="isPaid"
              checked={filters.isFree === false}
              onChange={() =>
                dispatch(setIsFree(filters.isFree === false ? null : false))
              }
            />
            <label className="form-check-label" htmlFor="isPaid">
              Pago
            </label>
          </div>
        </div>

        {/* Edad */}
        <div>
          <p className="fw-bold mb-1">Edad</p>
          {["13+", "18+"].map((age) => (
            <div className="form-check" key={age}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`age-${age}`}
                checked={filters.ageRestriction === age}
                onChange={() =>
                  dispatch(
                    setAgeRestriction(filters.ageRestriction === age ? "" : age)
                  )
                }
              />
              <label className="form-check-label" htmlFor={`age-${age}`}>
                {age}
              </label>
            </div>
          ))}
        </div>

        {/* Ubicación */}
        <div>
          <p className="fw-bold mb-1">Ubicación</p>
          {["aire libre", "cerrado"].map((loc) => (
            <div className="form-check" key={loc}>
              <input
                type="checkbox"
                className="form-check-input"
                id={`loc-${loc}`}
                checked={filters.locationType === loc}
                onChange={() =>
                  dispatch(
                    setLocationType(filters.locationType === loc ? "" : loc)
                  )
                }
              />
              <label className="form-check-label" htmlFor={`loc-${loc}`}>
                {loc}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Botón limpiar */}
      <div className="mt-3">
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => dispatch(resetFilters())}
        >
          Limpiar filtros
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
