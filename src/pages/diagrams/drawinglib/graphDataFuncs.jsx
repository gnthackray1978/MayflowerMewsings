

export const getPersonFromId = (id, rows)=>{
   
    // let result;
    // rows.forEach((x)=>{
    //   x.forEach((person)=>{      
    //     if(person.PersonId == id)
    //       result= person;
    //   });
    // });
 
    for(var x of rows){
        for(var person of x){
            if(person.PersonId == id)
            {
                return person;
            }
        }
    }

    return undefined;
  };


  export const shapeData = (rawData)=>{

    let rows = [];
    let idx =0;
   
    while(idx < rawData.generationsCount){

        let gen = rawData.rows.filter(f=>f.generationIdx == idx);
        let sorted =gen.sort((a,b)=>{
            return a.index > b.index
        });
        
        rows.push(sorted);
        idx++;
    } 
    return rows;
  };


  export const formatData = (rows)=>{

    let generationIdx =0;
    let personIdx =0;

    let newRows =[];

    while(generationIdx < rows.length){
        personIdx =0;

        newRows.push([]);

       let length =  rows[generationIdx].length;

    

        while(personIdx < length){

            newRows[generationIdx].push(
                {
                Id: rows[generationIdx][personIdx].id,
                GenerationIdx: rows[generationIdx][personIdx].generationIdx,
                Index: rows[generationIdx][personIdx].index,         
                ChildCount: rows[generationIdx][personIdx].childCount,
                ChildIdxLst: rows[generationIdx][personIdx].childIdxLst ?? [],
                ChildLst: rows[generationIdx][personIdx].childLst ?? [],
                Children: [],
                ChildIdx: rows[generationIdx][personIdx].childIdx,
                DescendantCount: rows[generationIdx][personIdx].descendantCount,
                Father : undefined,
                FatherId: rows[generationIdx][personIdx].fatherId,
                FatherIdx: rows[generationIdx][personIdx].fatherIdx,
                IsDisplayed: true,
                IsFamilyEnd: rows[generationIdx][personIdx].isFamilyEnd,
                IsFamilyStart: rows[generationIdx][personIdx].isFamilyStart,
                IsHtmlLink: rows[generationIdx][personIdx].isHtmlLink,
                IsParentalLink: rows[generationIdx][personIdx].isParentalLink,
                Mother: undefined,
                MotherId: rows[generationIdx][personIdx].motherId,
                MotherIdx: rows[generationIdx][personIdx].motherIdx,
                PersonId: rows[generationIdx][personIdx].personId,
                RelationType: rows[generationIdx][personIdx].relationType,
                SpouseIdxLst: rows[generationIdx][personIdx].spouseIdxLst ?? [],
                SpouseIdLst: rows[generationIdx][personIdx].spouseIdLst ?? [], 
                Spouses:[], 
                DoubleSpouseEnd : false,     
                FamilyIdx :-1,                       
                X1 :0,
                X2 :0,
                Y1 :0,
                Y2: 0,
                zoom : 0,
                RecordLink :{
                    BaptismDate : '',
                    BirthDate : '',
                    BirthLocation: rows[generationIdx][personIdx].birthLocation,           
                    DOB : rows[generationIdx][personIdx].dOB,
                    DOD: '',
                    DeathLocation : '',
                    FirstName: rows[generationIdx][personIdx].christianName,          
                    Name : rows[generationIdx][personIdx].christianName + ' ' + rows[generationIdx][personIdx].surname,
                    Occupation : '',
                    OccupationDate : '',
                    OccupationPlace : '',
                    Surname: rows[generationIdx][personIdx].surname,

                    PersonId : 0,
                    

                }
                }
            );
              
            personIdx++;
        }
        generationIdx++;
    } 

    return newRows;
  };


  export const populateAncestryObjects = (newRows)=>{

    for(var gen of newRows){
        for(var person of gen){

              for(var childIndex of person.ChildIdxLst.filter(f=>f.childIndex)){           
                let child = newRows[person.GenerationIdx-1][childIndex];
    
                if(child)
                    person.Children.push(child);              
              }
    
              var father = getPersonFromId(person.FatherId, newRows);
      
              if(father)
                person.Father = father;
              else
                person.FatherIdx = -1;

              var mother = getPersonFromId(person.MotherId, newRows);
      
              if(mother)
                person.Mother = mother;
              else
                person.MotherIdx = -1;

        }

    }
 
    return newRows;
  };



  
  export const transformData = (data, populateObjectsFunc) => {
    
    var newRows = [];

    console.log('transformData' );
     
    if(data) 
    {
      let rows = shapeData(data);  
      newRows = formatData(rows);         
      newRows = populateObjectsFunc(newRows);
    }
    else{
      console.log('data undefined');      
    }

    return {
      newRows
    };
  
  };
  

  export const populateDescendantObjects = (newRows)=>{

    console.log('populateDescendantObjects'); 

    let generationIdx =0;
   
    while(generationIdx < newRows.length){
     
      let personIdx =0;
      for(let person of newRows[generationIdx]){
        //if(newRows[generationIdx][personIdx].ChildIdxLst.length >0){

          for(let childIdx of person.ChildIdxLst){
            //we shouldn't ever have children for the last generation
            //so generationIdx -1 should always be ok.
            if(newRows.length > (generationIdx+1) && newRows[generationIdx+1].length > childIdx){
              let child = newRows[generationIdx+1][childIdx];
            
              if(child)
                person.Children.push(child);
            }
            else{
              console.log('missing child');
            }
          }
        //}
           
          for(let spouseIdx of person.SpouseIdxLst){
            let spouse = newRows[generationIdx][spouseIdx];
          
            if(spouse)
              person.Spouses.push(spouse);
          }
        

          var father = getPersonFromId(person.FatherId, newRows);
      
          if(father)
            person.Father = father;
  
          var mother = getPersonFromId(person.MotherId, newRows);
  
          if(mother)
            person.Mother = mother;

          personIdx++;
  
      }
      generationIdx++;
    } 
 
    return newRows;
  };
