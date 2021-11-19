

export const getParams = () =>{
// Further parsing:
    let params = (new URL(document.location)).searchParams;
    let yearStart = 1500;
    let yearEnd = 2000;
    let location = '';
    let surname = '';
    let origin = '';

    if(params.has("yearStart"))
        yearStart = params.get("yearStart");
        
    if(params.has("yearEnd"))
        yearEnd = params.get("yearEnd");

    if(params.has("location"))
        location = params.get("location");

    if(params.has("surname"))
        surname = params.get("surname");
    
    if(params.has("origin"))
        origin = params.get("origin");

    let e = {
        yearStart : Number(yearStart),
        yearEnd : Number(yearEnd),
        location : location,
        surname : surname,
        origin: origin
      };

    return e;
};

export const setParams = (params) =>{
    // $limit: Int!,
    // $offset : Int!,
    // $sortColumn: String!,
    // $sortOrder : String!,
    // $surname : String!,
    // $yearStart : Int!,
    // $yearEnd : Int!,
    // $location : String!,
    // $origin : String!


    var newurl = window.location.protocol + "//" 
    + window.location.host + window.location.pathname 
    + '?surname='+params.surname
    + '&yearStart='+params.yearStart
    + '&yearEnd='+params.yearEnd
    + '&location='+params.location
    + '&origin='+params.origin;

    window.history.pushState({path:newurl},'',newurl);
};


  

  