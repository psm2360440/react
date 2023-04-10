//routes폴더에 넣을 것 commonUtil.js
function getPaging(pg, totalCnt, pageGroupSize = 10){
                                                //그룹번호
// 1 2 3 4 5 6 7 8 9 10             : 0 ~ 9     1 / 1, 10
// 11 12 13 14 15 16 17 18 19 20    : 10 ~ 19   2 / 11, 20
// 21 22 23 24 25 26 27 28          : 20 ~ 27   3 / 21, 30

// (1-1)/ 10*10            0/10*10 = 0
// (2-1)/ 10*10            1/10*10 = 0
// (3-1)/ 10*10            2/10*10 = 0
// (4-1)/ 10*10            3/10*10 = 0
// (5-1)/ 10*10            4/10*10 = 0
// (6-1)/ 10*10            5/10*10 = 0
// (7-1)/ 10*10            6/10*10 = 0
// (8-1)/ 10*10            7/10*10 = 0
// (9-1)/ 10*10            8/10*10 = 0
// (10-1)/ 10*10            9/10*10 = 0
// (11-1)/ 10*10           10/10*10 = 1 

// 전체페이지 개수, 어느 그룹에 속하는지 확인하여야 한다.

pnTotal = Math.ceil(totalCnt / 10);
//한 페이지당 데이터가 10개일 때, 15건, 2페이지 => 강제 올림

pgGroupStart = parseInt(pg-1)/pageGroupSize * pageGroupSize+1;
pgGroupEnd = pgGroupStart+10;
if(pgGroupEnd>pnTotal)
    pgGroupEnd = pnTotal +1;
console.log( pg, pgGroupStart, pgGroupEnd);

//함수는 반환값이 하나이기에 JSON으로 만들어 보내자
return {pnTotal:pnTotal, pnStart:pgGroupStart, pnEnd:pgGroupEnd, pg:pg}
}

exports.getPaging = getPaging;
// for(i = 1; i <= 32; i++){
//     getPaging(i, 320);
// }
