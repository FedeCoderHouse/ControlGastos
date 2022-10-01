import { useState, useEffect } from "react"

import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ControlPresupuesto = ( {presupuesto, gastos} ) => {

    const [porcentaje, setPorcentaje] = useState(0);
    const [disponible, setDisponible] = useState(0);
    const [gastado, setGastado] = useState(0);

    // const calcularPorcentaje = () => {
    //     return gastado * 100 / presupuesto;
    // }


    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        const totalDisponible = gastos.reduce((total, gasto) => total - gasto.cantidad, presupuesto)

        // Calcular el porcentaje Gastado
        const nuevoPorcentaje = () => Math.floor(totalGastado * 100 / presupuesto)
        
        
        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje())
        }, 500)

    }, [gastos])

    const formatearCantidad = (monto) => {
        return monto.toLocaleString('en-US', {style:'currency', currency:'USD'})
    }

    return (
        <div className="control-presupuesto contenedor sombra dos-columnas">
            
            <div style={{ width: 200, height: 200 }}>
                <CircularProgressbar 
                    value={porcentaje} 
                    maxValue={100} 
                    text={`${porcentaje}%`} 
                    styles={buildStyles({
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: 'butt',
                        // Text size
                        textSize: '16px',
                        // How long animation takes to go from one percentage to another, in seconds
                        pathTransitionDuration: 0.5,
                        // Colors
                        pathColor: `rgba(59, 130, 246, ${porcentaje / 100})`,
                        textColor: 'rgb(59, 130, 246)',
                        trailColor: '#d6d6d6',
                        backgroundColor: '#3e98c7',
                      })}
                />
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