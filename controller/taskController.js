const Task = require('../models/taskModel');


const getAllTasks = async (req, res) => {
try {
    const tasks = await Task.find();
    res.json(tasks);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las tareas' });
}
};


const createTask = async (req, res) => {
try {
    const { title, description } = req.body;

  
    if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const newTask = new Task({ title, description });
    await newTask.save();

    res.json(newTask);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la tarea' });
}
};


const getTaskById = async (req, res) => {
try {
    const task = await Task.findById(req.params.id);

    if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(task);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la tarea' });
}
};


const updateTask = async (req, res) => {
try {
    const { title, description, completed } = req.body;


    if (!title) {
    return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, completed },
    { new: true }
    );

    if (!updatedTask) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json(updatedTask);
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la tarea' });
}
};


const deleteTask = async (req, res) => {
try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    res.json({ message: 'Tarea eliminada correctamente' });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la tarea' });
}
};

module.exports = {
getAllTasks,
createTask,
getTaskById,
updateTask,
deleteTask,
};
