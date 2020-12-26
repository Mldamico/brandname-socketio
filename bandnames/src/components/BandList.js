import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
export const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);
  useEffect(() => {
    socket.on("current-bands", bands => {
      setBands(bands);
    });
    return () => socket.off("current-bands");
  }, [socket]);

  const cambioNombre = (e, id) => {
    const nuevoNombre = e.target.value;
    setBands(bands =>
      bands.map(band => {
        if (band.id === id) {
          band.name = nuevoNombre;
        }
        return band;
      })
    );
  };

  const onPerdioFoco = (id, nombre) => {
    socket.emit("cambiar-nombre-band", {
      id,
      nombre
    });
  };

  const votar = id => {
    socket.emit("votar-band", id);
  };

  const eliminar = id => {
    socket.emit("borrar-band", id);
  };

  const crearRows = () => {
    return bands.map(band => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            type="text"
            className="form-control"
            value={band.name}
            onChange={e => cambioNombre(e, band.id)}
            onBlur={() => onPerdioFoco(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => eliminar(band.id)}>
            Borrar
          </button>
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
