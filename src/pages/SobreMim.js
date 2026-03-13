import React from 'react';
import './SobreMim.css';
import fotoPerfil from "../assets/fotoPerfil.jpg";


const SobreMim = () => {
  return (
    <div className="sobre-container">
      <div className="sobre-card">
        <div className="sobre-header">
          <div className="sobre-avatar">
            <img src={fotoPerfil} alt="Foto de perfil da Isabela" />
           </div>
           <h1 className="sobre-titulo">Oie, eu sou Isabela!</h1>
           <p className="sobre-subtitulo">404 Dieta Not Found</p>
        </div>

        <div className="sobre-conteudo">
          <div className="sobre-secao">
            <h2>Um pouco sobre mim</h2>
            <p>
            Eu sou Isabela, tenho 23 anos, sou natural de São Carlos e atualmente moro 
            em Uberlândia, onde curso Ciência da Computação na UFU.
            A cozinha sempre fez parte dos meus momentos de lazer. Gosto de testar receitas,
             explorar novos sabores e preparar pratos para amigos e familiares. Cozinhar, 
             para mim, é também uma forma de reunir pessoas e compartilhar bons momentos.
            </p>
          </div>

          <div className="sobre-secao">
            <p>
              Este site nasceu da vontade de registrar e compartilhar algumas das receitas 
              que gosto de preparar no dia a dia — receitas simples, saborosas e feitas 
              para serem aproveitadas em boa companhia.
            </p>
          </div>

        </div>

        <div className="sobre-footer">
          <a 
            href="https://instagram.com/isadpbarbosa" 
            target="_blank" 
            rel="noopener noreferrer"
          > Meu Instagram  </a>
        </div>
      </div>
    </div>
  );
};

export default SobreMim;