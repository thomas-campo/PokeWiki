const Card = (prop) => {
    return (
        <>
            <div className={prop.className}>
                <div className="imgPoke">
                    <img className="" src={prop.img} alt={prop.name} />
                </div>
                <div className="namePoke">
                    <h4 className="">{prop.content}</h4>
                </div>
            </div>
        </>
    )
}

export default Card


