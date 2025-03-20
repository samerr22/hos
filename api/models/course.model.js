import mongoose from 'mongoose';


const courseSchema = new mongoose.Schema({
 

  
  
  sId: {
    type: String, 
    required: true
  },
  name: {
    type: String, 
    required: true
  },
  gender: {
    type: String, 
    required: true
  },
  intake: {
    type: String, 
    required: true
  },
  batch: {
    type: String, 
    required: true
  },
  operations: {
    type: String, 
    required: true
  },


  
 
 
 
 
  
 
  
});


const course = mongoose.model('course', courseSchema);

export default  course;