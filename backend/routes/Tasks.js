const router = require('express').Router();
const User = require("../models/user");
const mongoose = require('mongoose');
const List = require("../models/Todo");
const{ Project, projectSchema} = require("../models/Project");

const isAuthenticated = require('../middleware/authMiddleware');


router.get("/projects/:id",isAuthenticated,async (req,res)=>{
  const projectId = new mongoose.Types.ObjectId(req.params['id']);
   Project.findById(projectId).populate('todos')
        .then((project)=>{
            if(project.todos.length>0){
            res.status(200).json({tasks: project.todos});
            } else {
              res.status(200).json({message:"no tasks found for this project"})
            }
          }).catch((err)=>{
          res.status(400).json({error: err});
        })
});

router.post("/projects/:id",isAuthenticated, async (req, res)=>{
    const projectId = new mongoose.Types.ObjectId(req.params['id']);
    const {description} = req.body ;
    const project = await Project.findById(projectId);
    if(project==null){
        res.status(200).json({error: "no project found"})
    }
    const task = new List({description: description});
    await task.save().then(()=>res.status(200).json(task));
    project.todos.push(task);
    project.save();
}
)

router.delete("/task/:id",isAuthenticated, async (req,res)=>{
  const taskId = new mongoose.Types.ObjectId(req.params['id']);

  List.findByIdAndDelete(taskId)
  .then(async (deletedTask) => {
      if (deletedTask==null) {
          res.status(400).json({message:"task not found"});
      }

      // Delete associated users (remove project reference from users)
      const proj = await Project.findOne({ todos: { $in: [taskId] } });
     
      if (proj) {
          // Update the user's projects array to remove the deleted project ID
          proj.todos = proj.todos.filter(id => id.toString() !== taskId.toString());
          await proj.save();
      }

      res.status(200).json({message:"task deleted successfully"});
  })
  .catch(error => {
     res.status(400).json({message:"error deleting the task"});
  });
});

router.put("/task/:id", isAuthenticated, async (req, res) => {
  const taskId = new mongoose.Types.ObjectId(req.params['id']);
  const { description } = req.body;
  await List.findByIdAndUpdate(taskId, { description: description }, { new: true }).then(
      async (list) => { await res.status(200).json({ list }) });
});

router.put("/task/status/:id", isAuthenticated, async (req, res) => {
  const taskId = new mongoose.Types.ObjectId(req.params['id']);
  const { status } = req.body;
  await List.findByIdAndUpdate(taskId, { status: status }, { new: true }).then(
      async (list) => { await res.status(200).json({ list }) });
});

module.exports = router