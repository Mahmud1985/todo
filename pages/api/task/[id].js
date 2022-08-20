import { handleClientScriptLoad } from "next/script"
import Task from "../../../models/Task"
import dbConnect from "../../../utils/dbConnect"

const handler = async (req, res) => {
    const { method } = req;
    const { id } = req.query;

    //dbConnect connect to MongoDB
    await dbConnect();

    //update a todo Task

    if (method === "PUT") {
        try {
            const result = await Task.findByIdAndUpdate(id, { $set: req.body }, { new: true })
            res.status(200).json({ data: result, message: "Task updated." })
        } catch (error) {
            res.status(500).json({ message: "internal server error." })
            console.log(error);
        }
    }

    // Detele a Task
    if (method === "DELETE") {
        try {
            const result = await Task.findByIdAndDelete(id)
            res.status(200).json({ data: result, message: "Task Deleted." })
        } catch (error) {
            res.status(500).json({ message: "internal server error." })
            console.log(error);
        }
    }
}


export default handler