import { useState } from 'react'
import Listado from './componentes/Listado'
import { getAnotaciones, deleteAnotaciones } from './servicios/APIRest'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Formulario from './componentes/Formulario'

export async function loader() {
  const datos = getAnotaciones()
  return datos
}
function App() {

  //con esto estamos traiendo los datos del loader ya que el loader por si solo no puede pasar los datos a un componente
  const datos = useLoaderData()

  const navigate=useNavigate();
  const dentroEliminar = async (id) => {

    if (await deleteAnotaciones(id) === 201) {

      Swal.fire({
        icon: 'success',
        title: 'Ok',
        text: "Se eliminó el registro exitosamente"
      });
      navigate(0);

    } else {
      return Swal.fire({
        icon: 'error',
        title: 'Ops',
        text: "No es posible eliminar el registro en este momento"
      });
    }
  }
  const handleEliminar = (id) => {
    Swal.fire({
      title: '¿Realmente desea eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'NO',
      confirmButtonText: 'SI'
    }).then((result) => {
      if (result.isConfirmed) {
        dentroEliminar(id);
      }

    });

  };
  return (
    <>
      <div className='container mt-0'>
        <div className='card mb-3'>
          <div className='card-header text-white bg-danger'>
            <h3>Anotaciones con Axios, Tiny, bootstrap, y API Rest (Obtener Token automaticamente)</h3>
          </div>
          <div className='card-body'>
            <Formulario />
            <Listado 
              datos={datos} 
              handleEliminar={handleEliminar}
              />
          </div>
        </div>
      </div>
    </>
  )
}

export default App
