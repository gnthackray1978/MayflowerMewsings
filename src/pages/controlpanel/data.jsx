import {callDeleteAction, callPutAction,callPostAction,callGetAction} from './apiService';
    

function parseDate(date) {
  return new Date(date)
}




export const deleteGEDFile = (id, complete) => {
  //return deleteGED(id, complete);
  callDeleteAction(complete, 'ged/delete', Number(id));
};

export const updatePlaceCacheLocations = (complete) => {
    //return UpdatePlaceCacheLocations(complete);
    callPostAction(complete, 'geocode/encode');
}

export const selectGEDFile = (id, complete) => {
    //return selectGED(id, complete);
    callPutAction(complete, 'ged/select', Number(id));
};

export const getGEDSelectionInfo =  (complete) => {
  //return apigetPlaceInfo();
  return callGetAction(complete, 'ged/selection');
};

export const updatePersonLocations = (complete) => {
    //return UpdatePersonLocations(complete);
    callPutAction(complete, 'data/persons/locations');
};

export const addGed = (complete, files) => { 

  var formData = new FormData();
  var tags = '';

  if(files.length){
    for (var i = 0; i != files.length; i++) {
        formData.append("files", files[i]);
        tags += files[i].name + '|';
    }
  }
  else
  {
    formData.append("files", files);
    tags += files.name + '|';
  }
 
  formData.append("tags", tags);

  return callPostAction(complete, 'ged/add', formData,'multipart/form-data');;
}

export const addPersonLocations = (complete) => {
    //return AddPersonLocations(complete);
    callPostAction(complete, 'data/persons/locations');
};

export const addPersons = (complete) => {
    //return AddPersons(complete);
    callPostAction(complete, 'data/persons/add');
};

export const addDupes = (complete) => {
    //return AddDupes(complete);
    callPostAction(complete, 'data/dupes');
};

export const addPlaces = (complete, placeLookup) => {

    //return AddPlaces(complete);
    callPostAction(complete, 'geocode', placeLookup);
};


export const getGeoDataToEncode = (complete) => {
  //return apigetPeopleInfo();
  return callGetAction(complete, 'geocode');
};

export const getPeopleInfo = (complete) => {
    //return apigetPeopleInfo();
    return callGetAction(complete, 'info/people');
};

export const getPlaceInfo =  (complete) => {
    //return apigetPlaceInfo();
    return callGetAction(complete, 'info/places');
};

export const getGEDFiles = (complete) => {
  
  function parseImportStatus(d) {

    console.log('parseImportStatus')
    let result = '';

    if(d.personsProcessed)
      result += 'P';
    if(d.ccProcessed)
      result += 'C';
    if(d.geocodingProcessed)
      result += 'G';
    if(d.missingLocationsProcessed)
      result += 'M';
    if(d.dupesProcessed)
      result += 'D';
 
    return result;
  }

  try {
    callGetAction((response)=>{
      
      if(response?.status === 'error' || !response?.data) {
        complete({
            status: 'error',
            data: response?.status === 'error' ? response : 'no data'
        });
      } else {       
        complete({
            status: 'success',
            data: response.data.map(d => ({
              id: d.id,
              name: d.fileName,
              size: d.fileSize,
              dateImported: parseDate(d.dateImported).toLocaleDateString('en-GB'),
              user: d.userId,
              selected: d.selected,
              importStatus: parseImportStatus(d),
          }))
        });
      }

    }, 'info/gedfiles');

  } catch (error) {
      complete({
        status: 'error',
        data: error
      });
    // Handle error...
  }
};
