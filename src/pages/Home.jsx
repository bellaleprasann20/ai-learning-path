import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar";
import LearningForm from "../components/LearningForm";
import Roadmap from "../components/Roadmap";
import Loader from "../components/Loader";
import { Sparkles, ArrowRight, Zap, ShieldCheck, Globe } from "lucide-react";

const Home = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Navbar />

      <main className="relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-indigo-50/50 dark:from-indigo-950/20 to-transparent -z-10" />
        
        <div className="max-w-6xl mx-auto px-6 py-12 md:py-20">
          
          {/* 1. Hero Section - Hide when roadmap exists to focus on content */}
          <AnimatePresence>
            {!roadmap && !loading && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center mb-16"
              >
                <motion.div 
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-6 border border-indigo-100 dark:border-indigo-800"
                >
                  <Sparkles size={14} />
                  <span>Next-Gen AI Learning Planner</span>
                </motion.div>
                
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-500 bg-clip-text text-transparent">
                  Master Any Skill <br /> In Record Time.
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  Upload your syllabus or describe your goals. Our AI analyzes thousands of data points to build a scientifically structured learning path just for you.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 2. Form Section */}
          <section className="relative z-10">
            {!roadmap && !loading && (
              <LearningForm setRoadmap={setRoadmap} setLoading={setLoading} />
            )}
          </section>

          {/* 3. Loading State */}
          <AnimatePresence>
            {loading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-20"
              >
                <Loader />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 4. Roadmap Result Section */}
          <AnimatePresence>
            {roadmap && !loading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Back Button for better UX */}
                <button 
                  onClick={() => setRoadmap(null)}
                  className="mb-8 flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-indigo-600 transition-colors"
                >
                  <ArrowRight className="rotate-180" size={16} />
                  Generate a different path
                </button>
                <Roadmap roadmap={roadmap} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* 5. Feature Grid - Only show on Landing */}
          {!roadmap && !loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8 mt-24 border-t border-zinc-200 dark:border-zinc-800 pt-16"
            >
              <FeatureCard 
                icon={<Zap className="text-amber-500" />}
                title="Ultra Fast" 
                desc="Get a 30-day curriculum in under 5 seconds." 
              />
              <FeatureCard 
                icon={<ShieldCheck className="text-emerald-500" />}
                title="Verified Content" 
                desc="Sourced from top-tier educational frameworks." 
              />
              <FeatureCard 
                icon={<Globe className="text-blue-500" />}
                title="Adaptive" 
                desc="Adjusts to your schedule and current skill level." 
              />
            </motion.div>
          )}
        </div>
      </main>

      <footer className="py-12 text-center text-zinc-500 text-xs border-t border-zinc-100 dark:border-zinc-900">
        © 2024 AI Learning Path. Built for the future of education.
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="mb-4 p-3 rounded-2xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-100 dark:border-zinc-800">
      {icon}
    </div>
    <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{title}</h3>
    <p className="text-sm text-zinc-500 dark:text-zinc-400">{desc}</p>
  </div>
);

export default Home;