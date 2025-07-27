import Repository from '../database/repository/Product_Repository.js';


export default class ProductService {

    constructor() {
        this.repository = Repository;
    }

    async createProduct(productDetails) {
        const response = await this.repository.CreateProduct(productDetails);
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