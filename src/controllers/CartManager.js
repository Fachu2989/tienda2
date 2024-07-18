import {promises as fs} from "fs"
import { nanoid } from "nanoid"
import ProductManager from "./ProductManager.js"

const productAll= new ProductManager

class CartManager{
    constructor(){
        this.path = "./src/data/carts.json"
    }
    readCarts=async()=>{
        let carts= await fs.readFile(this.path,"utf8")
        return JSON.parse(carts)
    }

    writeCarts=async(cart)=>{
        await fs.writeFile(this.path, JSON.stringify(cart))
    }

    exist=async(id)=>{
        let carts= await this.readCarts()
        return carts.find(cart=>cart.id===id)
    }

    addcart=async()=>{
        let cartsOld=await this.readCarts()
        let id=nanoid()
        let cartConcat=[{id:id,products:[]},...cartsOld]
        await this.writeCarts(cartConcat)
        return "Carrito Agregado"
    }
    getCartsById=async(id)=>{
        let cartById=await this.exist(id)
        if(!cartById)return "carrito no encontrado"
        return cartById
    }

    addProductInCart=async(cartid,productid)=>{
        let cartById=await this.exist(cartid)
        if(!cartById)return "carrito no encontrado"
        let productById=await productAll.exist(productid)
        if(!productById)return "producto no encontrado"
        let cartsAll=await this.readCarts()
        let cartFilter=cartsAll.filter(cart=>cart.id != cartid)
        if(cartById.products.some(prod=>prod.id===productid)){
            let moreProductInCart=cartById.products.find(prod=>prod.id===productid)
            moreProductInCart.cantidad++
            let cartConcat=[cartById,...cartFilter]
            await this.writeCarts(cartConcat)
            return "producto sumado al carrito"
        }
        cartById.products.push({id:productById.id,cantidad:1})
        let cartConcat=[cartById,...cartFilter]
        await this.writeCarts(cartConcat)
        return "producto agregado al carrito"
    }

}

export default CartManager