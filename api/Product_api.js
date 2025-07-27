import express from 'express';
const router = express.Router();
import { authenticateUser } from '../utils/auth.js';
import ProductService from '../services/Product_Service.js';
import CustomerService from '../services/Customer_Service.js';

const service = new ProductService();
const customerService = new CustomerService();

    router.post('/create', authenticateUser, async(req,res,next) => {
        
        try {
            const { name, desc, type, price } = req.body; 
            // validation
            const { data } =  await service.createProduct({ name, desc, type, price });
            return res.json(data);
            
        } catch (err) {
            next(err)    
        }
        
    });

    router.get('/category/:type', async(req,res,next) => {
        
        const type = req.params.type;
        
        try {
            const  data  = await service.getProductsByCategory(type)
            console.log("Products in category:", data);
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
    router.get('/:id', async(req,res,next) => {
        try {
            const { id } = req.params;
            const product = await service.getProductById(id);
            return res.json(product);
        } catch (err) {
            next(err);
        }
    });

export default router;
