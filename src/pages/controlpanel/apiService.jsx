import axios from "axios";


const client = axios.create({
    baseURL: "http://localhost:5001" 
  });

export const callDeleteAction =(complete, path, id)=>{
  
  //var data = JSON.stringify(parseInt(id));

  axios.delete('http://localhost:5001/'+ path+ '/' + id,  
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

  axios.put('http://localhost:5001/'+ path, data, {
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



  axios.post('http://localhost:5001/'+ path, data, {
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

  axios.get('http://localhost:5001/'+ path,  {
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