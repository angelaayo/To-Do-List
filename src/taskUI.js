export function createCard(task){
    const card = document.createElement("div");
    card.className = "card";

    const overview = elementCreate("div","overview", "");
    const interactive = elementCreate("div","interactive", "");
    const overviewHeader = elementCreate("div", "overviewHeader", "");
    const classification = elementCreate("div","classification","");

    interactive.append(elementCreate("svg", "dotsBtn","imgsrc"), elementCreate("div", "markComplete", ""));
    overviewHeader.append(elementCreate("div", task.priority, task.priority), elementCreate("div", "title", task.title))
    overview.append(elementCreate(overviewHeader, interactive));
    classification.append(elementCreate("div", "dueDate", task.dueDate), elementCreate("div", "projectGroup", task.project));


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
    else if(type == "svg"){
        const element = document.createElement("svg");
        element.className = className;
        element.src = content;
        return element;
    }
}