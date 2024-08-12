const mongoose=require('mongoose');

const bookSchema = new mongoose.Schema(
    {
        title:{type:String,required:true},
        // created_at:{type:Date,default:Date.now},
        Author:{type:String,required:true},
        description:{type:String,required:true},
        imagePath: { type: String  }
        // is_available:Boolean,
        //number that has issued it and is avialble an ddate select in range like how many days
    }    
);
const BookModel = mongoose.model('Book',bookSchema);

module.exports = BookModel;