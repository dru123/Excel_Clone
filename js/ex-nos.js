let save=document.querySelector(".download");
let open=document.querySelector(".folder-open");
let newSheet=document.querySelector(".new");

// functionality -> download excel representation
save.addEventListener("click", function () {
    //2d arrayy save file 
    const data = JSON.stringify(sheetArray);
    // convert it into blob
// data -> file like object convert
    const blob = new Blob([data], { type:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64," });

    // convert it any type file into url
   const url = window.URL.createObjectURL(blob);//sheetaraay k url bna diya
    let a = document.createElement("a");
    // file will be downloaded
    a.href = url;
    // file download
    a.download = "file.json";
// anchor click
    a.click();
//data->url..
})


open.addEventListener("click",function(){
    let select=document.createElement("input");
    select.type="file";
    select.click();
      // files array -> file accept-> multiple files get 
        select.addEventListener("change",function(){
            let filesArr=select.files;
            let fileObj=filesArr[0];
             // file reader to read the file
            let fr=new FileReader(fileObj);
             // read as text 
            fr.readAsText(fileObj);
            fr.onload=function(){
                  sheetArray=fr.result;
                  sheetArray=JSON.parse(sheetArray);
                  sheetDB=sheetArray[0];
                  initui();
              }
         })
        
 })
//  newSheet.addEventListener("click",function(){

//      let allsheet=document.querySelectorAll(".sheet");
//      for(let i=1;i<allsheet.length;i++){
//          allsheet[i].remove();
//      }
// firstSheet.addEventListener("click",makeMeActive);
// firstSheet.click();
// let firstCell=document.querySelector(`.cell[rid="0"][cid="0"]`)
// firstCell.click(); 
// })


//just refresh the page.....
newSheet.addEventListener("click",function(){
    location.reload(true)});