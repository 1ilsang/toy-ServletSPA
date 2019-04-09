const LOCAL_HOST = "http://127.0.0.1:8080";

document.addEventListener('DOMContentLoaded', function () {
    let loginBtn = document.getElementById('login-btn');
    if (isLogin('JSESSIONID')) loginBtn.innerText = "Hello!";

    startTypo();
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
    ret.setAttribute('class', 'input_text');
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
                let labelDesc = document.getElementById('labelDesc');
                labelDesc.style.color = 'red';
                labelDesc.innerText = " ID 혹은 비밀번호를 확인해 주세요";
            }
        });
}

function startTypo() {

    let str = "MADE-BY-";
    let charlist = ["SSAFY...", "1ilsang...", "YoonJin..."];
    let cl_order = 0;
    let c = 0;

    setInterval(function () {
        let isvisible = document.getElementById('cursor').style.visibility;
        if (isvisible === 'hidden') {
            document.getElementById('cursor').style.visibility = 'visible'
        } else {
            document.getElementById('cursor').style.visibility = 'hidden'
        }
    }, 200);

    let firstInterval = setInterval(function () {
        if (c < 8) {
            document.getElementById('cursor').style.paddingLeft = (document.getElementById('typing').offsetWidth + 60) + 'px';
            document.getElementById('typing').innerText += str[c];
            c++;
        }
        if (c === 8) {
            let bflag = 1;
            c = 0;
            clearInterval(firstInterval);
            (function () {
                let flag = 0;
                setInterval(function () {
                    if (bflag === 1) {
                        if (flag === 0) {
                            document.getElementById('cursor').style.paddingLeft = (document.getElementById('typing').offsetWidth + 17) + 'px';
                            if (c < charlist[cl_order].length) {
                                document.getElementById('typing').innerText += charlist[cl_order][c];
                                c++;
                            }
                            if (c === charlist[cl_order].length) {
                                flag = 1;
                            }
                        }
                        if (flag === 1) {
                            if (c >= 0) {
                                let buf = str;
                                for (let i = 0; i < c; i++) {
                                    buf += charlist[cl_order][i];
                                }
                                document.getElementById('typing').innerText = buf;
                                document.getElementById('cursor').style.paddingLeft = (document.getElementById('typing').offsetWidth - 20) + 'px';
                                c--;
                            }
                            if (c === -1) {
                                c++;
                                flag = 0;
                                if (cl_order === 2) {
                                    cl_order = 0;
                                } else {
                                    cl_order++;
                                }
                            }
                        }
                    }
                }, 500);
            })();
        }
    }, 500);

}