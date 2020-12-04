import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const FormTarea = () => {
    const proyectosContext = useContext(proyectoContext);
    const tareasContext = useContext(tareaContext);
    const [tarea, guardarTarea] = useState({
        nombre: ''
    })

    const {proyecto} = proyectosContext;
    const { errorTarea, 
            agregarTarea, 
            obtenerTareasProyecto, 
            validarTarea, 
            tareaSeleccionada,
            actualizarTarea,
            limpiarTarea 
        } = tareasContext;

    useEffect(()=>{
        if(tareaSeleccionada) {
            guardarTarea(tareaSeleccionada);
        } else {
            guardarTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada]);

    if (!proyecto) return null;

    const [proyectoActual] = proyecto;
    const {nombre} = tarea;

    const handleChange = e => {
        guardarTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }
    const onSubmit = e => {
        e.preventDefault();

        if(nombre.trim() === '') {
            validarTarea();
            return;
        }

        if(tareaSeleccionada) {
            actualizarTarea(tarea);
            limpiarTarea();
        } else {
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        }

        
        obtenerTareasProyecto(proyectoActual._id);
        
        guardarTarea({
            nombre: ''
        });


    }
    return (
            <div className="formulario">
                <form
                    onSubmit={onSubmit}
                >
                    <div className="contenedor-input">
                        <input 
                            type="text"
                            className="input-text"
                            placeholder="Nombre Tarea..."
                            name="nombre"
                            value={nombre}
                            onChange={handleChange}
                        />
                    </div>
    
                    <div className="contenedor-input">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-submit btn-block"
                            value={tareaSeleccionada ? 'Editar Tarea': 'Agregar Tarea'}
                        />
                    </div>
                </form>
            {errorTarea ? <p className="mensaje error">Es necesario agregar un numbre de tarea</p> : null}
            </div>
    )
}

export default FormTarea