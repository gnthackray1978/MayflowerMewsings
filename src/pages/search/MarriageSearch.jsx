import React from 'react';
import { gql} from '@apollo/client';
import {getParams} from '../../features/Table/qryStringFuncs';
import GenericToolbar from '../../features/Table/GenericToolbar.jsx';
import TableWrapper from '../../features/Table/TableWrapper.jsx';
import GenericTable from '../../features/Table/GenericTable.jsx';
import {useTableState} from '../../features/Table/useTable';



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

    const filterConfig = [
      { id: 'yearStart', label: 'Year From', initialValue: '1500' },
      { id: 'yearEnd', label: 'Year To', initialValue: '1800' },
      { id: 'location', label: 'Location', initialValue: '' },
      { id: 'maleSurname', label: 'Groom Surname', initialValue: '' },
      { id: 'femaleSurname', label: 'Bride Surname', initialValue: '' }
    ];

    var params = getParams(defaultValues);
   
    var state = useTableState(GET_MARRIAGES,params,'marriagesearch');

    state.headCells = headCells;
    state.title = 'Marriage Search';
    state.filterConfig = filterConfig;


    return (
    
        <div>
          <TableWrapper state = {state} >
            <GenericToolbar state ={state}/>
            <GenericTable state ={state}/>
          </TableWrapper>
        </div>
    );

}


export default MarriageSearch;
