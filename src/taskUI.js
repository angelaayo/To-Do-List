export function createCard(title, priority, dueDate, project, description){
    const card = document.createElement("div");
    card.className = "card";

    const overview = elementCreate("div","overview", "");
    const interactive = elementCreate("div","interactive", "");
    const overviewHeader = elementCreate("div", "overviewHeader", "");
    const classification = elementCreate("div","classification","");

    interactive.append(elementCreate("svg", "dotsBtn","imgsrc"), elementCreate("div", "markComplete", ""));
    overviewHeader.append(elementCreate("div", "priority", priority), elementCreate("div", "title", title))
    overview.append(elementCreate(overviewHeader, interactive));
    classification.append(elementCreate("div", "dueDate", dueDate), elementCreate("div", "projectGroup", project));


    card.append(overview, classification, elementCreate("div","taskDescriptor", description));

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