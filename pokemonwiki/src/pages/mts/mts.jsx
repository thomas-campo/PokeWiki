import { useEffect, useState } from "react"
import Button from "../../components/Button/Button"
import "./mts.css"

const Mts = () => {

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
      <div className="containerPokemon">
        <div className="cardPokemon">
          <div className="buttonContainer1">
            <Button className="button1"
            handleButton={()=>{prevButton()}}
            text="anterior"/>
          </div>
          <div className="pokedexCard">
            <div className="flexBox">
              <h3 className="pokemonName">{pokemon.name}</h3>
              <h3 className="pokemonId">Pokedex N°{pokemonId}</h3>
            </div>
            <div className="circle">
              <img className="pokemonImg" src={pokemon.img} alt={pokemon.name} />
            </div>
          </div>
          <div className="buttonContainer2">
            <Button className="button2"
            handleButton={()=>{nextButton()}} text="siguiente"/>
          </div>
        </div>
        <div className="pokedexStats">
          <p>ataque:{pokemon.atack}</p>
          <p>defensa:{pokemon.defense}</p>
          <p>ataque especial:{pokemon.atackSp}</p>
          <p>defensa especial:{pokemon.defenseSp}</p>
          <p>velocidad:{pokemon.speed}</p>
        </div>

      </div>
    </>
  )
}

export default Mts