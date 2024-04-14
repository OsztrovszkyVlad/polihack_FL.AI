import mongoose from 'mongoose'


const ConvSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
})

const ConvModel=mongoose.model("conv",ConvSchema)
export default ConvModel