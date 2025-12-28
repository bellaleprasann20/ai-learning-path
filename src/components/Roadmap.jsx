import { useRef } from "react";
import { Download, Share2, ArrowLeft } from "lucide-react";
import DayCard from "./DayCard";
import { motion } from "framer-motion";

const Roadmap = ({ roadmap, onBack }) => {
  const printRef = useRef();

  // 1. DOWNLOAD LOGIC (Using Browser Print)
  const handleDownload = () => {
    window.print(); 
    // This is the most reliable way. 
    // I will show you how to hide buttons during print below.
  };

  // 2. SHARE LOGIC
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My AI Learning Path",
          text: "Check out this roadmap I generated!",
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header / Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 no-print">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-zinc-500 hover:text-indigo-600 transition-colors mb-4 text-sm font-medium"
          >
            <ArrowLeft size={16} /> Edit Preferences
          </button>
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white">
            Your Personalized Journey
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-sm font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all"
          >
            <Share2 size={18} /> Share
          </button>
          <button 
            onClick={handleDownload}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            <Download size={18} /> Download PDF
          </button>
        </div>
      </div>

      {/* Roadmap Content */}
      <div ref={printRef} className="roadmap-print-area">
        {roadmap.map((day, index) => (
          <DayCard key={index} day={day} index={index} />
        ))}
      </div>

      {/* CSS to make PDF look perfect */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          .roadmap-print-area { padding: 20px !important; }
          .dark { background: white !important; }
        }
      `}} />
    </div>
  );
};

export default Roadmap;