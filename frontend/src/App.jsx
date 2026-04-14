import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"

import Signup from './features/auth/pages/Signup'
import Home from './features/general/pages/Home'
import Error from './features/general/pages/Error'
import Register from './features/auth/pages/Register'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Register/>}/>
          <Route path='/*' element={<Error/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
