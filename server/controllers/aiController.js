import openai from "../utils/openai.js";

export const generateRoadmap = async (req, res) => {
  try {
    const { goal, level, days, hours } = req.body;
    const syllabusContext = req.file ? `Additional context from file: ${req.file.originalname}` : "";

    const prompt = `
      Act as a world-class curriculum designer. Create a ${days}-day roadmap for "${goal}" at a ${level} level (${hours} hrs/day).
      ${syllabusContext}

      CRITICAL REQUIREMENT: For EVERY day, you MUST provide a "courses" array containing 2-3 high-quality, real-world learning resources (YouTube videos, official documentation, or free courses). 
      Provide specific titles and valid URLs.

      Return ONLY a JSON object with this structure:
      {
        "roadmap": [
          {
            "dayNumber": 1,
            "title": "Topic Name",
            "description": "Short summary",
            "duration": "${hours} hours",
            "tasks": ["task 1", "task 2"],
            "courses": [
              { "name": "Resource Title (e.g., freeCodeCamp, MDN, YouTube)", "url": "Actual URL" }
            ]
          }
        ]
      }
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Better link accuracy
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" },
    });

    const data = JSON.parse(completion.choices[0].message.content);
    res.status(200).json(data.roadmap || data);
  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ message: "AI failed to generate links for this topic." });
  }
};