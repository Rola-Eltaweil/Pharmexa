const ProductVisual = () => {
  return (
    <div className="relative w-full max-w-lg h-[420px] flex items-center justify-center">
      {/* Connecting lines */}
      <div className="absolute w-40 h-px bg-primary/20 rotate-[-25deg] top-[120px] left-[70px]" />
      <div className="absolute w-40 h-px bg-primary/20 rotate-[25deg] top-[120px] right-[70px]" />
      <div className="absolute w-40 h-px bg-primary/20 rotate-[25deg] bottom-[115px] left-[70px]" />
      <div className="absolute w-40 h-px bg-primary/20 rotate-[-25deg] bottom-[115px] right-[70px]" />

      {/* Main Card */}
      <div className="relative z-10 sm:w-56 sm:h-56 h-40 w-40 rounded-full bg-white shadow-xl border border-primary/10 flex flex-col items-center justify-center animate-fadeIn">
        <span className="text-5xl font-bold text-primary">50+</span>

        <span className="text-gray-500 text-sm mt-2">Pharmaceutical</span>

        <span className="text-gray-500 text-sm">Products</span>
      </div>

      {/* Tablets */}
      <div className="absolute top-12 left-5 w-32 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center gap-2 animate-float">
        <span className="text-2xl">💊</span>
        <span className="text-sm font-medium text-gray-700">Tablets</span>
      </div>

      {/* Syrups */}
      <div className="absolute top-12 right-5 w-32 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center gap-2 animate-float animation-delay-200">
        <span className="text-2xl">💧</span>
        <span className="text-sm font-medium text-gray-700">Syrups</span>
      </div>

      {/* Capsules */}
      <div className="absolute bottom-12 left-5 w-32 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center gap-2 animate-float animation-delay-400">
        <span className="text-2xl">💊</span>
        <span className="text-sm font-medium text-gray-700">Capsules</span>
      </div>

      {/* Creams */}
      <div className="absolute bottom-12 right-5 w-32 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center gap-2 animate-float animation-delay-600">
        <span className="text-2xl">🧴</span>
        <span className="text-sm font-medium text-gray-700">Creams</span>
      </div>
    </div>
  );
};

export default ProductVisual;
