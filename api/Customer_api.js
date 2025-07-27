import express from 'express';
export default router = express.Router();
import CustomerService from '../services/Customer_Service.js';
import { UserAuth } from '../utils/auth.js';
import ProductService from '../services/Product_Service.js';
const service = new CustomerService();
const productService = new ProductService();

router.post('/signup', async (req, res, next)=>{
    try{
    const {username, email, password} = req.body;
    const {data} = await service.signup(username, email, password);
    // console.log(data)
    res.json(data);
    }
    catch(err){
        next(err);
    }
});
router.post('/login', async (req, res, next)=>{
    try{
        const {username, password} = req.body;
        const response = await service.login(username, password);
        res.json(response);
    }
    catch(err){
        next(err);
    }
});

    router.put('/cart',UserAuth, async (req,res,next) => {
        
        const { _id, qty } = req.body;
        
        try {     
            const product = await productService.GetProductById(_id);
    
            const result =  await service.ManageCart(req.user._id, product, qty, false);
    
            return res.status(200).json(result);
            
        } catch (err) {
            next(err)
        }
    });
    
    router.delete('/cart/:id',UserAuth, async (req,res,next) => {

        const { _id } = req.user;

        try {
            const product = await productService.getProductById(req.params.id);
            const result = await service.ManageCart(_id, product, 0 , true);             
            return res.status(200).json(result);
        } catch (err) {
            next(err)
        }
    });


