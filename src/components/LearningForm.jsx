import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Upload, Target, BarChart3, Calendar, Clock, Laptop } from "lucide-react";
import { generateRoadmap } from "../services/api";

const LearningForm = ({ setRoadmap, setLoading }) => {
  const [goal, setGoal] = useState("");
  const [level, setLevel] = useState("Beginner");
  const [days, setDays] = useState(30);
  const [hours, setHours] = useState(2);
  const [file, setFile] = useState(null);

  // Preset Languages for Quick Selection
  const presets = [
    { name: "JavaScript", color: "text-yellow-500", bg: "bg-yellow-500/10" },
    { name: "Python", color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "C++", color: "text-blue-600", bg: "bg-blue-600/10" },
    { name: "C", color: "text-gray-500", bg: "bg-gray-500/10" },
    { name: "Java", color: "text-orange-600", bg: "bg-orange-600/10" },
  ];

  const handleQuickClick = (lang) => {
    setGoal(lang);
    // You can also set default levels/days for presets if you want
    setLevel("Beginner");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRoadmap(null);

    const formData = new FormData();
    formData.append("goal", goal);
    formData.append("level", level);
    formData.append("days", days);
    formData.append("hours", hours);
    if (file) formData.append("file", file);

    try {
      const data = await generateRoadmap(formData);
      setRoadmap(data);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-2xl"
      >
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-white flex items-center gap-3">
            <Sparkles className="text-indigo-500" size={28} />
            Create Your Path
          </h2>
          <p className="text-zinc-500 text-sm mt-2">
            Define your goals or select a popular language below to start.
          </p>
        </div>

        {/* Quick Select Section */}
        <div className="mb-8">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3 block flex items-center gap-2">
            <Laptop size={14} /> Quick Start
          </label>
          <div className="flex flex-wrap gap-2">
            {presets.map((lang) => (
              <button
                key={lang.name}
                type="button"
                onClick={() => handleQuickClick(lang.name)}
                className={`px-4 py-2 rounded-xl border transition-all flex items-center gap-2 text-sm font-semibold
                  ${goal === lang.name 
                    ? "border-indigo-500 bg-indigo-500 text-white shadow-lg shadow-indigo-500/20" 
                    : "border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 text-zinc-600 dark:text-zinc-400 hover:border-indigo-400"
                  }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Goal Input */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <Target size={16} className="text-indigo-500" /> Learning Goal
            </label>
            <input
              required
              placeholder="What do you want to master?"
              className="w-full px-5 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-lg"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>

          {/* Level Select */}
          <div className="space-y-2">
            <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
              <BarChart3 size={16} className="text-indigo-500" /> Skill Level
            </label>
            <select
              className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all appearance-none cursor-pointer"
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Days Input */}
            <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Calendar size={16} className="text-indigo-500" /> Days
                </label>
                <input
                type="number"
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                />
            </div>

            {/* Hours Input */}
            <div className="space-y-2">
                <label className="text-sm font-semibold flex items-center gap-2 text-zinc-700 dark:text-zinc-300">
                <Clock size={16} className="text-indigo-500" /> Hrs/Day
                </label>
                <input
                type="number"
                className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                />
            </div>
          </div>
        </div>

        {/* File Upload Section */}
        <div className="mt-6">
          <label className="block text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2">
            Optional: Add a Syllabus or Resume
          </label>
          <div className="relative group">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            <div className="border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 flex items-center justify-center gap-3 group-hover:border-indigo-500 transition-colors bg-zinc-50/50 dark:bg-zinc-950/50">
              <Upload size={20} className="text-zinc-400 group-hover:text-indigo-500" />
              <span className="text-sm text-zinc-500 font-medium">
                {file ? file.name : "Drop file here or click to browse"}
              </span>
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-3 text-lg"
        >
          Generate Personalized Roadmap
          <Sparkles size={20} />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default LearningForm;