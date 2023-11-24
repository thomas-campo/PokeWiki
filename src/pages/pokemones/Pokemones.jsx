import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import "./pokemones.css"
import Button from "../../components/Button/Button"

const Pokemones = () => {
    const [loading, setLoading ] = useState(true)
    const [ nextUrl, setNextUrl ] = useState()
    const [ previousUrl, setPreviousUrl ] = useState()
    const [ count, setCount ] = useState()
    // const [ limitPoke, setLimitPoke ] = useState([])
    const [ generations, setGenerations ] = useState([])
    // const [ generationsOn, setGenerationsOn ] = useState(false)
    const [ types, setTypes ] = useState([]) 
    // const [ typesOn, setTypesOn ] = useState(false) 
    // const [ selectedGeneration, setSelectedGeneration] = useState([])
    const [ pokemones, setPokemones] = useState([])

    useEffect(()=>{
        fetchPokemones()
    },[loading])
    
    const fetchPokemones = async() => {

        const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
        const data = await resp.json()
        console.log(data.results)
        console.log(data)
        setCount(1)
        setPreviousUrl(data.previous)
        setNextUrl(data.next)
        const arrayPokemones = data.results.map(async(pokemon)=>{
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            if(resp.status===404){
                const poke= {
                    name:pokemon.name
                }
                return poke;
            }
            const data = await resp.json()

            const poke = {
                name: pokemon.name,
                img: data.sprites.front_default
            }

            return poke;
        })
        setPokemones(await Promise.all(arrayPokemones))
        setLoading(false)
    }

    useEffect(()=>{
        Types()
        Generations()
    },[])

    const Types = async() => {
        const resp = await fetch("https://pokeapi.co/api/v2/type")
        const data = await resp.json();
        console.log(data.results)
        setTypes(data.results)
    }

    const fetchTypes = async(types) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/type/${types}`)
        const data = await resp.json()
        setPreviousUrl()
        setNextUrl()
        setCount()
        console.log(data.pokemon);
        const arrayTypes = data.pokemon.map(async(pokemon)=>{
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.pokemon.name}`)
            if(resp.status===404){
                const pokemones= {
                    name:pokemon.name
                }
                return pokemones;
            }
            const data = await resp.json()
            const pokemones = {
                name: data.name,
                img: data.sprites.front_default
            }
            return pokemones
        })
        console.log(await Promise.all(arrayTypes),"arrayTypes")
        setPokemones(await Promise.all(arrayTypes))
    }

    const Generations = async() => {
        const resp = await fetch("https://pokeapi.co/api/v2/generation")
        const data = await resp.json()
        console.log(data.results)
        setGenerations(data.results)
    }

    const fetchGenerations = async(generation) => {
        const resp = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`)
        const data = await resp.json()
        setPreviousUrl()
        setNextUrl()
        setCount()
        console.log(data.pokemon_species)
        const arrayTypes = data.pokemon_species.map(async(pokemon)=>{
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            if(resp.status===404){
                const pokemones= {
                    name:pokemon.name
                }
                return pokemones;
            }
            const data = await resp.json()
            const pokemones = {
                name: data.name,
                img: data.sprites.front_default
            }
            return pokemones
        })
        console.log(await Promise.all(arrayTypes),"arrayTypes")
        setPokemones(await Promise.all(arrayTypes))
    }

    const limitPokemon = async(btn) => {
        if(btn==="next"){
            const resp = await fetch(nextUrl)
            const data = await resp.json()
            console.log(data,"data del next")
            setCount(count+1)
            setPreviousUrl(data.previous)
            setNextUrl(data.next)
            const arrayPokemones = data.results.map(async(pokemon)=>{
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                if(resp.status===404){
                    const poke= {
                        name:pokemon.name
                    }
                    return poke;
                }
                const data = await resp.json()
                
                const poke = {
                    name: pokemon.name,
                    img: data.sprites.front_default
                }
                
                return poke;
            })
            setPokemones(await Promise.all(arrayPokemones))
        }else if(btn==="previous"){
            const resp = await fetch(previousUrl)
            const data = await resp.json()
            console.log(data,"data del previous")
            setCount(count-1)
            setPreviousUrl(data.previous)
            setNextUrl(data.next)
            const arrayPokemones = data.results.map(async(pokemon)=>{
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                if(resp.status===404){
                    const poke= {
                        name:pokemon.name
                    }
                    return poke;
                }
                const data = await resp.json()
                
                const poke = {
                    name: pokemon.name,
                    img: data.sprites.front_default
                }
                
                return poke;
            })
            setPokemones(await Promise.all(arrayPokemones))
        }
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
                                    <Card
                                    key={pokemon.name}
                                    name={pokemon.name}
                                    img={pokemon.img}
                                />
                            ))}
                    </div>
                </div>
                }
        </div>
    )
}

export default Pokemones
