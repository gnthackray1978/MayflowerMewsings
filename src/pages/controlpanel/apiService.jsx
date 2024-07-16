import axios from "axios";
import {settings} from "../../shared/common.js";
 
const apiUrl = window.location.origin.includes('gnthackray') 
    ? settings.GNTServParams.apiBaseUrl: settings.IdServParams.apiBaseUrl;

const client = axios.create({
    baseURL: apiUrl
  });

export const callDeleteAction =(complete, path, id)=>{
  
  //var data = JSON.stringify(parseInt(id));

  axios.delete(apiUrl + path+ '/' + id,  
      {headers: {
        'Content-Type': 'application/json'
      }}).then(function (response) {
    //console.log(response)
  
    complete({
      status : 'success',
      data : response.data
    });
  })
  .catch(function (error) {
    complete({
      status : 'error',
      data : error
    });
  })
};

export const callPutAction =(complete, path, id)=>{
  
  var data = JSON.stringify(parseInt(id));

  axios.put(apiUrl + path, data, {
      headers: {
        'Content-Type': 'application/json'
      }
  }
  ).then(function (response) {
  //  console.log(response)
  // complete(response.data);
    complete({
      status : 'success',
      data : response.data
    });
  })
  .catch(function (error) {
      //console.log(error)
      complete({
        status : 'error',
        data : error
      });
  })
};

export const callPostAction =(complete, path, data, contentType)=>{
  
  //var data = JSON.stringify(parseInt(id));



  axios.post(apiUrl + path, data, {
      headers: {
        'Content-Type': !contentType ? 'application/json' : contentType
      }
  }
  ).then(function (response) {
   // console.log(response)
    //complete(response.data);
    complete({
      status : 'success',
      data : response.data
    });
  })
  .catch(function (error) {
      //console.log(error)
      complete({
        status : 'error',
        data : error
      });
  })
};

export const callGetAction =(complete, path)=>{
    
  //var data = JSON.stringify(parseInt(id));

  axios.get(apiUrl + path,  {
      headers: {
        'Content-Type': 'application/json'
      }
  }
  ).then(function (response) {
   // console.log(response)
    //complete(response.data);
    complete({
      status : 'success',
      data : response.data
    });
  })
  .catch(function (error) {
      //console.log(error)
      complete({
        status : 'error',
        data : error
      });
  })

  //.then((response) => {
    //  //   console.log(response.data);
    //     if(response.status !== 200) throw new Error(response.data.message)

    //     return response.data;
    // });
};