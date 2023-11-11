import { BrowserRouter, Route , Routes} from 'react-router-dom'

import NavBar from './components/NavBar/NavBar'
import Home from './pages/home/home'
import Pokemones from './pages/pokemon/pokemones'
import Mts from './pages/mts/mts'
import Footer from './components/Footer/Footer'

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
            <Route path='/tipos'
            element={<Pokemones/>}
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
