window.addEventListener('load', solve);

function solve() {

    let allDomInputs = {
        productType: document.getElementById('type-product'),
        problemDescription: document.getElementById('description'),
        clientName: document.getElementById('client-name'),
        clientPhone: document.getElementById('client-phone')
    }

    let otherDom = {
        sendBtn: document.getElementsByTagName('button')[0],
        clearBtn: document.querySelector('.clear-btn'),
        recievedOrders: document.getElementById('received-orders'),
        completedOrders: document.getElementById('completed-orders')
    }

    otherDom.sendBtn.addEventListener('click', sendFormHandler);
    otherDom.clearBtn.addEventListener('click', clearInfoHandler);

    function clearInfoHandler(event) {
        if (event) {
            event.preventDefault();
        }

        let ref = this.parentNode;
        let child = Array.from(ref.children);
        
        for (let el of child) {
            if (el.className === 'container') {
                el.remove();
            }
        }

    }

    function sendFormHandler(event) {
        if (event) {
            event.preventDefault();
        }
        const { productType, problemDescription, clientName, clientPhone } = allDomInputs;
        let allInputsAreCorrect = Object.values(allDomInputs).every((input) => input.value !== '');

        if (!allInputsAreCorrect) {
            return
        }

        let div = createElement('div', otherDom.recievedOrders, '', ['container']);
        createElement('h2', div, `Product type for repair: ${productType.value}`);
        createElement('h3', div, `Client information: ${clientName.value}, ${clientPhone.value}`);
        createElement('h4', div, `Description of the problem: ${problemDescription.value}`);
        let startBtn = createElement('button', div, 'Start repair', ['start-btn']);
        let finishBtn = createElement('button', div, 'Finish repair', ['finish-btn']);

        finishBtn.disabled = true;
        Object.values(allDomInputs).forEach((input) => input.value = '');

        startBtn.addEventListener('click', startRepairHandler);
    }

    function startRepairHandler() {
        let ref = this.parentNode;
        let startBtn = ref.querySelector('.start-btn');
        let finishBtn = ref.querySelector('.finish-btn');

        startBtn.disabled = true;
        finishBtn.disabled = false;

        finishBtn.addEventListener('click', finishReparingHandler);
    }

    function finishReparingHandler() {
        let ref = this.parentNode;
        ref.querySelector('.start-btn').remove();
        ref.querySelector('.finish-btn').remove();

        otherDom.completedOrders.appendChild(ref);
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