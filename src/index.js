import "./style.css";
import {task} from "./task.js";
import { createCard, addProject} from "./taskUI.js";
import {projects} from "./projects.js";
console.log("Hello world");

function init(){
    let projectArray = [new projects("Gym")];
    projectArray.forEach(content=>{
        addProject(content.name);
    });
    document.querySelector(".addBtn").addEventListener("click", handleTaskAdd);
    document.querySelector("#taskPriority").addEventListener("change", (e)=>{handlePriority(e);});
    
        document.querySelector("#taskForm").addEventListener("submit", (e)=>{
            const todoContainer = document.querySelector("#todoContent");
            const newCard = handleSubmit(e);
            if(newCard){
                todoContainer.insertBefore(newCard, todoContainer.lastElementChild);
            }
        });

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
        
        const newCard = addTask(formData);

        document.querySelectorAll("#taskPriority label").forEach(label =>{
            label.classList.remove("active")
        })
        document.querySelector(".errorMsg").classList.add("hidden");
        document.querySelector("#popUp").classList.add("hidden");
        e.target.reset();

        return newCard;
    }

    function addTask(formData){
        const newTask = new task(formData.title, formData.description, formData.date, formData.priority, formData.project);
        return createCard(newTask);
    }
    function getFormData(){
        const title = document.querySelector("#taskTitle").value;
        const priority = document.querySelector('#taskPriority input[type="radio"]:checked')?.value
        const date = document.querySelector("#taskDate").value;
        const project = document.querySelector("#taskProject").value;
        if(project.value == "new"){
            //newProject();
        }
        const description = document.querySelector("#taskDescription").value;

        return{title, priority, date, project, description};
    }

    
}
init();