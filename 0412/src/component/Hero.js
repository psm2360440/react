import React, {useState} from "react";

function Hero(props){
    const [HeroList, setHeroList] = useState(

        [{id: 1, name: "박선미", descr: "건강함"},
         {id: 2, name: "김진희", descr: "쾌활함"},
         {id: 3, name: "이성영", descr: "뻔뻔함"},
         {id: 4, name: "문대호", descr: "멋짐"},
         {id: 5, name: "허명현", descr: "멋짐2"}
        ]
        
    );
    const [Hero, setHero] = useState({name: "", descr: ""});

    const nameChange = (e) => {
        let h = Hero; //기존값 받기
        h.id = 9;
        h.name = e.target.value; //새로 바꾼다
        setHero(h);
    }

    const descrChange = (e) => {
        let h = Hero;
        h.descr = e.target.value
        setHero(h)
        // setHero({descr: e.target.value})
    }

    const goAppend = () =>{
        // setHero({id: 7});
        setHeroList( HeroList.concat( Hero ));
        setHero({name: "", descr: ""});
        

    } 


    return(
        <div>
            
            이름 : <input type = "text" onChange = {nameChange}></input><br/>
            특징 : <input type = "text" onChange = {descrChange}></input><br/>
            <button type = "button" onClick = {goAppend}>Add</button>
            <br/><br/>
            <table>
                {
                    HeroList.map( (Hero, index)=>{
                        return(
                            <tr key = {index}>
                                <td>{Hero.id}</td>
                                <td>{Hero.name}</td>
                                <td>{Hero.descr}</td>
                            </tr>
                        )
                    })
                }
            </table>
        </div>
    )
}

export default Hero;