const LOCAL_HOST = "http://127.0.0.1:8080";

document.addEventListener('DOMContentLoaded', function () {
    let loginBtn = document.getElementById('login-btn');
    if (isLogin('JSESSIONID')) loginBtn.innerText = "Hello!";
});

function isLogin(cookieName) {
    if (getCookie(cookieName) !== null) return true;
    return false;
}

function getCookie(cookieName) {
    let cookieValue = null;
    if (document.cookie) {
        let array = document.cookie.split((escape(cookieName) + '='));
        if (array.length >= 2) {
            let arraySub = array[1].split(';');
            cookieValue = unescape(arraySub[0]);
        }
    }
    return cookieValue;
}

function modalClear() {
    let modalTmp = document.getElementById('open-modal-tmp');
    document.getElementById('open-modal-title').innerText = '';
    document.getElementById('open-modal-maker').innerText = '';
    document.getElementById('open-modal-material').innerText = '';
    while (modalTmp.firstChild) {
        modalTmp.removeChild(modalTmp.firstChild);
    }
}

function makeInputTag(type, id, name) {
    let ret = document.createElement('input');
    ret.setAttribute('type', type);
    ret.setAttribute('id', id);
    ret.setAttribute('name', name);
    return ret;
}

function submitFetch(action, idInput, pwInput) {
    if(action === 'login') action = 'user.do?action=login';
    else if(action === 'register') action = 'user.do?action=register';

    fetch(`${LOCAL_HOST}/${action}`, {
        method: 'post',
        type: 'json',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `id=${idInput.value}&pw=${pwInput.value}`
    })
    // .then(res => {return res.json();})
        .then(res => {
            if (res.status === 200) {
                let loginBtn = document.getElementById('login-btn');
                loginBtn.innerText = "Hello!";
                location.href = '#';
            } else {
                // 모달 UI 변환(재로그인)
            }
        });
}