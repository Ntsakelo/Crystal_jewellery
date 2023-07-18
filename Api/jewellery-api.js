import ShortUniqueId from "short-unique-id";
let uid = new ShortUniqueId({ length: 5 });

export default function (jewelleryData){
  let id = uid();
  async function productsApi(req, res,next){
    try{
        let results = await jewelleryData.products();
        req.session.user = id;
        res.json({
          data: results,
          status:'success'
        })
    }
    catch(err){
        next(err)
    }
  }
  async function itemApi(req,res,next){
    try{
       let itemId = req.params.id;
       let results = await jewelleryData.item(Number(itemId));
       res.json({
        data:results,
        status:'success'
       })
    }catch(err){
      next(err)
    }
  }
  async function productsByCategoryApi(req,res,next){
    try{
       let category = req.params.category;
       let results = await jewelleryData.productsByCategory(category);
       res.json({
        data: results,
        status: 'success'
       })
    }catch(err){
      next(err)
    }
  }
  async function addToCatApi(req,res,next){
    try{
          let itemId = Number(req.params.id);
          let qty = Number(req.params.qty);
          let customerId = null;
          let customerRef = req.session.user;
          await jewelleryData.addToCat(itemId,qty,customerRef,customerId);
    }catch(err){
      next(err)
    }
  }
  async function cartApi(req,res,next){
    try{
         let customer_ref = req.session.user;
         let results = await jewelleryData.cartItems(customer_ref);
         res.json({
          data:results,
          status:'success'
         })
    }catch(err){
      next(err)
    }
  }
  async function updateApi(req,res,next){
    try{
         let qty = Number(req.body.qty)
         let catalogueId = Number(req.body.id); 
         await jewelleryData.updateCatalogue(catalogueId,qty);
         res.json({
          status:'success'
         }) 
    }catch(err){
      next(err)
    }
  }
  async function itemCheckInCartApi(req,res,next){
    try{
        let itemId = req.params.id;
        let customerRef = req.session.user;
        let results = await jewelleryData.checkItemInCart(itemId,customerRef);
        res.json({
          data: results,
        })
    }catch(err){
      next(err)
    }
  }
  //return all apis
  return{
    productsApi,
    itemApi,
    productsByCategoryApi,
    addToCatApi,
    cartApi,
    updateApi,
    itemCheckInCartApi,
  }
}