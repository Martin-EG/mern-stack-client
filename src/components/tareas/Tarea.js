import React, { useContext,  } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';

const Tarea = ({tarea}) => {

    // Extraer si un proyecto esta activo
    const proyectosContext = useContext(proyectoContext);
    const { proyecto } = proyectosContext;

    // Obtener el state de las tareas
    const tareasContext = useContext(tareaContext);
    const { tareaSeleccionada, eliminarTarea, actualizarTarea, obtenerTareas, guardarTareaActual } = tareasContext;

    // Extraer el proyecto actual
    const [proyectoActual] = proyecto;

    // Funcion que se ejecuta cuando el usuario presiona el boton de eliminar tarea
    const tareaEliminar = id => {
        eliminarTarea(id, proyectoActual._id);
        obtenerTareas(proyectoActual._id);
    }

    // Funcion que modifica el estado de las tareas
    const cambiarEstado = tarea => {
        if(tarea.status) {
            tarea.status = false;
        }
        else {
            tarea.status = true;
        }

        actualizarTarea(tarea);        
    }

    // Agrega una tarea actual cuando el usuario desea editarla 
    const seleccionarTarea = tarea => {
        guardarTareaActual(tarea);
    }

    return (  
        <li className="tarea sombra">
            <p>{ tarea.nombre }</p>
            <div className="estado">
                {tarea.status 
                    ?
                        (
                            <button 
                                type="button"
                                className="completo"
                                onClick={() => cambiarEstado(tarea)}
                            >Completo</button>
                        )
                    : 
                    (
                        <button 
                            type="button"
                            className="incompleto"
                            onClick={() => cambiarEstado(tarea)}
                        >Incompleto</button>
                    )
                }
            </div>

            <div className="acciones">
                <button 
                    type="button"
                    className="btn btn-primario"
                    onClick={() => seleccionarTarea(tarea)}
                >Editar</button>
                <button 
                    type="button"
                    className="btn btn-secundario"
                    onClick={() => {tareaEliminar(tarea._id)}}
                >Eliminar</button>
            </div>
        </li>
    );
}
 
export default Tarea;