import React, { Component } from 'react';
import MarriageTable from './MarriageTable.jsx'
import { gql} from '@apollo/client';
import {getParams} from '../../../../features/Table/qryStringFuncs';
import MarriageTableToolbar from './MarriageTableToolbar.jsx'
import TableWrapper from '../../../../features/Table/TableWrapper.jsx'
import {useTableState} from '../../../../features/Table/useTable';


function Marriages() {


  const GET_MARRIAGES = gql`
  query Query(
     $limit: Int!,
     $offset : Int!,
     $sortColumn: String!,
     $sortOrder : String!,
     $yearStart : Int!,
     $yearEnd : Int!,
     $maleSurname : String!,
     $femaleSurname : String!,
     $location : String!
   ){    
      marriagesearch(pobj : {
                              limit : $limit,
                              offset : $offset,
                              sortColumn: $sortColumn,
                              sortOrder : $sortOrder,
                              yearFrom : $yearStart,
                              yearTo: $yearEnd,
                              maleSurname : $maleSurname,
                              femaleSurname: $femaleSurname,
                              location : $location
                            }
                    ) {
       page
       totalRows
       error
       rows {
                  id
                  maleCname
                  maleSname
                  femaleCname
                  femaleSname
                  marriageLocation
                  yearIntVal
                  marriageCounty
                  source
                  witness1
                  femaleIsKnownWidow
                  maleIsKnownWidower
                  isLicence
                  totalEvents
       }
     }    
  }
  `;

    const headCells = [
      { id: 'maleCname', numeric: false, disablePadding: true, label: 'Groom Name' },
      { id: 'maleSname', numeric: false, disablePadding: true, label: 'Groom Surname' },
      { id: 'femaleCname', numeric: false, disablePadding: true, label: 'Bride Name' },
      { id: 'femaleSname', numeric: false, disablePadding: true, label: 'Bride Surname' },
      { id: 'marriageLocation', numeric: false, disablePadding: true, label: 'Loc.' },
      { id: 'yearIntVal', numeric: false, disablePadding: true, label: 'Year' },
      { id: 'marriageCounty', numeric: false, disablePadding: true, label: 'County' },
      { id: 'source', numeric: false, disablePadding: true, label: 'Src' },
      { id: 'witness1', numeric: false, disablePadding: true, label: 'Wit' },
      { id: 'femaleIsKnownWidow', numeric: false, disablePadding: true, label: 'Wid' },
      { id: 'maleIsKnownWidower', numeric: false, disablePadding: true, label: 'Widower' },
      { id: 'isLicence', numeric: false, disablePadding: true, label: 'Lic.' },
      { id: 'totalEvents', numeric: false, disablePadding: true, label: 'Dupes' }
    ];

    var defaultValues = {
      sortColumn : 'maleCname',
      sortOrder : 'asc',
      limit : 0,
      offset :0,
      surname : '',
      yearStart : 1500,
      yearEnd: 1800,
      maleSurname : '',
      femaleSurname: '',
      location :''
    };

    var params = getParams(defaultValues);
   
    var state = useTableState(GET_MARRIAGES,params,'marriagesearch');

    state.headCells = headCells;
    state.title = 'Marriage Search';


    return (
    
        <div>
          <TableWrapper state = {state} >
            <MarriageTableToolbar state ={state}/>
            <MarriageTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default Marriages;
