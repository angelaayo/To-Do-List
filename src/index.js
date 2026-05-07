import "./style.css";
import { createCard, addProjectUI, cardVisuals, toggleTabUI, removeTask, headNavUI} from "./taskUI.js";
import {projects, addProjectToArray, findProject, retrieveTasks, retrieveAll, retrieveCompleted, retrieveAllCompleted} from "./projects.js";
import { task } from "./task.js";

function init(){
   defaultCard();

    document.querySelector(".addBtn").addEventListener("click", handleTaskAdd);
    document.querySelector("#taskPriority").addEventListener("change", (e)=>{handlePriority(e);});
    document.querySelector("#taskProject").addEventListener("change", (e)=>{
        if(e.target.value == "new"){
            document.querySelector("#projectOverlay").classList.remove("hidden");
        }
    })
    document.querySelector("#addProject").addEventListener("submit", (e)=>handleNewProject(e))
    document.querySelector("#formCancelBtn").addEventListener("click", ()=>{
        document.querySelector("#overlay").classList.add("hidden");
    })
    document.querySelector("#taskForm").addEventListener("submit", (e)=>{
        const todoContainer = document.querySelector("#todoContent");
        const currentTab = document.querySelector(".selectedBtn");
        const currentHeader = document.querySelector(".selectedTxt");
        const newCard = handleSubmit(e);
        if(newCard){
            const projectName = newCard.dataset.project;
            if((currentTab.id =="Home" || currentTab.id == projectName) 
            &&(currentHeader.id != "completed")){
                const cardList = [];
                cardList.push(newCard);
                cardVisuals("append", cardList);
            }
        }


    });
    document.addEventListener("click", (e)=>{
        const checkbox = e.target.closest(".markComplete");
        const currentHeader = document.querySelector(".selectedTxt");
        if(e.target.classList.contains("navBtn") && e.target.id!="projectBtn"){
            toggleTabUI(e);
            loadTabTasks(e);
            document.querySelector("#contentHeader").textContent = e.target.id;

            const defaultHeader = document.querySelector("#taskBtn");
            headNavUI(defaultHeader);
        }
        if(checkbox && 
            ((checkbox.checked && currentHeader.id == "taskBtn")
                    || (!checkbox.checked && currentHeader.id == "completed"))){
            const clickedTask = e.target.closest(".card");
            const project = findProject(clickedTask.dataset.project);
            console.log(project);
            const cardObject = project.getTaskByID(clickedTask.dataset.id);
            cardObject.toggleComplete();
            removeTask(e);
        }
        if(e.target.classList.contains("navTxt")){
            headNavUI(e);
            navExecution(e);
        }
    })
    
}
init();
function handleTaskAdd(){
        document.querySelector("#overlay").classList.remove("hidden");
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
    if(formData.projectName =="" || formData.projectName == "new"){
        document.querySelector(".projectErrorMsg").classList.remove("hidden");
        return;
    }
    document.querySelectorAll("#taskPriority label").forEach(label =>{
        label.classList.remove("active")
    })
    document.querySelector(".errorMsg").classList.add("hidden");
    document.querySelector("#overlay").classList.add("hidden");
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
    console.log(formData);
    const newCard = createCard(project.createTask(formData));
    return newCard

}


function handleNewProject(e){
    e.preventDefault();
    const name = document.querySelector("#newProjectInput").value;
    addProjectToArray(name);
    addProjectUI(name);
    document.querySelector("#projectOverlay").classList.add("hidden");
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
    const selectedTab = document.querySelector(".navBtn.selectedBtn");
    console.log(selectedTab.id);
    if(selectedTab.id == "Home"){
        return retrieveAll();
    }
    else{
        return retrieveTasks(selectedTab.id);
    }
}
function renderCompleted(){
    const completedList = getCompletedTasks();
    console.log(completedList);
    const cardList = [];
    completedList.forEach(task =>{
        const newCard = createCard(task);
        const checkbox = newCard.querySelector(".markComplete");
        if(checkbox){
            checkbox.checked = true;
        }
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


function defaultCard(){
    addProjectToArray("Work");
    addProjectUI("Work");
    const formData = {
        title: "Design Landing Page",
        priority: "High",
        date: "Apr 29 2026",
        projectName: "Work",
        description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequuntur eius asperiores voluptatem assumenda porro pariatur unde libero eum, nesciunt dicta totam cupiditate animi deleniti temporibus ipsam iste laboriosam quisquam maiores."
    }
    const newCard = createTask(formData);
    const cardList = [];
    cardList.push(newCard);
    cardVisuals("append", cardList);
}

function navExecution(e){
    if(e.target.classList.contains("completedBtn")){
        renderCompleted();
    }
    else{
        loadTabTasks(e);
    }
}
