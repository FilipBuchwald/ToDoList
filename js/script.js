{
    let tasks = [];

    let hideDoneTask = false;

    const renderTask = () => {
        let htmlString = ""

        for (const task of tasks) {
            htmlString += `
                <li class="list__item ${task.done && hideDoneTask ? "list__task--hidden" : ""}">
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
    };

    const hideAllDoneTasks = () =>{
        hideDoneTask = !hideDoneTask;
        render();
    };

    const getAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }))
        render();
    };

    const renderButtons = () => {
        let htmlButton = "" ;
        if (tasks.length > 0) {
            htmlButton += `
            <button class="js-button container__button js-hideAllDoneTasks"> 
            ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone 
            </button>
            <button class="js-button container__button js-completeAllTasks" ${tasks.every(task => task.done) ? "disabled" : ""}> 
            Ukończ wszystkie 
            </button>
            `
        };
        document.querySelector(".js-button").innerHTML = htmlButton;

    };

    const bindButtonsEvents = () => {
        const hideAllDoneTaskButton = document.querySelector(".js-hideAllDoneTasks");
        if (hideAllDoneTaskButton){
            hideAllDoneTaskButton.addEventListener("click", hideAllDoneTasks);
        };

        const getAllTasksDoneButton = document.querySelector(".js-completeAllTasks");
        if(getAllTasksDoneButton){
            getAllTasksDoneButton.addEventListener("click", getAllTasksDone);

        };

    };


    const render = () => {
        renderTask();
        renderButtons();
        buttonEvent();
        bindButtonsEvents();
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
        tasks = [
            ...tasks,
            {content: newTaskContent},
        ];
        
        render();
        resetInput();
        focusInput();

    };

    const removeTask = (Taskindex) => { 
        tasks = [
            ...tasks.slice(0,Taskindex),
            ...tasks.slice(Taskindex + 1)
        ];
        render();
    }

    const doneTask = (Taskindex) => {
        tasks = [
            ...tasks.slice(0,Taskindex),
            {...tasks[Taskindex], done: !tasks[Taskindex].done},
            ...tasks.slice(Taskindex + 1)
        ];
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