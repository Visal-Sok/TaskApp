// let tasks = document.querySelector(".tasklist ul")
let taskUL = document.querySelector(".tasks-list ul");
let cateUL = document.querySelector(".categories ul")
document.addEventListener("DOMContentLoaded", () =>{
    let taskUL = document.querySelector(".tasks-list ul");
        fetch("task.json")
        .then(response => response.json())
        .then(tasks => {
            // console.log(tasks);
            tasks.forEach(task => {
                let LI = document.createElement("li");
                LI.innerHTML = GenerateTaskLI(task);
                taskUL.appendChild(LI);
    
        })
    let categoryUL = document.querySelector(".categories ul");
    fetch("category.json")
    .then(response => response.json())
    .then(categories => {
        categories.forEach(category =>{
            let LIcat = document.createElement("li");
            LIcat.innerHTML = GenerateCategoryLI(category);
            LIcat.setAttribute("onclick", `filter_task('${category.category}')`)
            categoryUL.appendChild(LIcat);
        })

        

        let searchDOM = document.querySelector(".nav-left .search input[type='text']");
        searchDOM.addEventListener("keyup", function(e){
            searchText = e.target.value;
            taskUL.innerHTML = "";
            fetch("task.json")
            .then((response) => {
                return response.json()})
            .then(tasks => {
                tasks.forEach((task => {
                    console.log(task.name)
                    LI = document.createElement("li")
                    if (task["name"].includes(searchText)) {
                        LI.innerHTML = GenerateTaskLI(task) 
                        taskUL.appendChild(LI);
                    }
                }))
            })
        });

//     let searchDOM = document.querySelector(".nav-left .search input[type='text']");
//     searchDOM.addEventListener("keyup", function (e) {
//         searchText = e.target.value;
//         taskUL.innerHTML="";
//         fetch("./task.json")
//         .then((response) => {
//         return response.json();
//         })
//         .then((data)=>{
//         //console.log(data)
//         for(let task of data) 
//         console.log(task)
//         {
//             LI=document.createElement("LI");
//             if(task["Name"].includes(searchText)) {
//                 LI.innerHTML = generateTaskLi(task);
//                 taskUL.appendChild(LI);
//             }
//         }

//     });
// });

})});});

// adding tasks

let btnAddNewTask = document.querySelector("#addnew");
btnAddNewTask.addEventListener("click", function (e) {
    btnAddNewTask.innerHTML = "";
    let inputTaskName = document.createElement("input");
    let inputTaskCheck = document.createElement("input");
    inputTaskCheck.setAttribute("type", "checkbox");
    inputTaskName.setAttribute("type", "text");
    inputTaskName.setAttribute("placeholder", "Set Your Task Name")
    btnAddNewTask.appendChild(inputTaskCheck);
    btnAddNewTask.appendChild(inputTaskName);
    inputTaskName.focus();

    inputTaskName.addEventListener("keyup", function(e) {
        if (e.key == "Enter") {
            let newtaskname = e.target.value;
            const dnow = "Today, 5:57PM";
            let task = {
                name: newtaskname,
                categories: "N/A",
                create_at: dnow,
            };
            let LI = document.createElement("LI");
            LI.innerHTML = GenerateTaskLI(task);
            taskUL.appendChild(LI)
            e.target.value = "";
        }
    })
});

// Add new categories

let btnAddNewCate = document.querySelector(".add-categories");
btnAddNewCate.addEventListener("click", function (e) {
    let newCateLI = document.createElement("li");
    newCateLI.innerHTML = `<div class ="iconnamemini">
                            <span class="material-symbols-outlined">check</span>
                            </div>
                            <input type= "text">
                            `;
    newCateLI.setAttribute("onclick", "filter_task('Chores')");
    cateUL.appendChild(newCateLI);
    newCateInput = newCateLI.querySelector("input");
    newCateInput.setAttribute("placeholder", "New Category...")
    newCateInput.focus();
})


/* <span class="notimini">
0
</span> */


// generate new tasks

function GenerateTaskLI(task) {
    let LI = `  <div class="taskname">
                    <input type="checkbox"/>&nbsp;&nbsp;<label class = "Maintask">${task.name}</label>
                </div>
                <div class="desc" >
                    <span class = "taskside-a">${task.categories}</span>
                    <span class = "taskside-b">${task.create_at}</span>
                </div>`;
        return LI};

// generate new categories

function GenerateCategoryLI(category){
    let LIcat = `   <div class = "iconnamemini">
                    <span class="material-symbols-outlined">check</span>
                    <span class="mt">
                   ${category.category} &nbsp;
                   </span>
                   </div>
                   <span class="notimini">
                        ${category.note}   
                   </span>`
                
return LIcat};

// Category Filter

function filter_task(name) {
    let taskUL = document.querySelector(".tasks-list ul");
    taskUL.innerHTML = "";
    fetch('task.json')
        .then((response) => response.json())
        .then((tasks) => {
            // console.log(tasks)
            tasks.forEach((task) => {
                if (name =="All") {
                    let LI = document.createElement("li");
                     LI.innerHTML = GenerateTaskLI(task);
                     taskUL.appendChild(LI)
                }
                 if (task.categories == name) {
                     let LI = document.createElement("li");
                     LI.innerHTML = GenerateTaskLI(task);
                     taskUL.appendChild(LI)
                 }  
             })
        })
}

// document.addEventListener("DOMContentLoaded", () =>{
    
//  })