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
                    <NavLink className='BotonNavBar' to={`/pokedex`}>
                        Pokedex
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/pokemones`}>
                        Pokemones
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/pokemon/1`}>
                        Evoluciones de Pokemones
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/mts`}>
                        MTs
                    </NavLink>
                </Container>
            </Navbar>

        </>
    )
}

export default NavBar