import React, { useState } from 'react';
import Cabecalho from './components/Cabecalho';
import Home from './pages/Home';
import SobreMim from './pages/SobreMim';
import './App.css';
import fundoFigo from './assets/figo-fundo.png';

function App() {
  const [paginaAtual, setPaginaAtual] = useState('home');
  const [modalAberto, setModalAberto] = useState(false); 

  const handleModalChange = (aberto) => {
    setModalAberto(aberto);
  };

  return (
    <div className={`fundo-figo ${modalAberto ? 'modal-aberto' : ''}`} style={{ backgroundImage: `url(${fundoFigo})` }}>
      <div className="content">
        <Cabecalho 
          titulo="Cookly"
          subtitulo="404 Dieta Not Found"
          paginaAtual={paginaAtual}
          setPaginaAtual={setPaginaAtual}
        />

        <div className="container">
          {paginaAtual === 'home' && <Home onModalChange={handleModalChange} />}
          {paginaAtual === 'sobre' && <SobreMim />}
        </div>

        <footer className="footer">
          <p>© 2026 Cookly - 404 Dieta Not Found • Por Isabela</p>
        </footer>
      </div>
    </div>
  );
}

export default App;