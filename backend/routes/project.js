const router = require('express').Router();
const User = require("../models/user");
const mongoose = require('mongoose');

const List = require("../models/Todo");
const {Project, projectSchema} = require("../models/Project");
const authenticated = require("../middleware/authMiddleware");
const isAuthenticated = require('../middleware/authMiddleware');



router.post("/projects", authenticated, async (req, res) => {
    const { title } = req.body;
    const user_id = new mongoose.Types.ObjectId(req.user.id);

    const project = new Project({ title, user: user_id });
    const user = await User.findById(user_id);
   // console.log(user);
    await project.save().then(() => res.status(200).json({ project }));
    user.projects.push(project);
    user.save();
});

router.put("/projects/:id", isAuthenticated, async (req, res) => {
    const projectId = new mongoose.Types.ObjectId(req.params['id']);
    const { title } = req.body;
    await Project.findByIdAndUpdate(projectId, { title: title }, { new: true }).then(
        async (project) => { await res.status(200).json({ project }) });
});


router.delete("/projects/:id", isAuthenticated, async (req, res) => {
    const projectId = new mongoose.Types.ObjectId(req.params['id']);

    Project.findByIdAndDelete(projectId)
    .then(async (deletedProject) => {
        if (deletedProject==null) {
            res.status(400).json({message:"project not found"});
        }

        // Delete associated users (remove project reference from users)
        const user = await User.findOne({ projects: { $in: [projectId] } });
       
        if (user) {
            // Update the user's projects array to remove the deleted project ID
            user.projects = user.projects.filter(id => id.toString() !== projectId.toString());
            await user.save();
        }

        // Find and delete associated todos
        const todoIdsToDelete = deletedProject.todos;
        if (todoIdsToDelete.length > 0) {
            await List.deleteMany({ _id: { $in: todoIdsToDelete } });
        }

        res.status(200).json({message:"project deleted successfully"});
    })
    .catch(error => {
       res.status(400).json({message:"error deleting the project"});
    });
})
/**
 * cars
 * POST - /cars (Create)
 * GET - /cars (Get ALL cars)
 * GET - /cars/34 (Get 1 car)
 * PUT - /cars/34 (Update)
 * DELETE - /cars/34
 */

router.get("/projects", isAuthenticated, async (req, res) => {


    const user_id = new mongoose.Types.ObjectId(req.user.id);
    //console.log(user_id, " ");

    try {
        const projects = await Project.find({ user: user_id });

        if (projects.length === 0) {
            // If no projects found, send a custom error response
            return res.status(200).json({ message: "No projects found for this user" });
        }
        res.status(200).json({ projects: projects });
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        res.status(500).json({ message: "Internal server error" });
    }
})



module.exports = router