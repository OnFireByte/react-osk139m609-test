import React, { useEffect, useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Card from "./components/Card";
import datas from "./data/data.json";
import Find from "./components/Find";

function App() {
    const [find, setFind] = useState("");

    const filteredDatas = datas.filter((data) => {
        let number = data.number.toString();
        let numberID = data.studentID.toString();
        let name = data.name.toLowerCase();
        let sirname = data.sirname.toLowerCase();
        let university = data.university.toLowerCase();
        let faculty = data.faculty.toLowerCase();
        let keywords = data.keywords?.split(" ").map((keyword) => keyword.toLowerCase());

        let result = true;
        let finds = find.split(" ");
        for (let i = 0; i < finds.length; i++) {
            if (
                number.includes(finds[i]) ||
                numberID.includes(finds[i]) ||
                name.includes(finds[i]) ||
                sirname.includes(finds[i]) ||
                university.includes(finds[i]) ||
                faculty.includes(finds[i]) ||
                keywords?.some((keyword) => keyword.includes(finds[i].toLowerCase()))
            ) {
            } else {
                result = false;
            }
        }
        return result;
    });

    const cardElements = filteredDatas.map((data, index) => {
        return <Card key={data.number} data={data} />;
    });

    let finds = find.split(" ");
    for (let i = 0; i < finds.length; i++) {
        console.log(finds[i]);
    }

    return (
        <div className="App">
            <AppHeader />
            <div className="main">
                <Find value={find} onValueChange={setFind} />
                <div className="main-list">{cardElements}</div>
            </div>
        </div>
    );
}

export default App;
