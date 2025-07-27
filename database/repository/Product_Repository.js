
import Product from '../models/Product_Model.js';
class ProductRepository {
  async CreateProduct({
    name,desc,type,price}) {
      const product = new Product({
        name,
        desc,
        type,
        price,
      });

      const productResult = await product.save();
      console.log("Product created successfully:", productResult);
      return productResult;
  }

    FindProductById = async (id) => {
        const product = await Product.findById(id);
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }

    FindAllProducts = async () => {
        const products = await Product.find({});
        return products;
    }

    async FindByCategory(category) {
      const products = await Product.find({ type: category });
      return products;
  }

    async FindSelectedProducts(selectedIds) {
    return await Product.find({ _id: { $in: selectedIds } });
    }

}
export default new ProductRepository();