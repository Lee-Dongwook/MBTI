const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const endPoint = 12;
const result = document.querySelector("#result");

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox');
    var answer = document.createElement('button');
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('FadeIn');
    a.appendChild(answer);
    answer.innerHTML = answerText;

    answer.addEventListener("click", function(){
        var children = document.querySelectorAll('.answerList');
        for(let i = 0; i < children.length; i++)
        {
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "FadeOut 0.5s";
            children[i].style.animation = "FadeOut 0.5s";
            
        }
        setTimeout(() => {
            select[qIdx] = idx;
            for(let i = 0; i< children.length; i++)
            {
                children[i].style.display='none';
            }
        }, 450);
        goNext(++qIdx);
    }, false);
}

function calResult(){
    var pointArray = [
        {name: 'mouse', value: 0, key: 0},
        {name: 'cow', value: 0, key: 1},
        {name: 'tiger', value: 0, key: 2},
        {name: 'rabbit', value: 0, key: 3},
        {name: 'dragon', value: 0, key: 4},
        {name: 'snake', value: 0, key: 5},
        {name: 'horse', value: 0, key: 6},
        {name: 'sheep', value: 0, key: 7},
        {name: 'monkey', value: 0, key: 8},
        {name: 'chick', value: 0, key: 9},
        {name: 'dog', value: 0, key: 10},
        {name: 'pig', value: 0, key: 11},
    ]

    for(let i = 0; i< endPoint; i++){
        var target = qnaList[i].a[select[i]];
        for(let j = 0; j<target.type.length; j++){
            for(let k = 0; k<pointArray.length; k++){
                if(target.type[j] === pointArray[k].name){
                    pointArray[k].value += 1;
                }
            }
        }
    }

    var resultArray = pointArray.sort(function(a,b){
        if(a.value > b.value){
            return -1;
        }
        if(a.value < b.value)
        {
            return 1;
        }
        return 0;
    })
    console.log(resultArray);
    let resultword = resultArray[0].key;
    return resultword;

}


function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;
    
    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-'+ point + '.jpg';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.WebkitAnimation = "FadeOut 1s";
    qna.style.animation = "FadeOut 1s";
    setTimeout(() => {
     result.style.WebkitAnimation = "FadeIn 1s";
     result.style.animation = "FadeIn 1s";
     setTimeout(() => {
         qna.style.display = "none";
         result.style.display = "block";
     }, 450)});
    setResult();

    console.log(select);

 }



function goNext(qIdx){
    if(qIdx+1 === endPoint)
    {
        goResult();
        return;
    }
    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
     addAnswer(qnaList[qIdx].a[i].answer, qIdx,i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx + 1) + '%';
}


function begin(){
   main.style.WebkitAnimation = "FadeOut 1s";
   main.style.animation = "FadeOut 1s";
   setTimeout(() => {
    qna.style.WebkitAnimation = "FadeIn 1s";
    qna.style.animation = "FadeIn 1s";
    setTimeout(() => {
        main.style.display = "none";
        qna.style.display = "block";
    }, 450)
    let qIdx = 0;
    goNext(qIdx);
   }, 450);
   
}