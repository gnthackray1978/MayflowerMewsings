
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
            console.log('middle parents failed: ' +genidx + ' '+ fatIdx+ ' '+ motIdx );
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