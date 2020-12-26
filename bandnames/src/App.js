import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import { useState, useEffect } from 'react';
import { useSocket } from './hooks/useSocket';

function App() {
  const [bands, setBands] = useState([]);
  const { socket, online } = useSocket('http://localhost:8080');
  useEffect(() => {
    socket.on('current-bands', (bands) => {
      console.log(bands);
      setBands(bands);
    });
  }, [socket]);

  const votar = (id) => {
    socket.emit('votar-band', id);
  };

  const eliminar = (id) => {
    socket.emit('borrar-band', id);
  };

  const cambiarNombre = (id, nombre) => {
    socket.emit('cambiar-nombre-band', {
      id,
      nombre,
    });
  };

  const crearBanda = (nombre) => {
    socket.emit('nueva-band', { nombre });
  };
  return (
    <div className='container'>
      <div className='alert'>
        <p>
          Service Status:
          {online ? (
            <span className='text-success'>Online</span>
          ) : (
            <span className='text-danger'>Offline</span>
          )}
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />
      <div className='row'>
        <div className='col-8'>
          <BandList
            data={bands}
            votar={votar}
            eliminar={eliminar}
            cambiarNombre={cambiarNombre}
          />
        </div>
        <div className='col-4'>
          <BandAdd crearBanda={crearBanda} />
        </div>
      </div>
    </div>
  );
}

export default App;
