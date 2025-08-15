const SectionWrapper = ({ number, title, children }) => (
  <section className="bg-slate-50 p-4 sm:p-6 rounded-xl border border-slate-200 mb-6">
    <div className="flex items-center gap-4 mb-5">
      <div className="flex-shrink-0 bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg">{number}</div>
      <h3 className="text-xl font-bold text-slate-800">{title}</h3>
    </div>
    {children}
  </section>
);

export default SectionWrapper;