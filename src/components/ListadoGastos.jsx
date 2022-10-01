import Gasto from "./Gasto";

const ListadoGastos = ( {gastos, setGastoEditar} ) => {

    return (
        <div className="listado-gastos contenedor">
            {gastos.length ? (
                gastos.map(gasto => (
                    <Gasto 
                        key={gasto.id}
                        gasto={gasto}
                        setGastoEditar={setGastoEditar}
                    />
                ))
            ): (
                <h2>No hay gastos aún</h2>
            )}
            
        </div>
    )
}

export default ListadoGastos;