let tasks = [
    { id: 1, title: "Tarea de Ejemplo", description: "Esta es una tarea inicial para probar el sistema.", status: "pending", priority: "medium" }
];

const getTasksData = () => tasks;

const getTasks = (req, res) => {
    res.json(tasks);
};

const createTask = (req, res) => {
    const { title, description, status, priority } = req.body;
    if (!title) {
        return res.status(400).json({ message: "El título es obligatorio" });
    }
    const newTask = {
        id: Date.now(),
        title,
        description: description || "",
        status: status || 'pending',
        priority: priority || 'medium'
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

const updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;
    const index = tasks.findIndex(t => t.id == id);
    
    if (index !== -1) {
        tasks[index] = { 
            ...tasks[index], 
            title: title || tasks[index].title, 
            description: description !== undefined ? description : tasks[index].description, 
            status: status || tasks[index].status,
            priority: priority || tasks[index].priority
        };
        res.json(tasks[index]);
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
};

const deleteTask = (req, res) => {
    const { id } = req.params;
    const initialLength = tasks.length;
    tasks = tasks.filter(t => t.id != id);
    
    if (tasks.length < initialLength) {
        res.json({ message: "Tarea eliminada correctamente" });
    } else {
        res.status(404).json({ message: "Tarea no encontrada" });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, getTasksData };
