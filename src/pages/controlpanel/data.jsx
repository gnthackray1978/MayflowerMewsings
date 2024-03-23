import { apigetGEDFiles,selectGED, deleteGED, apigetPeopleInfo,apigetPlaceInfo, apiAddGed } from './apiService';
    

function parseDate(date) {
  return new Date(date)
}

export const selectGEDFile = (id, complete) => {
  try {
    const response = selectGED(id, complete); 

    console.log(response);

    return response;

  } catch (error) {
    // Handle error...
    console.log(error);
  }
};

export const deleteGEDFile = (id, complete) => {
  try {
    const response = deleteGED(id, complete); 

    console.log(response);

    return response;

  } catch (error) {
    // Handle error...
    console.log(error);
  }
};

export const getGEDFiles = async () => {
  try {
    const response = await apigetGEDFiles();

    console.log(response);

    var result =[];

    if(response){
      for(let d of response){

        let date = parseDate(d.dateImported);
        result.push({
          id: d.id,
          name: d.fileName,
          size: d.fileSize,
          dateImported: date.toLocaleDateString('en-GB'),
          user: d.userId,
          selected: d.selected
        });
      }
    }

    return result;

  } catch (error) {
    // Handle error...
  }
};

export const getPeopleInfo = async () => {
  try {
    const response = await apigetPeopleInfo();

 //   console.log(response);
 
    return response;

  } catch (error) {
    // Handle error...
  }
};

export const getPlaceInfo = async () => {
  try {
    const response = await apigetPlaceInfo();

  // console.log(response);
 
    return response;

  } catch (error) {
    // Handle error...
  }
};

export const addGed = async (complete, file) => { 
  try {
    const response = await apiAddGed(complete,file);

    //console.log(response);

    return response;

  } catch (error) {
    // Handle error...
  }
}