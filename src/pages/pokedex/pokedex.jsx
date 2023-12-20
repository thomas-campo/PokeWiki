import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PokemonEvo from "../pokemonEvo/pokemonEvo";
import Card from "../../components/Card/Card";

import "./pokedex.css"

const Pokedex = () => {
  let { pid } = useParams() ;
  const [ pokemon , setPokemon ] = useState([])
  const [ evoId , setEvoId ] = useState(null)
  const [ loading, setLoading ] = useState(true);
  const prevPokemonId = parseInt(pid) > 1 ? parseInt(pid) - 1 : 1017;
  const nextPokemonId = parseInt(pid) < 1017 ? parseInt(pid) + 1 : 1;
  
  useEffect(()=>{
    fetchPokemon(pid)
  },[pid])
  
  const fetchPokemon = async (pokemonId) => {
    setLoading(true);
    const pokeId = parseInt(pokemonId) > 1 ? (pokemonId) : 1;
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`)
    const data = await resp.json();
    const pokemon = {
      img:  data.sprites.other["official-artwork"].front_default,
      name: data.name.toUpperCase(),
      id: data.id,
      hp: data.stats[0].base_stat,
      atack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      atackSp: data.stats[3].base_stat,
      defenseSp: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      url: data.species.url
    }
    setPokemon(pokemon)
    setLoading(false)
  }

  useEffect(()=>{
    fetchPokeEvo(pokemon)
  },[pokemon])
  
  const fetchPokeEvo = async(pokemon) => {
    const resp = await fetch(pokemon.url)
    const data = await resp.json()
    const resp2 = await fetch(data.evolution_chain.url)
    const data2 = await resp2.json()
    setEvoId(data2.id)
  } 

  return (
    <>
      <div className="container">
        { loading ? 
          <>
          </>
          :
            <div>
               <div className="containerPokedex">
                  <div className="cardPokedex">
                      <div className="imgPokedex">
                        <img src={pokemon.img} alt={pokemon.name} />
                      </div>
                      <div className="namePokedex">
                        <h4>#{pokemon.id} {pokemon.name}</h4>
                      </div>
                  </div>
                </div>
                <div className="divButtons">
                  <Link className="button" to={`/pokedex/${prevPokemonId}`}>PREV</Link>
                  <Link className="button" to={`/pokedex/${nextPokemonId}`}>NEXT</Link>
                </div>
                <div className="divStats">
                  <p className="vida">Hp: {pokemon.hp}</p>
                  <p className="ataque">Ataque: {pokemon.atack}</p>
                  <p className="defensa">Defensa: {pokemon.defense}</p>
                  <p className="ataqueEspecial">Ataque Especial: {pokemon.atackSp}</p>
                  <p className="defensaEspecial">Defensa Especial: {pokemon.defenseSp}</p>
                  <p className="velocidad">Velocidad: {pokemon.speed}</p>
                </div>
                {
                  evoId ? (
                    <div>
                      <PokemonEvo pokeId={evoId}/>
                    </div>
                    ) :
                    <></>
                }
            </div>
        }
      </div>
    </>
  )
}

export default Pokedex