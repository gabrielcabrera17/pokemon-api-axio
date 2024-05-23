import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import Pokemon from '../Pokemon/Pokemon';

const  App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [busquedaPokemon, setBusquedaPokemon] = useState("");
  const [pokemonFiltrado, setPokemonFiltrado] = useState([]);
  const [mostrar, setMostrar] = useState(false);
 
  const ref = useRef(null);
  

  useEffect(()=>{
    const conexionPokemonApi = async ()  =>{
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=5";
    
    axios.get(URL).then(response  =>{
      const datos = response.data;
      console.log(datos);
      setPokemon(datos.results);
      setPokemonFiltrado(datos.results);
      setMostrar(true);
    }).catch( error =>{
      console.log("Error en la peticion");
    });
    
    /*const response = await fetch(URL);
    const data = await response.json();
    console.log(data);*/
    }
    ref.current = conexionPokemonApi;
    
    
    
  },[]);

  const pokemonBuscado = () =>{
        const filtrado = pokemon.filter( p => p.name.toLowerCase().includes(busquedaPokemon.toLowerCase()));
        setPokemonFiltrado(filtrado);
  }
  
  
  const mostrarPokemon = () => {
    if(ref.current){
      ref.current();
    }
  }

  return (
    <div className="App">
      <h1>Api pokemon con la biblioteca Axio</h1>
      <button onClick={mostrarPokemon} disabled={mostrar}>Fetch Pokemon</button>
      <input id='pokomonABuscar'
             name='pokomonABuscar'
             type='text'
             value={busquedaPokemon}
             onChange={(event) => setBusquedaPokemon(event.target.value)}  
      />
      <button onClick={pokemonBuscado}> Buscar Pokemon</button>
      {pokemonFiltrado.map((pokemon,index)=>{
        return( 
        <Pokemon 
        key={index}
        name = {pokemon.name}
        />
        );
       
      })};
    </div>
  );
}

export default App;
