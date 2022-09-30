import Gasto from "./Gasto";

const ListadoGastos = ( {gastos} ) => {

    return (
        <div className="listado-gastos contenedor">
            <h2>{gastos.length ? <p>Desde Listado de gastos</p> : null}</h2>
            {gastos.map(gasto => (
                <Gasto 
                    key={gasto.id}
                    gasto={gasto}
                />
            ))}
        </div>
    )
}

export default ListadoGastos;