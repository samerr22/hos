
import course from "../models/course.model.js";





//recordagency
export const create = async (req, res, next) => {
  const { 
    sId,
    name,
    gender,
    intake,
    batch,
    operations


   
   } = req.body;

  const newcourse = new course({
    sId,
    name,
    gender,
    intake,
    batch,
    operations
  });
  try {
    const save = await newcourse.save();
    res.status(201).json(save);
  } catch (error) {
    next(error);
  }
};




export const getAll = async (req, res, next) => {
  try {
    const cou = await course.find();

    if (cou.length > 0) {
      res.json({
        message: "course detail retrieved successfully",
        cou,
      });
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};




export const deletedata  = async (req, res, next) => {
  try {
    await course.findByIdAndDelete(req.params.ccId);
    res.status(200).json("The course has been deleted");
  } catch (error) {
    next(error);
  }
};



export const update = async (req, res, next) => {
  try {
    const updatecourse = await course.findByIdAndUpdate(
      req.params.cId,
      {
        $set: {
          sId: req.body.sId,
          name: req.body.name,
          gender: req.body.gender,
          intake: req.body.intake,
          batch: req.body.batch,
          operations: req.body.operations,
        },
      },
      { new: true }
    );
    res.status(200).json(updatecourse );
  } catch (error) {
    next(error);
  }
};




