import { useState, useEffect } from 'react'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import Filtros from './components/Filtros';
import { generarId } from './helpers';

function App() {

  const [presupuesto, setPresupuesto] = useState(Number(localStorage.getItem('presupuesto' ?? 0)));
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState(JSON.parse(localStorage.getItem('gastos')) ?? []);

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');

  const [gastosFiltrado, setGastosFiltrado] = useState([]);
  

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      handleNuevoGasto();
    } else {
      //console.log(Object.keys(gastoEditar))
    }

  }, [gastoEditar]);

  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0);
  }, [presupuesto]);

  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;
    console.log(presupuestoLS)

    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])
  }, [gastos]);

  useEffect(() => {
    if(filtro){
      setGastosFiltrado(gastos.filter((gasto) => gasto.categoria == filtro))
    } else {
      setGastosFiltrado([...gastos])
    }
  }, [filtro]);

  const handleNuevoGasto = () => {
    setModal(true);

    setTimeout(() => {
      setAnimarModal(true);
    }, 60)
  }

  const guardarGasto = (gasto) => {
    if(gasto.id){
      // Actualizar
      const gastosActualizados = gastos.map((gastoActual) => {
        if(gastoActual.id == gasto.id){
          return gasto
        } else {
          return gastoActual
        }
      })
      setGastos(gastosActualizados);
      setGastoEditar({})
    } else {
      // Nuevo Gasto
      gasto.id = generarId();
      gasto.fecha = new Date();
      setGastos([...gastos, gasto]);
    }

    
    setAnimarModal(false);
    setTimeout(() => {
        setModal(false);
    }, 450);
  }

  const eliminarGasto = (idEliminar) => {
    const nuevoArray = gastos.filter((gasto) => gasto.id != idEliminar)
    setGastos(nuevoArray);
  }


  return (
    <div className={modal ? "fijar" : ""}>
      <Header 
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        gastos={gastos}
        />

        {isValidPresupuesto && (
          <>
            <main>
              <Filtros 
                filtro={filtro}
                setFiltro={setFiltro}
              />
              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrado={gastosFiltrado}
              />
            </main>
            <div className='nuevo-gasto'>
              <img
                src={IconoNuevoGasto}
                alt="icono nuevo gasto"
                onClick={handleNuevoGasto}
              />
            </div>
          </>
        )}

        {modal && <Modal 
                    setModal={setModal}
                    animarModal={animarModal} 
                    setAnimarModal={setAnimarModal} 
                    guardarGasto={guardarGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                  />}
        
    </div>
  )
}

export default App
