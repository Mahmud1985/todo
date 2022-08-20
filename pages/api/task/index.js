import Task from "../../../models/Task"
import dbConnect from "../../../utils/dbConnect"

const handler = async (req, res) => {
    const { method } = req;

    //dbConnect connect to MongoDB
    await dbConnect();

    //create a todo Task
    if (method === "POST") {
        try {
            const newTask = await new Task(req.body).save();
            res.status(201).json({ data: newTask, message: "New Task Added." })
        } catch (error) {
            res.status(500).json({ message: "internal server error." })
            console.log(error);
        }
    }

    // get all tasks
    if (method === "GET") {
        try {
            const tasks = await Task.find();
            res.status(200).json({ data: tasks })
        } catch (error) {
            res.status(500).json({ message: "internal server error." })
            console.log(error);
        }
    }

}


export default handler