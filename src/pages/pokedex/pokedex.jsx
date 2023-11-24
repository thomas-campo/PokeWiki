import { useEffect, useState } from "react";
import Button from "../../components/Button/Button";
import { Link, useParams } from "react-router-dom";

const Pokedex = () => {
  let { pid } = useParams() ;
  const [ pokemon , setPokemon ] = useState([])
  const prevPokemonId = parseInt(pid) > 1 ? parseInt(pid) - 1 : 1;
  const nextPokemonId = parseInt(pid) > 0 ? parseInt(pid) + 1 : 1;
  const [ loading, setLoading ] = useState(true);
  
  useEffect(()=>{
    const pokeId = parseInt(pid) > 1 ? (pid) : 1;
    fetchPokemon(pokeId)
  },[pid])
  
    const fetchPokemon = async (pokemonId) => {
      setLoading(true);
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
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
        speed: data.stats[5].base_stat
      }
      console.log(pokemon)
      setPokemon(pokemon)
      setLoading(false)
    }
  
  return (
    <>
      <div className="containerPokemon">
        { loading ? 
          <>
          </>
          :
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
        }
      </div>
    </>
  )
}

export default Pokedex