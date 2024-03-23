import axios from "axios";


const client = axios.create({
    baseURL: "http://localhost:5001" 
  });


export const apigetGEDFiles = () => { 
    return client.get('/info/gedfiles').then((response) => {
     //   console.log(response.data);
        if(response.status !== 200) throw new Error(response.data.message)

        return response.data;
    });
}

export const apigetPeopleInfo = () => { 
  return client.get('/info/people').then((response) => {
      console.log(response.data);
      if(response.status !== 200) throw new Error(response.data.message)

      return response.data;
  });
}


export const apigetPlaceInfo = () => { 
  return client.get('/info/places').then((response) => {
    //  console.log(response.data);
      if(response.status !== 200) throw new Error(response.data.message)

      return response.data;
  });
}

export const selectGED = (importId, complete) => {
  console.log('selectGED' + importId);
  callPutAction(complete, 'ged/select', Number(importId));
};

export const apiAddGed = (complete,files) => {
  console.log('apiAddGed');

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


  //const formData = new FormData();
  //formData.append("image", file);
  axios.post('http://localhost:5001/ged/add', formData, {
    headers: {
    //  Authorization: "Bearer " + user.token,
      "Content-Type": "multipart/form-data"
    }
  })

  .then(res => {

    console.log(res);
    complete(res.data);
  })
  .catch(err => console.log(err))
  .finally(() => console.log('finally'));
};


export const deleteGED = (importId, complete) => {
  console.log('deleteGED' + importId);
  callDeleteAction(complete, 'ged/delete', Number(importId));
};


export const AddPersonLocations = (complete) => {
  console.log('AddPersonLocations');
  callPostAction(complete, '/data/persons/locations');
};

export const UpdatePersonLocations = (complete) => {
  console.log('UpdatePersonLocations');
  callPutAction(complete, '/data/persons/locations');
};

///data/persons/add
export const AddPersons = (complete) => {
  console.log('AddPersons');
  callPostAction(complete, '/data/persons/add');
};

///data/dupes
export const AddDupes = (complete) => {
  console.log('AddDupes');
  callPostAction(complete, '/data/dupes');
};


const callDeleteAction =(complete, path, id)=>{
  
  //var data = JSON.stringify(parseInt(id));

  axios.delete('http://localhost:5001/'+ path+ '/' + id,  
      {headers: {
        'Content-Type': 'application/json'
      }}).then(function (response) {
    console.log(response)
    complete(response.data);
  })
  .catch(function (error) {
      console.log(error)
  })
};

const callPutAction =(complete, path, id)=>{
  
  var data = JSON.stringify(parseInt(id));

  axios.put('http://localhost:5001/'+ path, data, {
      headers: {
        'Content-Type': 'application/json'
      }
  }
  ).then(function (response) {
    console.log(response)
    complete(response.data);
  })
  .catch(function (error) {
      console.log(error)
  })
};

const callPostAction =(complete, path, id)=>{
  
  var data = JSON.stringify(parseInt(id));

  axios.post('http://localhost:5001/'+ path, data, {
      headers: {
        'Content-Type': 'application/json'
      }
  }
  ).then(function (response) {
    console.log(response)
    complete(response.data);
  })
  .catch(function (error) {
      console.log(error)
  })
};