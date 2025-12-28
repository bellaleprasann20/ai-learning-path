import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center my-16 space-y-6">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute h-16 w-16 bg-indigo-500/20 rounded-full"
        />
        
        {/* Inner Spinning Core */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="h-10 w-10 border-3 border-indigo-600 border-t-transparent rounded-full"
        />
      </div>

      <div className="text-center">
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm font-medium tracking-wide text-zinc-600"
        >
          AI is building your roadmap...
        </motion.p>
        <p className="text-xs text-zinc-400 mt-1 italic">Analyzing curriculum & structuring days</p>
      </div>
    </div>
  );
};

export default Loader;