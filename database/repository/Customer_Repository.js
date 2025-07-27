import express from 'express';
import Customer from '../models/Customer_Model.js';
import AddressModel from '../models/Address_Model.js';
class CustomerRepository {
    CreateCustomer = async (username, email, password) => {
    const newCustomer = new Customer({
        username,
        email,
        password});
    const response = await newCustomer.save();
        console.log("Customer signed up successfully:", response);
    return {data: response};
}

    CreateAddress = async ({ _id, street, postalCode, city, country }) => {
        const profile = await Customer.findById(_id);
        if (profile) {
            const newAddress = new AddressModel({
                street,
                postalCode,
                city,
                country,
            });

            await newAddress.save();

            profile.address.push(newAddress._id);
        }
        return await profile.save();

    }

    FindCustomerByEmail = async (email) => {
        const customer = await Customer.findOne({ email});
        if (!customer) {
            throw new Error('User not found');
        }
        return customer;
    }

    FindCustomerById = async (id) => { 
        const customer = await Customer.findById(id)
            .populate('cart.product')
            .populate('address')
            .populate('wishlist')
            .populate('orders');
        if (!customer) {
            throw new Error('User not found');
        }
        return customer;
    }

    async Wishlist(customerid){
        const customer = await Customer.findById(customerid)
            .populate('wishlist');
        return profile.Wishlist;
    }

    async AddToWishlist(customerId, productId) {
    await Customer.updateOne(
        { _id: customerId },
        { $addToSet: { wishlist: productId } }
    );
    return await Customer.findById(customerId).populate('wishlist');
    }
    async RemoveFromWishlist(customerId, productId) {
        await Customer.updateOne(
            { _id: customerId },
            { $pull: { wishlist: productId } }
        );
        return await Customer.findById(customerId).populate('wishlist');
    }
    async updateCartItem(customerId, productId, qty, isRemove) {
    if (isRemove) {
        await Customer.updateOne(
        { _id: customerId },
        { $pull: { cart: { product: productId } } }
        );
    } else {
        // Try update existing
        const updateResult = await Customer.updateOne(
        { _id: customerId, "cart.product": productId },
        { $set: { "cart.$.unit": qty } }
        );

        // If not found, push new item
        if (updateResult.modifiedCount === 0) {
        await Customer.updateOne(
            { _id: customerId },
            { $push: { cart: { product: productId, unit: qty } } }
        );
        }
    }

  return await Customer.findById(customerId).populate("cart.product");
}


}
export default new CustomerRepository();