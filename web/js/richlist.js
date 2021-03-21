
let richListTable = document.getElementById("richlist");

async function populateData(){
    let response = await fetch("../web/js/richlist.json");
    let data = await response.json();

    data.map((richList, idx) =>{
        fillRow(idx+1, richList.addr, richList.bal);
    })
}

function fillRow(rank, addr, coins){
    let row = document.createElement('tr');
    row.classList.add('list__row');
    let col_rank = document.createElement('td');
    col_rank.classList.add('list__cell')
    col_rank.classList.add('list__rank')
    let rank_val = document.createElement('span');
    rank_val.classList.add('list__value');
    rank_val.innerText = rank;
    col_rank.appendChild(rank_val);
    row.appendChild(col_rank);
    
    let col_addr = document.createElement('td');
    col_addr.classList.add('list__cell')
    let addr_val = document.createElement('span');
    addr_val.classList.add('list__value');
    addr_val.innerText = addr;
    col_addr.appendChild(addr_val);
    row.appendChild(col_addr);
    
    let col_bal = document.createElement('td');
    col_bal.classList.add('list__cell')
    col_bal.classList.add('list__coins')
    let bal_val = document.createElement('span');
    bal_val.classList.add('list__value');
    bal_val.innerText = Number(coins).toLocaleString();
    col_bal.appendChild(bal_val);
    row.appendChild(col_bal);

    richListTable.appendChild(row);
}

populateData();