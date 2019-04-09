// TODO js 모듈화
    const materialTitle = ['0', 'SERVING_WT', '일일 섭취 권장량', '칼로리', '탄수화물', '단백질', '지방', '당류', '나트륨', '콜레스테롤', '포화지방산', '트랜스지방'];
    window.onload = getProducts;

    function getProducts() {
        let target = document.getElementById('keyword').value.trim();
        //if (flag === true && target === '') return;

        let kind = document.getElementById('kind').value;
        let list = document.getElementById('searchList');
        let action = 'getAll';
        let materialList;
        if(target.length!=0){
        	console.log(action);
        	action ='search';
        }

        fetch(`${LOCAL_HOST}/food.do?action=${action}&kind=${kind}&target=${target}`)
        	.then(res => { 
                    if (res.status == 200){
            			return res.json();
                    }
            })
            .then(res => { 
                list.innerHTML = "";
                
                for(let i=0;i<res.length;++i){
                	let obj = res[i];
                	
                    //if (!obj.childNodes[kind].textContent.includes(target)) continue;
                    let te = document.createElement('li');
                    let title = document.createElement('h1');
                    let maker = document.createElement('div');
                    let material = document.createElement('div');
                    let productImg = document.createElement('img');

                    title.innerText = obj.name+'  ['+obj.hit+']';
                    maker.innerText = obj.maker;
                    material.innerText = obj.material;
                    productImg.setAttribute('src', `assets/${obj.image}`);

                    productImg.setAttribute('width', '10%');
                    title.style.display = 'inline-block';
                    title.style.marginRight = '15px';
                    maker.style.display = 'inline-block';

                    te.style.border = '2px solid gray';
                    te.style.marginBottom = '2%';
                    te.style.marginRight = '14%';
                    te.style.marginLeft = '8%';
                    te.style.borderRadius = '15px';
                    te.style.paddingLeft = '3%';
                    te.style.paddingRight = '3%';
                    te.style.paddingBottom = '3%';
                    te.style.paddingTop = '1%';

                    te.onmouseover = function () {
                        te.style.border = '2px solid black';
                    };
                    te.onmouseleave = function () {
                        te.style.border = '2px solid gray';
                    };
                    let myChart = '';
                    te.addEventListener('click', () => {
                        modalClear();
                        let modal = document.getElementById('open-modal-tmp');
                        let img = document.createElement('img');
                        img.style.width = '10%';
                        img.setAttribute('src', `assets/${obj.image}`);
                        modal.style.width = '700px';
                        modal.style.height = '400px';
                        modal.appendChild(img);
                        document.getElementById('open-modal-title').innerText = title.innerText;
                        document.getElementById('open-modal-maker').innerText = maker.innerText;
                        document.getElementById('open-modal-material').innerText = material.innerText;

                        let canvas = document.createElement('canvas');
                        canvas.setAttribute('id', 'myChart');
                        let ctx = canvas.getContext('2d');
                        myChart = new Chart(ctx, {
                            type: 'bar',
                            data: {
                                labels: ['칼로리', '탄수화물', '단백질', '지방', '당류', '나트륨', '콜레스테롤', '포화지방산', '트랜스지방'],
                                datasets: [{
                                    label: '# 영양',
                                    data: [
                                        obj.calory,
                                        obj.carbo,
                                        obj.protein,
                                        obj.fat,
                                        obj.sugar,
                                        obj.natrium,
                                        obj.chole,
                                        obj.fattyacid,
                                        obj.transfat
                                    ],
                                    backgroundColor: [
                                        'rgba(255, 99, 132, 0.2)',
                                        'rgba(54, 162, 235, 0.2)',
                                        'rgba(255, 206, 86, 0.2)',
                                        'rgba(75, 192, 192, 0.2)',
                                        'rgba(153, 102, 255, 0.2)',
                                        'rgba(255, 159, 64, 0.2)',
                                        'rgba(100, 200, 129, 0.2)',
                                        'rgba(50, 10, 6, 0.2)',
                                        'rgba(30, 30, 64, 0.2)'
                                    ],
                                    borderColor: [
                                        'rgba(255,99,132,1)',
                                        'rgba(54, 162, 235, 1)',
                                        'rgba(255, 206, 86, 1)',
                                        'rgba(75, 192, 192, 1)',
                                        'rgba(153, 102, 255, 1)',
                                        'rgba(255, 159, 64, 1)',
                                        'rgba(100, 200, 129, 0.2)',
                                        'rgba(50, 10, 6, 0.2)',
                                        'rgba(30, 30, 64, 0.2)'
                                    ]
                                }]
                            }
                        });
                        modal.appendChild(canvas);
                        location.href = '#open-modal';
                    });

                    te.appendChild(title);
                    te.appendChild(maker);
                    te.appendChild(material);
                    te.appendChild(productImg);
                    list.appendChild(te);
                    }});
    }