let Amount = 0;
let expense = 0;
let balance = 0;
let rNo;
let arr = [];
let update = false;
let vid = null;
let expense1;

const showAmount = () => {
    Amount = document.getElementById("budget").value;

    localStorage.setItem("budget", JSON.stringify(Amount));
    

    let pElem = document.createElement('p');
    let textElem = document.createTextNode(Amount);
    pElem.setAttribute("id", "bud_amount");
    pElem.appendChild(textElem);
    let divRef = document.getElementById("res_Title");
    divRef.appendChild(pElem);

    let pElem1 = document.createElement('p');
    let textElem1 = document.createTextNode(expense);
    pElem1.setAttribute("id", "expense");
    pElem1.appendChild(textElem1);
    let divRef1 = document.getElementById("res_Title");
    divRef1.appendChild(pElem1);

    let pElem2 = document.createElement('p');
    let textElem2 = document.createTextNode(Amount -= expense);
    pElem2.setAttribute("id", "balance");
    pElem2.appendChild(textElem2);
    let divRef2 = document.getElementById("res_Title");
    divRef2.appendChild(pElem2);
}

const handleExpanse = () => {
    expense1 = parseInt(document.getElementById("expense_amount").value);
    expense = expense + expense1;
    document.getElementById("expense").innerHTML = expense;
    document.getElementById("balance").innerHTML = (Amount -= expense1);
    rNo = Math.floor((Math.random() * 1000));
    let data = document.getElementById("data").value;

    arr.push({
        id: rNo,
        name: data,
        price: expense1
    });

    console.log(arr);   
    

    localStorage.setItem("budget_data", JSON.stringify(arr));
    handleData();
    display();
}

const removeData = (i) => {
    let re_ex = parseInt(document.getElementById("expense").innerHTML);
    let re_bal = parseInt(document.getElementById("balance").innerHTML);
    let e1;
    console.log("expenseee" + re_ex);
    console.log("balanceee" + re_bal);
    let localData = JSON.parse(localStorage.getItem("budget_data"));
    let removeData = document.getElementById("data-" + i);
    removeData.remove();
    localData.map((v, index) => {
        if (v.id == i) {
            localData.splice(index, 1);
        }
        e1 = v.price;
    })
    console.log("e1 value" + e1);
    document.getElementById("expense").innerHTML = (re_ex - e1);
    document.getElementById("balance").innerHTML = (re_bal + e1);
    localStorage.setItem("budget_data", JSON.stringify(localData));
    
    handleData();
}


const handleData = () => {
    let budget = parseInt(document.getElementById("bud_amount").innerHTML);
    let localData = JSON.parse(localStorage.getItem("budget_data"));
    let sumEx = localData.reduce((acc, v) => acc + v.price, 0);
    console.log(localData, sumEx, budget);
    document.getElementById("budget").innerHTML = budget;
    document.getElementById("expense").innerHTML = sumEx;
    document.getElementById("balance").innerHTML = (budget - sumEx);
}


const edtData = (i) => {
    arr.map((v, index) => {
        if (v.id === i) {
            document.getElementById("data").value = arr[index].name;
            document.getElementById("expense_amount").value = arr[index].price;
            vid = i;
        }
    })
    update = true;
    // console.log("vid", vid);
}

const getdata = () => {
    let data = JSON.parse(localStorage.getItem("budget_data"));
    let budget = JSON.parse(localStorage.getItem("budget"));
    console.log(budget);
    // document.getElementById("bud_amount").innerHTML = budget;
    console.log(data);

    if (data) {
        data.map((v) => {
            arr.push({
                id: v.rNo,
                name : v.name,
                price : v.price
            })  
            display();
        });
    }
}

const changedata = () => {
    let name = document.getElementById("data").value;
    let amt = parseInt(document.getElementById("expense_amount").value);
    expense = expense + (amt - expense1);
    document.getElementById("expense").innerHTML = expense;
    document.getElementById("balance").innerHTML = (Amount -= (amt - expense1));


    let ParentElem = document.getElementById("data-" + vid);
    let childElem = ParentElem.children[0];
    let childElem1 = ParentElem.children[1];
    let childElem2 = ParentElem.children[2];
    let childElem3 = ParentElem.children[3];

    childElem.textContent = name;
    childElem1.textContent = amt;

    ParentElem.appendChild(childElem);
    ParentElem.appendChild(childElem1);
    ParentElem.appendChild(childElem2);
    ParentElem.appendChild(childElem3);

    index = arr.findIndex((obj => obj.id === vid));
    arr[index].name = name;
    arr[index].price = amt;

    console.log("new array", arr);

    localStorage.setItem("budget_data", JSON.stringify(arr));
    handleData();
    update = false;
    vid = null;
    event.preventDefault();
}

const display = () => {
    let a, b;
    arr.map((v, i) => {
        a = v.name,
        b = v.price
    });
    
    let row = document.createElement('tr');
    let data = document.createElement('td');
    let data1 = document.createElement('td');
    let del = document.createElement('td');
    let bt1 = document.createElement('button');
    let edt = document.createElement('td');
    let edt1 = document.createElement('button');

    data1.setAttribute("id", "price");
    bt1.setAttribute("onclick", "removeData(" + rNo + ")");
    edt1.setAttribute("onclick", "edtData(" + rNo + ")");
    row.setAttribute("id", "data-" + rNo);

    let textElem = document.createTextNode(a);
    let textElem1 = document.createTextNode(b);
    let textElem2 = document.createTextNode("X");
    let textElem3 = document.createTextNode("E");

    data.appendChild(textElem);
    data1.appendChild(textElem1);
    del.appendChild(bt1);
    bt1.appendChild(textElem2);
    edt.appendChild(edt1);
    edt1.appendChild(textElem3);
    row.appendChild(data);
    row.appendChild(data1);
    row.appendChild(del);
    row.appendChild(edt);

    let divRef1 = document.getElementById("list_data");
    divRef1.appendChild(row);
}

const handledisc = () => {
    if (update) {
        changedata();
    }
    else {
        handleExpanse();
    }
}
window.onload = getdata();

