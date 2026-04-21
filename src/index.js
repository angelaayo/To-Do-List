import "./style.css";
import { createCard, addProjectUI, cardVisuals} from "./taskUI.js";
import {projects, addProjectToArray, findProject, retrieveTasks, retrieveAll} from "./projects.js";
import { task } from "./task.js";
console.log("Hello world");

function init(){
    addProjectToArray("Gym");
    addProjectUI("Gym");
    document.querySelector(".addBtn").addEventListener("click", handleTaskAdd);
    document.querySelector("#taskPriority").addEventListener("change", (e)=>{handlePriority(e);});
    document.querySelector("#taskProject").addEventListener("change", (e)=>{
        if(e.target.value == "new"){
            document.querySelector("#addProject").classList.remove("hidden");
        }
    })
    document.querySelector("#addProject").addEventListener("submit", (e)=>handleNewProject(e))
    document.querySelector("#taskForm").addEventListener("submit", (e)=>{
        const todoContainer = document.querySelector("#todoContent");
        const newCard = handleSubmit(e);
        const cardList = [];
        cardList.push(newCard);
        cardVisuals("append", cardList);
    });
    document.addEventListener("click", (e)=>{
        if(e.target.classList.contains("navBtn")){
            loadTab(e);
        }
    })
    
}
init();
function handleTaskAdd(){
        document.querySelector("#popUp").classList.remove("hidden");
    }

function handlePriority(e){
    document.querySelectorAll("#taskPriority label").forEach(label =>{
        label.classList.remove("active")
    })
    e.target.closest("label").classList.add("active");
}
function handleSubmit(e){
    e.preventDefault();
    const formData = getFormData();
    if(!formData.priority){
        document.querySelector(".errorMsg").classList.remove("hidden");
        return  
    }
    document.querySelectorAll("#taskPriority label").forEach(label =>{
        label.classList.remove("active")
    })
    document.querySelector(".errorMsg").classList.add("hidden");
    document.querySelector("#popUp").classList.add("hidden");
    e.target.reset();

    return createTask(formData);
}
function getFormData(){
    const title = document.querySelector("#taskTitle").value;
    const priority = document.querySelector('#taskPriority input[type="radio"]:checked')?.value
    const date = document.querySelector("#taskDate").value;
    const projectName = document.querySelector("#taskProject").value;
    const description = document.querySelector("#taskDescription").value;

    return{title, priority, date, projectName, description};
}

function createTask(formData){
    const project = findProject(formData.projectName);
    const newCard = createCard(project.createTask(formData));
    return newCard

}


function handleNewProject(e){
    e.preventDefault();
    const name = document.querySelector("#newProjectInput").value;
    addProjectToArray(name);
    addProjectUI(name);
    document.querySelector("#addProject").classList.add("hidden");
    document.querySelector("#taskProject").value = name;
}

function loadTab(e){
    const taskList = getTasks(e);
        const cardList = [];
        taskList.forEach(task=>{
            const newCard = createCard(task);
            cardList.push(newCard);
        })
        cardVisuals("renderNew", cardList);
}

function getTasks(e){
    if(e.target.id == "Home"){
        const taskRendered = retrieveAll();
        console.log(taskRendered);
        return taskRendered;
    }
    else{
        const taskRendered = retrieveTasks(e.target.id);
        return taskRendered;
    }
}