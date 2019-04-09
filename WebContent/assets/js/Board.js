document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('notice-btn').addEventListener('click', e => {
        modalClear();
        document.getElementById('open-modal-title').innerText = '공지사항';
        document.getElementById('open-modal-maker').innerText = 'Hello, World! ';

        if(isLogin()) paintBoardModalBtn();

        fetch(`${LOCAL_HOST}/board.do?action=all`).then(res => {
            return res.json()
        }).then(res => {
            console.log(res);
            paintBoardModalTable(res);
        });

        location.href = '#open-modal';
    });
});

function paintBoardModalTable(res) {
    let modalTmp = document.getElementById('open-modal-tmp');
    let table = document.getElementById('modal-table');
    if(table === null) {
    } else {
        table.remove();
    }

    table = document.createElement('table');
    let thSeq = document.createElement('th');
    let thTitle = document.createElement('th');
    let thDesc = document.createElement('th');
    let thr = document.createElement('tr');
    table.setAttribute('id', 'modal-table');
    thSeq.innerText = "번  호";
    thTitle.innerText = "제  목";
    thDesc.innerText = "내  용";
    table.style.width = '100%';
    table.style.borderTop = '1px solid black';
    table.style.borderBottom = '1px solid black';
    table.style.borderCollapse = 'collapse';
    thr.appendChild(thSeq);
    thr.appendChild(thTitle);
    thr.appendChild(thDesc);
    table.appendChild(thr);

    // TODO 클릭 시 하나만 상세 출력...
    for(let i = 0 ; i < res.length; i++) {
        let tr = document.createElement('tr');
        let tdSeq = document.createElement('td');
        let tdTitle = document.createElement('td');
        let tdDesc = document.createElement('td');
        let delBtn = document.createElement('button');
        tdSeq.innerText = res[i].seq;
        tdTitle.innerText = res[i].title;
        tdDesc.innerText = res[i].desc;
        tr.style.borderBottom = '1px solid black';
        tr.addEventListener('click', () => {
            console.log(res[i]);
        });
        delBtn.innerText = '삭제';
        delBtn.addEventListener('click', () => submitFetch('boardDelete', tdSeq));
        tr.appendChild(tdSeq);
        tr.appendChild(tdTitle);
        tr.appendChild(tdDesc);
        tr.appendChild(delBtn);
        table.appendChild(tr);
    }

    modalTmp.appendChild(table);
}

function paintBoardModalBtn() {
    // TODO Login.js 와 똑같다. 이부분 모듈화.
    let modalTmp = document.getElementById('open-modal-tmp');
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let labelID = document.createElement('label');
    let labelPW = document.createElement('label');
    let labelDesc = document.createElement('label');
    let idInput = makeInputTag('text', 'title', 'title');
    let pwInput = makeInputTag('text', 'desc', 'desc');
    labelID.innerText = "제목";
    labelPW.innerText = "내용";
    labelID.setAttribute('for', 'title');
    labelPW.setAttribute('for', 'desc');
    labelDesc.setAttribute('id', 'labelDesc');
    span1.setAttribute('class', 'searchbox');
    span2.setAttribute('class', 'searchbox');
    span1.style.height = '48px';
    span2.style.height = '48px';
    span2.style.marginLeft = '1%';
    span2.style.marginRight = '1%';
    document.getElementById('open-modal-maker').appendChild(labelDesc);
    modalTmp.appendChild(span1).appendChild(labelID);
    span1.appendChild(idInput);
    modalTmp.appendChild(span2).appendChild(labelPW);
    span2.appendChild(pwInput);
    let submit = document.createElement('button');
    submit.innerText = '글쓰기';
    submit.setAttribute('class', 'my-btn hover4');
    submit.addEventListener('click', () => submitFetch('boardInsert', idInput, pwInput));
    modalTmp.appendChild(submit);
}