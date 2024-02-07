import { errorFormatter } from '../../shared/common';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';


export function useMapState(qry,schema,defaultParams) {

 // console.log('useMapState ');
 // const [filterParams, setFilterParams] = React.useState(defaultParams);
 
 //console.log('useMapState' );

  const  { loading, networkStatus,error, data,refetch } = useQuery(qry, {
     errorPolicy: 'all' ,
     variables: defaultParams,
     notifyOnNetworkStatusChange: true,
     fetchPolicy:"cache-and-network"
     // onCompleted : (data)=>{
     //   console.log('finished fetching');
     // }
  });
  //console.log('useMapState result' );
 // var newRows = [];
  var totalRows = 0;  
  var loginInfo = '';
  var internalServerError = '';
  var subSchemaData;

  if(!loading && data && data[schema]) 
  {   
    totalRows = data[schema].totalRows;
    loginInfo =  data[schema].loginInfo;
    internalServerError = data[schema].error?.trim() ?? ''; //bit of a hack 
    subSchemaData = data[schema];
  }

  var errors = [];

  if(!loading)
    errors = errorFormatter(loading,error, internalServerError);
 
  return {  
    data : subSchemaData,
    totalRows,
    loading, 
    errors ,
    refetch
  };
}
