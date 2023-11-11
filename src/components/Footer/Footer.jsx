import "./Footer.css"

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="contenido-footer">
                    <div className="info-sitio">
                        <h3>PokeWiki</h3>
                        <p>Pagina informativa acerca de los pokemon</p>
                    </div>
                    <div className="enlaces">
                        <h3>Enlaces</h3>
                        <ul>
                            <li><a href="#">Inicio</a></li>
                            <li><a href="#">Acerca de</a></li>
                            <li><a href="#">Servicios</a></li>
                            <li><a href="#">Contacto</a></li>
                        </ul>
                    </div>
                    <div className="redes-sociales">
                        <h3>Redes Sociales</h3>
                        <ul>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer