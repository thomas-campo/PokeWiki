import { useEffect, useState } from "react"
import Button from "../../components/Button/Button"
import "./home.css"

const Home = () => {

  const [ pokemon , setPokemon ] = useState([])
  const [ pokemonId , setPokemonId ] = useState(1)
  
  useEffect(()=>{
    fetchPokemon(pokemonId)
  },[pokemonId])

  const fetchPokemon = async (pokemonId) => {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
    const data = await resp.json();
    console.log(data)
    const pokemon = {
      img:  data.sprites.other["official-artwork"]

      .front_default,
      name: data.name,
      hp: data.stats[0].base_stat,
      atack: data.stats[1].base_stat,
      defense: data.stats[2].base_stat,
      atackSp: data.stats[3].base_stat,
      defenseSp: data.stats[4].base_stat,
      speed: data.stats[5].base_stat
    }
    console.log(pokemon)
    setPokemon(pokemon)
  }

  const prevButton = () => {
    (pokemonId === 1)?
    setPokemonId(1):
    setPokemonId(pokemonId-1)
  }

  const nextButton = () => {
    (pokemonId === 1017)?
    setPokemonId(1017):
    setPokemonId(pokemonId+1)
  }

return (
  <>
    <div className="cardPokemon">

      <h2>{pokemon.name}</h2>
      <img src={pokemon.img} alt={pokemon.name} />
      <div className="divButton">
        <Button
        className="button1" 
        handleButton={()=>{prevButton()}}
        text="anterior"
        />
        <h3>
        Pokedex: N°{pokemonId}
        </h3>
        <Button 
        className="button2"
        handleButton={()=>{nextButton()}} 
        text="siguiente"
        />
      </div>

    </div>
      <h2 className="nameStats">Estadisticas</h2>
    <div className="stats">
      <h4>ataque:{pokemon.atack}</h4>
      <h4>defensa:{pokemon.defense}</h4>
      <h4>ataque especial:{pokemon.atackSp}</h4>
      <h4>defensa especial:{pokemon.defenseSp}</h4>
      <h4>velocidad:{pokemon.speed}</h4>

    </div>
  </>
)
}

export default Home