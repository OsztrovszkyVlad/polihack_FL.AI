import mongoose from 'mongoose'

const FileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    },
    idc:{
        type:String,
        required:true
    }
})

const FileModel=mongoose.model("file",FileSchema)
export default FileModel