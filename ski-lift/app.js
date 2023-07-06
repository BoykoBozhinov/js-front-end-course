window.addEventListener('load', solve);

function solve() {

    let ticketInfoEdit = {};

    let allDomInputs = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        numberOfPeople: document.getElementById('people-count'),
        dateFrom: document.getElementById('from-date'),
        daysCount: document.getElementById('days-count')
    }

    let otherDom = {
        nextStepBtn: document.getElementById('next-btn'),
        ticketInfoContainer: document.querySelector('.ticket-info-list'),
        confirmTicketContainer: document.querySelector('.confirm-ticket'),
        mainContainer: document.getElementById('main'),
        bodyContainer: document.getElementById('body')
    }

    otherDom.nextStepBtn.addEventListener('click', nextStepHandler);

    function nextStepHandler(event) {
        if (event) {
            event.preventDefault();
        }

        let allInputsAreCorrect = Object.values(allDomInputs).every((input) => input.value !== '');

        if (!allInputsAreCorrect) {
            return
        }

        let li = createElement('li', otherDom.ticketInfoContainer, '', ['ticket']);
        let article = createElement('article', li);
        createElement('h3', article, `Name: ${allDomInputs.firstName.value} ${allDomInputs.lastName.value}`);
        createElement('p', article, `From date: ${allDomInputs.dateFrom.value}`);
        createElement('p', article, `For ${allDomInputs.daysCount.value} days`);
        createElement('p', article, `For ${allDomInputs.numberOfPeople.value} people`);
        let editBtn = createElement('button', li, 'Edit', ['edit-btn']);
        let continueBtn = createElement('button', li, 'Continue', ['continue-btn']);

        for (let key in allDomInputs) {
            ticketInfoEdit[key] = allDomInputs[key].value;
        }

        otherDom.nextStepBtn.setAttribute('disabled', true);
        Object.values(allDomInputs).forEach((input) => input.value = '');

        editBtn.addEventListener('click', editInfoHandler);
        continueBtn.addEventListener('click', continueTicketInfoHandler);
    }

    function continueTicketInfoHandler() {
        let ticketRef = this.parentNode;

        let editButton = ticketRef.querySelector('.edit-btn');
        let continueButton = ticketRef.querySelector('.continue-btn');
        editButton.remove();
        continueButton.remove();
        
        let confirmBtn = createElement('button', ticketRef, 'Confirm', ['confirm-btn']);
        let cancelBtn = createElement('button', ticketRef, 'Cancel', ['cancel-btn']);

        otherDom.confirmTicketContainer.appendChild(ticketRef);

        cancelBtn.addEventListener('click', cancelTicketHandler);
        confirmBtn.addEventListener('click', confirmTicketHandler);
    }

    function confirmTicketHandler() {
        otherDom.mainContainer.remove();
        createElement('h1', otherDom.bodyContainer, 'Thank you, have a nice day!', null, 'thank-you')
        let backBtn = createElement('button', otherDom.bodyContainer, 'Back', null, 'back-btn');

        backBtn.addEventListener('click', backBtnHandler);
    }

    function backBtnHandler() {
        window.location.reload();
    }

    function cancelTicketHandler() {
        let cancelRef = this.parentNode;

        cancelRef.remove();
        otherDom.nextStepBtn.removeAttribute('disabled');
    }

    function editInfoHandler() {
        let ref = this.parentNode;

        for (let key in ticketInfoEdit) {
            allDomInputs[key].value = ticketInfoEdit[key];
        }
        otherDom.nextStepBtn.removeAttribute('disabled');
        ref.remove();
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