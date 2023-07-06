window.addEventListener('load', solve);

function solve() {
  
    let copy = {};
    let tasksCount = 0;
    let totalPoints = 0;

    let icons = {
        'Feature': '&#8865',
        'Low Priority Bug': '&#9737',
        'High Priority Bug': '&#9888'
    }

    let priorities = {
        'Feature': 'feature',
        'Low Priority Bug': 'low-priority',
        'High Priority Bug': 'high-priority'
    }

    let allDomInputs = {
        title: document.getElementById('title'),
        description: document.getElementById('description'),
        label: document.getElementById('label'),
        estimationsPoints: document.getElementById('points'),
        asignee: document.getElementById('assignee')
    }

    let otherDom = {
        createTaskBtn: document.getElementById('create-task-btn'),
        deleteTaskBtn: document.getElementById('delete-task-btn'),
        taskSection: document.getElementById('tasks-section'),
        totalPointsDiv: document.getElementById('total-sprint-points'),
        task: document.getElementById('task-id')
    }

    otherDom.createTaskBtn.addEventListener('click', createTaskHandler);
    otherDom.deleteTaskBtn.addEventListener('click', deleteTaskHandler);

    function deleteTaskHandler() {
        let task = Array.from(document.querySelectorAll('.task-card'));
        let findTask = task.find((taskId) => taskId.id === otherDom.task.id);
        let currentTask = Array.from(findTask.children);
        console.log(currentTask);
        
        for (let key in allDomInputs) {
            allDomInputs[key].value = '';
            allDomInputs[key].disabled = false;
        }

        otherDom.createTaskBtn.disabled = false;
        otherDom.deleteTaskBtn.disabled = true;
        let pointsElement = currentTask[3].textContent.split(' ');
        let currentPoints = Number(pointsElement[2]);
        totalPoints -= currentPoints;
        otherDom.totalPointsDiv.textContent = `Total Points ${totalPoints}pts`
        findTask.remove();
    }

    function createTaskHandler() {
        const {title, description, label, estimationsPoints, asignee} = allDomInputs;

        let allInputsAreCorrect = Object.values(allDomInputs).every((input) => input !== '');

        if (!allInputsAreCorrect) {
            return;
        }

        tasksCount++;

        let article = createElement('article', otherDom.taskSection, '', ['task-card'], `task-${tasksCount}`);
        createElement('div', article, `${label.value} ${icons[label.value]}`, ['task-card-label', `${priorities[label.value]}`], '', null, `${label.value} ${icons[label.value]}`);
        createElement('h3', article, `${title.value}`, ['task-card-title']);
        createElement('p', article, `${description.value}`, ['task-card-description']);
        createElement('div', article, `Estimated at ${estimationsPoints.value} pts`, ['task-card-points']);
        createElement('div', article, `Assigned to: ${asignee.value}`, ['task-card-asignee']);
        let btnContainer = createElement('div', article, '', ['task-card-actions']);
        let deleteBtn = createElement('button', btnContainer, 'Delete');
        otherDom.task.id = article.id;
        totalPoints += Number(estimationsPoints.value);
        otherDom.totalPointsDiv.textContent = `Total Points ${totalPoints}pts`

        for (let key in allDomInputs) {
            copy[key] = allDomInputs[key].value;
        }

        Object.values(allDomInputs).forEach((input) => input.value = '');

        deleteBtn.addEventListener('click', loadDeleteFormHandler);
    }

    function loadDeleteFormHandler() {
      let id = this.parentNode.parentNode.id;
      otherDom.task.id = id;

      let task = this.parentNode.parentNode;
        let label = task.children[0].textContent;
        if (label.includes('Feature')) {
            allDomInputs.label.value = 'Feature';
 
        } else if (label.includes('Low')) {
            allDomInputs.label.value = "Low Priority Bug";
        } else if (label.includes('High')) {
          allDomInputs.label.value = "High Priority Bug";
        }
 
        let title = task.children[1].textContent;
        let description = task.children[2].textContent;
        let points = task.children[3].textContent.split(' ')[2];
        let assignee = task.children[4].textContent.split(': ')[1];

        allDomInputs.title.value = title;
        allDomInputs.description.value = description;
        allDomInputs.estimationsPoints.value = points;
        allDomInputs.asignee.value = assignee;

        for (let key in allDomInputs) {
          allDomInputs[key].disabled = true;
      }
        otherDom.deleteTaskBtn.disabled = false;
        otherDom.createTaskBtn.disabled = true;
    }

    function createElement(type, parentNode, content, classes, id, attributes, innerHtml) {

        let htmlElement = document.createElement(type);
    
        if (content && innerHtml) {
          htmlElement.innerHTML = content;
        } else {
    
          if (content && type !== 'input') {
            htmlElement.textContent = content;
          }
    
          if (content && type === 'input') {
            htmlElement.value = content;
          }
    
        }
    
        if (classes && classes.length > 0) {
          htmlElement.classList.add(...classes);
        }
    
        if (id) {
          htmlElement.id = id;
        }
    
        if (attributes) {
          for (key in attributes) {
            htmlElement[key] = attributes[key];
          }
        }
    
        if (parentNode) {
          parentNode.appendChild(htmlElement);
        }
    
        return htmlElement;
      }
}