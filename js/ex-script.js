let plusBtn=document.querySelector(".add-sheet-button");
let allsheets=document.querySelector(".sheet-list");
let firstSheet=document.querySelector(".sheet");
firstSheet.addEventListener("click",makeMeActive);
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
    nsheet.addEventListener("click",makeMeActive);

})
function makeMeActive(e){
    let sheet=e.currentTarget;
    let allsheet=document.querySelectorAll(".sheet");
    for(let i=0;i<allsheet.length;i++){
        allsheet[i].classList.remove("active");

    }
    sheet.classList.add("active");
}