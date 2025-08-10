import React from 'react';
import Image from '../../assets/images/file.svg';
import './LogoSystem.css';

export function LogoSystem() {
  return (
    <div className="logo-system-container">
      <img
        src={Image}
        alt="Descrição da imagem"
        className="logo-system-image"
      />
    </div>
  );
}
