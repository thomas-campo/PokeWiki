import { useEffect, useState } from "react"
import Card from "../../components/Card/Card.jsx"

import "./home.css"
import { Link } from "react-router-dom"

const Home = () => {

  const [ pokemon , setPokemon ] = useState([])
  const [ pokemonId , setPokemonId ] = useState(1017)
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    fetchPokemon(pokemonId)
  },[pokemonId])

    const fetchPokemon = async (pokemonId) => {
      setLoading(true);
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      const data = await resp.json();
      console.log(data)
      const pokemon = {
        img:  data.sprites.other["official-artwork"].front_default,
        name: data.name.toUpperCase()
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
            <div>
              <h1>Bienvenido al Mundo Pokémon</h1>
              <p>¡Explora la vasta región de Pokémon y descubre a tus favoritos!</p>
              <section>
                <h2>Últimos Pokémon</h2>
                <div className="pokemon-card">
                  <Link to={`/pokedex/${pokemonId}`}>
                    <Card
                    name={pokemon.name}
                    img={pokemon.img}
                    />
                  </Link>
                </div>
                <div className="pokemon-card">
                  <img src="imagen_pokemon_2.jpg" alt="Nombre del Pokémon 2"/>
                  <h3>Nombre del Pokémon 2</h3>
                </div>
              </section>
              <section>
                  <h2>Descubre más sobre Pokémon</h2>
                  <p>Explora la Pokédex para conocer detalles sobre todos los Pokémon.</p>
                  <a href="/pokedex">Ir a la Pokédex</a>
              </section>
            </div>
        }
      </div>
    </>
  )
}

export default Home