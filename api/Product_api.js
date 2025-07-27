import express from 'express';
export default router = express.Router();
import { authenticateUser } from '../utils/auth';
import ProductService from '../services/Product_Service.js';
import CustomerService from '../services/Customer_Service.js';

const service = new ProductService();
const customerService = new CustomerService();

    router.post('/create', authenticateUser, async(req,res,next) => {
        
        try {
            const { name, desc, type, unit,price, available, suplier, banner } = req.body; 
            // validation
            const { data } =  await service.CreateProduct({ name, desc, type, unit,price, available, suplier, banner });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });

    router.get('/:id', async(req,res,next) => {
        try {
            const { id } = req.params;
            const product = await service.getProductById(id);
            return res.json(product);
        } catch (err) {
            next(err);
        }
    });

    router.get('/category/:type', async(req,res,next) => {
        
        const type = req.params.type;
        
        try {
            const { data } = await service.GetProductsByCategory(type)
            return res.status(200).json(data);

        } catch (err) {
            next(err)
        }

    });
    router.get('/all', async(req,res,next) => {
        try {
            const products = await service.getAllProducts();
            return res.status(200).json(products);
        } catch (err) {
            next(err);
        }
    });
    router.post('/ids', async(req,res,next) => {

        try {
            const { ids } = req.body;
            const products = await service.getSelectedProducts(ids);
            return res.status(200).json(products);
            
        } catch (err) {
            next(err)
        }
       
    });

