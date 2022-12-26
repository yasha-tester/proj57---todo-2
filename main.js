let addBtn = document.getElementById("addBtn");
let itemsList;
let itemsList1 = document.querySelector("#itemsList1");
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
let listWrapper = document.getElementById("list-wrapper");
/// / / / // / // / // / // / // / // / // / // / // / // / // / // / ///

const itemCounter = [];
var pageCounter = 1;

// add New Item
function addNewItem() {
  checkAll.checked = false;
  unfinishedNum++;
  unfinished.innerHTML = unfinishedNum;
  totalNum++;
  total.innerHTML = totalNum;
  //---------------------------------------------------------fix required
  if (itemCounter.length >= 8 && itemCounter.length % 8 === 0) {
    // here should be if(){
    pageCounter++;
    let newPage = document.createElement("a");
    newPage.id = "page" + `${pageCounter}`;
    newPage.innerHTML = `${pageCounter}`;
    pages.append(newPage);
    // }
    let newList = document.createElement("ol");
    newList.id = "itemsList" + `${pageCounter}`;
    if (!listWrapper.children["itemsList" + `${pageCounter}`]) {
      listWrapper.append(newList);
    }
  }
  //------------------------------------
  let value = document.getElementById("addItem").value;
  let newItem = document.createElement(`li`);
  newItem.innerHTML = `${value}`;

  document.getElementById("itemsList" + `${pageCounter}`).append(newItem);
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
  // 1,2,3... instead of pageCounter and last value == pageCounter
  for (let i1 = 1; i1 <= pageCounter; i1++) {
    let length = document.getElementById("itemsList" + `${i1}`).children.length;

    if (checkAll.checked) {
      // for each list
      let lengthWrapper = listWrapper.children.length;
      for (let i2 = 0; i2 < lengthWrapper; i2++) {
        // for each item
        for (let i3 = 0; i3 < length; i3++) {
          let itemsListX = document.getElementById("itemsList" + `${i1}`);
          if (itemsListX.children[i3].children[0].checked === false) {
            itemsListX.children[i3].children[0].checked = true;
            unfinishedNum--;
            unfinished.innerHTML = unfinishedNum;
            checkedNum++;
            checkedElement.innerHTML = checkedNum;
          }
        }
      }
    } else {
      for (let i2 = 0; i2 < length; i2++) {
        let itemsListX = document.getElementById("itemsList" + `${i1}`);
        itemsListX.children[i2].children[0].checked = false;
        unfinishedNum++;
        unfinished.innerHTML = unfinishedNum;
        checkedNum--;
        checkedElement.innerHTML = checkedNum;
      }
    }
  }
});
// delete checked
//-----------------------------------------------------------fix required
let delChecked = document.getElementById("delChecked");
delChecked.addEventListener("click", () => {
  for (let i1 = 1; i1 <= pageCounter; i1++) {
    let length = document.getElementById("itemsList" + `${i1}`).children.length;

    for (let i = length - 1; i >= 0; i--) {
      let itemsListX = document.getElementById("itemsList" + `${i1}`);
      if (itemsListX.children[i].children[0].checked) {
        itemsListX.children[i].remove();
        totalNum--;
        total.innerHTML = totalNum;
        checkedNum--;
        checkedElement.innerHTML = checkedNum;
        // page counter decreasing

        if (itemCounter.length >= 9 && itemCounter.length % 9 === 0) {
          let neededCounter = document.getElementById(`page${pageCounter}`);
          neededCounter.remove(); // doesn't work
          pageCounter--;
        }
        // itemCounter.shift(`${thisArrItem + 1}`);
      }
    }
  }
});
//----------------------------------------------------------------------

// needed:

// delChecked page counter lag on 5 pages

// switching pages;

// del checked bug with more than 1 pages

// deleting is mixing up pages and items

/*
on delete
:
arr{currentPage}.pop();
if(length % 8 === 0) currentPage--;
itemCounter.remove();

*/

// a plan is to rewrite the whole with for loops in the basis
