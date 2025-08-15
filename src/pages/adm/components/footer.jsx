const Footer = () => (
  <footer className="w-full bg-white border-t border-slate-200 z-10">
    <div className="max-w-screen-2xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
      <p>&copy; {new Date().getFullYear()} Sistema de Gerenciamento de Laboratório. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;