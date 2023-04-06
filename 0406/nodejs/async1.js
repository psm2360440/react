async function sigma(limit =10){
    sum=0;
    for(i=1;i<=limit;i++){
        sum+=i;
    }
    return sum; //async에 의해 무조건 promise 객체로 전달됨.
}


//console.log(sigma(100));
sigma(100)
.then((result)=>{
    console.log(result);
});

async function showDisplay(){
    let result = await sigma(10000); //기다린다. 반환값이 프라미스 객체가 아님.
    console.log(result);
}
