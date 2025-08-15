const PageComponent = ({ title, children }) => (
  <div className="w-full h-full p-4 sm:p-6 lg:p-8 bg-white rounded-xl shadow-lg animate-fade-in">
    <h2 className="text-3xl font-bold text-slate-800 border-b pb-4 mb-6">{title}</h2>
    {children}
  </div>
);

export default PageComponent;