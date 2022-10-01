import { useState, useEffect } from "react"

const ControlPresupuesto = ( {presupuesto, gastos} ) => {

    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = gastos.reduce((total, gasto) => total - gasto.cantidad, presupuesto)

        setGastado(totalGastado)
        setDisponible(totalDisponible)
    }, [gastos])

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
                    <span>Disponible: </span>{formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado: </span>{formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
}

export default ControlPresupuesto;