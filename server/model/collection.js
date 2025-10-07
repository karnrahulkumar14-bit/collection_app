const {Schema, model} = require("mongoose");

const collectionSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    amount:{
        type:String,
        required:true
    }
})

const Collection = new model("Collection",collectionSchema);

module.exports = Collection;