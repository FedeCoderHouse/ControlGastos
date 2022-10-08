import Gasto from "./Gasto";

const ListadoGastos = ( {gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrado} ) => {

    return (
        <div className="listado-gastos contenedor">
            {gastos.length ? (
                filtro ? (
                    gastosFiltrado == '' ? (
                        <h2>No hay gastos de {filtro}</h2>
                    ) : (
                        gastosFiltrado.map(gasto => (
                            <Gasto 
                                key={gasto.id}
                                gasto={gasto}
                                setGastoEditar={setGastoEditar}
                                eliminarGasto={eliminarGasto}
                            />
                        ))
                    )
                ) : (
                    gastos.map(gasto => (
                        <Gasto 
                            key={gasto.id}
                            gasto={gasto}
                            setGastoEditar={setGastoEditar}
                            eliminarGasto={eliminarGasto}
                        />
                    ))
                )

                
            ): (
                <h2>No hay gastos aún</h2>
            )}
            
        </div>
    )
}

export default ListadoGastos;