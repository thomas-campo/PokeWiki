import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"
import "./pokemones.css"
import { Link } from "react-router-dom"

const Pokemones = () => {
    const [ loading, setLoading ] = useState(true)
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

        const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50&offset=0")
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
            if(!data.sprites.other["official-artwork"].front_default){
                return null;
            }

            const poke = {
                name: pokemon.name.toUpperCase(),
                img: data.sprites.other["official-artwork"].front_default,
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
        const dataTypes = await data.results.filter(type => type.name !== "shadow" && type.name !== "unknown")
        setTypes(dataTypes)
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
            if (!data.sprites.other["official-artwork"].front_default) {
                return null;
            }
            const pokemones = {
                name: data.name.toUpperCase(),
                img: data.sprites.other["official-artwork"].front_default,
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
        console.log(data,"1°data")
        setPreviousUrl()
        setNextUrl()
        setCount()
        const arrayTypes = await Promise.all(data.pokemon_species.map(async(pokemon)=>{
            const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
            if(resp.status===404){
                return null;
            }
            const data = await resp.json()
            console.log(data,"2°data")
            if (!data.sprites.other["official-artwork"].front_default) {
                return null;
            }
            const pokemones = {
                name: data.name.toUpperCase(),
                img: data.sprites.other["official-artwork"].front_default,
                id: data.id
            }
            console.log(pokemones,"pokemon")
            return pokemones
        }));
        const filteredPokemones = arrayTypes.filter(pokemon => pokemon !== null);
        setPokemones(filteredPokemones);
    }

    const limitPokemon = async(btn) => {
        let url = "url"
        if(btn==="next"){
            url = nextUrl;
            console.log(previousUrl,"enenxt") 
        }
        if(btn==="previous"){
            url = previousUrl
            console.log(previousUrl,"enprev") 
        }
        const resp = await fetch(url)
            const data = await resp.json()
            console.log(data,"datalimit")
            if(!data.next){
                // setPreviousUrl("https://pokeapi.co/api/v2/pokemon?offset=1108&limit=92")
                console.log(previousUrl,"urlprev")
            }else{
                setPreviousUrl(data.previous)
            }
            setNextUrl(data.next)
            const arrayPokemones = await Promise.all(data.results.map(async(pokemon)=>{
                const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
                if(resp.status===404){
                    return null;
                }
                const data = await resp.json()
                if(!data.sprites.other["official-artwork"].front_default){
                    return null;
                }
                const poke = {
                    name: pokemon.name.toUpperCase(),
                    img: data.sprites.other["official-artwork"].front_default,
                    id: data.id
                }
                
                return poke;
            }))
            if(btn==="next"){
                if(!loading){
                    setCount(count+1);
                }
            }
            if(btn==="previous"){
                if(!loading){
                    setCount(count-1);
                }
            }
            const filteredPokemones = arrayPokemones.filter(pokemon => pokemon !== null);
            setPokemones(filteredPokemones);
             
    }

    return (
        <div className={`containerPokemones`}>
            {loading ?
                <h2>cargando...</h2> :
                <div className="containerListaPokemones">
                    <h1 className="titulo">Pokemones</h1>
                    <div className="filtro">
                        <h3 className="filtrar">Filtrar por:</h3>
                        <div className="dropdown">
                            <button className="button-inside-dropdown">Tipo</button>
                            <div className="dropdown-content">
                                {types.map((types) =>(
                                    <button
                                    key={types.name}
                                    onClick={()=>{fetchTypes(types.name)}}
                                    className={types.name}
                                    >
                                        {types.name}
                                    </button>
                                    ))
                                }
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="button-inside-dropdown">Generacion</button>
                            <div className="dropdown-content">
                            {generations.map((generation) =>(
                                <button
                                key={generation.name}
                                onClick={()=>{fetchGenerations(generation.name)}}
                                className={generation.name}
                                >
                                    {generation.name}
                                </button>
                            ))
                            }
                            </div>
                        </div>

                        <div className="dropdown">
                            <button className="button-inside-dropdown" onClick={()=>{fetchPokemones()}}>Borrar filtro</button>
                        </div>

                        <div className="dropdown">
                            <button className="button-inside-dropdown">Tareas</button>
                            <div className="dropdown-content">
                                <p>-Agregarle el efecto shimmer de carga</p>
                                <p>el navbar tiene que ser movible, que no sea estatico</p>
                                <p>hacer una funcion     o algo para que al hacer click en los botones siguiente o anterior de abajo, te suba directamente</p>
                            </div>
                        </div>
                    </div>
                    <div className="paginateButtons">
                    {
                        previousUrl ?
                        <button className="button btn1" onClick={()=>{limitPokemon("previous")}}>Anterior</button>
                        :
                        <div className="divInvisibleAntes btn1"></div>
                    }
                    {
                        count ?
                        <p className="btn2">{count}</p>
                        :
                        <p className="btn2"></p>
                    }
                    {
                        nextUrl ?
                        <button className="button btn3" onClick={()=>{limitPokemon("next")}}>Siguiente</button>
                        :
                        <div className="divInvisibleSiguiente btn3"></div>

                    }
                    </div>
                    <div className="containerCards">
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
                    <div className="paginateButtons">
                    {
                        previousUrl ?
                        <button className="button btn1" onClick={()=>{limitPokemon("previous")}}>Anterior</button>
                        :
                        <div className="divInvisibleAntes btn1"></div>
                    }
                    {
                        count ?
                        <p className="btn2">{count}</p>
                        :
                        <p className="btn2"></p>
                    }
                    {
                        nextUrl ?
                        <button className="button btn3" onClick={()=>{limitPokemon("next")}}>Siguiente</button>
                        :
                        <div className="divInvisibleSiguiente btn3"></div>

                    }
                    </div>
                </div>
                }
        </div>
    )
}

export default Pokemones
