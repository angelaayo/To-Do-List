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
    classification.append(elementCreate("div", "dueDate", "Due: "+task.dueDate), elementCreate("div", "projectGroup", task.project));


    card.append(overview, classification, elementCreate("div","taskDescriptor", task.description));

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

export function addProject(projectTitle){
    const projectOptions = document.querySelector("#taskproject");
    const element  = document.createElement("option");
    element.value = projectTitle;
    element.textContent = projectTitle
    projectOptions.append(element);
}