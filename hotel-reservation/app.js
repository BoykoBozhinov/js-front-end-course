window.addEventListener('load', solve);

function solve() {

    const reservationState = {
        firstName: null,
        lastName: null,
        dateIn: null,
        dateOut: null,
        peopleCount: null
    }

    const allInputFields = {
        firstName: document.getElementById('first-name'),
        lastName: document.getElementById('last-name'),
        dateIn: document.getElementById('date-in'),
        dateOut: document.getElementById('date-out'),
        peopleCount: document.getElementById('people-count')
    }

    let nextBtn = document.getElementById('next-btn');
    let infoList = document.querySelector('.info-list');
    let form = document.getElementsByTagName('form')[0];
    let confirmList = document.querySelector('.confirm-list');
    let verification = document.getElementById('verification');

    nextBtn.addEventListener('click', nextStepHandler);

    function nextStepHandler(event) {

        if (event) {
            event.preventDefault();
        }

        const allFormsInput = Object.values(allInputFields).every((input) => input.value !== '');
        
        if (!allFormsInput) {
            return;
        }
        const { firstName, lastName, dateIn, dateOut, peopleCount } = allInputFields;

        let listItem = createElement('li', infoList, '', ['reservation-content']);
        let article = createElement('article', listItem);
        createElement('h3', article, `Name: ${firstName.value} ${lastName.value}`);
        createElement('p', article, `From date: ${dateIn.value}`);
        createElement('p', article, `To date: ${dateOut.value}`);
        createElement('p', article, `For ${peopleCount.value} people`);
        const editBtn = createElement('button', listItem, 'Edit', ['edit-btn']);
        const continueBtn = createElement('button', listItem, 'Continue', ['continue-btn']);

        for (let key in allInputFields) {
            reservationState[key] = allInputFields[key].value;
        }
        console.log(reservationState);

        form.reset();
        nextBtn.disabled = true;

        editBtn.addEventListener('click', editFormHandler);
        continueBtn.addEventListener('click', continueReservationHandler);

    }

    function continueReservationHandler() {
        const ref = this.parentNode;

        const editBtn = ref.querySelector('.edit-btn');
        const continueBtn = ref.querySelector('.continue-btn');

        editBtn.remove();
        continueBtn.remove();

        const confirmBtn = createElement('button', ref, 'Confirm', ['confirm-btn']);
        const cancelBtn = createElement('button', ref, 'Cancle', ['cancel-btn']);

        confirmList.appendChild(ref);

        confirmBtn.addEventListener('click', confirmReservationHandler);
        cancelBtn.addEventListener('click', cancledReservationHandler);
    }

    function cancledReservationHandler() {
        const cancledRef = this.parentNode;
        cancledRef.remove();
        nextBtn.disabled = false;

        verification.textContent = 'Cancelled.'
        verification.className = 'reservation-cancelled';
    }

    function confirmReservationHandler() {
        const confirmRef = this.parentNode;
        confirmRef.remove();
        nextBtn.disabled = false;

        verification.textContent = 'Confirmed.';
        verification.className = 'reservation-confirmed';
    }

    function editFormHandler() {
        const li = this.parentNode;
        for (let key in reservationState) {
            allInputFields[key].value = reservationState[key];
        }

        li.remove();
        nextBtn.removeAttribute('disabled');
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





