document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-btn').addEventListener('click', e => {
        modalClear();
        if (isLogin('JSESSIONID')) {
            // TODO 탈퇴, 수정 fetch
            if (confirm('Logout?')) {
                fetch(`${LOCAL_HOST}/user.do?action=logout`).then(res => {
                    if (res.status === 200) document.getElementById('login-btn').innerText = 'Login';
                });
                return;
            }
            else return;
        }
        paintLoginModal();
        location.href = '#open-modal';
    })
});

function paintLoginModal() {
    let modalTmp = document.getElementById('open-modal-tmp');
    document.getElementById('open-modal-title').innerText = 'Login';
    document.getElementById('open-modal-maker').innerText = '값을 입력하시오. ';
    let span1 = document.createElement('span');
    let span2 = document.createElement('span');
    let labelID = document.createElement('label');
    let labelPW = document.createElement('label');
    let labelDesc = document.createElement('label');
    let idInput = makeInputTag('text', 'id', 'id');
    let pwInput = makeInputTag('password', 'pw', 'pw');
    labelID.innerText = "ID";
    labelPW.innerText = "PW";
    labelID.setAttribute('for', 'id');
    labelPW.setAttribute('for', 'pw');
    labelDesc.setAttribute('id', 'labelDesc');
    span1.setAttribute('class', 'searchbox');
    span2.setAttribute('class', 'searchbox');
    span1.style.height = '48px';
    span2.style.height = '48px';
    document.getElementById('open-modal-maker').appendChild(labelDesc);
    modalTmp.appendChild(span1).appendChild(labelID);
    span1.appendChild(idInput);
    modalTmp.appendChild(document.createElement('br'));
    modalTmp.appendChild(span2).appendChild(labelPW);
    span2.appendChild(pwInput);
    modalTmp.appendChild(document.createElement('br'));
    let submit = document.createElement('button');
    submit.innerText = '제출';
    submit.setAttribute('class', 'my-btn hover4');
    submit.addEventListener('click', () => submitFetch('login', idInput, pwInput));
    let registerBtn = document.createElement('button');
    registerBtn.setAttribute('class', 'my-btn hover4');
    registerBtn.style.marginLeft = '1%';
    registerBtn.style.marginRight = '1%';
    registerBtn.innerText = '회원 가입';
    registerBtn.addEventListener('click', () => submitFetch('register', idInput, pwInput));
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = '회원 탈퇴';
    deleteBtn.setAttribute('class', 'my-btn hover4');
    deleteBtn.addEventListener('click', () => submitFetch('deleteBtn', idInput, pwInput));
    modalTmp.appendChild(submit);
    modalTmp.appendChild(registerBtn);
    modalTmp.appendChild(deleteBtn);
}