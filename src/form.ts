import { FormQuestion, FormInformation } from "./types";

const values: { [form: string]: { [id: number]: string } } = {};

type ExtendedFormQuestion = FormQuestion & {
    type?: "select" | "number";
    min?: number;
    max?: number;
    step?: number;
};

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
        if (!this.events[form]) this.events[form] = {};
        if (!this.events[form][id]) this.events[form][id] = [];
        this.events[form][id].push(callback);
    },
    publish(form, id, value) {
        values[form][id] = value;
        if (!this.events[form]) this.events[form] = {};
        const callbacks = this.events[form][id];
        callbacks?.forEach((callback) => callback(value));
    },
};

function mapToRow(formName: string, questionData: FormQuestion) {
    const field = questionData as ExtendedFormQuestion;
    const q_td = document.createElement("td");
    if (questionData.required) q_td.className = "required";
    q_td.innerText = questionData.question + ":";

    const a_td = document.createElement("td");
    const isNumberInput = field.type === "number";

    if (isNumberInput) {
        const input = document.createElement("input");
        input.type = "number";
        input.value = questionData.default || "0";
        input.min = field.min?.toString() ?? "";
        input.max = field.max?.toString() ?? "";
        input.step = field.step?.toString() ?? "1";
        input.setAttribute("aria-label", questionData.question);
        input.addEventListener("input", () => {
            eventHandler.publish(formName, questionData.id, input.value);
        });
        a_td.appendChild(input);

        // Number inputs need to publish their default values, rather than an empty string.
        eventHandler.publish(formName, questionData.id, input.value);
    } else {
        const select = document.createElement("select");
        a_td.appendChild(select);

        function addOptions(list: { value: string; text: string }[]) {
            list.forEach(({ value, text }) => {
                const option = document.createElement("option");
                option.text = text;
                option.value = value;
                select.appendChild(option);
            });
        }

        function clearValidOptions() {
            select.value = "";
            select.dispatchEvent(new Event("input"));
            for (let index = select.length - 1; index >= 0; index--) {
                if (select.options[index].value) select.remove(index);
            }
        }

        const defaultOption = document.createElement("option");
        defaultOption.value = "";
        defaultOption.innerText = questionData.default;
        select.appendChild(defaultOption);

        if (questionData.dependsOn !== undefined) {
            select.disabled = true;
            questionData.dependsOn.forEach((dependency) => {
                eventHandler.subscribe(formName, dependency, () => {
                    clearValidOptions();
                    const data = questionData.dependsOn?.map(
                        (index) => values[formName][index]
                    );
                    if (data) {
                        const optionsData = questionData.optionCallback?.(data);
                        if (optionsData?.length) {
                            select.disabled = false;
                            addOptions(optionsData);
                        } else {
                            select.disabled = true;
                        }
                    }
                });
            });
        } else if (questionData.options) {
            addOptions(questionData.options);
        }

        eventHandler.publish(formName, questionData.id, "");
        select.addEventListener("input", () => {
            eventHandler.publish(formName, questionData.id, select.value);
        });
    }

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
    if (!container) return;

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    formData.questions
        .map((data) => mapToRow(name, data))
        .forEach((row) => tbody.appendChild(row));

    const submitRow = document.createElement("tr");
    submitRow.appendChild(document.createElement("td"));
    const a_td = document.createElement("td");

    const submitButton = document.createElement("button");
    submitButton.innerText = formData.submitText;
    submitButton.addEventListener("click", () => formData.callback(values[name]));
    submitButton.disabled = true;

    const requiredIds = formData.questions
        .filter((question) => question.required)
        .map((question) => question.id);

    requiredIds.forEach((id) => {
        eventHandler.subscribe(name, id, () => {
            submitButton.disabled = !requiredIds
                .map((requiredId) => values[name][requiredId])
                .every(Boolean);
        });
    });

    a_td.appendChild(submitButton);
    submitRow.appendChild(a_td);
    tbody.appendChild(submitRow);
    table.appendChild(tbody);
    container.appendChild(table);
}

export { createForm };
