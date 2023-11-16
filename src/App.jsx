import { BrowserRouter, Route , Routes} from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Home from './pages/home/home'
import Mts from './pages/mts/mts'
import Footer from './components/Footer/Footer'
import PokemonEvo from './pages/pokemonEvo/pokemonEvo'
import Pokemones from './pages/pokemones/Pokemones'

function App() {
  return (
    <>

        <BrowserRouter>
          
          <NavBar/>
          <Routes>
            <Route path='/'
            element={<Home/>}
            />
            <Route path='/pokemones'
            element={<Pokemones/>}
            />
            <Route path='/pokemon/:pokeId'
            element={<PokemonEvo/>}
            />
            <Route path='/mts'
            element={<Mts/>}
            />
          </Routes>
          <Footer/>

        </BrowserRouter>
      
    </>
  )
}

export default App
