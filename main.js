let addBtn = document.getElementById("addBtn");
let itemsList = document.querySelector("#itemsList");
let addItemVal = document.getElementById("addItem").value;
let pages = document.getElementById("pages");
let unfinished = document.getElementById("undoneNum");
let unfinishedNum = 0;
unfinished.innerHTML = unfinishedNum;
let total = document.getElementById("totalNum");
let totalNum = 0;
total.innerHTML = totalNum;
let checkedElement = document.getElementById("checkedNum");
let checkedNum = 0;
checkedElement.innerHTML = checkedNum;
/// / / / // / // / // / // / // / // / // / // / // / // / // / // / ///

let itemCounter = [];
let pageCounter = 1;

// add New Item
function addNewItem() {
  checkAll.checked = false;
  unfinishedNum++;
  unfinished.innerHTML = unfinishedNum;
  totalNum++;
  total.innerHTML = totalNum;
  //---------------------------------------------------------fix required
  if (itemCounter.length >= 8 && itemCounter.length % 8 === 0) {
    pageCounter++;
    let newPage = document.createElement("a");
    newPage.id = "page" + `${pageCounter}`;
    newPage.innerHTML = `${pageCounter}`;
    pages.append(newPage);
  }
  //------------------------------------
  let value = document.getElementById("addItem").value;
  let newItem = document.createElement(`li`);
  newItem.innerHTML = `${value}`;

  itemsList.append(newItem);
  itemCounter.push(newItem.innerHTML);

  //closebtn
  let closeBtn = document.createElement("a");
  thisArrItem = closeBtn.className = // className
    itemCounter.at(-1) + " item" + `${itemCounter.length - 1}`; // className
  closeBtn.innerHTML = "&#10006";

  closeBtn.addEventListener("click", () => {
    newItem.remove();
    unfinishedNum--;
    unfinished.innerHTML = unfinishedNum;
    totalNum--;
    total.innerHTML = totalNum;
    if (checkBtn.checked) {
      checkedNum--;
      checkedElement.innerHTML = checkedNum;
      unfinishedNum++;
      unfinished.innerHTML = unfinishedNum;
    }
    //       page counter decreasing
    if (itemCounter.length >= 9 && itemCounter.length % 9 === 0) {
      let neededCounter = document.getElementById(`page${pageCounter}`);
      neededCounter.remove();
      pageCounter--;
    }
    itemCounter.shift(`${thisArrItem + 1}`);
  });
  newItem.append(closeBtn);

  // checkbtn
  let checkBtn = document.createElement("input");
  checkBtn.type = "checkbox";
  checkBtn.className = "checkbox";
  newItem.prepend(checkBtn);
  checkBtn.addEventListener("change", function () {
    if (this.checked) {
      unfinishedNum--;
      unfinished.innerHTML = unfinishedNum;
      checkedNum++;
      checkedElement.innerHTML = checkedNum;
    } else {
      unfinishedNum++;
      unfinished.innerHTML = unfinishedNum;
      checkedNum--;
      checkedElement.innerHTML = checkedNum;
    }
  });
}

// check all btn
let checkAll = document.getElementById("checkAll");
checkAll.checked = false;
checkAll.addEventListener("change", () => {
  let length = itemsList.children.length;
  if (checkAll.checked) {
    for (let i = 0; i < length; i++) {
      if (itemsList.children[i].children[0].checked === false) {
        itemsList.children[i].children[0].checked = true;
        unfinishedNum--;
        unfinished.innerHTML = unfinishedNum;
        checkedNum++;
        checkedElement.innerHTML = checkedNum;
      }
    }
  } else {
    for (let i = 0; i < length; i++) {
      itemsList.children[i].children[0].checked = false;
      unfinishedNum++;
      unfinished.innerHTML = unfinishedNum;
      checkedNum--;
      checkedElement.innerHTML = checkedNum;
    }
  }
});
// delete checked
//-----------------------------------------------------------fix required
let delChecked = document.getElementById("delChecked");
delChecked.addEventListener("click", () => {
  let length = itemsList.children.length;
  for (let i = length - 1; i >= 0; i--) {
    if (itemsList.children[i].children[0].checked) {
      itemsList.children[i].remove();
      totalNum--;
      total.innerHTML = totalNum;
      checkedNum--;
      checkedElement.innerHTML = checkedNum;
      // page counter decreasing

      if (itemCounter.length >= 9 && itemCounter.length % 9 === 0) {
        let neededCounter = document.getElementById(`page${pageCounter}`);
        neededCounter.remove();
        pageCounter--;
      }
      itemCounter.shift(`${thisArrItem + 1}`);
    }
  }
});
//----------------------------------------------------------------------
/*
/ // needed:


/ // delChecked page counter lag on 5 pages



/ // switching pages;
:
currentPage = 0;
arr0 = [];
add items in arr{$currentPage} when item in list added,
if (length % 8 === 0) currentPage++;
arr{currentPage} = [];

on delete
:
arr{currentPage}.pop();
if(length % 8 === 0) currentPage--;
arr{currentPage}.remove();

*/
