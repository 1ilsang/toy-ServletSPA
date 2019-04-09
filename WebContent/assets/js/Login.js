document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('login-btn').addEventListener('click', e => {
        modalClear();
        if (isLogin('JSESSIONID')) {
            // TODO Cookie 까서 확인. + 조회 // 탈퇴, 수정 fetch
            if (confirm('Logout?')) {
                fetch(`${LOCAL_HOST}/user.do?action=logout`).then(res => {
                    if(res.status === 200) document.getElementById('login-btn').innerText = 'Login';
                });
                return;
            }
            else return;
        }
        let modalTmp = document.getElementById('open-modal-tmp');
        document.getElementById('open-modal-title').innerText = 'Login';
        document.getElementById('open-modal-maker').innerText = '값을 입력하시오';
        let idInput = makeInputTag('text', 'id', 'id');
        let pwInput = makeInputTag('password', 'pw', 'pw');
        modalTmp.appendChild(idInput);
        modalTmp.appendChild(pwInput);
        let submit = document.createElement('button');
        submit.innerText = '제출';
        submit.addEventListener('click', () => submitFetch('login', idInput, pwInput));
        let registerBtn = document.createElement('button');
        registerBtn.innerText = '회원 가입';
        registerBtn.addEventListener('click', () => submitFetch('register', idInput, pwInput));
        let findBtn = document.createElement('button');
        findBtn.innerText = '비번 찾기';
        findBtn.addEventListener('click', e => {
            modalClear();
        });
        modalTmp.appendChild(submit);
        modalTmp.appendChild(registerBtn);
        modalTmp.appendChild(findBtn);
        location.href = '#open-modal';
    })
});