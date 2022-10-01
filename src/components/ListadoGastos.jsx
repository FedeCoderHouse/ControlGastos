import Gasto from "./Gasto";

const ListadoGastos = ( {gastos} ) => {

    return (
        <div className="listado-gastos contenedor">
            {gastos.length ? (
                gastos.map(gasto => (
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                    />
                ))
            ): (
                <h2>No hay gastos aún</h2>
            )}
            
        </div>
    )
}

export default ListadoGastos;