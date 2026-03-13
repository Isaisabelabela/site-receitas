import React, { useState, useEffect } from 'react';
import './GaleriaFotos.css';

const GaleriaFotos = ({ slug, nomeReceita }) => {
  const [fotos, setFotos] = useState([]);
  const [fotoSelecionada, setFotoSelecionada] = useState(null);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [carregando, setCarregando] = useState(true);

  // Carrega as fotos quando o componente monta
  useEffect(() => {
    const carregarFotos = async () => {
      setCarregando(true);
      const fotosEncontradas = [];
      let contador = 1;
      let continua = true;

      // Tenta carregar imagens sequencialmente: Nome1, Nome2, Nome3...
      while (continua) {
        try {
          // Tenta carregar a imagem com o padrão: NomeReceita + número
          const nomeArquivo = `${slug}${contador}`;
          const imagem = require(`../assets/imagens/${slug}/${nomeArquivo}.jpeg`);
          
          fotosEncontradas.push({
            src: imagem,
            titulo: `${nomeReceita} - Foto ${contador}`,
            numero: contador
          });
          
          contador++;
        } catch (error) {
          // Se não encontrar mais imagens, para o loop
          continua = false;
        }
      }

      setFotos(fotosEncontradas);
      setCarregando(false);
    };

    carregarFotos();
  }, [slug, nomeReceita]);

  const abrirGaleria = (index) => {
    setIndiceAtual(index);
    setFotoSelecionada(fotos[index]);
  };

  const fecharGaleria = () => {
    setFotoSelecionada(null);
  };

  const proximaFoto = () => {
    const novoIndice = (indiceAtual + 1) % fotos.length;
    setIndiceAtual(novoIndice);
    setFotoSelecionada(fotos[novoIndice]);
  };

  const fotoAnterior = () => {
    const novoIndice = (indiceAtual - 1 + fotos.length) % fotos.length;
    setIndiceAtual(novoIndice);
    setFotoSelecionada(fotos[novoIndice]);
  };

  // Se estiver carregando
  if (carregando) {
    return (
      <div className="galeria-container">
        <h3 className="galeria-titulo">📸 Galeria de Fotos</h3>
        <div className="galeria-vazia">
          Carregando fotos...
        </div>
      </div>
    );
  }

  // Se não encontrou nenhuma foto
  if (fotos.length === 0) {
    return (
      <div className="galeria-container">
        <h3 className="galeria-titulo">📸 Galeria de Fotos</h3>
        <div className="galeria-vazia">
          Em breve mais fotos de {nomeReceita}...
        </div>
      </div>
    );
  }

  return (
    <div className="galeria-container">
      <h3 className="galeria-titulo">📸 Galeria de Fotos</h3>
      
      <div className="galeria-grid">
        {fotos.map((foto, index) => (
          <div 
            key={index} 
            className="galeria-item"
            onClick={() => abrirGaleria(index)}
          >
            <img src={foto.src} alt={foto.titulo} loading="lazy" />
            <div className="galeria-item-overlay">
              <span>Foto {foto.numero}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal da galeria */}
      {fotoSelecionada && (
        <div className="galeria-modal" onClick={fecharGaleria}>
          <div className="galeria-modal-content" onClick={e => e.stopPropagation()}>
            <button className="galeria-modal-close" onClick={fecharGaleria}>×</button>
            
            {fotos.length > 1 && (
              <>
                <button 
                  className="galeria-navegacao anterior" 
                  onClick={fotoAnterior}
                >
                  ‹
                </button>
                <button 
                  className="galeria-navegacao proxima" 
                  onClick={proximaFoto}
                >
                  ›
                </button>
              </>
            )}
            
            <img src={fotoSelecionada.src} alt={fotoSelecionada.titulo} />
            
            <p className="galeria-modal-legenda">
              {fotoSelecionada.titulo} • {indiceAtual + 1}/{fotos.length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaleriaFotos;