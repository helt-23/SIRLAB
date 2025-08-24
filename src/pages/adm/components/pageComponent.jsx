const PageComponent = ({ title, children }) => (
  <div className="w-full h-full p-4 sm:p-6 lg:p-8 bg-slate-50 rounded-xl shadow-lg animate-fade-in border border-slate-200">
    <h2 className="text-3xl font-bold text-slate-800 border-b border-slate-300 pb-4 mb-6 flex items-center">
      <span className="bg-slate-800 w-1 h-8 rounded mr-3"></span>
      {title}
    </h2>
    {children}
  </div>
);

export default PageComponent;