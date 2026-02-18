// backend/routes/ai.js
const { Router } = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { userMiddleware } = require("../middleware/user");

const aiRouter = Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

aiRouter.post("/ask", userMiddleware, async (req, res) => {
    try {
        // 1. Notice we are now accepting 'history' from the frontend!
        const { question, courseTitle, history = [] } = req.body;

        // 2. Format React's history into the exact format Google Gemini requires
        const formattedHistory = history.map(msg => ({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
        }));

        // 3. Set up the AI Brain (Make sure to use the model version that worked for you!)
        const model = genAI.getGenerativeModel({ 
            model: "gemini-2.5-flash", // Or gemini-1.5-flash if that's what worked earlier
            // 💡 NEW: System Instructions! This tells the AI how to act forever.
            systemInstruction: `You are an expert teaching assistant for a course called "${courseTitle}". Answer simply, directly, and encourage the student. Keep answers under 3-4 sentences.`
        });

        // 4. Start the chat WITH the memory attached!
        const chat = model.startChat({
            history: formattedHistory
        });

        // 5. Send the new question into the ongoing chat
        const result = await chat.sendMessage(question);
        const answer = result.response.text();

        res.json({ answer: answer });

    } catch (error) {
        console.error("AI Error:", error);
        res.status(500).json({ message: "The AI Teaching Assistant is currently taking a coffee break. Try again later!" });
    }
});

module.exports = { aiRouter };