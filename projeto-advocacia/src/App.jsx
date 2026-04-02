import { Routes, Route } from 'react-router-dom'
import Header from './paginas/Header'
import Footer from './componentes/footer'
import Hae from './paginas/Hae'
import Sobre from './paginas/Sobre'
import Duvidas from './paginas/Duvidas'
import Agende from './paginas/Agende'
import Nucleos from './paginas/Nucleos'
import Atuacao from './paginas/Atuacao'
import CookieConsent from './paginas/CookieConsent'; 
import './App.css'
import ScrollToTop from './componentes/ScrollToTop'

/*npm run build
npm run deploy*/

/*git add api/send-email.js
git commit -m "assunto"
git push*/

function App() {
  return (
    <>
      <ScrollToTop /> 
      <Header />
      <Routes>
        <Route path="/" element={<Hae />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/duvidas" element={<Duvidas />} />
        <Route path="/agende" element={<Agende />} />
        <Route path="/nucleos" element={<Nucleos />} />
        <Route path="/atuacao" element={<Atuacao />} />
      </Routes>
      <Footer />
      <CookieConsent /> 
    </>
  )
}

export default App