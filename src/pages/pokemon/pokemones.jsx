import { useEffect, useState } from "react"
import Button from "../../components/Button/Button"
import "./pokemon.css"


const Pokemones = () => {
  
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
    }

    useEffect(()=>{
      fetchEvolution(pokemonId)
    },[pokemonId])

    const fetchEvolution = async (pokemonId) =>{
      const resp = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokemonId}/`)
      const data = await resp.json();
      console.log(data)
      // const pokemones = {
      //   evo1: ,
      //   evo2: ,
      //   evo3: 
      // }
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
            />
          </div>
          <div className="pokedexCard">
            <div className="pokeInfo">
              <h4 className="pokemonName">{pokemon.name}</h4>
              <h4 className="pokemonId">POKEDEX N°{pokemonId}</h4>
            </div>
            <div className="divImg">
            <img className="pokemonImg" src={pokemon.img} alt={pokemon.name} />
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
          <div className="buttonContainer2">
            <Button className="button2"
            handleButton={()=>{nextButton()}}
            />
          </div>
        </div>

      </div>
    </>
  )
}

export default Pokemones