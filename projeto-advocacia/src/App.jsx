import { Routes, Route } from 'react-router-dom'
import Header from './paginas/Header'
import Footer from './componentes/footer'
import Hae from './paginas/Hae'
import Hma from './paginas/Hma'
import Duvidas from './paginas/Duvidas'
import Contato from './paginas/Contato'
import './App.css'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hae />} />
        <Route path="/hma" element={<Hma />} />
        <Route path="/Duvidas" element={<Duvidas />} />
        <Route path="/Contato" element={<Contato />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App