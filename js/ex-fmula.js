for(let i=0;i<allcell.length;i++){
     // to save the user enetered value into db for later use
    allcell[i].addEventListener("blur",function(){//blur-->last selected celll
    let data =allcell[i].innerText;
    let address=addressBox.value;
    let{rid,cid}=getERidCid(address);
    
let cellObject=sheetDB[rid][cid];
if( cellObject.value==data){
    return;
}
//jb hum manaually value change kre toh formula m formula hta dega..
if(cellObject.formula){
    removeFormula(cellObject,address);
    formulaBar.value="";
}
cellObject.value=data;
 // if you are updating your value then  
        // someone may have included you in there formula so you need to tell them to evaluate there value
        updateChildren(cellObject);
})
}
//parents s children remove krega or formula bar empty krega
function removeFormula(cellObject,address){
     let currentFormula=cellObject.formula;
    let formulaTokens=currentFormula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>=65&&ascii<=90){
            let {rid,cid}=getERidCid(formulaTokens[i]);
            let parentObject=sheetDB[rid][cid];
            console.log(parentObject);
         let idx=parentObject.children.indexOf(address);
         console.log(idx);
         parentObject.children.splice(idx,1);
         cellObject.formula="";
}}}
// formula bar -> formual set 
formulaBar.addEventListener("keydown",function(e){
    if(e.key=="Enter"&&formulaBar.value){
        let currentFormula=formulaBar.value;
        let address=addressBox.value;
          // formula -> value get
      let values=  evaluatedFormula(currentFormula,address);
      let {rid,cid}=getERidCid(address);
      sheetDB[rid][cid].value=values;
             let cellObject=sheetDB[rid][cid];
             if(cellObject.formula!=currentFormula){
                 removeFormula(cellObject,address);
             }
               // let address = addressInput.value;
        // given for which we are setting the formula -> ui,db update 
        // jis cell ke liye formula apply kar rhe hai (address bar wala cell)
        //  ui-> value update
        // ,db-> value,formula update 
    setCell(values,address,currentFormula);
    setParentCHArray(currentFormula,address);
   
    }
})

function evaluatedFormula(currentFormula){
    // ( A1 + A2 )
    // split 
    // [(,A1,+,A2,)]
    // a-> z
    let formulaTokens=currentFormula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>=65&&ascii<=90){
            let {rid,cid}=getERidCid(formulaTokens[i]);
            let cellObject=sheetDB[rid][cid];
            let data=cellObject.value;
    formulaTokens[i]=data;
        }}
         // [(,10,+,20,)]
   let formula= formulaTokens.join(" ");
    console.log(formula);
    
    return evaluate(formula);
}
function setCell(values,address,currentFormula){
    let {rid,cid}=getERidCid(address);
    let uicellElem=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`)
    uicellElem.innerText=values;
    sheetDB[rid][cid].value=values;
    sheetDB[rid][cid].formula=currentFormula;

}
// register yourself as children of the parent(cells that are appearing in the formula)
function setParentCHArray(currentFormula,address){
    let formulaTokens=currentFormula.split(" ");
    for(let i=0;i<formulaTokens.length;i++){
        let ascii=formulaTokens[i].charCodeAt(0);
        if(ascii>=65&&ascii<=90){
            let {rid,cid}=getERidCid(formulaTokens[i]);
            let parentObj=sheetDB[rid][cid];
            parentObj.children.push(address);

}}}
function  updateChildren(cellObject){
    let children=cellObject.children;
    for(let i=0;i<children.length;i++){
            let {rid,cid}= getERidCid(children[i]);
             let childObject=sheetDB[rid][cid];
            let formula=childObject.formula;

      let newValue=evaluatedFormula(formula);
      console.log(newValue);
      SetChildrenCell(newValue,formula,rid,cid);
      // if you are updating your value then  
        // someone may have included you in there formula so you need to tell them to evaluate there value
      updateChildren(childObject);

    }
    
}
function SetChildrenCell(newValue,formulas,rid,cid){
    let uicellElem=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
    uicellElem.innerText=newValue;
    sheetDB[rid][cid].formula=formulas;
    sheetDB[rid][cid].value=newValue;
}

