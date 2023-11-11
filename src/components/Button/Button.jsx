const Button = (prop) => {
    return (
        <>
            <button className={prop.className} onClick={prop.handleButton}></button>
        </>
    )
}

export default Button