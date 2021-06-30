let leftrow=document.querySelector(".left-row");
let toprow=document.querySelector(".top-row");
let grid=document.querySelector(".grid");
let body=document.querySelector("body");
let allcell=document.querySelectorAll(".grid .cell");
let addressBox=document.querySelector(".address-container");
let bold=document.querySelector(".bold");
let underline=document.querySelector(".underline");
let italic=document.querySelector(".italic");
let alignbtns=document.querySelectorAll(".align-container>*");
let font=document.querySelector(".font-size");
let style=document.querySelector(".font-family");
let textColor=document.querySelector(".textcolor");
let backColor=document.querySelector(".bg-color");
let formulaBar=document.querySelector(".formula-box");
let plusBtn=document.querySelector(".add-sheet-button");
let allsheets=document.querySelector(".sheet-list");
let firstSheet=document.querySelector(".sheet");
let rows=100;
let cols=26;
//top row

// FEATURE OF EXCEL--->
//FORMATTING 2 WAY BINDING....
//FORMULA USING STACK AND GRAPH.....
//MULTIPLE SHEET DATABASE CREATION...
for (let i = 0; i < cols; i++) {
    //top col->ABC...
    let cell = document.createElement("div");
    cell.innerText = String.fromCharCode(65 + i);
   
    // setAttribute
    cell.setAttribute("class", "cell");
    
    toprow.appendChild(cell);
  
}
//rows create
for(let i=0;i<rows;i++){
    let box=document.createElement("div");
    box.innerText=i+1;
    box.setAttribute("class","box");
    leftrow.appendChild(box);
}
//grid create.....
for(let i=0;i<rows;i++){
    let row=document.createElement("div");
    row.setAttribute("class","row");
    for(let j=0;j<cols;j++){
    
        let cell=document.createElement("div");
        cell.setAttribute("class","cell");
        cell.setAttribute("contenteditable", "true");
        cell.setAttribute("rid",i);
        cell.setAttribute("cid",j);
        row.appendChild(cell);
   }
    grid.appendChild(row);
}
let sheetArray=[];//2 Daraay
let sheetDB;//poitning to NewDB
//sheetarray k ander shhets pdi hongi mtlb unke newDB jinko shhetDb point kreaga

firstSheet.addEventListener("click",makeMeActive);
firstSheet.click();

//shhet create on click plus
plusBtn.addEventListener("click",function(){
    let nsheet=document.createElement("div");
    let allsheet=document.querySelectorAll(".sheet");
    let lastsheet=allsheet[allsheet.length-1];

    let lastidx=lastsheet.getAttribute("idx");
    lastidx=Number(lastidx);
    nsheet.setAttribute("idx",`${lastidx+1}`);
  nsheet.setAttribute("class","sheet");
  nsheet.innerText=`Sheet ${lastidx+2}`;
  allsheets.appendChild(nsheet);
  for(let i=0;i<allsheet.length;i++){
      allsheet[i].classList.remove("active");
  }
  nsheet.classList.add("active");
  console.log("9");
  createSheet();
  console.log(lastidx);
 //newDB k index d dega
  sheetDB=sheetArray[lastidx+1];
  console.log(sheetDB);

  

  nsheet.addEventListener("click",makeMeActive);
  //intial property set krne k ...
  initui();
  console.log(sheetDB);
})
 

function createSheet()
{
     allcell=document.querySelectorAll(".grid .cell");

let NewDB=[];
for(let i=0;i<rows;i++){
    let rows=[];
    for(let j=0;j<cols;j++){
        let cell={ 
            bold: "normal"
            , italic: "normal",
            underline: "none", 
            hAlign: "center",
            fontFamily: "sans-serif"
            , fontSize: "16",
            color: "black",
            bColor: "white",
            value:"",
            formula:"",
            children:[]

        }
        //let uiCellElement=document.querySelector(`.grid .cell[rid='${i}'][cid='${j}']`);
   //     console.log(uiCellElement);
    // uiCellElement.innerText="";
        
        rows.push(cell);
    }
    NewDB.push(rows);
}
    sheetArray.push(NewDB);
    allcell[0].click();
}
function makeMeActive(e){	
    //jis sheet p click hua
    let sheet=e.currentTarget;
    let allsheet=document.querySelectorAll(".sheet");
    for(let i=0;i<allsheet.length;i++){
        allsheet[i].classList.remove("active");

    }
    sheet.classList.add("active");
    let indx=sheet.getAttribute("idx");
    if(!sheetArray[indx]){
        console.log("sheet 1");
        console.log(indx);
        createSheet();
    }
    console.log("shet 2");
    
    sheetDB=sheetArray[indx];
    console.log(sheetDB);
    console.log(indx);
   
    initui();
    console.log("45",sheetDB);
}
function initui(){
    
    for(let i=0;i<rows;i++){
       
        for(let j=0;j<cols;j++){
           
            let uiCellElement=document.querySelector(`.grid .cell[rid="${i}"][cid="${j}"]`);
          let cellObject=sheetDB[i][j];
            let values=sheetDB[i][j].value;
           
     uiCellElement.innerText=values;
uiCellElement.style.fontSize= cellObject.fontSize;
uiCellElement.style.backgroundColor=cellObject.bColor;
uiCellElement.style.textDecoration =cellObject.underline;
uiCellElement.style.fontFamily=cellObject.fontFamily;
  uiCellElement.style.color=cellObject.color;  
  uiCellElement.style.fontWeight= cellObject.bold;
  uiCellElement.style.fontStyle=cellObject.italic;
 backColor.value="#FFFFFF";
 textColor.value="#000000";
 uiCellElement.style.textAlign="center";
      
}}
  }



    allcell=document.querySelectorAll(".grid .cell");
for(let i=0;i<allcell.length;i++){

     //  tool sync
        allcell[i].addEventListener("click",function(){
         
            let rid=allcell[i].getAttribute("rid");
            let cid=allcell[i].getAttribute("cid");
            cid=Number(cid);
            rid=Number(rid);
            let address=`${String.fromCharCode(65+cid)}${rid+1}`;
            uicellElement=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);
            addressBox.value =address;
        
        let cellObject=sheetDB[rid][cid];
console.log("1");
        
        if(cellObject.underline=="none"){
            underline.classList.remove("active");
        }else{
            underline.classList.add("active");
        }
        if(cellObject.bold=="normal"){
            bold.classList.remove("active");
        }else{
            bold.classList.add("active");
        }
        //
        if(cellObject.italic=="normal"){
            italic.classList.remove("active");
        }else{
            italic.classList.add("active");
        }
        //
        if(cellObject.formula&& cellObject.value){
            formulaBar.value=cellObject.formula;
        }
        else{
            formulaBar.value=" ";
        }
         if(cellObject.bColor=="white"){
             backColor.value="#FFFFFF";
         }else{
          
             backColor.value=cellObject.bColor;
         }
         if(cellObject.color=="black"){
            textColor.value="#000000";
         }else{
             textColor.value=cellObject.color;
         }
          if(cellObject.fontSize!=16){
            font.value=cellObject.fontSize;
             
          }else{
            font.value=16;
              console.log(font.value);
          }
          if(cellObject.fontFamily!="sans-serif"){
              style.value=cellObject.fontFamily;
          }else{
              style.value="sans-serif";
          }

        
})
}
allcell[0].click();



bold.addEventListener("click",function(){
    
    let uicellElement=finduiElement();
    let cid=uicellElement.getAttribute("cid");
    let rid=uicellElement.getAttribute("rid");
    
     let cellObject=sheetDB[rid][cid];
   
     if(cellObject.bold=="normal"){
        uicellElement.style.fontWeight="bold";
        cellObject.bold="bold";
        bold.classList.add("active");

     }else{
        uicellElement.style.fontWeight="normal";
    cellObject.bold="normal";
     bold.classList.remove("active");     }
     
})
italic.addEventListener("click",function(){
    
    let uicellElement=finduiElement();
    let cid=uicellElement.getAttribute("cid");
    let rid=uicellElement.getAttribute("rid");
    
     let cellObject=sheetDB[rid][cid];
     if(cellObject.italic=="normal"){
        uicellElement.style.fontStyle ="italic";
        cellObject.italic="italic";
        italic.classList.add("active");

     }else{
        uicellElement.style.fontStyle="normal";
    cellObject.italic="normal";
     italic.classList.remove("active");  
       }

})
underline.addEventListener("click",function(){
    
    let uicellElement=finduiElement();
    let cid=uicellElement.getAttribute("cid");
    let rid=uicellElement.getAttribute("rid");
    
     let cellObject=sheetDB[rid][cid];
     if(cellObject.underline=="none"){
        uicellElement.style.textDecoration ="underline";
        cellObject.underline="underline";
     underline.classList.add("active");

     }else{
        uicellElement.style.textDecoration="none";
    cellObject.underline="none";
    underline.classList.remove("active");     }

})
//~~~~alignment~~~~~~~~~~~~~~~~~~~~``

for(let i=0;i<alignbtns.length;i++){
    alignbtns[i].addEventListener("click",function(){
        
        
       let alignment=alignbtns[i].getAttribute("class");
      console.log(alignment);
       let uiCellElement=finduiElement();
       if(cellObject.hAlign=="center"){
       uiCellElement.style.textAlign = alignment;
         cellObject.hAlign=alignment;
       alignbtns[i].classList.add("active");
       }else{
        uiCellElement.style.textAlign ="center";
        cellObject.hAlign="center";
        alignbtns[i].classList.remove("active");
       }


    }
    )
}
//`````````font size`````````````````
font.addEventListener("change",function(){
   
   // let fonts=font.value;//gives the change value;
  
    let uicellElement=finduiElement();
    let cid=uicellElement.getAttribute("cid");
    let rid=uicellElement.getAttribute("rid");
    console.log(uicellElement);
    let size=font.value+"px";
    uicellElement.style.fontSize=size;
    
    
     let cellObject=sheetDB[rid][cid];
     cellObject.fontSize=font.value;

        if(cellObject.fontSize!=16){
            console.log(cellObject.fontSize);
            console.log(font.value);
        font.value=cellObject.fontSize;
        // let size=cellObject.fontSize+"px";
        // uicellElement.style.fontSize=size;
        }
})
//~~~~~~~~~~STYLE~~~~~~~~~~~~~~~~~~~~~~~~~~`
style.addEventListener("change",function(){
    let uicellElement=finduiElement();
    let cid=uicellElement.getAttribute("cid");
    let rid=uicellElement.getAttribute("rid");
    let cellObject=sheetDB[rid][cid];
    let fonts=style.value;//gives the change value;
    cellObject.fontFamily=fonts;
     uicellElement.style.fontFamily=fonts;
     if(cellObject.fontFamily!="sans-serif"){
         style.value=cellObject.fontFamily;

     }

})
function finduiElement(){
    let address=addressBox.value;
  
    let ridcid=getERidCid(address);
    let rid=ridcid.rid;
    let cid=ridcid.cid;
    let uicellElement=document.querySelector(`.cell[rid="${rid}"][cid="${cid}"]`);

    
return uicellElement;
}
function getERidCid(address){
    let cid=Number(address.charCodeAt(0))-65;
    let rid=Number(address.slice(1))-1;

    
    return{
        "rid":rid,
        "cid":cid
    }
   
}
//~~~~~~~text color change
textColor.addEventListener("change",function(e){
    
    let uicellElement=finduiElement();
    let color=e.target.value;
    uicellElement.style.color=color;
    let rid=uicellElement.getAttribute("rid");
    let cid=uicellElement.getAttribute("cid");
    cellObject=sheetDB[rid][cid];
    cellObject.color=color;
    textColor.value=cellObject.color;
    uicellElement.addEventListener("dblclick",function(e){
        console.log("Hello");
        cellObject.color="black";
        uicellElement.style.color="black";
    })
})
//~~~~~BACKGROUND COLOR CHANGE
backColor.addEventListener("change",function f(e){
    let uicellElement=finduiElement();
    let color=e.target.value;
  // uicellElement.style.backgroundColor=color;
    let rid=uicellElement.getAttribute("rid");
    let cid=uicellElement.getAttribute("cid");
    let cellObject=sheetDB[rid][cid];
    //cellObject.bColor=color;
  
        uicellElement.style.backgroundColor=color;
       cellObject.bColor=backColor.value;
     uicellElement.addEventListener("dblclick",function(e){
       
        cellObject.bColor="white";
        uicellElement.style.backgroundColor="white";})
    })


allcell[0].click();