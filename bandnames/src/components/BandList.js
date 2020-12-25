import { useState, useEffect } from "react";
export const BandList = ({ data }) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);
  const crearRows = () => {
    return bands.map(band => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary">+1</button>
        </td>
        <td>
          <input type="text" className="form-control" value={band.name} />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger">Borrar</button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>{crearRows()}</tbody>
      </table>
    </>
  );
};