import { BrowserRouter, Route , Routes} from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Home from './pages/home/home'
import Footer from './components/Footer/Footer'
import PokemonEvo from './pages/pokemonEvo/pokemonEvo'
import Pokemones from './pages/pokemones/Pokemones'
import Pokedex from './pages/pokedex/pokedex'

function App() {
  return (
    <>

        <BrowserRouter>
          
          <NavBar/>
          <Routes>
            <Route path='*'
            element={<Home/>}
            />
            <Route path='/'
            element={<Home/>}
            />
            <Route path='/pokedex/:pid'
            element={<Pokedex/>}
            />
            <Route path='/pokedex/'
            element={<Pokedex/>}
            />
            <Route path='/pokemones'
            element={<Pokemones/>}
            />
            <Route path='/pokemon/:pid'
            element={<PokemonEvo/>}
            />
            <Route path='/pokemon/'
            element={<PokemonEvo/>}
            />
          </Routes>
          <Footer/>

        </BrowserRouter>
      
    </>
  )
}

export default App
