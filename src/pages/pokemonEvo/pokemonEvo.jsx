import { useEffect, useState } from "react";
import "./pokemonEvo.css";
import Card from "../../components/Card/Card";
// import { Link, useParams } from "react-router-dom";

const PokemonEvo = ({pokeId}) => {
  // let { pid } = useParams();
  // const prevPokemonId = parseInt(pid) > 1 ? parseInt(pid) - 1 : 1;
  // const nextPokemonId = parseInt(pid) > 0 ? parseInt(pid) + 1 : 1;
  const [pokeEvo, setPokeEvo] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(pokeId,"pokeId")
    // const pokeId = pokeId;
    fetchEvolution(pokeId);
    console.log("Componente montado");
  }, [pokeId]);

  const fetchEvolution = async (pokeId) => {
    setLoading(true);
    try {
      const resp = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${pokeId}/`);
      if (resp.status === 404) {
        return setPokeEvo([{ name: "Pokemon no encontrado" }]);
      }
      const data = await resp.json();
      console.log(data);

      const arrayPokemon = [];
      const addPokemon = async (data) => {
        console.log(data);
        if (data.species) {
          const pokemonName = data.species.name;
          console.log(pokemonName);
          const pokemonImg = await fetchPokemonImg(pokemonName);
          arrayPokemon.push([pokemonName, pokemonImg]);
        } else {
          const pokemonName = data.chain.species.name;
          console.log(pokemonName);
          const pokemonImg = await fetchPokemonImg(pokemonName);
          arrayPokemon.push([pokemonName, pokemonImg]);
        }
      };

      const processChain = async (data) => {
        if (data) {
          setLoading(true);
          await addPokemon(data);

          if (data.evolves_to && Array.isArray(data.evolves_to) && data.evolves_to.length > 0) {
            for (const evolution of data.evolves_to) {
              await processChain(evolution);

              if (
                evolution.evolves_to &&
                Array.isArray(evolution.evolves_to) &&
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
    } catch (error) {
      console.error("Error al obtener la cadena de evolución:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPokemonImg = async (pokemonName) => {
    try {
      const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
      if (resp.ok) {
        const data = await resp.json();
        return data.sprites.other["official-artwork"].front_default;
      } else {
        console.error(`Error al obtener la imagen de ${pokemonName}: ${resp.status} - ${resp.statusText}`);
        return ''; 
      }
    } catch (error) {
      console.error(`Error al obtener la imagen de ${pokemonName}: ${error.message}`);
      return '';
    }
  };

  return (
    <>
      {loading ? (
        <div className="divCargando">
          <h1 className="cargando">cargando...</h1>
        </div>
      ) : (
        <div>
          <h2 className="tituloEvo">Evoluciones de pokemon</h2>
          <div className="containerPokeEvo">
            {/* {
              pid>1 ?
              <div className="divButton">
                <Link to={`/pokemon/${prevPokemonId}`}>PREV</Link>
              </div> :
             <div className="divButton"></div>
            } */}
            <div className="cardPokeEvo">
              {pokeEvo.map((pokemon) => (
                <Card key={pokemon[0]} className="cardPokemonEvo" name={pokemon[0]} img={pokemon[1]} />
                ))}
            </div>
            {/* <div className="divButton">
              <Link to={`/pokemon/${nextPokemonId}`}>NEXT</Link>
            </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default PokemonEvo;