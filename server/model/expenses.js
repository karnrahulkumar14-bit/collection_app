const {Schema, model} = require("mongoose");

const expensesSchema = new Schema({
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

const Expenses = new model("Expenses",expensesSchema);

module.exports = Expenses;