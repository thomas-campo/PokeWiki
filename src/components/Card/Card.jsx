const Card = (prop) => {
    return (
        <>
            <div className={prop.className}>
                <div className="pokeInfo">
                    <h4 className="pokemonName">{prop.name}</h4>
                </div>
                <div className="divImg">
                    <img className="pokemonImg" src={prop.img} alt={prop.name} />
                </div>
            </div>
        </>
    )
}

export default Card


