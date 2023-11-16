const Button = (prop) => {
    return (
        <>
            <button className={prop.className} onClick={prop.handleButton}>{prop.direccion}</button>
        </>
    )
}

export default Button