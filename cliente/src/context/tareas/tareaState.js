import React, {useReducer} from 'react';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
import clienteAxios from '../../config/axios';
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        errorTarea: false,
        tareaSeleccionada: null

    }

    const [state, dispatch] = useReducer(tareaReducer, initialState);


    const obtenerTareasProyecto = async proyecto => {

        console.log(proyecto);

        try {
            const resultado = await clienteAxios.get('/api/tareas', { params: { proyecto }});
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (error) {
            console.log(error);
        }
    }

    const agregarTarea = async tarea => {
        console.log(tarea);
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log('resu',resultado.data.tarea);
            dispatch({
                type: AGREGAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    const validarTarea = () => {
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    const eliminarTarea = async (id, proyecto) => {
        
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: { proyecto }});
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })    
        } catch (error) {
            console.log(error);
        }
    }

    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const actualizarTarea = async tarea => {
        try {
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);
            console.log(resultado)

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch (error) {
            console.log(error)
        }
        
    }
    
    const limpiarTarea = () => {
        dispatch({
            type: LIMPIAR_TAREA
        })
    }
    return (
        <tareaContext.Provider 
            value={{
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareasProyecto,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
};

export default TareaState;