// app/loading.tsx
export default function Loading() {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 animate-gradient">
        {/* Rotating 3D Sphere Effect */}
        <div className="relative flex items-center justify-center">
          {/* Outer Layered Spinner */}
          <div className="w-24 h-24 border-[6px] border-t-transparent border-l-transparent border-purple-300 rounded-full animate-spin"></div>
          <div className="absolute w-20 h-20 border-[6px] border-t-transparent border-r-transparent border-indigo-300 rounded-full animate-spin-reverse"></div>
          <div className="absolute w-16 h-16 border-[6px] border-t-transparent border-b-transparent border-pink-300 rounded-full animate-spin"></div>
  
          {/* Center Glowing Pulse */}
          <div className="absolute w-6 h-6 bg-white rounded-full animate-pulse shadow-xl"></div>
        </div>
  
        {/* Star Effects */}
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/3 left-1/4 animate-float"></div>
        <div className="absolute w-2 h-2 bg-white rounded-full top-1/4 left-3/4 animate-float-reverse"></div>
        <div className="absolute w-2 h-2 bg-white rounded-full bottom-1/3 right-1/4 animate-float"></div>
        <div className="absolute w-2 h-2 bg-white rounded-full bottom-1/4 right-3/4 animate-float-reverse"></div>
      </div>
    );
  }
  