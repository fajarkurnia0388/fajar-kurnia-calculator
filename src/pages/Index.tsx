
import Calculator from '../components/Calculator';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light text-white mb-2 tracking-wide">FajarKurnia</h1>
          <p className="text-slate-400 text-sm">Scientific Calculator</p>
        </div>
        <Calculator />
      </div>
    </div>
  );
};

export default Index;
