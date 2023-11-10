const { Schema, model } = require('mongoose');

const PostSchema = new Schema({
    category: {
        required: true,
        // Schema.ObjectId ==> _id
        type: Schema.ObjectId,
        // ref is helping us to reach the this table
        // it is going to be "foreing key"
        ref: 'Category'
    },
    title: {
        type: String,
        trim: true,
        required: [true, 'Post title is required'] // corrected 'truw' to 'true'
    },
    content: {
        type: String,
        trim: true,
        required: [true, 'Post content is required']
    },
    published: {
        type: Boolean,
        default: true
    }
},{
    timestamps:true,
});

module.exports = model('Post', PostSchema);
