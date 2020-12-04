import React from 'react'
import NuevoProtecto from '../proyect/NuevoProyecto';
import ListadoProyectos from '../proyect/ListadoProyectos';

const Sidebar = () => {
    return(
        <aside>
            <h1>MERN<span>Tasks</span></h1>

            <NuevoProtecto />

            <div className="proyectos">
                <h2>Tus Proyectos</h2>
                <ListadoProyectos />
            </div>
        </aside>
    )
}

export default Sidebar;