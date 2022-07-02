export const GET_USERCART="GET_USERCART"
export const GET_CHECKOUT="GET_CHECKOUT"
export const GET_COMMENT="GET_COMMENT"
export const GET_CATEGORY="GET_CATEGORY"
export const GET_ALLVENDORS="GET_ALLVENDORS"
export const GET_MYORDER="GET_MYORDER"
export const GET_SINGLESHOP="GET_SINGLESHOP"
export const GET_CHECK="GET_CHECK"
export const GET_CATEGORYPRODUCT="GET_CATEGORYPRODUCT"
export const GET_ALLORDERS="GET_ALLORDERS"
export const GET_DETAILSMYORDER="GET_DETAILSMYORDER"


import config from "../../constants/config"
import axios from "axios"
import FormData from "form-data"




// لیست سفارشات    stor   
export const getusercart = (access_token) => {
    return async (dispatch) => {
        const url = config.baseUrl + "/wp-json/chivane/v1/user/cart";
        let Header = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
        };

        return axios({
            method: "get",
            url: url,
            headers: Header,
        })

            .then(function (response) {
                //console.log(response);
                const resData = response;
                const data = resData.data;
                //console.log(data);
                dispatch({ type: GET_USERCART, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
};


//حذف تکی محصولات   cart
export const removecart = async (access_token,key) => {

    let Header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
    };
    var requestOptions = {
        method:"DELETE",
        headers:Header
        
    };

    fetch("https://chivane.com/wp-json/cocart/v2/cart/item/"+key, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};
// حذف کلی  cart
export const removeALLcart = async (access_token) => {

    let Header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
    };
    var requestOptions = {
        method:"DELETE",
        headers:Header
        
    };

    fetch("https://chivane.com/wp-json/chivane/v1/cart/clear", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};


// چک کردن  Checkout
export const getCheckout = (access_token) => {
    return async (dispatch) => {
        const url = config.baseUrl + "/wp-json/chivane/v1/user/cart/calculate";
        let Header = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
        };

        return axios({
            method: "get",
            url: url,
            headers: Header,
        })

            .then(function (response) {
                //console.log(response);
                const resData = response;
                const data = resData.data;
                //console.log(data);
                dispatch({ type: GET_CHECKOUT, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
};


// گرفتن کامنت  comment
export const getcomment = (access_token,ids) => {
    return async (dispatch) => {
      const url = config.baseUrl + "/wp-json/chivane/v1/shop/"+ids+"/comments";
      let Header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
      };
  
      return axios({
        method: "get",
        url: url,
        headers: Header,
      })
        .then(function (response) {
          //console.log(response);
          const resData = response;
          const data = resData.data;
          //console.log(data);
          dispatch({ type: GET_COMMENT, data });
          return response;
        })
        .catch(function (error) {
          console.log(error.name);
          console.log(error.message);
          console.log(error);
        });
    };
  };


//   فرستادن کامنت  orders
  export function replycomment(access_token,id,reply,rate) {
    const Header = {
       
      Authorization: "Bearer " + access_token,
    }
    
    var formdata = new FormData()
    formdata.append("post_id",id )
    formdata.append("comment_content",reply );
    formdata.append("rating",rate );


   
    var requestOptions = {
      method: 'POST',
      headers: Header,
      body: formdata,
    }

    return fetch(config.baseUrl + "/wp-json/chivane/v1/comments", requestOptions)
      .then(response => response.json())
      .then(res => {
        console.log(res)
        return res
      })

      .catch(error => console.log('error', error))
  }


//   گرفتن دسته بندی  dashboard
  export const getCategoryinfo = () => {
    return async (dispatch) => {
        const url = config.baseUrl + "/wp-json/chivane/v1/categories?special=yes";
       

        return axios({
            method: "get",
            url: url,
          
        })

            .then(function (response) {
                //console.log(response);
                const resData = response;
                const data = resData.data;
                //console.log(data);
                dispatch({ type: GET_CATEGORY, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
};

// گرفتن فروشگاه ها dashboard
export const getAllvendors = (access_token,ids) => {
  return async (dispatch) => {
     
      const Header = {
        Authorization: "Bearer " + access_token,
      }
      
          const url = config.baseUrl + "/wp-json/chivane/v1/categories/"+ids+"/vendors";
     
      return axios({
          method: "get",
          headers:Header,
          url: url,
      })

          .then(function (response) {
              //console.log(response);
              const resData = response;
              const data = resData.data;
              //console.log(data);
              dispatch({ type: GET_ALLVENDORS, data });
              return response;
          })
          .catch(function (error) {
              console.log(error.name);
              console.log(error.message);
              console.log(error);
          });
  };
};


// گرفتن سفارشات    orders
export const getmyorder = (access_token) => {
  return async (dispatch) => {
      
      const Header = {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + access_token,
      }
          const url = config.baseUrl + "/wp-json/chivane/v1/myorders";
     
      return axios({
          method: "get",
          url: url,
          headers:Header
        
      })

          .then(function (response) {
              //console.log(response);
              const resData = response;
              const data = resData.data;
              //console.log(data);
              dispatch({ type: GET_MYORDER, data });
              return response;
          })
          .catch(function (error) {
              console.log(error.name);
              console.log(error.message);
              console.log(error);
          });
  };
};
// گرفتن جزییات سفارشات    orders
export const getdetailsmyorder = (access_token,ids) => {
    return async (dispatch) => {
        
        const Header = {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + access_token,
        }
            const url = config.baseUrl + "/wp-json/chivane/v1/myorders/"+ids;
       
        return axios({
            method: "get",
            url: url,
            headers:Header
          
        })
  
            .then(function (response) {
                //console.log(response);
                const resData = response;
                const data = resData.data;
                //console.log(data);
                dispatch({ type: GET_DETAILSMYORDER, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
  };




//  گرفتن اطلاعات جزیی        stor  و  stor-more
export const getSingleShop = (access_token,ids) => {
  return async (dispatch) => {
      
      const Header = {
        'Content-Type': 'application/json',
        Authorization: "Bearer " + access_token,
      }
          const url = config.baseUrl + "/wp-json/chivane/v1/shop/"+ids+"/info";
     
      return axios({
          method: "get",
          url: url,
          headers:Header
        
      })

          .then(function (response) {
              //console.log(response);
              const resData = response;
              const data = resData.data;
              //console.log(data);
              dispatch({ type: GET_SINGLESHOP, data });
              return response;
          })
          .catch(function (error) {
              console.log(error.name);
              console.log(error.message);
              console.log(error);
          });
  };
};


//وضعیت پیک  activeorder
export const getcheck = (access_token,ids) => {
    return async (dispatch) => {
        
        const Header = {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + access_token,
        }
            const url = config.baseUrl + "/wp-json/chivane/v1/checkout/"+ids+"/track";
       
        return axios({
            method: "get",
            url: url,
            headers:Header
          
        })
  
            .then(function (response) {
                //console.log(response);
                const resData = response;
                const data = resData.data;
                //console.log(data);
                dispatch({ type: GET_CHECK, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
  };
  

// گرفتن دسته بندی    stor 
//   export const getCategoryProductstor = (access_token) => {
//     return async (dispatch) => {
        
//         const Header = {
//           'Content-Type': 'application/json',
//           Authorization: "Bearer " + access_token,
//         }
//             const url = config.baseUrl + "/wp-json/chivane/v1/shop/1/categories";
       
//         return axios({
//             method: "get",
//             url: url,
//             headers:Header
          
//         })
  
//             .then(function (response) {
//                 //console.log(response);
//                 const resData = response;
//                 const data = resData.data;
//                 //console.log(data);
//                 dispatch({ type: GET_CATEGORYPRODUCT, data });
//                 return response;
//             })
//             .catch(function (error) {
//                 console.log(error.name);
//                 console.log(error.message);
//                 console.log(error);
//             });
//     };
//   };
  
  //     گرفتن محصولات     stor
  export const getAllOrders = (access_token,ids) => {
    return async (dispatch) => {
        
        const Header = {
          'Content-Type': 'application/json',
          Authorization: "Bearer " + access_token,
        }
            const url = config.baseUrl + "/wp-json/chivane/v1/shop/1/last/orders";
       
        return axios({
            method: "get",
            url: url,
            headers:Header
          
        })
  
            .then(function (response) {
                //console.log(response);
                const resData = response;
                const data = resData.data;
                //console.log(data);
                dispatch({ type: GET_ALLORDERS, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
  };

// ارسال تعداد محصولات     stor  cart 
  export const SendquantityProduct = (access_token,myData) => {
      
    let Header = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + access_token,
    };

    var requestOptions = {
        method: 'POST',
        headers:Header,
        body: JSON.stringify(myData),
    };

    return fetch("https://chivane.com/wp-json/chivane/v1/cart/add", requestOptions)
        .then(response => response.json())
        .then(res => {
           // console.log(res);
            return res;
        })

        .catch(error => console.log('error', error));
};

export const lowquantityProduct = (access_token,myData) => {
      
    let Header = {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
        };
  
  
    var requestOptions = {
        method: 'PUT',
        headers:Header,
        body: JSON.stringify(myData),
    };

    return fetch("https://chivane.com/wp-json/chivane/v1/cart/add", requestOptions)
        .then(response => response.json())
        .then(res => {
           // console.log(res);
            return res;
        })

        .catch(error => console.log('error', error));
};