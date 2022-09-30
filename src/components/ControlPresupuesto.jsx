

const ControlPresupuesto = ( {presupuesto} ) => {

    const formatearCantidad = (monto) => {
        return monto.toLocaleString('en-US', {style:'currency', currency:'USD'})
    }

    return (
        <div className="control-presupuesto contenedor sombra dos-columnas">
            
            <div>
                <p>gráfica aquii</p>
            </div>
            <div className="contenido-presupuesto">
                <p>
                    <span>Presupuesto: </span>{formatearCantidad(presupuesto)}
                </p>
                <p>
                    <span>Disponible: </span>{formatearCantidad(0)}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(0)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto;