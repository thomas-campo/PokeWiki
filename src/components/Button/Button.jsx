const Button = (prop) => {

    return (
        <>
            <button className={prop.className} onClick={prop.handleButton}>{prop.content}</button>
        </>
    )
}

export default Button