const {Schema, model} = require('mongoose')

const CategorySchema = new Schema({
    name:{
        type: String,
        required:[true,'Category Name is required'],
        minLength: [3, 'Category name should be minumum of 3 characters'],
        trim: true
    },
 }, {
        timestamps: true,
      
})

module.exports = model('Category',CategorySchema)