import { Routes, Route } from 'react-router-dom'
import Header from './paginas/Header'
import Footer from './componentes/Footer'
import Hae from './paginas/Hae'
import Sobre from './paginas/Sobre'
import Duvidas from './paginas/Duvidas'
import Contato from './paginas/Contato'
import Nucleos from './paginas/Nucleos'
import Atuacao from './paginas/Atuacao'
import './App.css'
import ScrollToTop from './componentes/ScrollToTop'

/*npm run build
npm run deploy*/


function App() {
  return (
    <>
     <ScrollToTop /> 
      <Header />
      <Routes>
        <Route path="/" element={<Hae />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/duvidas" element={<Duvidas />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/nucleos" element={<Nucleos />} />
        <Route path="/atuacao" element={<Atuacao />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App