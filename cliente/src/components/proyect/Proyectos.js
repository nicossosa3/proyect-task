import React, {useContext, useEffect} from 'react';
import Sidebar from '../layout/Sidebar';
import Barra from '../layout/Barra';
import FormTarea from '../tasks/FormTarea';
import ListadoTareas from '../tasks/ListadoTareas'
import AuthContext from '../../context/auth/authContext'

const Proyectos = () => {
    const authContext = useContext(AuthContext);
    const {usuarioAutenticado} = authContext;

    useEffect(() => {
      usuarioAutenticado();
    }, [])
    return (
      <div className="contenedor-app">
          <Sidebar />

          <div className="seccion-principal">
            <Barra />
              <main>
                <FormTarea />
                <div className="contenedor-tareas">
                  <ListadoTareas />

                </div>
              </main>
          </div>
      </div>
    );
  }
  
  export default Proyectos;