import Task from "../model/taskModel.js";

const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;
        const task = new Task({ title, description , userId: req.user.id._id });
        await task.save();
        const tasks = await Task.find({ isDeleted: false , userId: req.user.id._id });
        const io = req.app.get('socketio');
        io.to(req.user.id._id).emit('refreshTasks', { success: true, data: tasks }); 
        io.to(req.user.id._id).emit('taskAdded');
        res.status(201).json({ message: 'Task added successfully', success: true });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};


const getTasks = async (req, res) => {
    try {

        console.log(req.user);
        
        const tasks = await Task.find({ isDeleted: false , userId: req.user.id._id });
        res.status(200).json({ tasks, success: true });
    } catch (error) {
        console.error('Error getting tasks:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};


const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        
        const task = await Task.findOneAndUpdate({ _id: id , userId: req.user.id._id}, req.body, { new: true });

        if (!task) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        const tasks = await Task.find({ isDeleted: false , userId: req.user.id._id });

        console.log('====================================');
        console.log(tasks);
        console.log('====================================');

        const io = req.app.get('socketio');
        io.to(req.user.id._id).emit('refreshTasks', { success: true, data: tasks }); 
        io.to(req.user.id._id).emit('taskUpdated');
        res.status(200).json({ message: 'Task updated successfully', success: true });
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};


 const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await Task.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!task) {
            return res.status(404).json({ message: 'Task not found', success: false });
        }
        const tasks = await Task.find({ isDeleted: false , userId: req.user.id._id });
        const io = req.app.get('socketio');
        io.to(req.user.id._id).emit('refreshTasks', { success: true, data: tasks }); 
        io.to(req.user.id._id).emit('taskDeleted');
        res.status(200).json({ message: 'Task deleted successfully', success: true });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }

};

const getTaskStatistics = async (req, res) => {
    try {
        const totalTasks = await Task.countDocuments({userId: req.user.id._id });
        const completedTasks = await Task.countDocuments({ completed: true , userId: req.user.id._id });
        const deletedTasks = await Task.countDocuments({ isDeleted: true , userId: req.user.id._id });

        res.status(200).json({
            success: true,
            data: {
                totalTasks,
                completedTasks,
                deletedTasks,
                activeTasks: totalTasks - deletedTasks, // Active tasks = total - deleted
            },
        });
    } catch (error) {
        console.error('Error fetching task statistics:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};


export { addTask, getTasks, updateTask, deleteTask , getTaskStatistics};
