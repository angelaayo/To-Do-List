import "./style.css";
import { createCard, addProjectUI, cardVisuals, toggleTabUI, removeTask, headNavUI} from "./taskUI.js";
import {projects, addProjectToArray, findProject, retrieveTasks, retrieveAll, retrieveCompleted, retrieveAllCompleted} from "./projects.js";
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
        const checkbox = e.target.closest(".markComplete");
        if(e.target.classList.contains("navBtn") && e.target.id!="projectBtn"){
            toggleTabUI(e);
            loadTabTasks(e);
        }
        if(checkbox && checkbox.checked){
            const clickedTask = e.target.closest(".card");
            const project = findProject(clickedTask.dataset.project);
            console.log(project);
            const cardObject = project.getTaskByID(clickedTask.dataset.id);
            cardObject.toggleComplete();
            removeTask(e);
        }
        if(e.target.classList.contains("navTxt")){
            headNavUI(e);
        }
        if(e.target.classList.contains("completedBtn")){
            renderCompleted();
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

function loadTabTasks(e){
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
        return retrieveAll();
    }
    else{
        return retrieveTasks(e.target.id);
    }
}
function renderCompleted(){
    const completedList = getCompletedTasks();
    const cardList = [];
    completedList.forEach(task =>{
        const newCard = createCard(task);
        newCard.classList.add("markThrough");
        cardList.push(newCard);
    })
    cardVisuals("renderNew", cardList);
}

function getCompletedTasks(){
    const currentTab = document.querySelector(".selectedBtn");
    if(currentTab.id =="Home"){
        console.log(retrieveAllCompleted());
        return retrieveAllCompleted();
    }
    else{
        return retrieveCompleted(currentTab.id);
    }
}