import { useState, useEffect } from 'react'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

import Header from './components/Header'
import Modal from './components/Modal';
import ListadoGastos from './components/ListadoGastos';
import { generarId } from './helpers';

function App() {

  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([]);

  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if(Object.keys(gastoEditar).length > 0){
      handleNuevoGasto();
    } else {
      console.log(Object.keys(gastoEditar))
    }

  }, [gastoEditar]);

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
              <ListadoGastos 
                gastos={gastos}
                setGastoEditar={setGastoEditar}
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
