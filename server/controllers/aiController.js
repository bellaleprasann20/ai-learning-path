import openai from "../utils/openai.js";

export const generateRoadmap = async (req, res) => {
  try {
    // 1. Log incoming data to ensure Multer is working
    console.log("📥 Received request for goal:", req.body.goal);
    
    const { goal, level, days, hours } = req.body;
    const syllabusContext = req.file ? `Additional context from file: ${req.file.originalname}` : "";

    const prompt = `
      Act as a world-class curriculum designer. Create a ${days}-day roadmap for "${goal}" at a ${level} level (${hours} hrs/day).
      ${syllabusContext}

      Return ONLY a JSON object with this exact structure:
      {
        "roadmap": [
          {
            "dayNumber": 1,
            "title": "Topic Name",
            "description": "Short summary",
            "duration": "${hours} hours",
            "tasks": ["task 1", "task 2"],
            "courses": [
              { "name": "Resource Title", "url": "Actual URL" }
            ]
          }
        ]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", 
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    // 2. Safely parse and send data
    const content = completion.choices[0].message.content;
    const data = JSON.parse(content);

    // Ensure we always send something back
    if (data.roadmap) {
        console.log("✅ Successfully generated roadmap with", data.roadmap.length, "days");
        return res.status(200).json(data.roadmap);
    } else {
        return res.status(200).json(data);
    }

  } catch (error) {
    // 3. This will now show up in your Render Logs
    console.error("🔥 AI Controller Error:", error.message);
    
    // Check if it's an OpenAI Quota issue
    if (error.message.includes("quota") || error.message.includes("429")) {
        return res.status(500).json({ message: "OpenAI Account Quota Exceeded. Please check credits." });
    }

    res.status(500).json({ message: "AI failed to generate links: " + error.message });
  }
};