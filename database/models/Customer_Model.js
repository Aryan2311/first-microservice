import mongoose, { Schema } from "mongoose"

const CustomerSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        email: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cart : [{
          product: { type: Schema.Types.ObjectId, ref: 'product', require: true},
          unit: { type: Number, require: true}
    }],
    address: [{
        type : Schema.Types.ObjectId,
        ref: 'address',
        require: true
    }],
    wishlist: [{
        type : Schema.Types.ObjectId,
        ref: 'product',
        require: true
    }],
    order : [{
        type : Schema.Types.ObjectId,
        ref: 'order',
        require: true
    }]

}, {
    toJSON: {
        transform: function (doc, ret) {
            delete ret.__v;
            delete ret.password; // Don't return password in the response
        }
    },
    timestamps: true
});




const Customer = mongoose.model('customer', CustomerSchema);

export default Customer;