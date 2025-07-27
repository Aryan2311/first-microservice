import express from 'express';
const router = express.Router();
import CustomerService from '../services/Customer_Service.js';
import { authenticateUser } from '../utils/auth.js';
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
        const {email, password} = req.body;
        const response = await service.login(email, password);
        res.json(response);
    }
    catch(err){
        next(err);
    }
});


router.put('/cart',authenticateUser, async (req,res,next) => {
    
    const { _id, qty } = req.body;
    
    try {     

        const result =  await service.ManageCart(req.user.id, _id, qty, false);

        return res.status(200).json(result);
        
    } catch (err) {
        next(err)
    }
});

router.delete('/cart/:id',authenticateUser, async (req,res,next) => {

    const { id } = req.params;
    try {
        const result = await service.ManageCart(req.user.id, id, 0 , true);             
        return res.status(200).json(result);
    } catch (err) {
        next(err)
    }
});

router.post("/address", authenticateUser, async (req, res, next) => {
    try {
    const { _id } = req.user;

    const { street, postalCode, city, country } = req.body;

    const { data } = await service.AddNewAddress(_id, {
        street,
        postalCode,
        city,
        country,
    });

    return res.json(data);
    } catch (err) {
    next(err);
    }
});

router.get('/profile', authenticateUser, async (req, res, next) => {
    try {
        const customer = await service.GetCustomerDetails(req.user.id);
        return res.status(200).json(customer);
    } catch (err) {
        next(err);
    }
});

router.get('/wishlist', authenticateUser, async (req, res, next) => {
    try {
        const wishListItems = await service.GetWishList(req.user.id);
        return res.status(200).json(wishListItems);
    } catch (err) {
        next(err);
    }
});
router.post('/wishlist', authenticateUser, async (req, res, next) => {
    try {
        const { productId } = req.body;
        const wishlistResult = await service.AddToWishlist(req.user.id, productId);
        return res.status(200).json(wishlistResult);
    } catch (err) {
        next(err);
    }
});
router.delete('/wishlist/:productId', authenticateUser, async (req, res, next) => {
    try {
        const { productId } = req.params;
        const wishlistResult = await service.RemoveFromWishlist(req.user.id, productId);
        return res.status(200).json(wishlistResult);
    } catch (err) {
        next(err);
    }
});
export default router;




