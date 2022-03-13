
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