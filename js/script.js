{
    const tasks = [
        {
            content: "nagrać lekcję",
            done:false,
        },
        {
            content: "wynieść śmieci",
            done: true,
        },
    ];

    const render = () => {
        let htmlString = ""

        for(const task of tasks) {
            htmlString += `
                <li${task.done ? " style=\"text-decoration: line-through\"" : ""}>
                  <button class="js-remove">usuń</button> 
                ${task.content}
                </li>
            `;
        }

        document.querySelector(".js-tasks").innerHTML = htmlString;

        const removeButtons = document.querySelectorAll(".js-remove");
         
        removeButtons.forEach((removeButton, index) =>{
            removeButton.addEventListener("click", () => {
                removeTask(Taskindex);
            });


        });
    };

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });
        render();
    }

    const removeTask = (Taskindex) => {
        tasks.splice(Taskindex, 1);
                render();

    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();
        
        if(newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    }


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init ();
}