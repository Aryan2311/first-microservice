import express from 'express';
import CustomerRepository from '../database/repository/Customer_Repository.js';


export default class ProductService {

    constructor() {
        this.repository = CustomerRepository;
    }

    async createProduct(name, price, description) {
        const newProduct = {
            name,
            price,
            description
        };
        const response = await this.repository.CreateProduct(newProduct);
        return { data: response };
    }

    async getProductById(id) {
        const product = await this.repository.FindProductById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    async getAllProducts() {
        const products = await this.repository.FindAllProducts();
        return products;
    }
    async getProductsByCategory(category) {
        const products = await this.repository.FindByCategory(category);
        return products;
    }
    async getSelectedProducts(selectedIds) {
        const products = await this.repository.FindSelectedProducts(selectedIds);
        return products;
    }
}