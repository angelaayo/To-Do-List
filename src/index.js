import "./style.css";
import {task} from "./task.js";
console.log("Hello world");

function init(){
    document.querySelector(".addBtn").addEventListener("click", handleTaskAdd);

    function handleTaskAdd(){
        document.querySelector("#popUp").classList.add("show");

    }
}
init();