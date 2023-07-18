export default function jewelleryData(db){
// Get all products from database
 async function products(){
    try{
        return await db.manyOrNone('select * from products');        
    }catch(err){
        console.log(err)
    }
 }
 async function item(id){
    try{ 
     return await db.oneOrNone('select * from products where id=$1',[id])
    }catch(err){
        console.log(err)
    }
 }
 async function productsByCategory(category){
    try{
       return await db.manyOrNone('select * from products where category=$1',[category]);
    }catch(err){
        console.log(err)
    }
 }
 async function addToCat(id,qty,cust_ref,cust_id){
    try{
        if(!cust_id){
            cust_id = null;
        }
       let results = await db.oneOrNone('select * from products where id=$1',[id]);
       await db.none('insert into catalogue(item_id,qty,item_subTotal,customer_ref,customer_id) values($1,$2,$3,$4,$5)',[results.id,qty,(results.item_price*qty).toFixed(2),cust_ref,cust_id]);
    }catch(err){
        console.log(err)
    }
 }
 async function cartItems(customer_ref){
    try{
         return await db.manyOrNone('select item,item_price,catalogue.id,qty,item_subtotal,item_url from products join catalogue on products.id = catalogue.item_id where customer_ref = $1 order by catalogue.id desc',[customer_ref]);
    }catch(err){
        console.log(err)
    }
 }
 async function updateCatalogue(catalogueId,qty,customer_ref){
    try{
        if(qty === 0){
            return;
        }
        let itemId = await db.oneOrNone('select item_id from catalogue where id=$1',[catalogueId]);
        let itemPrice = await db.oneOrNone('select item_price from products where id=$1',[itemId.item_id]);
        let newSubTotal = (qty * Number(itemPrice.item_price)).toFixed(2)
        await db.none('update catalogue set qty = $1 where id=$2',[qty,catalogueId]);
        await db.none('update catalogue set item_subtotal = $1 where id=$2',[newSubTotal,catalogueId]);
    }catch(err){
        console.log(err)
    }
 }
 async function checkItemInCart(itemId,customerRef){
    try{
        return await db.oneOrNone('select * from catalogue where item_id =$1 and customer_ref=$2',[itemId,customerRef])
    }catch(err){
        console.log(err)
    }
 }
 //return all functions
 return{
   products,
   productsByCategory,
   item,
   addToCat,
   cartItems,
   updateCatalogue,
   checkItemInCart
 }
}