import { Routes, Route } from 'react-router-dom'
import Header from './paginas/Header'
import Footer from './componentes/footer'
import Hae from './paginas/Hae'
import Sobre from './paginas/Sobre'
import Duvidas from './paginas/Duvidas'
import Contato from './paginas/Contato'
import './App.css'

/*npm run build
npm run deploy*/


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Hae />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/duvidas" element={<Duvidas />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App