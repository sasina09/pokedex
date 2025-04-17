import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const Pokemondex = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const callPokemon = async () => {
    try {
      const response = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const pokemonList = response.data.results; //1

      const detailedPokemonList = await Promise.all(
        //2
        pokemonList.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          return {
            name: pokemon.name,
            img: response.data.sprites.front_default,
          };
        })
      );

      setPokemonList(detailedPokemonList);
    } catch (error) {
      console.log("wrong!");
    }
  };

  return (
    <div className="Container">
    <div className="d-flex flex-column align-items-center justify-content-center vh-100" >
      <button
        className="btn btn-lg btn-danger mb-4 px-4 py-2 shadow-lg fw-bold"
        onClick={callPokemon}
      >
        Get Pokemon List
      </button>
      <div className="mt-100">
      <div className="container">
      
        <div className="row justify-content-center">
          {pokemonList.map((pokemon, index) => (
            <div key={index} className="col-md-2 col-sm-6 mb-3">
              <div className="card text-center p-3 shadow-lg">
                <div className="card-title fw-bold text-capitalize">
                  {pokemon.name}
                </div>
                <img
                  src={pokemon.img}
                  className="card-img-top"
                  alt={pokemon.name}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
    </div>
    </div>
  );
};

export default Pokemondex;