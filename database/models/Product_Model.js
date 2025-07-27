import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    desc: String,
    type: String,
    price: Number,
}, {
    toJSON: {
        transform: function (doc, ret) { 
            delete ret.__v;
        }
}, 
    timestamps: true
});

export default  mongoose.model('product', ProductSchema);