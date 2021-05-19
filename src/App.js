import React, { useState } from "react";
import "./App.css";
import AppHeader from "./components/AppHeader";
import Card from "./components/Card";
import datas from "./data/data.json";
import ModalPost from "./components/ModalPost";
import { AnimatePresence } from "framer-motion";

function App() {
    const [modal, setModal] = useState(false);

    const onCardOpenClick = (theCard) => {
        setModal(theCard);
    };

    const [find, setFind] = useState("");
    const filteredDatas = datas.filter((data) => {
        let number = data.number.toString();
        let numberID = data.studentID.toString();
        let name = data.name.toLowerCase();
        let sirname = data.sirname.toLowerCase();
        let university = data.university.toLowerCase();
        let faculty = data.faculty.toLowerCase();
        let course = data.course.toLowerCase();
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
                course.includes(finds[i]) ||
                keywords?.some((keyword) => keyword.includes(finds[i].toLowerCase()))
            ) {
            } else {
                result = false;
            }
        }
        return result;
    });

    const cardElements = filteredDatas.map((data) => (
        <Card key={data.number} data={data} onCardClick={onCardOpenClick} />
    ));

    const CheckCardElement = () => {
        if (filteredDatas.length === 0) {
            return (
                <div className="text-6xl text-gray-800 transition-all h-screen w-full flex items-center justify-center">
                    Nothing found, Sorry.
                </div>
            );
        }
        return (
            <div className="main-list min-h-screen pt-24 pb-3 transition-all ">{cardElements}</div>
        );
    };

    return (
        <div className="App bg-pink-100 bg-gradient-to-b from-blue-200 min-h-screen">
            <AnimatePresence>
                {modal && <ModalPost data={modal} onBgClick={onCardOpenClick} />}
            </AnimatePresence>

            <AppHeader findValue={find} onFindValueChange={setFind} />
            <div className="main">
                <CheckCardElement />
            </div>
        </div>
    );
}

export default App;
