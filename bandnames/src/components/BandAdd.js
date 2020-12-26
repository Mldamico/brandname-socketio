import { useState } from 'react';
import { useSocket } from '../hooks/useSocket';
export const BandAdd = () => {
  const [valor, setValor] = useState('');
  const { socket } = useSocket('http://localhost:8080');
  const onSubmit = (e) => {
    e.preventDefault();
    if (valor.trim().length > 0) {
      socket.emit('nueva-band', { nombre: valor });
      setValor('');
    }
  };
  return (
    <>
      <h3>Agregar Banda</h3>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          placeholder='Nuevo Nombre de banda'
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </>
  );
};
