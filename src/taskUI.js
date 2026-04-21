import menuDots from "./dots-horizontal.svg";
export function createCard(task){
    const card = document.createElement("div");
    card.className = "card";

    const overview = elementCreate("div","overview", "");
    const interactive = elementCreate("div","interactive", "");
    const overviewHeader = elementCreate("div", "overviewHeader", "");
    const classification = elementCreate("div","classification","");

    interactive.append(elementCreate("img", "dotsBtn", menuDots), elementCreate("input", "markComplete", ""));
    overviewHeader.append(elementCreate("div", task.priority, task.priority), elementCreate("div", "title", task.title))
    overview.append(overviewHeader, interactive);
    classification.append(elementCreate("div", "dueDate", "Due: "+task.dueDate), elementCreate("div", "projectGroup", task.projectName));


    card.append(overview, classification, elementCreate("div","taskDescriptor", task.description));

    card.dataset.id = task.id;
    card.dataset.project = task.projectName;
    return card;
}
function elementCreate(type, className, content){
    if(type == "div"){
        const element = document.createElement("div");
        element.className = className;
        element.textContent = content;
        return element
    }
    else if(type == "img"){
        const element = document.createElement("img");
        element.className = className;
        element.src = content;
        return element;
    }
    else if(type == "input"){
        const element = document.createElement("input");
        element.type = "checkbox";
        element.className = className;
        return element;
    }
    
}

export function addProjectUI(projectName){
    const projectOptions = document.querySelector("#taskProject");
    const projectheader = document.querySelector("#projectBtn");
    
    const optionElement = Object.assign(document.createElement("option"), {
        value: projectName,
        textContent: projectName
    });
    
    const tabElement = Object.assign(document.createElement("li"), {
        textContent: projectName,
        value: projectName,
        id: projectName
    });
    tabElement.classList.add("projectOption", "navBtn")
    projectOptions.append(optionElement);
    projectheader.append(tabElement);
}

export function cardVisuals(style, cardList){
    const todoContainer = document.querySelector("#todoContent");
    if(style == "renderNew"){
        todoContainer.innerHTML ="";
    }
    cardList.forEach(taskCard=>{
        todoContainer.appendChild(taskCard);
    })
}

export function toggleTabUI(e){
    const elements = document.querySelectorAll(".navBtn");
    elements.forEach(element =>{
        element.classList.remove("selectedBtn");
    })

    e.target.classList.add("selectedBtn");
}

export function removeTask(e){
    const taskCard = e.target.closest(".card");
    taskCard.classList.add("fadeOut");
    taskCard.addEventListener("transitioned", ()=>{
        taskCard.remove();
    }, {once: true})
}

export function headNavUI(e){
    const elements = document.querySelectorAll(".navTxt");
    elements.forEach(element =>{
        element.classList.remove("selectedTxt");
    })

    e.target.classList.add("selectedTxt");
}
