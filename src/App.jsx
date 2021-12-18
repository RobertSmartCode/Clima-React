import React, { Fragment, useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Formulario from './components/Formulario.jsx';
import Clima from './components/Clima.jsx';
import Error from './components/Error.jsx';

function App() {
   // state del formulario
   const [busqueda, guardarBusqueda] = useState({ 
    ciudad: '',
    pais: ''
});
const [consultar, guardarConsultar] = useState(false);
const [resultado, guardarResultado] = useState({});
const [error, guardarError] = useState(false);

const { ciudad, pais } = busqueda;

useEffect(() => {
  const consultarAPI = async () => {
console.log(ciudad);

      if(consultar) {
        const appId = '106ba69713b38158c9372d7d276343ab';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appId}`;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        // Detecta si hubo resultados correctos en la consulta

        if(resultado.cod === "404") {
            guardarError(true);
        } else {
            guardarError(false);
        }
      }
      
  }
  consultarAPI();
  // eslint-disable-next-line
},[consultar]);

let componente;
if(error) {
  componente = <Error mensaje="No hay resultados" />
} else {
  componente = <Clima 
                  resultado={resultado}
              />
}

  return (
    <Fragment>
    <Header 
      titulo='Clima React App'
    />

    <div className="contenedor-form">
        <div className="container">
            <div className="row">
                <div className="col m6 s12">
                    <Formulario 
                      busqueda={busqueda}
                      guardarBusqueda={guardarBusqueda}
                      guardarConsultar={guardarConsultar}
                    />
                </div>
                <div className="col m6 s12">
                    {componente}
                </div>
            </div>
        </div>
    </div>
</Fragment>
  )
}

export default App
