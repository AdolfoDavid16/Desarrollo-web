import React, { useEffect, useState, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const Articulos = () => {
  const [mostrarTabla, setMostrarTabla] = useState(true);
  const [articulos, setArticulos] = useState([]);
  const [textoBoton, setTextoBoton] = useState('Crear Nuevo Vehículo');
  const [colorBoton, setColorBoton] = useState('indigo');

  useEffect(() => {
    const obtenerArticulos = async () => {
      const options = { method: 'GET', url: 'https://vast-waters-45728.herokuapp.com/article/' };
      await axios
        .request(options)
        .then(function (response) {
          setArticulos(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    //obtener lista de vehículos desde el backend
    if (mostrarTabla) {
      obtenerArticulos();
    }
  }, [mostrarTabla]);

  useEffect(() => {
    if (mostrarTabla) {
      setTextoBoton('Crear Nuevo Artículo');
      setColorBoton('indigo');
    } else {
      setTextoBoton('Mostrar Todos los Articulos');
      setColorBoton('green');
    }
  }, [mostrarTabla]);
  return (
    <div className='flex h-full w-full flex-col items-center justify-start p-8'>
      <div className='flex flex-col'>
        <h2 className='text-3xl font-extrabold text-gray-900'>
          Página de administración de artículos
        </h2>
        <button
          onClick={() => {
            setMostrarTabla(!mostrarTabla);
          }}
          className={`text-white bg-${colorBoton}-500 p-5 rounded-full m-6 w-28 self-end`}
        >
          {textoBoton}
        </button>
      </div>
      {mostrarTabla ? (
        <TablaArticulos listaArticulos={articulos} />
      ) : (
        <FormularioCreacionArticulos
          setMostrarTabla={setMostrarTabla}
          listaArticulos={articulos}
          setArticulos={setArticulos}
        />
      )}
      <ToastContainer position='bottom-center' autoClose={5000} />
    </div>
  );
};

const TablaArticulos = ({ listaArticulos }) => {
  useEffect(() => {
    console.log('este es el listado de articulos en el componente de tabla', listaArticulos);
  }, [listaArticulos]);
  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Todos los vehículos</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre del artículo</th>
            <th>Marca del artículo</th>
            <th>Id del artículo</th>
          </tr>
        </thead>
        <tbody>
          {listaArticulos.map((articulo) => {
            return (
              <tr>
                <td>{articulo.name}</td>
                <td>{articulo.brand}</td>
                <td>{articulo.model}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const FormularioCreacionArticulos = ({ setMostrarTabla, listaArticulos, setArticulos }) => {
  const form = useRef(null);

  const submitForm = async (e) => {
    e.preventDefault();
    const fd = new FormData(form.current);

    const nuevoArticulo = {};
    fd.forEach((value, key) => {
      nuevoArticulo[key] = value;
    });

    const options = {
      method: 'POST',
      url: 'https://vast-waters-45728.herokuapp.com/article/create',
      headers: { 'Content-Type': 'application/json' },
      data: { name: nuevoArticulo.name, brand: nuevoArticulo.brand, model: nuevoArticulo.model },
    };

    await axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        toast.success('Artículo agregado con éxito');
      })
      .catch(function (error) {
        console.error(error);
        toast.error('Error al agregar un Artículo');
      });

    setMostrarTabla(true);
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='text-2xl font-extrabold text-gray-800'>Crear nuevo artículo</h2>
      <form ref={form} onSubmit={submitForm} className='flex flex-col'>
        <label className='flex flex-col' htmlFor='nombre'>
          Nombre del artículo
          <input
            name='name'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='text'
            placeholder='Corolla'
            required
          />
        </label>
        <label className='flex flex-col' htmlFor='marca'>
          Marca del artículo
          <select
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            name='brand'
            required
            defaultValue={0}
          >
            <option disabled value={0}>
              Seleccione una opción
            </option>
            <option>Lenovo</option>
            <option>Asus</option>
            <option>Samsung</option>
            <option>Sony</option>
            <option>None</option>
          </select>
        </label>
        <label className='flex flex-col' htmlFor='modelo'>
          Id del artículo
          <input
            name='model'
            className='bg-gray-50 border border-gray-600 p-2 rounded-lg m-2'
            type='number'
            min={100}
            max={200}
            placeholder='2014'
            required
          />
        </label>

        <button
          type='submit'
          className='col-span-2 bg-green-400 p-2 rounded-full shadow-md hover:bg-green-600 text-white'
        >
          Guardar articulo
        </button>
      </form>
    </div>
  );
};

export default Articulos;
