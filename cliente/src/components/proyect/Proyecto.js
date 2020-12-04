import React, {useContext} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const Proyecto = ({proyecto}) => {
    const proyectosContext = useContext(proyectoContext);
    const tareasContext = useContext(tareaContext);

    const {proyectoActual} = proyectosContext;
    const {obtenerTareasProyecto} = tareasContext;
    const seleccionarProyecto = id => {
        proyectoActual(id);
        obtenerTareasProyecto(id);

    }
    return(
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => seleccionarProyecto(proyecto._id)}
            >{proyecto.nombre}</button>
        </li>
    )

}
export default Proyecto