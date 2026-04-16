import "./style.css";
import {task} from "./task.js";
import { createCard } from "./taskUI.js";
console.log("Hello world");

function init(){
    document.querySelector(".addBtn").addEventListener("click", handleTaskAdd);

    function handleTaskAdd(){
        document.querySelector("#popUp").classList.remove("hidden");
        document.querySelector("#taskPriority").addEventListener("change", (e)=>{handlePriority(e);});
        document.querySelector("#taskForm").addEventListener("submit", (e)=>{handleSubmit(e);});
    }

    function handlePriority(e){
        document.querySelectorAll("#taskPriority label").forEach(label =>{
            label.classList.remove("active")
        })
        e.target.closest("label").classList.add("active");
        return e.target.closest("label").value;  //probably need to delete
    }
    function handleSubmit(e){
        e.preventDefault();
        const todoContainer = document.querySelector("#todoContent");
        const formData = getFormData();
        if(!formData){

            
        }
        console.log(formData);
        const newCard = addTask(formData);
        todoContainer.insertBefore(newCard, todoContainer.lastChild);


        document.querySelector("#popUp").classList.add("hidden");
        e.target.reset();

    }

    function addTask(formData){
        const newTask = new task(formData.title, formData.description, formData.date, formData.priority, formData.project);
        return createCard(newTask);
    }
    function getFormData(){
        const title = document.querySelector("#taskTitle").value;
        const priority = document.querySelector('#taskPriority input[type="radio"]:checked')?.value
        if(!priority){
            document.querySelector(".errorMsg").classList.remove("hidden");
            return
        }
        const date = document.querySelector("#taskDate").value;
        const project = document.querySelector("#taskProject").value;
        const description = document.querySelector("#taskDescription").value;

        return{title, priority, date, project, description};
    }
}
init();