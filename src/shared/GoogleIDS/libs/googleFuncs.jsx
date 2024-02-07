
export const getToken = ()=>{
  
    /* global google */
    var token ;

    try {
    // console.log('getting token -> ' +  localStorage.getItem("token"));
  
      token = localStorage.getItem('token');

      var tokenExpirey = localStorage.getItem('token-expirey');
      
      if(tokenExpirey)
      {
        var now = new Date().getTime();
        
        let tokenExpiresAt = new Date(tokenExpirey *1000);

        if(tokenExpiresAt < now){
            google.accounts.id.prompt();
        }
      }
      else{
     //   console.log('no token present in cache');
      }

    } 
    catch (e) 
    {
      console.log(e);
    }  

    return token;
};
  