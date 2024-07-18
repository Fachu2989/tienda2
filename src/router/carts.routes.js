import { Router } from "express";
import CartManager from "../controllers/CartManager.js";

const CartRouter=Router()
const carts= new CartManager

CartRouter.post("/",async(req,res)=>{
    res.send(await carts.addcart())
})

CartRouter.get("/",async(req,res)=>{
    res.send(await carts.readCarts())
})

CartRouter.get("/:id", async(req,res)=>{
    const id=req.params.id
    res.send(await carts.getCartsById(id))
})

CartRouter.post("/:cid/products/:pid",async(req,res)=>{
    let cartid=req.params.cid
    let productid=req.params.pid
    res.send(await carts.addProductInCart(cartid,productid))
})





export default CartRouter

