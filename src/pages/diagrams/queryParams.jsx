

export const getParams = () =>{
    // Further parsing:
        let params = (new URL(document.location)).searchParams;
        let personId = 3217; 
        let origin = '_34_Kennington';

        if(params.has("personid"))
            personId = params.get("personid"); 
        
        if(params.has("origin"))
            origin = params.get("origin");
    
        let e = {
            personId : Number(personId),
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
        + '?personid='+params.personid
        + '&origin='+params.origin;
    
        window.history.pushState({path:newurl},'',newurl);
    };
    
    
      
    
      