
Array.prototype.ContainsPerson = function (value) {

    for (var i = 0; i < this.length; i++) {
  
        if (this[i].PersonId == value.PersonId) {
            return true;
        }
    }
  
  
  
    return false;
  
  };
  
  Array.prototype.SortByGenIdx = function()
  {
    for(var i=0;i<this.length;i++)
    {
      for(var j=i+1;j<this.length;j++)
      {
        if(Number(this[i].GenerationIdx) < Number(this[j].GenerationIdx))
        {
          var tempValue = this[j];
          this[j] = this[i];
          this[i] = tempValue;
        }
      }
    }
  };
  
  Array.prototype.RemoveDupes = function () {
  
    var uniqueNames = [];
    $.each(this, function (i, el) {
        if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
    });
  
    return uniqueNames;
  };
  
  


export const createFamilyCountArray =  (genidx, currentGeneration, parentsGeneration) => {


        if(genidx === 0)
            return [];

        var newswitchs = [];
        var leftCounter = 0.0;
        var rightCounter = 0.0;
        var idx = 0;

       
        while (idx < currentGeneration.length) {
            var _tp = currentGeneration[idx];

            if (_tp.IsParentalLink &&  _tp.IsDisplayed) {
                newswitchs.push(0.0);
                if (_tp.X1 > MiddleParents(parentsGeneration, _tp.FatherIdx, _tp.MotherIdx)) {
                    rightCounter++;
                    if (leftCounter > 0)
                        newswitchs[newswitchs.length - 2] = leftCounter;
                    leftCounter = 0;
                }
                else {
                    leftCounter++;
                    if (rightCounter > 0)
                        newswitchs[newswitchs.length - 2] = rightCounter;
                    rightCounter = 0;
                }
            }
            idx++;
        }
        
        if (leftCounter !== 0) newswitchs[newswitchs.length - 1] = leftCounter;
        if (rightCounter !== 0) newswitchs[newswitchs.length - 1] = rightCounter;

        idx = newswitchs.length - 1;
        
        while (idx > 0) {
            if (newswitchs[idx - 1] === 0)
                newswitchs[idx - 1] = newswitchs[idx];
            idx--;
        }
        

        return newswitchs;
    };



export const MiddleParents = (generation, fatIdx, motIdx) =>{
    // return
    let middleParents = 0.0;


    // returns 1 less than the furthest parent to the right!

    // if the parent had more than 1 spouse then 2 parents might not be next to each other in the generation.
    if (Math.abs(fatIdx - motIdx) > 1) {
        if (fatIdx < motIdx) {
            middleParents = (generation[motIdx - 1].X1 + generation[motIdx].X2) / 2;
        }
        else {
            middleParents = (generation[fatIdx - 1].X1 + generation[fatIdx].X2) / 2;
        }
    }
    else {
        try{
            middleParents = (generation[fatIdx].X1 + generation[motIdx].X2) / 2;
        }
        catch(e){
            console.log('middle parents failed: ' + fatIdx+ ' '+ motIdx );
        }
    }

    return middleParents;
}


export const GetPrev =  (previousGeneration, fatIdx, motIdx) => {

    let middleParents = (previousGeneration[fatIdx].X1 + previousGeneration[motIdx].X2) / 2;

    let prevParentLink = middleParents;

    //left parent
    let idxParentLink = fatIdx;
    if (fatIdx > motIdx) idxParentLink = motIdx;

    let currentParentsLeft = previousGeneration[idxParentLink].X1;

    if (previousGeneration[fatIdx].SpouseIdLst.length > 1) {

        if (Math.abs(fatIdx - motIdx) == 2) {
            return prevParentLink;
        }

    }


    let idx = 0;

    let _treePerson = null;

    while (idx < previousGeneration.length) {
        if (previousGeneration[idx].IsDisplayed && previousGeneration[idx].ChildCount > 0
                && previousGeneration[idx].X1 < currentParentsLeft) {
            _treePerson = previousGeneration[idx];

        }
        idx++;
    }

    // if(_treePerson != null)
    //   console.log('last person ' + _treePerson.Name);

    if (_treePerson != null)
        prevParentLink = _treePerson.X2;


    return prevParentLink;
}


export const GetFirst = (previousGeneration, fatIdx, motIdx) =>{

    let middleParents = MiddleParents(previousGeneration, fatIdx, motIdx);

    let nextParentLink = middleParents;
    let idxParentLink = motIdx;

    // if we only have 1 parent, but that parent
    // later remarries we want the next nextparent setting to the current parents edge
    if (fatIdx == motIdx) {
        //remember fatidx and motidx are the same!
        if (previousGeneration[fatIdx].SpouseIdLst.length > 0) {
            return previousGeneration[fatIdx].X2;
        }
    }

    // if multiple spouses set next parent as end of first one
    if (previousGeneration[fatIdx].SpouseIdLst.length > 1) {
        if (Math.abs(fatIdx - motIdx) == 1) {
            return nextParentLink;
        }
    }

    if (fatIdx > motIdx) idxParentLink = fatIdx;

    let rightX2OfCurrentParent = previousGeneration[idxParentLink].X2;

    let idx = 0;

    let _treePerson = null;

    let isFound = false;
    while (idx < previousGeneration.length) {
        if (previousGeneration[idx].IsDisplayed && previousGeneration[idx].ChildCount > 0
            && previousGeneration[idx].X1 > rightX2OfCurrentParent) {
            isFound = true;
            _treePerson = previousGeneration[idx];
            break;
        }
        idx++;
    }

    if (isFound)
        nextParentLink = previousGeneration[idx].X1;

    return nextParentLink;
}

export const GetParentXs = (fatherX1, motherX1,halfBoxWidth) => {

    let result = {
        secondPX : 0,
        firstPX :0
    };

    if (fatherX1 > motherX1) {
        result.secondPX = fatherX1+ halfBoxWidth;
        result.firstPX = motherX1 + halfBoxWidth;

    }
    else {
        result.secondPX = motherX1 + halfBoxWidth;
        result.firstPX = fatherX1+ halfBoxWidth;
    }
    
    return result;

}

export const CreateArray = (shape) => {

    var newArray = [];
    let genIdx=0;
    for(var generation  of shape){
        newArray.push([]);
        let idx =0;
        
        while(idx < generation.VisibleFamilyCount){
            newArray[genIdx].push([]);
            idx++;
        }

        genIdx++;
        
    }
    
    return newArray;

}

export const getDescendants =  (nodes, person, startGen) =>{

    let moveList = [];
    var moveGenIdx = startGen;


    while (moveGenIdx > 0)
    {

        if (!moveList.ContainsPerson(nodes[moveGenIdx][person]))
        {
            moveList.push(nodes[moveGenIdx][person]);
        }

        person = nodes[moveGenIdx][person].ChildIdx;

        moveGenIdx--;
    }

    moveList.SortByGenIdx();

    // for(let p of moveList){

    //     if(p.RecordLink.Name.includes('Shepherd')){
    //         console.log('shepfound');
    //     }
    // }

    return moveList;
};

export const dump =  (nodes) =>{

 

    for(let gen of nodes){
        
        let genStr ='';
        for(let person of gen){
            genStr += ','+ person.GenerationIdx +','+person.PersonId + ',' +person.Index + ',' + person.FatherId + ',' + person.FatherIdx + ','+ person.MotherId + ',' + person.MotherIdx;
        }
        
        console.log(genStr);
    }
};
 


export const getParentGeneration = (nodes, movePerson)=>{

    let requiredGeneration = movePerson.GenerationIdx + 1;


    if(nodes.length > requiredGeneration)
        return nodes[requiredGeneration];
    
    return;
};

export const CreateChildPositionFromParent = (parentGeneration, movePerson, boxWidth) => {

    let result = {
        x1 : 0.0,
        x2 : 0.0
    };

    if(!parentGeneration)
        return result;

    if (movePerson.FatherIdx == -1)
    {
        result.x1 = ((parentGeneration[movePerson.MotherIdx].X1 + parentGeneration[movePerson.MotherIdx].X2) / 2) - (boxWidth / 2);
        result.x2 = result.x1 + boxWidth;
    }

    if (movePerson.MotherIdx == -1)
    {
        result.x1 = ((parentGeneration[movePerson.FatherIdx].X1 + parentGeneration[movePerson.FatherIdx].X2) / 2) - (boxWidth / 2);
        result.x2 = result.x1 + boxWidth;
    }

    var parentX1 = 0.0;
    var parentX2 = 0.0;

    if (movePerson.FatherIdx != -1 && movePerson.MotherIdx != -1)
    {
        parentX2 = parentGeneration[movePerson.MotherIdx].X2;
        parentX1 = parentGeneration[movePerson.FatherIdx].X1;

        if (movePerson.FatherIdx > movePerson.MotherIdx)
        {
            parentX2 = parentGeneration[movePerson.FatherIdx].X2;
            parentX1 = parentGeneration[movePerson.MotherIdx].X1;
        }

        result.x1 = ((parentX2 + parentX1) / 2) - ((movePerson.X2 - movePerson.X1) / 2);
        result.x2 = result.x1 + (movePerson.X2 - movePerson.X1);
    }

    return result;
};