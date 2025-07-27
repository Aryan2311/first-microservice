import express from 'express';
import CustomerRepository from '../database/repository/Customer_Repository.js';
// import Customer from '../database/models/Customer_Model.js';
import {hashPassword, comparePassword, generateToken} from '../utils/auth.js';


export default class CustomerService {

    constructor(){
        this.repository = CustomerRepository;
    }

    async signup(username, email, password) {

            const hashedPassword = await hashPassword(password);


            const response = await this.repository.CreateCustomer(username, email, hashedPassword);
            // console.log("Response in servide", response);
            return response;
    }

    async login(email, password) {
        const customer = await CustomerRepository.FindCustomerByEmail( email );
        const isMatch = await comparePassword(password, customer.password);
        if (!isMatch) {
            throw new Error('Invalid password');
        }
        return {
            token: generateToken(customer),
            user: {
                id: customer._id,
                username: customer.username,
                email: customer.email
            }
        };

    }
    async AddNewAddress(_id,userInputs){
    
    const { street, postalCode, city,country} = userInputs;
        const addressResult = await this.repository.CreateAddress({ _id, street, postalCode, city,country})
        return addressResult;

    }

    async ManageCart(customerId, productId, qty, isDelete) {
        
        const cartResult = await this.repository.updateCartItem(customerId, productId, qty, isDelete);
        return cartResult;     
    }
    async GetCustomerDetails(id) {
        const customer = await this.repository.FindCustomerById(id);
        if (!customer) {
            throw new Error('User not found');
        }
        return customer;
    }
    async GetWishList(customerId){
            const wishListItems = await this.repository.Wishlist(customerId);
            return wishListItems;
        }

    async AddToWishlist(customerId, productId){
           const wishlistResult = await this.repository.AddToWishlist(customerId, productId);        
           return wishlistResult;
    }
    async RemoveFromWishlist(customerId, productId) {
        const wishlistResult = await this.repository.RemoveFromWishlist(customerId, productId);
        return wishlistResult;
    }


}