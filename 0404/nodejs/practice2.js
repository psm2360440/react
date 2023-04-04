//동기식
function taskA(){
        console.log("A끝");
}

taskA();
console.log("코드끝");

//비동기식
function taskA(){
    setTimeout(()=>{
        console.log("A끝");
    },2000);

}

taskA();
console.log("코드끝");


function taskB(a,b, callback){
    setTimeout(()=>{
        let sum = a+b;
        callback(sum);
    },3000);
}

taskB(3,4, (res)=>{
    console.log("A Task Result : ", res);
});
console.log("진짜끝");


function TaskC(a, callback){
    setTimeout(()=>{
        const multi = a * 20;
        callback(multi);
        console.log("콜백함수는 봐도 봐도 모르겠다...", multi);
    },1000);
}
TaskC(3, (multi)=>{
    console.log("뭐가 문제임?", multi);

})
console.log("이게 먼저 찍히니?");

function TaskD(a, callback){
    setTimeout(()=>{
        const res = a * a;
        callback(res);
    },2000);
}
TaskD(7,(res)=>{
    console.log(res, "는 제곱수이다");
})
console.log("아직도 모르겠다...");