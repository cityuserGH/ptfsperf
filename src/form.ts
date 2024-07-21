type FormInformation = {
    submitText: string;
    callback: (answers: { [id: number]: string }) => void;
    questions: FormQuestion[];
};

type FormQuestion = {
    id: number;
    question: string;
    required: boolean;
    default: string;
    dependsOn?: number;
    options?: { value: string; text: string }[];
    optionCallback?: (value: string) => { value: string; text: string }[];
};

const values: { [form: string]: { [id: number]: string } } = {};

// based on frontendmasters.com/blog/vanilla-javascript-reactivity
const eventHandler: {
    events: { [form: string]: { [key: number]: ((value: string) => void)[] } };
    subscribe: (
        form: string,
        id: number,
        callback: (value: string) => void
    ) => void;
    publish: (form: string, id: number, value: string) => void;
} = {
    events: {},
    subscribe(form, id, callback) {
        if (!this.events[form]) {
            this.events[form] = {};
        }
        if (!this.events[form][id]) {
            this.events[form][id] = [];
        }
        this.events[form][id].push(callback);
    },
    publish(form, id, value) {
        values[form][id] = value;
        if (!this.events[form]) {
            this.events[form] = {};
        }
        const callbacks = this.events[form][id];
        callbacks?.forEach((callback) => callback(value));
    },
};

function mapToRow(formName: string, questionData: FormQuestion) {
    function addOptions(list: { value: string; text: string }[]) {
        list.forEach(({ value, text }) => {
            const option = optionElement(value, text);
            select.appendChild(option);
        });
    }

    function optionElement(value: string, text: string) {
        const option = document.createElement("option");
        option.text = text;
        option.value = value;
        return option;
    }

    function clearValidOptions() {
        select.value = "";
        select.dispatchEvent(new Event("input")); // pretend user changed the value (they did)
        for (let index = select.length - 1; index >= 0; index--) {
            if (select.options[index].value) {
                select.remove(index);
            }
        }
    }

    const q_td = document.createElement("td");
    if (questionData.required) {
        q_td.className = "required";
    }
    q_td.innerText = questionData.question + ":";

    const a_td = document.createElement("td");
    const select = document.createElement("select");
    a_td.appendChild(select);

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = questionData.default;
    select.appendChild(defaultOption);

    if (questionData.dependsOn !== undefined) {
        select.disabled = true;
        eventHandler.subscribe(
            formName,
            questionData.dependsOn,
            (value: string) => {
                // remove options
                clearValidOptions();

                // load and add options
                const optionsData = questionData.optionCallback?.(value);
                if (optionsData?.length) {
                    select.disabled = false;
                    addOptions(optionsData);
                } else {
                    select.disabled = true;
                }
            }
        );
    } else {
        const options = questionData.options;
        if (options) {
            addOptions(options);
        }
    }

    // initial (empty) value
    eventHandler.publish(formName, questionData.id, "");

    // listen for changes
    select.addEventListener("input", () => {
        eventHandler.publish(formName, questionData.id, select.value);
    });

    const tr = document.createElement("tr");
    tr.appendChild(q_td);
    tr.appendChild(a_td);
    return tr;
}

function createForm(
    name: string,
    elementId: string,
    formData: FormInformation
) {
    values[name] = {};

    const container = document.querySelector("#" + elementId);
    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    formData.questions
        .map((data) => {
            return mapToRow(name, data);
        })
        .forEach((row) => {
            tbody.appendChild(row);
        });

    const submitRow = document.createElement("tr");

    const q_td = document.createElement("td");
    submitRow.appendChild(q_td);

    const a_td = document.createElement("td");

    const submitButton = document.createElement("button");
    submitButton.innerText = formData.submitText;
    submitButton.addEventListener("click", () => {
        formData.callback(values[name]);
    });
    submitButton.disabled = true;
    formData.questions
        .filter((question) => question.required)
        .map((question) => question.id)
        .forEach((id, _, ids) => {
            // on every change of a required value
            eventHandler.subscribe(name, id, () => {
                // enable if all required values truthy
                submitButton.disabled = !ids
                    .map((num) => values[name][num])
                    .every(Boolean);
            });
        });

    a_td.appendChild(submitButton);

    submitRow.appendChild(a_td);

    tbody.appendChild(submitRow);
    table.appendChild(tbody);
    container?.appendChild(table);
}

function getValues(form: string) {
    return values[form];
}

function getValueById(form: string, id: number) {
    return values[form][id];
}

export { createForm };
