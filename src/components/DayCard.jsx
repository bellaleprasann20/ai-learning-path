import { motion } from "framer-motion";
import { CheckCircle2, Clock, BookOpen, ExternalLink, PlayCircle, Globe, Code } from "lucide-react";

const DayCard = ({ day, index }) => {
  // Helper to show the right icon based on the URL
  const getResourceIcon = (url) => {
    if (url.includes("youtube.com")) return <PlayCircle size={14} className="text-red-500" />;
    if (url.includes("github.com")) return <Code size={14} className="text-zinc-800" />;
    return <Globe size={14} className="text-indigo-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 pb-10 group"
    >
      {/* Visual Timeline Elements */}
      <div className="absolute left-[11px] top-2 h-full w-[2px] bg-zinc-200 dark:bg-zinc-800 group-last:h-0" />
      <div className="absolute left-0 top-1 h-6 w-6 rounded-full border-2 border-indigo-500 bg-white dark:bg-zinc-950 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-indigo-500" />
      </div>

      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm hover:border-indigo-500/50 transition-all">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-[10px] font-black uppercase text-indigo-500">Day {day.dayNumber}</span>
            <h4 className="text-lg font-bold text-zinc-900 dark:text-white">{day.title}</h4>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-lg">
            <Clock size={12} /> {day.duration}
          </div>
        </div>

        {/* Tasks */}
        <div className="space-y-2 mb-6">
          {day.tasks.map((task, i) => (
            <div key={i} className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
              {task}
            </div>
          ))}
        </div>

        {/* DYNAMIC COURSES SECTION */}
        {day.courses && day.courses.length > 0 && (
          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <p className="text-[10px] font-bold text-zinc-400 uppercase mb-3 tracking-widest">Suggested Materials</p>
            <div className="flex flex-wrap gap-2">
              {day.courses.map((course, i) => (
                <a
                  key={i}
                  href={course.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 hover:bg-indigo-500 hover:text-white transition-all text-xs font-medium"
                >
                  {getResourceIcon(course.url)}
                  {course.name}
                  <ExternalLink size={10} />
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default DayCard;