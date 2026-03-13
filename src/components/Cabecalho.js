import React from 'react';
import './Cabecalho.css';

const Cabecalho = ({ titulo, subtitulo, paginaAtual, setPaginaAtual }) => {
  return (
    <header className="cabecalho">
      <div className="cabecalho-conteudo">
        <h1 className="cabecalho-titulo">{titulo}</h1>
        {subtitulo && <p className="cabecalho-subtitulo">{subtitulo}</p>}
      </div>
      
      <nav className="cabecalho-menu">
        <button 
          className={`menu-item ${paginaAtual === 'home' ? 'ativo' : ''}`}
          onClick={() => setPaginaAtual('home')}
        > Home
        </button>
        <button 
          className={`menu-item ${paginaAtual === 'sobre' ? 'ativo' : ''}`}
          onClick={() => setPaginaAtual('sobre')}
        > Sobre Mim
        </button>
      </nav>
    </header>
  );
};

export default Cabecalho;