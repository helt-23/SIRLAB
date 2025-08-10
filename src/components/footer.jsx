// Footer.jsx
import React from 'react';
import '../assets/styles/Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        © {new Date().getFullYear()} UNIFESSPA - Engenharia da Computação | Todos os direitos reservados
      </div>
    </footer>
  );
}
