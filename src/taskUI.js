export function createCard(title, description, dueDate, priority, project){
    const card = document.createElement("div");
    card.className = "card";

    const overview = divCreate("div","overview", "");
    const interactive = divCreate("div","interactive", "");
    const classification = divCreate("div","classification","");

    interactive.append(divCreate("svg", "dotsBtn","imgsrc"), divCreate("div", "markComplete", ""));
    overview.append(divCreate("div", "priority", priority), divCreate("div", "title", title), interactive);
    classification.append(divCreate("div", "dueDate", dueDate), divCreate("div", "projectGroup", project));


    card.append(overview, classification, divCreate("div","taskDescriptor", description));

    return card;
}
function elementCreate(type, className, content){
    if(type == "div"){
        const element = document.createElement("div");
        element.className = className;
        element.textContent = content;
        return element
    }
    else if(type == "svg"){
        const element = document.createElement("svg");
        element.className = className;
        element.src = content;
        return element;
    }
}