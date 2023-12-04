import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import "./pokemones.css"
import { Link } from "react-router-dom"

const Pokemones = () => {
    const [loading, setLoading ] = useState(true)
    const [ nextUrl, setNextUrl ] = useState()
    const [ previousUrl, setPreviousUrl ] = useState()
    const [ count, setCount ] = useState()
    const [ generations, setGenerations ] = useState([])
    const [ types, setTypes ] = useState([]) 
    const [ pokemones, setPokemones] = useState([])

    useEffect(()=>{
        fetchPokemones()
    },[loading])
    
    const fetchPokemones = async() => {

        const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=200&offset=0")
        const data = await resp.json()
        setCount(1)
        setPreviousUrl(data.previous)
        setNextUrl(data.next)
        const arrayPokemones = await Promise.all(data.results.map(async(pokemon)=>{
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            if(resp.status===404){
                return null;
            }

            const data = await resp.json()

            if(!data.sprites.front_default){
                return null;
            }

            const poke = {
                name: pokemon.name,
                img: data.sprites.front_default,
                id: data.id
            }

            return poke;
        }))
        const filteredPokemones = arrayPokemones.filter(pokemon => pokemon !== null);
        setPokemones(filteredPokemones);
        setLoading(false)
    }

    useEffect(()=>{
        Types()
        Generations()
    },[])

    const Types = async() => {
        const resp = await fetch("https://pokeapi.co/api/v2/type")
        const data = await resp.json();
        setTypes(data.results)
    }

    const fetchTypes = async (types) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/type/${types}`);
        const data = await resp.json();
        setPreviousUrl();
        setNextUrl();
        setCount();
    
        const arrayTypes = await Promise.all(data.pokemon.map(async (pokemon) => {
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`);
            if (resp.status === 404) {
                return null;
            }
            const data = await resp.json();
            if (!data.sprites.front_default) {
                return null;
            }
            const pokemones = {
                name: data.name,
                img: data.sprites.front_default,
                id: data.id
            };
            return pokemones;
        }));
    
        const filteredPokemones = arrayTypes.filter(pokemon => pokemon !== null);
        setPokemones(filteredPokemones);
    };
    

    const Generations = async() => {
        const resp = await fetch("https://pokeapi.co/api/v2/generation")
        const data = await resp.json()
        setGenerations(data.results)
    }

    const fetchGenerations = async(generation) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
        const data = await resp.json()
        setPreviousUrl()
        setNextUrl()
        setCount()
        const arrayTypes = Promise.all(data.pokemon_species.map(async(pokemon)=>{
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            if(resp.status===404){
                return null;
            }
            const data = await resp.json()
            if (!data.sprites.front_default) {
                return null;
            }
            const pokemones = {
                name: data.name,
                img: data.sprites.front_default
            }
            return pokemones
        }));
        const filteredPokemones = arrayTypes.filter(pokemon => pokemon !== null);
        setPokemones(filteredPokemones);
    }

    const limitPokemon = async(btn) => {
        let url = "url"
        if(btn==="next"){
            url = nextUrl;
        }
        if(btn==="previous"){
            url = previousUrl
        }
        const resp = await fetch(url)
            const data = await resp.json()
            setCount(count+1)
            setPreviousUrl(data.previous)
            setNextUrl(data.next)
            const arrayPokemones = await Promise.all(data.results.map(async(pokemon)=>{
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                if(resp.status===404){
                    return null;
                }
                const data = await resp.json()
                if(!data.sprites.front_default){
                    return null;
                }
                const poke = {
                    name: pokemon.name,
                    img: data.sprites.front_default,
                    id: data.id
                }
                
                return poke;
            }))
            const filteredPokemones = arrayPokemones.filter(pokemon => pokemon !== null);
            setPokemones(filteredPokemones);
    }

    return (
        <div className="containerGeneration">
            {loading ?
                <h1>cargando...</h1> :
                <div className="containerPokemones">
                    <h1>Pokemones</h1>
                    <div className="filtros">
                        <p>Filtrar por:</p>
                        {types.map((types) =>(
                            <button
                            key={types.name}
                            onClick={()=>{fetchTypes(types.name)}}
                            >
                                {types.name}
                            </button>
                        ))
                        }
                        {generations.map((generation) =>(
                            <button
                            key={generation.name}
                            onClick={()=>{fetchGenerations(generation.name)}}
                            >
                                {generation.name}
                            </button>
                        ))
                        }
                        <button onClick={()=>{fetchPokemones()}}>Borrar filtro</button>
                    </div>
                    <div className="paginateButtons">
                    {
                        previousUrl ?
                        <button onClick={()=>{limitPokemon("previous")}}>Anterior</button>
                        :
                        <></>
                    }
                    {
                        count ?
                        <p>{count}</p>
                        :
                        <></>
                    }
                    {
                        nextUrl ?
                        <button onClick={()=>{limitPokemon("next")}}>Siguiente</button>
                        :
                        <></>

                    }
                    </div>
                    <div className="containerCards">
                        {pokemones.map(pokemon=>(
                                <Link key={pokemon.name} to={`/pokedex/${pokemon.id}`}>
                                    <Card
                                    name={pokemon.name}
                                    img={pokemon.img}
                                    />
                                </Link>
                            ))}
                    </div>
                    <div className="paginateButtons">
                    {
                        previousUrl ?
                        <button onClick={()=>{limitPokemon("previous")}}>Anterior</button>
                        :
                        <></>
                    }
                    {
                        count ?
                        <p>{count}</p>
                        :
                        <></>
                    }
                    {
                        nextUrl ?
                        <button onClick={()=>{limitPokemon("next")}}>Siguiente</button>
                        :
                        <></>

                    }
                    </div>
                </div>
                }
        </div>
    )
}

export default Pokemones
