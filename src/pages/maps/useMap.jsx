import React, { Component } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery ,useLazyQuery} from '@apollo/client';
import { connect } from "react-redux";
import { errorFormatter } from '../../shared/common';

function makeData(data,  subSchema){

  var result = {
    rows : [],
    totalRows : 0,
    treeColours : [],
    rowsPerPage :1000,
    page :0
  }

  if(!data) return result;

  if(!data[subSchema]){
 //   console.log('usemap makedata: ' + schema + ' ' + subSchema + ' schema not loaded');
    return result;
  }

  const rows = data[subSchema].rows.map(tp => ({ ...tp }));

  let totalRows = data[subSchema].totalRows ?? 0;

  var idx =0;
  var tpRows =[];

  if(rows.length >0){
    while(idx < rows.length){
      if( !isNaN(rows[idx].lat) &&
          !isNaN(rows[idx].long) &&
          !isNaN(rows[idx].weight) ){
            tpRows.push({
              lat: rows[idx].lat,
              lng : rows[idx].long,
              weight : rows[idx].weight
            });
      }
      idx++;
    }
 
   } 

  return {
    rows : tpRows,
    totalRows,
    treeColours : [],
    rowsPerPage : 1000,
    page :0
  };

}


function makelocSearchData(data, subSchema){

  var result = {
    rows : [],
    totalRows : 0,
    treeColours : [],
    rowsPerPage :1000,
    page :0
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

 

  if(!data) return result;

  if(!data[subSchema]){
 //   console.log('usemap makedata: ' + schema + ' ' + subSchema + ' schema not loaded');
    return result;
  }


  let rows = [];
  let idx =0;
  let allTrees = [];
  let previousColours =[];
  while(idx < data[subSchema].rows.length){
    let tp = data[subSchema].rows[idx];
    let trees = [];

    if(tp.ftmPersonSummary.length >0){
      tp.ftmPersonSummary.forEach(e => {
        if(!trees.includes(e.treeName)){
          trees.push(e.treeName);
        }


        if (!allTrees.filter(f => f.treeName === e.treeName).length > 0) {

          let colour = getRandomColor();

          while(previousColours.includes(colour))
            colour = getRandomColor();

          previousColours.push(colour);

          allTrees.push({
            'treeName': e.treeName,
            'colour' : colour
          });

        }

      });
    }

    rows.push( {
                   ...tp,
                    trees : trees,
                    show :false
                  });

    idx++;
  }


  let totalRows =0;

  if(data && data[subSchema])
   totalRows =  data[subSchema].totalRows;


  result.rows = rows;
  result.totalRows = totalRows;
  result.treeColours = allTrees;

  return result;

}



export  function useMapState(qry, schema, state) {

 // console.log('useMapState ');
 
  const [getMapData, {called, loading,networkStatus, error,data }] = useLazyQuery(qry,
    {
      fetchPolicy: 'network-only',
      errorPolicy: 'all' 
    },);
 
 
//   const  { loading, networkStatus,error, data, refetch } = useQuery(ReturnData, {
//     errorPolicy: 'all' ,
//     variables: filterParams,
//     notifyOnNetworkStatusChange: true,
//     fetchPolicy:"cache-and-network"
//     // onCompleted : (data)=>{
//     //   console.log('finished fetching');
//     // }
//  });



  const filterFieldChanged = (filterObj) => {
    
   // console.log('filterFieldChanged');
   
    // if(filterObj.origin == undefined || filterObj.origin == ''){
    //   filterObj.origin ='_21_Alan!Douglas';
    // }

    getMapData({ 
        notifyOnNetworkStatusChange: true, 
        variables: filterObj,
        errorPolicy: 'all' ,
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
    //      console.log('onCompleted');
        }
      }
      );
 
   };

  const internalServerError = (!loading && data && data[schema]) ? data[schema].error?.trim() ?? '' : '';


  let errors = errorFormatter(loading,error, internalServerError);
  //console.log('errors: ' + errors);


  var baseReturn = { 
    loading, 
    errors ,
    filterFieldChanged
  };

  if(!called){
    Object.assign(state, baseReturn);
    return false;
  }
  
   
  let dataObj = schema == 'ftmlocsearch' ? makelocSearchData(data,schema) : makeData(data,schema);
  
  var result = {
    ...dataObj,
    ...baseReturn
  };
  
  Object.assign(state, result);

  return true;
}
