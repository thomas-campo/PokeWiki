import { useEffect, useState } from "react"
import Card from "../../components/Card/Card.jsx"

import "./home.css"
import { Link } from "react-router-dom"

const Home = () => {

  const [ pokemon , setPokemon ] = useState([])
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    fetchPokemon()
  },[])

    const fetchPokemon = async () => {
      setLoading(true);
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${1017}/`)
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
                  <Link to={`/pokedex/${1017}`}>
                    <Card
                    content={`${pokemon.name}`}
                    img={pokemon.img}
                    />
                  </Link>
                </div>
              </section>
              <section>
                  <h2>Descubre más sobre Pokémon</h2>
                  <h4>Explora la Pokédex para conocer detalles sobre todos los Pokémon.</h4>
                  <a href="/pokedex/1"><button>Ir a la Pokédex</button></a>
              </section>
            </div>
        }
      </div>
    </>
  )
}

export default Home