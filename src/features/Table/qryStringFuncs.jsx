

export const getMarriagesParams = () =>{};
export const setMarriagesParams = () =>{};

export const getParishsParams = () =>{};
export const setParishsParams = () =>{};

export const getPersonsParams = () =>{};
export const setPersonsParams = () =>{};

export const getSourcesParams = () =>{};
export const setSourcesParams = () =>{};

export const getDupesParams = () =>{};
export const setDupesParams = () =>{};

export const getTreeRecSearchParams = () =>{};
export const setTreeRecSearchParams = () =>{};

export const getWillsParams = () =>{};
export const setWillsParams = () =>{};

export const getHeatMapParams = () =>{};
export const setHeatMapParams = () =>{};

export const getMapPersonParams = () =>{};
export const setMapPersonParams = () =>{};


export const getParams = (defaults) =>{  
    let search = document.location.search.substring(1);
    
    if(search.length === 0){
        return defaults;
    }

    search = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
    
    for (const property in search) {
    
        if(!(isNaN(search[property]) || isNaN(parseInt(search[property]))))
            search[property] = Number(search[property]);
        
        //console.log(property + " - " + search[property] + " " + !isNaN(search[property]));
    
    }

    return {...defaults, ...search};


};

export const setParams = (params) =>{

    var search = location.search.substring(1);

    var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname  + '?' ;

    let returnedTarget = params;

    if(search.length > 0){
    
        JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        
        returnedTarget = Object.assign(search, params);
    }
   
    var queryString = Object.keys(returnedTarget).map(key => key + '=' + returnedTarget[key]).join('&');

    newurl += queryString;

    window.history.pushState({path:newurl},'',newurl);
};


  

  