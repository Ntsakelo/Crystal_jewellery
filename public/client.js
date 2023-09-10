document.addEventListener('DOMContentLoaded',()=>{
    // DOM ELEMENTS
    const filterBtn = document.querySelector('.filterBtn');
    const filter = document.querySelector('.filter')
    const filters = document.querySelector('.filters')
    const items = document.querySelectorAll('.item');
  
    const shippingDetails = document.querySelector('.shippingDetails');
    const shippingPage = document.querySelector('.shippingPage');
    const destination = document.querySelector('.destination');
    const useAddressBtn = document.querySelector('.useAddressBtn');
    const categoryLinks = document.querySelectorAll('.categoryLink')
    const cartBtn = document.querySelector('.cartBtn');
    const content = document.querySelector('.content');
    const cartPage = document.querySelector('.cartPage');
    const closeCart = document.querySelector('.closeCart');
    // Handlebars templates
    const itemsTemplate = document.querySelector('.itemsTemplate');
    const itemsDisplay = document.querySelector('.itemsDisplay');
    const productViewTemplate = document.querySelector('.productViewTemplate');
    const productView = document.querySelector('.productView');
    const cartTemplate = document.querySelector('.cartTemplate');
    const myProducts = document.querySelector('.myProducts');

    filterBtn.addEventListener('click',()=>{
      
     if(filter.scrollHeight === 65){
        filter.setAttribute('style','height:500px;transition:0.3s linear all');
        filters.classList.add('show');
        filters.classList.remove('hide')
     }
      if(filter.scrollHeight === 499){
        filter.setAttribute('style','height:30px;transition:0.3s linear all');
        filters.classList.add('hide');
        filters.classList.remove('show')
     }
    })
   
    destination.addEventListener('click',()=>{
      shippingDetails.classList.add('hide');
      shippingDetails.classList.remove('show');
      shippingPage.classList.remove('hide');
      shippingPage.classList.add('show');
    })
    useAddressBtn.addEventListener('click',()=>{
      shippingPage.classList.remove('show');
      shippingPage.classList.add('hide');
      shippingDetails.classList.remove('hide');
      shippingDetails.classList.add('show');
    })
  
    ///API CALLS
    function displayProducts(){
      axios.get('/api/products').then((results)=>{
        let response = results.data;
        let data = response.data;
        //console.log(data);
        let itemList = [];
        data.forEach(item =>{
          let itemDetails ={};
          itemDetails = {item_id:item.id,item_name:item.item,item_brand:item.brand,item_variant:item.color,price:Number(item.item_price)};
          itemList.push(itemDetails);
        })
        dataLayer.push({ecommerce:null});
        dataLayer.push({
          event: 'view_item_list',
          ecommerce:{
            items:itemList
          }
        })
        const template = Handlebars.compile(itemsTemplate.innerHTML);
        itemsDisplay.innerHTML = template({
          item: data
        })
        const viewItemBtns = document.querySelectorAll('.viewBtn');
        const viewToCartBtns = document.querySelectorAll('.viewTocartBtn');
        const productView = document.querySelector('.productView');
        //API Call to display a selected item
        viewItemBtns.forEach(btn=>{
          btn.addEventListener('click',()=>{
            axios.get(`/api/products/${btn.id}`).then((results)=>{
              let response = results.data;
              let data = response.data;
              let itemList = [];
              itemList.push(data);
              dataLayer.push({ecommerce:null});
              dataLayer.push({
                event: 'view_item',
                ecommerce:{
                  currency: "ZAR",
                  items: {item_id:data.id,item_name:data.item,item_brand:data.brand,item_variant:data.color,price:Number(data.item_price)},
                }
              })
              let template = Handlebars.compile(productViewTemplate.innerHTML);
              productView.innerHTML = template({
                item:itemList
              })
              const closeViewBtn = document.querySelector('.closeView');
              closeViewBtn.addEventListener('click',()=>{
                productView.classList.remove('show');
                productView.classList.add('hide');
              })
              //Data Layer
              // dataLayer.items = itemList;
              // _satellite.track("viewTrack");
              addToCart();
            })
            productView.classList.remove('hide');
            productView.classList.add('show');
            axios.get(`/api/products/check/${btn.id}`).then(results=>{
              const moreDetails = document.querySelector('.moreDetails');
              let response = results.data;
              let data = response.data;
              if(data){
                moreDetails.setAttribute('style','display:block');
              }
              else if(!data){
                moreDetails.setAttribute('style','display:none');
              }
            })
          })
        })
        //viewCart();
      })
      
    }
    //API CALL FOR VIEWING ITEMS BY CATEGORY
      categoryLinks.forEach((link)=>{
        link.addEventListener('click',()=>{
        if(link.id==='All'){
         return displayProducts();

        }
        axios.get(`/api/products/category/${link.id}`).then(results=>{
          let response = results.data;
          let data = response.data;
          console.log(data)
          const template = Handlebars.compile(itemsTemplate.innerHTML);
          itemsDisplay.innerHTML = template({
            item: data
          })
          const viewItemBtns = document.querySelectorAll('.viewBtn');
        const viewToCartBtns = document.querySelectorAll('.viewTocartBtn');
        const productView = document.querySelector('.productView');
          viewItemBtns.forEach(btn=>{
            btn.addEventListener('click',()=>{
              axios.get(`/api/products/${btn.id}`).then((results)=>{
                let response = results.data;
                let data = response.data;
                let itemList = [];
                itemList.push(data);
                let template = Handlebars.compile(productViewTemplate.innerHTML);
                productView.innerHTML = template({
                  item:itemList
                })
                const closeViewBtn = document.querySelector('.closeView');
                closeViewBtn.addEventListener('click',()=>{
                  productView.classList.remove('show');
                  productView.classList.add('hide');
                })
                axios.get(`/api/products/check/${btn.id}`).then(results=>{
                  const moreDetails = document.querySelector('.moreDetails');
                  let response = results.data;
                  let data = response.data;
                  if(data){
                    moreDetails.setAttribute('style','display:block');
                  }
                  else if(!data){
                    moreDetails.setAttribute('style','display:none');
                  }
                })
              })
              productView.classList.remove('hide');
              productView.classList.add('show');
            })
          })
        })  
      })
      })
      function addToCart(){
        const infoQtyValue = document.querySelector('.infoQtyValue');
        const infoAddToCartBtn = document.querySelector('.infoAddToCartBtn');
        const qtyError = document.querySelector('.qtyError');
        infoQtyValue.oninput = function(){
          if(Number(infoQtyValue.value) <=0){
            qtyError.setAttribute('style','display:block');
            return;
          }
          else if(Number(infoQtyValue.value) > 0){
            qtyError.setAttribute('style','display:none');
          }
        }
        infoAddToCartBtn.addEventListener('click',()=>{
          if(Number(infoQtyValue.value) <= 0){
            return;
          }
          axios.get(`/api/products/addToCart/${infoAddToCartBtn.id}/${infoQtyValue.value}`).then(results=>{
             results;
             const moreDetails = document.querySelector('.moreDetails');
             moreDetails.setAttribute('style','display:block');
           // let result = viewCart();
          })
          axios.get('/api/cart').then(results=>{
            let response = results.data;
            let data = response.data;
            dataLayer.items = data;
           // _satellite.track("addToCartTrack");
           })
        })
      }
    //Declare variables to be assigned the elements of the update btn and qty input
    cartBtn.addEventListener('click',()=>{
      content.classList.remove('show');
      content.classList.add('hide');
      cartPage.classList.remove('hide');
      cartPage.classList.add('show');
      viewCart();         
    })

    function viewCart(){
      axios.get('/api/cart').then(results=>{
        let response = results.data;
        let data = response.data;
        const template = Handlebars.compile(cartTemplate.innerHTML);
        myProducts.innerHTML = template({
          cartItems:data
        }
        )
        const goToCheckOutBtn = document.querySelector('.goToCheckOutBtn')
        updateItemQty();
        dataLayer.items = data;
        _satellite.track('viewCartTracking');
      })
    }
    
    //Close cart functionality
    closeCart.addEventListener('click',()=>{
      content.classList.remove('hide');
      content.classList.add('show');
      cartPage.classList.remove('show');
      cartPage.classList.add('hide');
   })
   //update cart
    function updateItemQty(){
      const myQtyValue = document.querySelectorAll('.myQtyValue');
      const updateQtyBtn = document.querySelectorAll('.updateQtyBtn');
      for(let i=0;i<updateQtyBtn.length;i++){
       updateQtyBtn[i].addEventListener('click',()=>{
         //alert('clicked')
         let qty = myQtyValue[i].value;
         let id = updateQtyBtn[i].id;
         if(Number(myQtyValue[i].value) <= 0){
           myQtyValue[i].value = 1;
         }
         axios.post(`/api/cart/update/qty`,{id,qty}).then(()=>{   
          viewCart();
         })
       })
      }
    }  
    displayProducts();
    //viewCart();
   })