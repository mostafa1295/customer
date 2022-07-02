export const LOGIN = "LOGIN";
export const CITY = "CITY";
export const SECTOR = "SECTOR";
export const GET_ADDRESS ="GET_ADDRESS"
export const GET_ALLADDRESS ="GET_ADDRESS"
export const GET_SELLER ="GET_SELLER" 
export const GET_SEARCH ="GET_SEARCH"
export const SET_PRO ="SET_PRO"
export const SET_TOKEN ="SET_TOKEN"
export const LOGOUT ="LOGOUT"
export const GET_WALLET ="GET_WALLET"
export const SET_QUN ="SET_QUN"

import config from "../../constants/config"
import axios from "axios"
import FormData from "form-data"



export const setquantity = (data) => {
    return async (dispatch) => {
      dispatch({ type: SET_QUN, data});
    };
  };



export const setproducting = (data) => {
    return async (dispatch) => {
      dispatch({ type: SET_PRO, data});
    };
  };


  export const setAccessToken = (token) => {
    return async (dispatch) => {
      dispatch({ type: SET_TOKEN, data: token });
    };
  };

  
export const logOut = () => {
    return async (dispatch) => {
      dispatch({ type: LOGOUT });
    };
  };


export const sendOtp = async (task) => {
    var formdata = new FormData();
    formdata.append("countrycode", "+98");
    formdata.append("mobileNo", task);
    formdata.append("type", "login");

    var requestOptions = {
        method: 'POST',
        body: formdata,
    };

    fetch("https://chivane.com/wp-json/digits/v1/send_otp", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};





export const login = (task, otp) => {
    return async (dispatch) => {
        var formdata = new FormData();
        formdata.append("countrycode", "+98");
        formdata.append("mobileNo", task);
        formdata.append("otp", otp);

        var requestOptions = {
            method: 'POST',
            body: formdata,
        };

        return fetch("https://chivane.com/wp-json/digits/v1/one_click", requestOptions)
            .then(response => response.json())
            .then(res => {
                // console.log(res);

                const data = res
                dispatch({ type: LOGIN, data });
                return res;
            })

            .catch(error => console.log('error', error));
    };
}




//   register 1
export const sendprofile = (access_token,name, family) => {
    let Header = {
      
    Authorization: "Bearer " + access_token,
    };
    var formdata = new FormData();
    formdata.append("name", name);
    formdata.append("family", family);

    var requestOptions = {
        method: 'POST',
        headers:Header,
        body: formdata,
    };

    return fetch("https://chivane.com/wp-json/chivane/v1/customer/update", requestOptions)
        .then(response => response.json())
        .then(res => {
            console.log(res);
            return res;
        })

        .catch(error => console.log('error', error));
};




//   register 2
export const getCity = (access_token) => {
    return async (dispatch) => {
        const url = config.baseUrl + "/wp-json/chivane/v1/shop/cities";
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
                dispatch({ type: CITY, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
};


//   register 2
export const getSector = (access_token,ids) => {

    return async (dispatch) => {
        let Header = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + access_token,
        };
       
        const url = config.baseUrl + "/wp-json/chivane/v1/shop/cities/"+ids+"/sector";
        

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
                dispatch({ type: SECTOR, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
};
//   register 2
export const getuserAddress = (access_token) => {
    return async (dispatch) => {
        const url = config.baseUrl + "/wp-json/chivane/v1/user/address/default";
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
                dispatch({ type: GET_ADDRESS, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
};


//   register 2
export const setuserAddress = async (access_token,ids) => {

    let Header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
    };
    var requestOptions = {
        method: 'POST',
        headers:Header
        
    };

    return fetch("https://chivane.com/wp-json/chivane/v1/address/"+ids+"/choose", requestOptions)
        .then(response => response.json())
        .then(result => {
            console.log(result)
        return result
        })
        .catch(error => console.log('error', error));
};






//   register 2
export const addnewaddress = async (access_token,city,sector,address,geolat,geolon) => {
    
    let Header = {
       
        Authorization: "Bearer " + access_token,
    };
   
    var formdata = new FormData();
    formdata.append("city", city);
    formdata.append("sector", sector);
    formdata.append("address", address);
    formdata.append("geo", geolat);

    var requestOptions = {
        method: 'POST',
        headers:Header,
        body:formdata
        
    };

  return fetch("https://chivane.com/wp-json/chivane/v1/user/address", requestOptions)
        .then(response => 
            response.json())
            .then(res => {
                console.log(res);
                return res;
            })
        .catch(error =>
             console.log('error', error));
};


export const updateaddress = async (access_token,city,sector,address,geolat,ids) => {
    
    let Header = {
       
        Authorization: "Bearer " + access_token,
    };
   console.log(city);
   console.log(sector)
   ;console.log(address);
   console.log(geolat);
//    console.log(geolon);
   console.log(ids);
    var formdata = new FormData();
    formdata.append("city", city);
    formdata.append("sector", sector);
    formdata.append("address", address);
    formdata.append("geo", geolat);

    var requestOptions = {
        method: 'POST',
        headers:Header,
        body:formdata
        
    };

  return fetch("https://chivane.com/wp-json/chivane/v1/user/address/"+ids, requestOptions)
        .then(response => 
            response.json())
            .then(res => {
                console.log(res);
                return res;
            })
        .catch(error =>
             console.log('error', error));
};



export const getALLAddress = (access_token) => {
    return async (dispatch) => {
        const url = config.baseUrl + "/wp-json/chivane/v1/user/address";
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
                dispatch({ type: GET_ALLADDRESS, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
};

// ادرس ها
export const Deleteaddress = async (access_token,ids) => {

    let Header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
    };
   
    var requestOptions = {
        method: 'POST',
        headers:Header,
       
        
    };

    fetch("https://chivane.com/wp-json/chivane/v1/user/address/"+ids+"/delete", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};




export const getwallet = (access_token) => {
    return async (dispatch) => {
        const url = config.baseUrl + "/wp-json/chivane/v1/customer/info";
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
                dispatch({ type: GET_WALLET, data });
                return response;
            })
            .catch(function (error) {
                console.log(error.name);
                console.log(error.message);
                console.log(error);
            });
    };
};












export const walletcharge = async (access_token,price) => {

    let Header = {
        
        Authorization: "Bearer " + access_token,
    };
    
    var formdata = new FormData();
    formdata.append("price", price);
   
    var requestOptions = {
        method: 'POST',
        headers:Header,
        body:formdata
    };

    fetch("https://chivane.com/wp-json/chivane/v1/wallet", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};






export const payproduct = async (access_token) => {

    let Header = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + access_token,
    };
   
    var requestOptions = {
        method: 'POST',
        headers:Header,
       
        
    };

    fetch("https://chivane.com/wp-json/chivane/v1/products/pay", requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
};





export const getsellerinfo = (access_token) => {
    return async (dispatch) => {
      const url = config.baseUrl + "/wp-json/chivane/v1/seller";
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
          dispatch({ type: GET_SELLER, data });
          return response;
        })
        .catch(function (error) {
          console.log(error.name);
          console.log(error.message);
          console.log(error);
        });
    };
  };





  export const getSearch = async (access_token,searching) => {

    let Header = {
        
        Authorization: "Bearer " + access_token,
    };
    
    var formdata = new FormData();
    formdata.append("search", searching);
   
    var requestOptions = {
        method: 'POST',
        headers:Header,
        body:formdata
    };

   return fetch("https://chivane.com/wp-json/chivane/v1/product/search", requestOptions)
        .then(response => response.json())
        .then(result =>{
           // console.log(result)
            return result
        })
        .catch(error => console.log('error', error));
};
