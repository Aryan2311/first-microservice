
import Product from '../models/Product_Model.js';
class ProductRepository {
  async CreateProduct({
    name,desc,type,unit,price,available,suplier,banner}) {
      const product = new Product({
        name,
        desc,
        type,
        unit,
        price,
        available,
        suplier,
        banner,
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
      const products = await ProductModel.find({ type: category });
      return products;
  }

    async FindSelectedProducts(selectedIds) {
    return await ProductModel.find({ _id: { $in: selectedIds } });
    }

}
export default ProductRepository;