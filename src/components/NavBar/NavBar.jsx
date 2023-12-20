import { NavLink } from "react-router-dom"
import "./NavBar.css"

const NavBar = () => {
    return (
        <>
        
                <div className='containerNavBar'>
                    <NavLink className='BotonNavBarLogo' to={`/`}>
                        <img className="logoPokeWiki" src="../../../2Z3UanLFRGiuyP9qmnd74AsNqx3.svg.svg" alt="" />
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/pokedex`}>
                        Pokedex
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/pokemones`}>
                        Pokemones
                    </NavLink>
                    <NavLink className='BotonNavBar' to={`/mts`}>
                        MTs
                    </NavLink>
                </div>  

        </>
    )
}

export default NavBar