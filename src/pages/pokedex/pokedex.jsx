import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PokemonEvo from "../pokemonEvo/pokemonEvo";

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
    console.log(data)
    const pokemon = {
      img:  data.sprites.other["official-artwork"].front_default,
      name: data.name.toUpperCase(),
      hp: data.stats[0].base_stat,
      atack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      atackSp: data.stats[3].base_stat,
      defenseSp: data.stats[4].base_stat,
      speed: data.stats[5].base_stat,
      url: data.species.url
    }
    console.log(pokemon)
    setPokemon(pokemon)
    setLoading(false)
  }

  useEffect(()=>{
    fetchPokeEvo(pokemon)
  },[pokemon])
  
  const fetchPokeEvo = async(pokemon) => {
    const resp = await fetch(pokemon.url)
    const data = await resp.json()
    console.log(data.evolution_chain.url)
    const resp2 = await fetch(data.evolution_chain.url)
    const data2 = await resp2.json()
    console.log(data2,"data2")
    setEvoId(data2.id)
  } 

  return (
    <>
      <div className="containerPokemon">
        { loading ? 
          <>
          </>
          :
          <div>
            <div className="cardPokemon">
            <div className="divButton">
              <Link to={`/pokedex/${prevPokemonId}`}>PREV</Link>
            </div>
            <div className="pokedexCard">
              <div className="divImg">
              <img className="pokemonImg" src={pokemon.img} alt={pokemon.name} />
              </div>
              <div className="pokeInfo">
                <h4 className="pokemonName">{pokemon.name}</h4>
                <h4 className="pokemonId">POKEDEX N°{pid}</h4>
              </div>
              <div className="pokedexStats">
                <p className="hp">Hp: {pokemon.hp}</p>
                <p className="statsAtack">Ataque: {pokemon.atack}</p>
                <p className="statsDef">Defensa: {pokemon.defense}</p>
                <p className="statsAtackSp">Ataque Especial: {pokemon.atackSp}</p>
                <p className="statsDefSp">Defensa Especial: {pokemon.defenseSp}</p>
                <p className="statsSpeed">Velocidad: {pokemon.speed}</p>
              </div>
            </div>
            <div className="divButton">
              <Link to={`/pokedex/${nextPokemonId}`}>NEXT</Link>
            </div>
            </div>
            {evoId ? (
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