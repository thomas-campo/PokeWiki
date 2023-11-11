import { Container, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import "./NavBar.css"

const NavBar = () => {
    return (
        <>

            <Navbar className='containerNavBar'>
                <Container className='container'>
                    <NavLink className='BotonNavBar' to={`/`}>
                        Home
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/Pokemones`}>
                        Pokemones
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/Tipos`}>
                        Tipos
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/MTs`}>
                        MTs
                    </NavLink>
                </Container>
            </Navbar>

        </>
    )
}

export default NavBar