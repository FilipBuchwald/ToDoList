{
    const tasks = [];

    const render = () => {
        let htmlString = ""

        for (const task of tasks) {
            htmlString += `
                <li class="list__item">
                    <button class=" list__button list__button--done js-done">
                     ${task.done ? "✓" : ""}
                    </button>
                    <span class="list__task${task.done ? " list__task--done" : ""}">
                     ${task.content} 
                    </span>            
                    <button class="list__button list__button--remove js-remove">🗑</button> 
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;
        buttonEvent();
    };

    const buttonEvent = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, Taskindex) => {
            removeButton.addEventListener("click", () => {
                removeTask(Taskindex);
            });
        });

        const doneButtonsToggle = document.querySelectorAll(".js-done");
        doneButtonsToggle.forEach((doneButtonsToggle, Taskindex) => {
            doneButtonsToggle.addEventListener("click", () => {
                doneTask(Taskindex);
            })
        })

    }

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
        resetInput();
        focusInput();

    }

    const removeTask = (Taskindex) => {
        tasks.splice(Taskindex, 1);
        render();
    }

    const doneTask = (Taskindex) => {
        tasks[Taskindex].done = !tasks[Taskindex].done;
        render();
    }

    const resetInput = () => {
        const resetField = document.querySelector(".js-newTask");
        resetField.value = "";
    };

    const focusInput = () => {
        document.querySelector(".js-newTask").focus();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
    }

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}