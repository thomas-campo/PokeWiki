import { useEffect, useState } from "react";
import "./pokemonEvo.css"
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button.jsx"

const PokemonEvo = () => {
    const [ pokeId, setPokeId ] = useState(1)
    const [ pokeEvo, setPokeEvo ] = useState([]);
    const [ loading, setLoading ] = useState(true)

    useEffect(()=>{
      fetchEvolution(pokeId)
    },[pokeId])


    const fetchEvolution = async (pokeId) => {
      setLoading(true);
      const resp = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokeId}/`);
      const data = await resp.json();
      console.log(data)
    
      const arrayPokemon = [];
      const addPokemon = async (data) => {
        const pokemonName = data.species.name;
        const pokemonImg = await fetchPokemonImg(pokemonName);
        arrayPokemon.push([pokemonName, pokemonImg]);
      };

      const processChain = async (data) => {
        if (data) {
          setLoading(true);
          await addPokemon(data);
      
          if (data.evolves_to && data.evolves_to.length > 0) {
            for (const evolution of data.evolves_to) {
              await processChain(evolution);
      
              if (
                evolution.evolves_to &&
                evolution.evolves_to.length > 0 &&
                !arrayPokemon.some(([name]) => name === evolution.evolves_to[0].species.name)
              ) {
                await addPokemon(evolution.evolves_to[0]);
              }
            }
          }
        }
      };
    
      await processChain(data.chain);
    
      setPokeEvo(arrayPokemon);
      setLoading(false);
    }; 

    const fetchPokemonImg = async (pokemonName) => {
      setLoading(true);
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      const data = await resp.json();
      return data.sprites.other["official-artwork"].front_default;
    }
    
    const prevButton = () => {
      (pokeId===1)?
      setPokeId(1)
      :
      setPokeId(pokeId-1)
    }

    const nextButton = () => {
      (pokeId === 1017)?
      setPokeId(1017):
      setPokeId(pokeId+1)
    }

  return (
    <>
      {
        loading ?
        <h1>cargando</h1> :
        <div>
          <h2 className="titulo">Evoluciones de pokemon</h2>
          <div className="containerPokeEvo">
            <div className="divButton">
              <Button className="button1"
              handleButton={()=>{prevButton()}}
              direccion="<"
              />
            </div>
            <div className="cardPokeEvo">
              {pokeEvo.map( pokemon =>(
                <Card
                  key={pokemon[0]}
                  name={pokemon[0]}
                  img={pokemon[1]}
                />
              ))
              }
            </div>
            <div className="divButton">
              <Button className="button2"
              handleButton={()=>{nextButton()}}
              direccion=">"
              />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default PokemonEvo

    // const fetchEvolution = async (pokeId) =>{
    //   const resp = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokeId}/`)
    //   const data = await resp.json();
    //   console.log(data)
    //   const arrayPokemon = [];
    //   const pokemonName1 = data.chain.species.name
    //   const pokemonImg1 = await fetchPokemonImg(pokemonName1)
    //   arrayPokemon.push([pokemonName1,pokemonImg1])
    //   if(data.chain.evolves_to.length === 1){
    //     const pokemonName2 = data.chain.evolves_to[0].species.name;
    //     const pokemonImg2 = await fetchPokemonImg(pokemonName2)
    //     arrayPokemon.push([pokemonName2, pokemonImg2]);
    //     console.log(arrayPokemon)
    //     if(data.chain.evolves_to[0].evolves_to.length !== 0){
    //       const pokemonName3 = data.chain.evolves_to[0].evolves_to[0].species.name;
    //       const pokemonImg3 = await fetchPokemonImg(pokemonName3);
    //       arrayPokemon.push([pokemonName3, pokemonImg3]);
    //       console.log(arrayPokemon)
    //     }
    //   }if(data.chain.evolves_to.length !== 0){
    //     const array = data.chain.evolves_to;
    //     array.forEach(async(pokemon)=>{
    //       const pokemonName = pokemon.species.name;
    //       const pokemonImg = await fetchPokemonImg(pokemonName)
    //       arrayPokemon.push([pokemonName,pokemonImg])
    //     })
    //   }
    //   setPokeEvo(arrayPokemon)
    //   setLoading(false);
    // }
