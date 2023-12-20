import { useEffect, useState } from "react"
import Card from "../../components/Card/Card.jsx"

import "./home.css"
import { Link } from "react-router-dom"

const Home = () => {

  const [ pokemones , setPokemones ] = useState([])
  const [ loading, setLoading ] = useState(true);

  useEffect(()=>{
    fetchPokemon()
  },[])

    // const fetchPokemon = async () => {
    //   setLoading(true);
    //   const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${1017}/`)
    //   const data = await resp.json();
    //   console.log(data)
    //   const pokemon = {
    //     img:  data.sprites.other["official-artwork"].front_default,
    //     name: data.name.toUpperCase()
    //   }
    //   console.log(pokemon)
    //   setPokemon(pokemon)
    //   setLoading(false)
    // }

    const fetchPokemon = async () => {
      const generarNumeroRandom = () => {
        const numeroRandom = Math.floor(Math.random() * 1017) + 1;
        return numeroRandom;
      };
      const num1 = generarNumeroRandom();
      const num2 = generarNumeroRandom();
      const num3 = generarNumeroRandom();
      const num4 = generarNumeroRandom();
      const num5 = generarNumeroRandom();
      const resp1 = await fetch(`https://pokeapi.co/api/v2/pokemon/${num1}/`)
      const data1 = await resp1.json();
      const resp2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${num2}/`)
      const data2 = await resp2.json();
      const resp3 = await fetch(`https://pokeapi.co/api/v2/pokemon/${num3}/`)
      const data3 = await resp3.json();
      const resp4 = await fetch(`https://pokeapi.co/api/v2/pokemon/${num4}/`)
      const data4 = await resp4.json();
      const resp5 = await fetch(`https://pokeapi.co/api/v2/pokemon/${num5}/`)
      const data5 = await resp5.json();
      const pokemon1 = {
        img:  data1.sprites.other["official-artwork"].front_default,
        name: data1.name.toUpperCase(),
        id: data1.id
      }
      const pokemon2 = {
        img:  data2.sprites.other["official-artwork"].front_default,
        name: data2.name.toUpperCase(),
        id: data2.id
      }
      const pokemon3 = {
        img:  data3.sprites.other["official-artwork"].front_default,
        name: data3.name.toUpperCase(),
        id: data3.id
      }
      const pokemon4 = {
        img:  data4.sprites.other["official-artwork"].front_default,
        name: data4.name.toUpperCase(),
        id: data4.id
      }
      const pokemon5 = {
        img:  data5.sprites.other["official-artwork"].front_default,
        name: data5.name.toUpperCase(),
        id: data5.id
      }
      const arrayPokemones = [];
      arrayPokemones.push(pokemon1)
      arrayPokemones.push(pokemon2)
      arrayPokemones.push(pokemon3)
      arrayPokemones.push(pokemon4)
      arrayPokemones.push(pokemon5)
      setPokemones(arrayPokemones)
      console.log(arrayPokemones)
      setLoading(false)
    }

  return (
    <>
      <div className="containerHome">
        { loading ? 
                <>
                  <div>
                    <h2>Cargando...</h2>
                  </div>
                </>
                :
            <div>
              <section className="seccion1">
                <h1>Bienvenido al Mundo Pokémon</h1>
                <p>¡Explora la vasta región de Pokémon y descubre a tus favoritos!</p>
              </section>
              <section className="seccion2">
                <h2 className="subTitulo">Pokémones random:</h2>
                <div className="containerCardsHome">
                        {pokemones.map(pokemon=>(
                                <Link className="linkCard" key={pokemon.name} to={`/pokedex/${pokemon.id}`}>
                                    <Card
                                    className={`cardPokemon ${loading ? 'loading' : ''}`}
                                    name={pokemon.name}
                                    content={`${pokemon.name} #${pokemon.id}`}
                                    img={pokemon.img}
                                    id={pokemon.id}
                                    />
                                </Link>
                            ))}
                    </div>
              </section>
              <section className="seccion3">
                  <h2>Descubre más sobre Pokémon</h2>
                  <h4>Explora la Pokédex para conocer detalles sobre todos los Pokémon.</h4>
                  <a href="/pokedex/1"><button className="buttonPokedex">Ir a la Pokédex</button></a>
              </section>
            </div>
        }
      </div>
    </>
  )
}

export default Home