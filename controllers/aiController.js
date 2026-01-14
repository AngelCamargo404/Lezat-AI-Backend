const OpenAI = require('openai');
const { getTasksData } = require('./tasksController');

// Initialize OpenAI client lazily or ensure env is loaded
const getOpenAIClient = () => {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
        throw new Error("DEEPSEEK_API_KEY is not defined in environment variables");
    }
    return new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: apiKey
    });
};

const generateSummary = async (req, res) => {
    try {
        const openai = getOpenAIClient();
        // Allow tasks to be passed in body (for localStorage support), otherwise fetch from memory
        const tasks = req.body.tasks || getTasksData();
        const pendingTasks = tasks.filter(t => t.status === 'pending');
        
        if (pendingTasks.length === 0) {
            return res.json({ summary: "No tienes tareas pendientes para resumir." });
        }

        const tasksText = pendingTasks.map(t => `- ${t.title}: ${t.description}`).join('\n');
        
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Eres un asistente de productividad útil. Genera un resumen conciso y motivador de las siguientes tareas pendientes." },
                { role: "user", content: `Aquí están mis tareas pendientes:\n${tasksText}` }
            ],
            model: "deepseek-chat",
        });

        res.json({ summary: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error in generateSummary:', error);
        res.status(500).json({ error: "Error al generar el resumen." });
    }
};

const suggestPriority = async (req, res) => {
    const { title, description } = req.body;
    
    try {
        const openai = getOpenAIClient();
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Eres un asistente que ayuda a priorizar tareas. Responde SOLO con una de las siguientes palabras: 'high', 'medium', o 'low'. Basate en la urgencia e importancia implícita." },
                { role: "user", content: `Tarea: ${title}\nDescripción: ${description}` }
            ],
            model: "deepseek-chat",
        });

        const priority = completion.choices[0].message.content.trim().toLowerCase();
        // Fallback validation
        const validPriorities = ['high', 'medium', 'low'];
        const finalPriority = validPriorities.includes(priority) ? priority : 'medium';

        res.json({ priority: finalPriority });
    } catch (error) {
        console.error('Error in suggestPriority:', error);
        res.status(500).json({ error: "Error al sugerir prioridad." });
    }
};

const autoCompleteDescription = async (req, res) => {
    const { title } = req.body;
    
    try {
        const openai = getOpenAIClient();
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: "Eres un asistente creativo. Genera una descripción breve pero detallada para una tarea basada en su título. Max 2 oraciones." },
                { role: "user", content: `Título de la tarea: ${title}` }
            ],
            model: "deepseek-chat",
        });

        res.json({ description: completion.choices[0].message.content });
    } catch (error) {
        console.error('Error in autoCompleteDescription:', error);
        res.status(500).json({ error: "Error al generar la descripción." });
    }
};

module.exports = { generateSummary, suggestPriority, autoCompleteDescription };
