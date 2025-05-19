let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let EditingIndex = -1;
let taskName = document.querySelector("#taskName");
let selectPriority = document.querySelector("#selectPriority");
let dueDate = document.querySelector("#dueDate");
let addTask = document.querySelector("#addTask");
let displayTask = document.querySelector("#displayTask");
let clearBtn = document.querySelector("#clearBtn");
let searchTasks = document.querySelector("#searchTask");
let myDropdown = document.querySelector("#myDropdown");
addTask.addEventListener('click', function () {
    let Inputname = taskName.value.trim();
    let Inputpriority = selectPriority.value;
    let Inputdate = dueDate.value;
    if (Inputname === "" || Inputpriority === "" || Inputdate === "") {
        return;
    }
    else {
        console.log("tasks:", Inputname, Inputpriority, Inputdate);
    }
    let taskObj =
    {
        name: Inputname,
        priority: Inputpriority,
        duedate: Inputdate,
        completed: false
    }
    tasks.push(taskObj);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskName.value = "";
    selectPriority.value = "";
    dueDate.value = "";

    displayTasks();
})
function displayTasks() {
    let searchValue = searchTasks.value.toLowerCase();
    let filterValue = myDropdown.value;
    displayTask.innerHTML = `<tr>
        <th>Task Name</th>
        <th>Priority Level</th>
        <th>Due Date</th>
       </tr>`;
    tasks.forEach((t, index) => {
        if ((filterValue === "All Priorities" || t.priority === filterValue) &&
            (t.name.toLowerCase().includes(searchValue))) {
            let newtr = document.createElement("tr");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            let td4 = document.createElement("td");
            let td5 = document.createElement("td");
            let td6 = document.createElement("td");
            let DeleteBtn = document.createElement("button");
            let Checkbox = document.createElement("input");
            Checkbox.type = "checkbox";
            Checkbox.checked = t.completed;
            let CheckboxLabel = document.createElement("label");
            CheckboxLabel.textContent = "Mark If Completed";
            td1.textContent = t.name;
            td2.textContent = t.priority;
            td3.textContent = t.duedate;
            DeleteBtn.textContent = "Delete";
            DeleteBtn.classList.add("deletebtn")
            let editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.classList.add("editbtn");
            td4.appendChild(DeleteBtn);
            td5.append(CheckboxLabel);
            td5.append(Checkbox);
            td6.append(editButton);
            newtr.append(td1, td2, td3, td4, td5, td6);
            displayTask.append(newtr);
            DeleteBtn.addEventListener('click', function () {
                tasks.splice(index, 1);
                localStorage.setItem("tasks", JSON.stringify(tasks));
                displayTasks();
            });
            Checkbox.addEventListener('change', function () {
                tasks[index].completed = Checkbox.checked;
                localStorage.setItem("tasks", JSON.stringify(tasks));
            });
            editButton.addEventListener("click", function () {
                taskName.value = t.name;
                selectPriority.value = t.priority;
                dueDate.value = t.duedate;
                EditingIndex = index;
                addTask.textContent = "Save Changes"
            });
        }
    })
}

addTask.addEventListener('click', function () {
    let Inputname = taskName.value.trim();
    let Inputpriority = selectPriority.value;
    let Inputdate = dueDate.value;

    if (Inputname === "" || Inputpriority === "" || Inputdate === "") {
        return;
    }
    if (EditingIndex === -1) {
        tasks.push({
            name: Inputname,
            priority: Inputpriority,
            duedate: Inputdate,
            completed: false
        })
    }
    else {
        tasks[EditingIndex] = {
            name: Inputname,
            priority: Inputpriority,
            duedate: Inputdate,
            completed: tasks[EditingIndex].completed
        };
        EditingIndex = -1;
        addTask.textContent = "Add Your Task";
        localStorage.setItem("tasks", JSON.stringify(tasks));
        displayTasks();
    }
})
searchTasks.addEventListener("input", displayTasks);
myDropdown.addEventListener("change", displayTasks);
clearBtn.addEventListener('click', function () {
    localStorage.removeItem("tasks");
    tasks = [];
    displayTasks();
})
displayTasks();