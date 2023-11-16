import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import "./pokemones.css"

const Pokemones = () => {
    const [loading, setLoading ] = useState(true)
    const [ generations, setGenerations ] = useState([])
    const [ selectedGeneration, setSelectedGeneration] = useState([])
    const [ pokemones, setPokemones] = useState([])

    useEffect(()=>{
        fetchPokemones()
    },[])

    const fetchPokemones = async() => {
        const resp = await fetch("https://pokeapi.co/api/v2/generation/")
        const data = await resp.json()
        setGenerations(data.results);
    }

    useEffect(() => {
        pokemonGeneration()
    }, [selectedGeneration]);

    const pokemonGeneration = async() => {
        if (selectedGeneration) {
            setLoading(true);
            const resp = await fetch(selectedGeneration)
            const data = await resp.json();
            console.log(data)

            const listPokemon = data.pokemon_species.map(async(pokemon) =>{
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)   
                if(resp.status===404){
                    const poke= {
                        name:pokemon.name
                    }
                    return poke;
                }
                const data = await resp.json()
                const poke= {
                    name: data.name,
                    img: data.sprites.front_default
                }
                return poke; 
            })
            const listAllPokemon = await Promise.all(listPokemon)
            console.log(await Promise.all(listAllPokemon))

            setPokemones(await Promise.all(listAllPokemon))
            setLoading(false)
        }
    }



    return (
        <div className="containerGeneration">
            <h1>Generations</h1>
            <select onChange={(e) => setSelectedGeneration(e.target.value)}>
                <option value="">Seleccione una generación</option>
                {generations.map((generation) => (
                    <option key={generation.name} value={generation.url}>
                        {generation.name}
                    </option>
                ))}
            </select>
            {loading ?
                <h1>cargando...</h1> :
                <div className="containerCards">
                  {pokemones.map(pokemon=>(
                            <Card
                            key={pokemon.name}
                            name={pokemon.name}
                            img={pokemon.img}
                        />
                    ))}
                </div>
                }
        </div>
    )
}

export default Pokemones
