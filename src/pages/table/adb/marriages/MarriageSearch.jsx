import React from 'react';
import { gql} from '@apollo/client';
import {getParams} from '../../../../features/Table/qryStringFuncs';
import MarriageTableToolbar from './MarriageTableToolbar.jsx';
import TableWrapper from '../../../../features/Table/TableWrapper.jsx';
import GenericTable from '../../../../features/Table/GenericTable.jsx';
import {useTableState} from '../../../../features/Table/useTable';



function MarriageSearch() {


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
                              yearStart : $yearStart,
                              yearEnd: $yearEnd,
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
      { id: 'maleSname', numeric: false, disablePadding: true, label: 'Groom Surname', isRowHeader: true },
      { id: 'maleCname', numeric: false, disablePadding: true, label: 'Groom Name' },
      { id: 'femaleCname', numeric: false, disablePadding: true, label: 'Bride Name' },
      { id: 'femaleSname', numeric: false, disablePadding: true, label: 'Bride Surname' },
      { id: 'marriageLocation', numeric: false, disablePadding: true, label: 'Loc.' },
      { id: 'yearIntVal', numeric: false, disablePadding: true, label: 'Year' },
      { id: 'marriageCounty', numeric: false, disablePadding: true, label: 'County' },
      { id: 'source', numeric: false, disablePadding: true, label: 'Src' },
      { id: 'witness1', numeric: false, disablePadding: true, label: 'Witness' },
      { id: 'femaleIsKnownWidow', numeric: false, disablePadding: true, label: 'Wid' },
      { id: 'maleIsKnownWidower', numeric: false, disablePadding: true, label: 'Widower' },
      { id: 'isLicence', numeric: false, disablePadding: true, label: 'Licence' },
      { id: 'totalEvents', numeric: false, disablePadding: true, label: 'Dupes' }
    ];

    var defaultValues = {
      sortColumn : 'maleSname',
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
            <GenericTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default MarriageSearch;
