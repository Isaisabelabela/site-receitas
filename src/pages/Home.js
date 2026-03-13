import React, { useState } from 'react';
import { receitasDoces, categorias } from '../dados/receitasDoces';
import GaleriaFotos from '../components/GaleriaFotos';
import './Home.css';

const Home = ({ onModalChange }) => {
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [receitaSelecionada, setReceitaSelecionada] = useState(null);

  const receitasFiltradas = categoriaSelecionada === 'Todos' 
    ? receitasDoces 
    : receitasDoces.filter(receita => receita.categoria === categoriaSelecionada);

  // Função para carregar a imagem principal (primeira foto) da receita
  const getImagemPrincipal = (slug) => {
    try {
      return require(`../assets/imagens/${slug}/${slug}1.jpeg`);
    } catch (error) {
      return null;
    }
  };

  // Ao abrir o modal
  const abrirModal = (receita) => {
    setReceitaSelecionada(receita);
    if (onModalChange) onModalChange(true);
  };

  // Ao fechar o modal
  const fecharModal = () => {
    setReceitaSelecionada(null);
    if (onModalChange) onModalChange(false);
  };

  return (
    <div className="home-container">
      <div className="filtros">
        <button
          className={`filtro-btn ${categoriaSelecionada === 'Todos' ? 'ativo' : ''}`}
          onClick={() => setCategoriaSelecionada('Todos')}
        >
          Todas as Receitas
        </button>
        {categorias.map(categoria => (
          <button
            key={categoria}
            className={`filtro-btn ${categoriaSelecionada === categoria ? 'ativo' : ''}`}
            onClick={() => setCategoriaSelecionada(categoria)}
          >
            {categoria}
          </button>
        ))}
      </div>

      <div className="receitas-grid">
        {receitasFiltradas.map(receita => {
          const imagemPrincipal = getImagemPrincipal(receita.slug);
          
          return (
            <div key={receita.id} className="receita-card">
              {imagemPrincipal ? (
                <img 
                  src={imagemPrincipal} 
                  alt={receita.nome}
                  className="receita-imagem"
                />
              ) : (
                <div className="receita-imagem-placeholder">
                  🍳 {receita.nome}
                </div>
              )}
              
              <div className="receita-info">
                <span className="receita-categoria">{receita.categoria}</span>
                <h3>{receita.nome}</h3>
                <p className="receita-descricao">{receita.descricao}</p>
                
                <div className="receita-meta">
                  <span className="receita-tempo">⏱️ {receita.tempo}</span>
                  <span className="receita-porcoes">🍽️ {receita.porcoes}</span>
                </div>
                
                <button 
                  className="btn-ver-receita"
                  onClick={() => abrirModal(receita)}
                >
                  Ver Receita
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal da receita */}
      {receitaSelecionada && (
        <div className="modal-overlay" onClick={fecharModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={fecharModal}>
              ×
            </button>
            
            <h2 className="modal-titulo">{receitaSelecionada.nome}</h2>
            
            {/* Imagem principal no modal */}
            {(() => {
              const imgPrincipal = getImagemPrincipal(receitaSelecionada.slug);
              return imgPrincipal ? (
                <img 
                  src={imgPrincipal} 
                  alt={receitaSelecionada.nome}
                  className="modal-imagem"
                />
              ) : (
                <div className="modal-imagem-placeholder">
                  🍳 {receitaSelecionada.nome}
                </div>
              );
            })()}
            
            <div className="modal-info-rapida">
              <span>⏱️ {receitaSelecionada.tempo}</span>
              <span>🍽️ {receitaSelecionada.porcoes}</span>
            </div>
            
            <div className="modal-section">
              <h3>📝 Ingredientes</h3>
              <ul>
                {receitaSelecionada.ingredientes.map((ing, idx) => (
                  <li key={idx}>{ing}</li>
                ))}
              </ul>
            </div>
            
            <div className="modal-section">
              <h3>👩‍🍳 Modo de Preparo</h3>
              <ol>
                {receitaSelecionada.modoPreparo.map((passo, idx) => (
                  <li key={idx}>{passo}</li>
                ))}
              </ol>
            </div>

            {receitaSelecionada.dicas && (
              <div className="modal-section dicas">
                <h3>💡 Dicas</h3>
                <p>{receitaSelecionada.dicas}</p>
              </div>
            )}

            {/* Galeria de fotos da receita */}
            <GaleriaFotos 
              slug={receitaSelecionada.slug}
              nomeReceita={receitaSelecionada.nome}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;