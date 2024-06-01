import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ProtectedRoute from './components/ProtectedRoute'
import History from './pages/History'


function App(){
  return(
    <>
      <div>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/history' element={<ProtectedRoute><History/></ProtectedRoute>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
