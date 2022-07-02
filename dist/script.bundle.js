"use strict";
(self["webpackChunkproject_manager_dashboard"] = self["webpackChunkproject_manager_dashboard"] || []).push([["script"],{

/***/ "./src/DOMElements.js":
/*!****************************!*\
  !*** ./src/DOMElements.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const findDOMElements = (function() {

    const HTML_ANCHORS = {
        projectsHeader: document.getElementById('projects-list-header'),
        projectCardContainer: document.getElementById('project-card-container'),
    }


    const newProjectModal = {
        
        openModalBtn: document.getElementById('open-project-modal-btn'),
        theModal: document.getElementById('add-new-project-modal'),

        //------------modal form inputs
        titleInput: document.getElementById('project_title'),
        descriptionInput: document.getElementById('project_description'),
        dueDateInput: document.getElementById('due_date'),
        saveBtn: document.getElementById('save-project'),

        //////// radio input is found within submit event ///////////
    };

    const newTaskModal = {
        
        openModalBtn: document.querySelector('.add-new-task-btn'),
        theModal: document.getElementById('add-new-task-modal'),

        //------------modal form inputs
        taskDetailsInput: document.getElementById('task_details'),
        saveBtn: document.getElementById('save-task'),
    };

    return {
        HTML_ANCHORS,
        newProjectModal,
        newTaskModal,
    }
     
})();



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (findDOMElements);

/***/ }),

/***/ "./src/script.js":
/*!***********************!*\
  !*** ./src/script.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DOMElements.js */ "./src/DOMElements.js");


/*Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into. */
const myProjects = (function () {
    
    const LOCAL_STORAGE_PROJECTS_KEY = 'myProjectManager.Project';
    let projects = JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || [];

    let projectCardContainer = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].HTML_ANCHORS.projectCardContainer
    let newProjectModal = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].newProjectModal
    let newTaskModal = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].newTaskModal
    let projectsHeader = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].HTML_ANCHORS.projectsHeader

    /*let projects = [
        {
            id: "123456789", //pull time stamp to make a uniqe id
            title: "Project With a Cool Name", //user input from html form
            description: "A description of the project", //user input from html form
            checklist: [
                {
                    id: "", //pull time stamp to make a uniqer id
                    taskDetails: "", //user input from a html form
                    complete: false, // user click to toggle 
                }
            ],
            dueDate: "07/01/22", // user input
            priority: "High", // user input (maybe do a background color gradiant to show priority level. also make a sort function to show tasks in that priority range)
        },
        {
            id: "123456789", //pull time stamp to make a uniqe id
            title: "Project With a Cool Name", //user input from html form
            description: "A description of the project", //user input from html form
            checklist: [
                {
                    id: "", //pull time stamp to make a uniqer id
                    taskDetails: "", //user input from a html form
                    complete: false, // user click to toggle 
                },
                {
                    id: "", //pull time stamp to make a uniqer id
                    taskDetails: "", //user input from a html form
                    complete: false, // user click to toggle 
                },
                {
                    id: "", //pull time stamp to make a uniqer id
                    taskDetails: "", //user input from a html form
                    complete: false, // user click to toggle 
                }
            ],
            dueDate: "07/01/22", // user input
            priority: "High", // user input (maybe do a background color gradiant to show priority level. also make a sort function to show tasks in that priority range)
        },
        {
            id: "564654987", //pull time stamp to make a uniqe id
            title: "Meh Project", //user input from html form
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, iure perferendis ipsam possimus ipsum, amet id quas corrupti eum nam illum qui recusandae minus cupiditate assumenda in reprehenderit? Asperiores quos possimus eveniet voluptates ipsa aperiam nemo excepturi dignissimos accusamus distinctio?", //user input from html form
            checklist: [
                {
                    id: "", //pull time stamp to make a uniqer id
                    taskDetails: "some sample text", //user input from a html form
                    complete: false, // user click to toggle 
                },
                {
                    id: "", //pull time stamp to make a uniqer id
                    taskDetails: "some more sample text", //user input from a html form
                    complete: false, // user click to toggle 
                }
            ],
            dueDate: "07/01/22", // user input
            priority: "Low", // user input (maybe do a background color gradiant to show priority level. also make a sort function to show tasks in that priority range)
        }
    ]; */

    let sortedProjects = projects
    
    let selectedProject = []

    const createProject = (title, description, dueDate, priority) => {
        return {
            id: Date.now().toString(),
            title: title,
            description: description,
            checklist: [],
            dueDate: dueDate,
            priority: priority,
        }
    }

    const creatChecklist = (taskDetails) => {
        return {
            id: Date.now().toString(),
            taskDetails: taskDetails,
            complete: false,
        }
    }

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    /////////////// form interactions for adding a project /////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    newProjectModal.theModal.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    
    newProjectModal.saveBtn.addEventListener('click', () => {
        pushFormInputToProjects();
        console.log(projects);
        render();
        return
    })

    //---on form submit btn event - takes input value and pushes to projects array
    function pushFormInputToProjects() {
        let newProjectTitle = newProjectModal.titleInput.value;
        if (newProjectTitle === null || newProjectTitle === '') {
            return
        }
        let newProjectDescription = newProjectModal.descriptionInput.value;
        let newProjectDueDate = newProjectModal.dueDateInput.value;

        let newProjectPriorityInput = document.querySelector('input[type=radio][name=priority]:checked');
        let newProjectPriority = newProjectPriorityInput.value;

        let project = createProject(newProjectTitle, newProjectDescription, newProjectDueDate, newProjectPriority);

        projects.push(project);
        resetProjectForm();
        return
    }
    //---- resets project form to defalut
    function resetProjectForm() {
        newProjectModal.titleInput.value = null;
        newProjectModal.descriptionInput.value = null;
        newProjectModal.dueDateInput.value = null;
        let defaultPriority = document.getElementById('none');
        defaultPriority.checked = true
        newProjectModal.theModal.close();
        return
    }

    newTaskModal.theModal.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    newTaskModal.saveBtn.addEventListener('click', () => {
        pushFormInputToTasks();
        resetTaskForm();
        save();
        clearElements(projectCardContainer);
        clearElements(projectsHeader);
        renderSelectedProject();
        return
    })
    function pushFormInputToTasks() {
        let newTaskDetails = newTaskModal.taskDetailsInput.value;
        if (newTaskDetails === null || newTaskDetails === '') {
            return
        }
        let task = creatChecklist(newTaskDetails);
        let openModalBtnId = document.querySelector('.add-new-task-btn');
        let currentProjectId = openModalBtnId.dataset.projectId;
        let currentProject = projects.find(project => project.id === currentProjectId);
        currentProject.checklist.push(task);
        console.log(projects);
        return
    }
    function resetTaskForm() {
        newTaskModal.taskDetailsInput.value = null;
        newTaskModal.theModal.close();
        return
    }

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ///////////////////////// Event listeners //////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    function projectHeaderEventListeners() {
        projectsHeader.addEventListener('click', (e) => {
            if (e.target.classList.contains('open-project-modal-btn')) {
                return newProjectModal.theModal.showModal();
            }
            if (e.target.classList.contains('sort-by-most-btn')) {
                sortByMostTaks();
                render();
            }
            if (e.target.classList.contains('sort-by-least-btn')) {
                sortByLeastTaks();
                render();
            }
        })
    }

    function projectCardEventListeners() {
        projectCardContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-project-btn')) {
                projects = projects.filter(project => project.id !== e.target.dataset.projectId);
                render();
            }
            if (e.target.classList.contains('project-card')) {
                selectedProject = projects.filter(project => project.id === e.target.dataset.projectId);
                console.log(selectedProject);
                renderSelectedProject();
            }
            if (e.target.classList.contains('close-project-btn')) {
                clearElements(projectCardContainer);
                render();
            }
            if (e.target.classList.contains('add-new-task-btn')) {
                return newTaskModal.theModal.showModal();
            }
            if (e.target.classList.contains('delete-task-btn')) {
                projects.forEach(project => {
                    project.checklist = project.checklist.filter(list => list.id !== e.target.dataset.checklistId)            
                })
                save();
                renderSelectedProject();
            }
        })
    }

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    /////////////////// HTML render functions //////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    function save() {
        localStorage.setItem(LOCAL_STORAGE_PROJECTS_KEY, JSON.stringify(projects));
    }
    function render() {
        save();
        clearElements(projectCardContainer);
        clearElements(projectsHeader);
        renderProjectsHeader();
        renderProjects();
    }
    
    function clearElements(element) {
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    //---Makes the header over the list of projects
    function renderProjectsHeader() {
        let projectHeaderSortContainer = document.createElement('div');
        projectHeaderSortContainer.classList.add('project-header-sort-container')
        projectsHeader.appendChild(projectHeaderSortContainer)

        let projectHeaderTitle = document.createElement('p');
        projectHeaderTitle.innerText = "Sort Projects";
        projectHeaderTitle.classList.add('sort-project-menu-title')
        projectHeaderSortContainer.appendChild(projectHeaderTitle);

        let sortByTasksContainer = document.createElement('div');
        projectHeaderSortContainer.appendChild(sortByTasksContainer);
        let projectHeaderTaskCount = document.createElement('p');
        projectHeaderTaskCount.innerText = "Tasks:";
        sortByTasksContainer.appendChild(projectHeaderTaskCount);
        let projectSortByMostTasksBtn = document.createElement('button');
        projectSortByMostTasksBtn.classList.add('sort-by-most-btn')
        projectSortByMostTasksBtn.innerText = "Most";
        sortByTasksContainer.appendChild(projectSortByMostTasksBtn);
        let projectSortByLeastTasksBtn = document.createElement('button');
        projectSortByLeastTasksBtn.classList.add('sort-by-least-btn')
        projectSortByLeastTasksBtn.innerText = "Least";
        sortByTasksContainer.appendChild(projectSortByLeastTasksBtn);

        let sortByPriorityContainer = document.createElement('div');
        projectHeaderSortContainer.appendChild(sortByPriorityContainer);
        let projectPriority = document.createElement('p');
        projectPriority.innerText = "Priority:";
        sortByPriorityContainer.appendChild(projectPriority);
        let projectSortByHighestPriorityBtn = document.createElement('button');
        projectSortByHighestPriorityBtn.innerText = "Highest";
        sortByPriorityContainer.appendChild(projectSortByHighestPriorityBtn);
        let projectSortByLeastPriorityBtn = document.createElement('button');
        projectSortByLeastPriorityBtn.innerText = "Least";
        sortByPriorityContainer.appendChild(projectSortByLeastPriorityBtn);

        let sortByDateContainer = document.createElement('div');
        projectHeaderSortContainer.appendChild(sortByDateContainer);
        let projectDueDate = document.createElement('p');
        projectDueDate.innerText = "Date:";
        sortByDateContainer.appendChild(projectDueDate);
        let projectSortByClosestDateBtn = document.createElement('button');
        projectSortByClosestDateBtn.innerText = "Closest";
        sortByDateContainer.appendChild(projectSortByClosestDateBtn);
        let projectSortByFarthestDateBtn = document.createElement('button');
        projectSortByFarthestDateBtn.innerText = "Farthest";
        sortByDateContainer.appendChild(projectSortByFarthestDateBtn);

        let openProjectModalBtn = document.createElement('button');
        openProjectModalBtn.classList.add('open-project-modal-btn')
        openProjectModalBtn.innerText = "+ Project";
        projectsHeader.appendChild(openProjectModalBtn);
        

    }
    //---Makes the list of projects
    function renderProjects() {
        sortedProjects.forEach(project => {
            ///////////////////Creates Cards for Each Project//////////////
            let projectCardDiv = document.createElement('div');
            projectCardDiv.classList.add('project-card');
            projectCardDiv.dataset.projectId = project.id;
            projectCardContainer.appendChild(projectCardDiv);
            
            let projectCardTitle = document.createElement('h3');
            projectCardTitle.innerText = project.title;
            projectCardDiv.appendChild(projectCardTitle);

            let projectCardChecklist = document.createElement('p');
            projectCardChecklist.innerText = `Open Tasks: ${project.checklist.length}`;
            projectCardDiv.appendChild(projectCardChecklist)

            let projectCardPriority = document.createElement('p');
            projectCardPriority.innerText = `Priority: ${project.priority}`;
            projectCardDiv.appendChild(projectCardPriority)

            let projectCardDueDate = document.createElement('p');
            projectCardDueDate.innerText = `Complete by: ${project.dueDate}`;
            projectCardDiv.appendChild(projectCardDueDate)

            ///////////////Create Edit and Delete Projects Buttons//////////
            let projectBtnContainer = document.createElement('div');
            projectBtnContainer.classList.add('project-btn-container');
            projectCardDiv.appendChild(projectBtnContainer)

            let editProjectBtn = document.createElement('button');
            editProjectBtn.innerText = "Edit";
            editProjectBtn.classList.add('edit-project-btn');
            projectBtnContainer.appendChild(editProjectBtn)

            let deleteProjectBtn = document.createElement('button');
            deleteProjectBtn.innerText = "Delete"
            deleteProjectBtn.classList.add('delete-project-btn');
            deleteProjectBtn.dataset.projectId = project.id;
            projectBtnContainer.appendChild(deleteProjectBtn)
        })
    }
    //---Makes the selected project full screen
    function renderSelectedProject() {
        clearElements(projectCardContainer);
        clearElements(projectsHeader);
        selectedProject.forEach(project => {
            let selectedProjectCard = document.createElement('div');
            selectedProjectCard.classList.add('selected-project-card');
            projectCardContainer.appendChild(selectedProjectCard);

            let selectedProjectHeader = document.createElement('div');
            selectedProjectHeader.classList.add('selected-project-header');
            selectedProjectCard.appendChild(selectedProjectHeader);

            let selectedProjectTitle = document.createElement('h3');
            selectedProjectTitle.innerText = project.title;
            selectedProjectHeader.appendChild(selectedProjectTitle);

            let closeProjectBtn = document.createElement('button');
            closeProjectBtn.classList.add('close-project-btn');
            closeProjectBtn.innerText = "Back to Project List"
            selectedProjectHeader.appendChild(closeProjectBtn);

            let selectedProjectAside = document.createElement('div');
            selectedProjectAside.classList.add('selected-project-aside');
            selectedProjectCard.appendChild(selectedProjectAside);

            let projectDeadlineContainer = document.createElement('div');
            projectDeadlineContainer.classList.add('project-deadline-container');
            selectedProjectAside.appendChild(projectDeadlineContainer);

            let selectedProjectDueDate = document.createElement('p');
            selectedProjectDueDate.innerText = "Due: " + project.dueDate;
            projectDeadlineContainer.appendChild(selectedProjectDueDate);

            let selectedProjectPriority = document.createElement('p');
            selectedProjectPriority.innerText = "Priority: " + project.priority;
            projectDeadlineContainer.appendChild(selectedProjectPriority);

            let selectedProjectCardDescription = document.createElement('p');
            selectedProjectCardDescription.classList.add('project-description');
            selectedProjectCardDescription.innerText = project.description;
            selectedProjectAside.appendChild(selectedProjectCardDescription);
            
            let selectedProjectTaskContainer = document.createElement('div');
            selectedProjectTaskContainer.classList.add('selected-project-task-container');
            selectedProjectCard.appendChild(selectedProjectTaskContainer);

            //---filter and add tasks to task list
            let selectedProjectChecklistFilter = document.createElement('div');
            selectedProjectChecklistFilter.classList.add('task-filter-card');

            let filterTasksBtnContainer = document.createElement('div');
            filterTasksBtnContainer.classList.add('filter-tasks-btn-container')
            selectedProjectChecklistFilter.appendChild(filterTasksBtnContainer);

            let filterTasksLable = document.createElement('p');
            filterTasksLable.innerText = "Filter Tasks:"
            filterTasksBtnContainer.appendChild(filterTasksLable);

            let allTasksBtn = document.createElement('button');
            allTasksBtn.innerText = "All"
            filterTasksBtnContainer.appendChild(allTasksBtn);

            let openTasksBtn = document.createElement('button');
            openTasksBtn.innerText = "Open"
            filterTasksBtnContainer.appendChild(openTasksBtn);

            let closedTasksBtn = document.createElement('button');
            closedTasksBtn.innerText = "Closed"
            filterTasksBtnContainer.appendChild(closedTasksBtn);

            let addNewTaskBtn = document.createElement('button');
            addNewTaskBtn.dataset.projectId = project.id;
            addNewTaskBtn.classList.add('add-new-task-btn');
            addNewTaskBtn.innerText = "+ Task"
            selectedProjectChecklistFilter.appendChild(addNewTaskBtn);

            selectedProjectTaskContainer.appendChild(selectedProjectChecklistFilter);


            project.checklist.forEach(task => {
                let selectedProjectChecklist = document.createElement('div');
                selectedProjectChecklist.classList.add('task-card');

                let taskOptionsContainer = document.createElement('div');
                taskOptionsContainer.classList.add('task-options-container');
                selectedProjectChecklist.appendChild(taskOptionsContainer);

                let taskCheckboxConatiner = document.createElement('div');
                taskCheckboxConatiner.classList.add('task-checkbox-conatiner');
                taskOptionsContainer.appendChild(taskCheckboxConatiner)

                let taskCheckBox = document.createElement('input');
                taskCheckBox.type = "checkbox";
                taskCheckBox.id = task.id;
                taskCheckboxConatiner.appendChild(taskCheckBox);

                let checkboxDescription = document.createElement('label');
                checkboxDescription.innerText = "Check Complete";
                checkboxDescription.htmlFor = task.id;
                taskCheckboxConatiner.appendChild(checkboxDescription);

                let deleteTaskBtn = document.createElement('button');
                deleteTaskBtn.classList.add('delete-task-btn');
                deleteTaskBtn.innerText = "Delete"
                deleteTaskBtn.dataset.checklistId = task.id;
                taskOptionsContainer.appendChild(deleteTaskBtn)

                let taskText = document.createElement('p');
                taskText.innerText = task.taskDetails;
                selectedProjectChecklist.appendChild(taskText);


                selectedProjectTaskContainer.appendChild(selectedProjectChecklist);
            })
        })
    }


    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    /////////////////////// Sort  functions ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    //---Sort Projects
    function sortByMostTaks() {
        let projectsByMostTasks = projects;
        projectsByMostTasks.sort(function(a, b) {
            return b.checklist.length - a.checklist.length
        });
        sortedProjects = projectsByMostTasks
        return
    }

    function sortByLeastTaks() {
        let projectsByLeastTasks = projects;
        projectsByLeastTasks.sort(function(a, b) {
            return a.checklist.length - b.checklist.length
        });
        sortedProjects = projectsByLeastTasks
        return
    }


    return {
        
        renderProjectsHeader,
        renderProjects,
        renderSelectedProject,
        projectHeaderEventListeners,
        projectCardEventListeners,
    }

})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myProjects);

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/script.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQzFDK0I7O0FBRTlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLHlGQUFpRDtBQUNoRiwwQkFBMEIsdUVBQStCO0FBQ3pELHVCQUF1QixvRUFBNEI7QUFDbkQseUJBQXlCLG1GQUEyQzs7QUFFcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNERBQTRELHlCQUF5QjtBQUNyRjs7QUFFQTtBQUNBLHlEQUF5RCxpQkFBaUI7QUFDMUU7O0FBRUE7QUFDQSwyREFBMkQsZ0JBQWdCO0FBQzNFOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELGlFQUFlIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHJvamVjdC1tYW5hZ2VyLWRhc2hib2FyZC8uL3NyYy9ET01FbGVtZW50cy5qcyIsIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXItZGFzaGJvYXJkLy4vc3JjL3NjcmlwdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBmaW5kRE9NRWxlbWVudHMgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBIVE1MX0FOQ0hPUlMgPSB7XG4gICAgICAgIHByb2plY3RzSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdHMtbGlzdC1oZWFkZXInKSxcbiAgICAgICAgcHJvamVjdENhcmRDb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWNhcmQtY29udGFpbmVyJyksXG4gICAgfVxuXG5cbiAgICBjb25zdCBuZXdQcm9qZWN0TW9kYWwgPSB7XG4gICAgICAgIFxuICAgICAgICBvcGVuTW9kYWxCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuLXByb2plY3QtbW9kYWwtYnRuJyksXG4gICAgICAgIHRoZU1vZGFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLW5ldy1wcm9qZWN0LW1vZGFsJyksXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS1tb2RhbCBmb3JtIGlucHV0c1xuICAgICAgICB0aXRsZUlucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdF90aXRsZScpLFxuICAgICAgICBkZXNjcmlwdGlvbklucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdF9kZXNjcmlwdGlvbicpLFxuICAgICAgICBkdWVEYXRlSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdkdWVfZGF0ZScpLFxuICAgICAgICBzYXZlQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS1wcm9qZWN0JyksXG5cbiAgICAgICAgLy8vLy8vLy8gcmFkaW8gaW5wdXQgaXMgZm91bmQgd2l0aGluIHN1Ym1pdCBldmVudCAvLy8vLy8vLy8vL1xuICAgIH07XG5cbiAgICBjb25zdCBuZXdUYXNrTW9kYWwgPSB7XG4gICAgICAgIFxuICAgICAgICBvcGVuTW9kYWxCdG46IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hZGQtbmV3LXRhc2stYnRuJyksXG4gICAgICAgIHRoZU1vZGFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWRkLW5ldy10YXNrLW1vZGFsJyksXG5cbiAgICAgICAgLy8tLS0tLS0tLS0tLS1tb2RhbCBmb3JtIGlucHV0c1xuICAgICAgICB0YXNrRGV0YWlsc0lucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGFza19kZXRhaWxzJyksXG4gICAgICAgIHNhdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlLXRhc2snKSxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgSFRNTF9BTkNIT1JTLFxuICAgICAgICBuZXdQcm9qZWN0TW9kYWwsXG4gICAgICAgIG5ld1Rhc2tNb2RhbCxcbiAgICB9XG4gICAgIFxufSkoKTtcblxuXG5cbmV4cG9ydCBkZWZhdWx0IGZpbmRET01FbGVtZW50cyIsImltcG9ydCBmaW5kRE9NRWxlbWVudHMgZnJvbSAnLi9ET01FbGVtZW50cy5qcydcblxuLypZb3VyIHRvZG8gbGlzdCBzaG91bGQgaGF2ZSBwcm9qZWN0cyBvciBzZXBhcmF0ZSBsaXN0cyBvZiB0b2Rvcy4gV2hlbiBhIHVzZXIgZmlyc3Qgb3BlbnMgdGhlIGFwcCwgdGhlcmUgc2hvdWxkIGJlIHNvbWUgc29ydCBvZiDigJhkZWZhdWx04oCZIHByb2plY3QgdG8gd2hpY2ggYWxsIG9mIHRoZWlyIHRvZG9zIGFyZSBwdXQuIFVzZXJzIHNob3VsZCBiZSBhYmxlIHRvIGNyZWF0ZSBuZXcgcHJvamVjdHMgYW5kIGNob29zZSB3aGljaCBwcm9qZWN0IHRoZWlyIHRvZG9zIGdvIGludG8uICovXG5jb25zdCBteVByb2plY3RzID0gKGZ1bmN0aW9uICgpIHtcbiAgICBcbiAgICBjb25zdCBMT0NBTF9TVE9SQUdFX1BST0pFQ1RTX0tFWSA9ICdteVByb2plY3RNYW5hZ2VyLlByb2plY3QnO1xuICAgIGxldCBwcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oTE9DQUxfU1RPUkFHRV9QUk9KRUNUU19LRVkpKSB8fCBbXTtcblxuICAgIGxldCBwcm9qZWN0Q2FyZENvbnRhaW5lciA9IGZpbmRET01FbGVtZW50cy5IVE1MX0FOQ0hPUlMucHJvamVjdENhcmRDb250YWluZXJcbiAgICBsZXQgbmV3UHJvamVjdE1vZGFsID0gZmluZERPTUVsZW1lbnRzLm5ld1Byb2plY3RNb2RhbFxuICAgIGxldCBuZXdUYXNrTW9kYWwgPSBmaW5kRE9NRWxlbWVudHMubmV3VGFza01vZGFsXG4gICAgbGV0IHByb2plY3RzSGVhZGVyID0gZmluZERPTUVsZW1lbnRzLkhUTUxfQU5DSE9SUy5wcm9qZWN0c0hlYWRlclxuXG4gICAgLypsZXQgcHJvamVjdHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIjEyMzQ1Njc4OVwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWUgaWRcbiAgICAgICAgICAgIHRpdGxlOiBcIlByb2plY3QgV2l0aCBhIENvb2wgTmFtZVwiLCAvL3VzZXIgaW5wdXQgZnJvbSBodG1sIGZvcm1cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkEgZGVzY3JpcHRpb24gb2YgdGhlIHByb2plY3RcIiwgLy91c2VyIGlucHV0IGZyb20gaHRtbCBmb3JtXG4gICAgICAgICAgICBjaGVja2xpc3Q6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWVyIGlkXG4gICAgICAgICAgICAgICAgICAgIHRhc2tEZXRhaWxzOiBcIlwiLCAvL3VzZXIgaW5wdXQgZnJvbSBhIGh0bWwgZm9ybVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsIC8vIHVzZXIgY2xpY2sgdG8gdG9nZ2xlIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkdWVEYXRlOiBcIjA3LzAxLzIyXCIsIC8vIHVzZXIgaW5wdXRcbiAgICAgICAgICAgIHByaW9yaXR5OiBcIkhpZ2hcIiwgLy8gdXNlciBpbnB1dCAobWF5YmUgZG8gYSBiYWNrZ3JvdW5kIGNvbG9yIGdyYWRpYW50IHRvIHNob3cgcHJpb3JpdHkgbGV2ZWwuIGFsc28gbWFrZSBhIHNvcnQgZnVuY3Rpb24gdG8gc2hvdyB0YXNrcyBpbiB0aGF0IHByaW9yaXR5IHJhbmdlKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCIxMjM0NTY3ODlcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlIGlkXG4gICAgICAgICAgICB0aXRsZTogXCJQcm9qZWN0IFdpdGggYSBDb29sIE5hbWVcIiwgLy91c2VyIGlucHV0IGZyb20gaHRtbCBmb3JtXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBIGRlc2NyaXB0aW9uIG9mIHRoZSBwcm9qZWN0XCIsIC8vdXNlciBpbnB1dCBmcm9tIGh0bWwgZm9ybVxuICAgICAgICAgICAgY2hlY2tsaXN0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlciBpZFxuICAgICAgICAgICAgICAgICAgICB0YXNrRGV0YWlsczogXCJcIiwgLy91c2VyIGlucHV0IGZyb20gYSBodG1sIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLCAvLyB1c2VyIGNsaWNrIHRvIHRvZ2dsZSBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsIC8vcHVsbCB0aW1lIHN0YW1wIHRvIG1ha2UgYSB1bmlxZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgdGFza0RldGFpbHM6IFwiXCIsIC8vdXNlciBpbnB1dCBmcm9tIGEgaHRtbCBmb3JtXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSwgLy8gdXNlciBjbGljayB0byB0b2dnbGUgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWVyIGlkXG4gICAgICAgICAgICAgICAgICAgIHRhc2tEZXRhaWxzOiBcIlwiLCAvL3VzZXIgaW5wdXQgZnJvbSBhIGh0bWwgZm9ybVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsIC8vIHVzZXIgY2xpY2sgdG8gdG9nZ2xlIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkdWVEYXRlOiBcIjA3LzAxLzIyXCIsIC8vIHVzZXIgaW5wdXRcbiAgICAgICAgICAgIHByaW9yaXR5OiBcIkhpZ2hcIiwgLy8gdXNlciBpbnB1dCAobWF5YmUgZG8gYSBiYWNrZ3JvdW5kIGNvbG9yIGdyYWRpYW50IHRvIHNob3cgcHJpb3JpdHkgbGV2ZWwuIGFsc28gbWFrZSBhIHNvcnQgZnVuY3Rpb24gdG8gc2hvdyB0YXNrcyBpbiB0aGF0IHByaW9yaXR5IHJhbmdlKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCI1NjQ2NTQ5ODdcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlIGlkXG4gICAgICAgICAgICB0aXRsZTogXCJNZWggUHJvamVjdFwiLCAvL3VzZXIgaW5wdXQgZnJvbSBodG1sIGZvcm1cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBOZW1vLCBpdXJlIHBlcmZlcmVuZGlzIGlwc2FtIHBvc3NpbXVzIGlwc3VtLCBhbWV0IGlkIHF1YXMgY29ycnVwdGkgZXVtIG5hbSBpbGx1bSBxdWkgcmVjdXNhbmRhZSBtaW51cyBjdXBpZGl0YXRlIGFzc3VtZW5kYSBpbiByZXByZWhlbmRlcml0PyBBc3BlcmlvcmVzIHF1b3MgcG9zc2ltdXMgZXZlbmlldCB2b2x1cHRhdGVzIGlwc2EgYXBlcmlhbSBuZW1vIGV4Y2VwdHVyaSBkaWduaXNzaW1vcyBhY2N1c2FtdXMgZGlzdGluY3Rpbz9cIiwgLy91c2VyIGlucHV0IGZyb20gaHRtbCBmb3JtXG4gICAgICAgICAgICBjaGVja2xpc3Q6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWVyIGlkXG4gICAgICAgICAgICAgICAgICAgIHRhc2tEZXRhaWxzOiBcInNvbWUgc2FtcGxlIHRleHRcIiwgLy91c2VyIGlucHV0IGZyb20gYSBodG1sIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLCAvLyB1c2VyIGNsaWNrIHRvIHRvZ2dsZSBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsIC8vcHVsbCB0aW1lIHN0YW1wIHRvIG1ha2UgYSB1bmlxZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgdGFza0RldGFpbHM6IFwic29tZSBtb3JlIHNhbXBsZSB0ZXh0XCIsIC8vdXNlciBpbnB1dCBmcm9tIGEgaHRtbCBmb3JtXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSwgLy8gdXNlciBjbGljayB0byB0b2dnbGUgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGR1ZURhdGU6IFwiMDcvMDEvMjJcIiwgLy8gdXNlciBpbnB1dFxuICAgICAgICAgICAgcHJpb3JpdHk6IFwiTG93XCIsIC8vIHVzZXIgaW5wdXQgKG1heWJlIGRvIGEgYmFja2dyb3VuZCBjb2xvciBncmFkaWFudCB0byBzaG93IHByaW9yaXR5IGxldmVsLiBhbHNvIG1ha2UgYSBzb3J0IGZ1bmN0aW9uIHRvIHNob3cgdGFza3MgaW4gdGhhdCBwcmlvcml0eSByYW5nZSlcbiAgICAgICAgfVxuICAgIF07ICovXG5cbiAgICBsZXQgc29ydGVkUHJvamVjdHMgPSBwcm9qZWN0c1xuICAgIFxuICAgIGxldCBzZWxlY3RlZFByb2plY3QgPSBbXVxuXG4gICAgY29uc3QgY3JlYXRlUHJvamVjdCA9ICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuICAgICAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgY2hlY2tsaXN0OiBbXSxcbiAgICAgICAgICAgIGR1ZURhdGU6IGR1ZURhdGUsXG4gICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHksXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBjcmVhdENoZWNrbGlzdCA9ICh0YXNrRGV0YWlscykgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIHRhc2tEZXRhaWxzOiB0YXNrRGV0YWlscyxcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSxcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLyBmb3JtIGludGVyYWN0aW9ucyBmb3IgYWRkaW5nIGEgcHJvamVjdCAvLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIG5ld1Byb2plY3RNb2RhbC50aGVNb2RhbC5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSlcbiAgICBcbiAgICBuZXdQcm9qZWN0TW9kYWwuc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgcHVzaEZvcm1JbnB1dFRvUHJvamVjdHMoKTtcbiAgICAgICAgY29uc29sZS5sb2cocHJvamVjdHMpO1xuICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfSlcblxuICAgIC8vLS0tb24gZm9ybSBzdWJtaXQgYnRuIGV2ZW50IC0gdGFrZXMgaW5wdXQgdmFsdWUgYW5kIHB1c2hlcyB0byBwcm9qZWN0cyBhcnJheVxuICAgIGZ1bmN0aW9uIHB1c2hGb3JtSW5wdXRUb1Byb2plY3RzKCkge1xuICAgICAgICBsZXQgbmV3UHJvamVjdFRpdGxlID0gbmV3UHJvamVjdE1vZGFsLnRpdGxlSW5wdXQudmFsdWU7XG4gICAgICAgIGlmIChuZXdQcm9qZWN0VGl0bGUgPT09IG51bGwgfHwgbmV3UHJvamVjdFRpdGxlID09PSAnJykge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IG5ld1Byb2plY3REZXNjcmlwdGlvbiA9IG5ld1Byb2plY3RNb2RhbC5kZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuICAgICAgICBsZXQgbmV3UHJvamVjdER1ZURhdGUgPSBuZXdQcm9qZWN0TW9kYWwuZHVlRGF0ZUlucHV0LnZhbHVlO1xuXG4gICAgICAgIGxldCBuZXdQcm9qZWN0UHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2lucHV0W3R5cGU9cmFkaW9dW25hbWU9cHJpb3JpdHldOmNoZWNrZWQnKTtcbiAgICAgICAgbGV0IG5ld1Byb2plY3RQcmlvcml0eSA9IG5ld1Byb2plY3RQcmlvcml0eUlucHV0LnZhbHVlO1xuXG4gICAgICAgIGxldCBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdChuZXdQcm9qZWN0VGl0bGUsIG5ld1Byb2plY3REZXNjcmlwdGlvbiwgbmV3UHJvamVjdER1ZURhdGUsIG5ld1Byb2plY3RQcmlvcml0eSk7XG5cbiAgICAgICAgcHJvamVjdHMucHVzaChwcm9qZWN0KTtcbiAgICAgICAgcmVzZXRQcm9qZWN0Rm9ybSgpO1xuICAgICAgICByZXR1cm5cbiAgICB9XG4gICAgLy8tLS0tIHJlc2V0cyBwcm9qZWN0IGZvcm0gdG8gZGVmYWx1dFxuICAgIGZ1bmN0aW9uIHJlc2V0UHJvamVjdEZvcm0oKSB7XG4gICAgICAgIG5ld1Byb2plY3RNb2RhbC50aXRsZUlucHV0LnZhbHVlID0gbnVsbDtcbiAgICAgICAgbmV3UHJvamVjdE1vZGFsLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBudWxsO1xuICAgICAgICBuZXdQcm9qZWN0TW9kYWwuZHVlRGF0ZUlucHV0LnZhbHVlID0gbnVsbDtcbiAgICAgICAgbGV0IGRlZmF1bHRQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdub25lJyk7XG4gICAgICAgIGRlZmF1bHRQcmlvcml0eS5jaGVja2VkID0gdHJ1ZVxuICAgICAgICBuZXdQcm9qZWN0TW9kYWwudGhlTW9kYWwuY2xvc2UoKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfVxuXG4gICAgbmV3VGFza01vZGFsLnRoZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIChlKSA9PiB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9KVxuICAgIG5ld1Rhc2tNb2RhbC5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBwdXNoRm9ybUlucHV0VG9UYXNrcygpO1xuICAgICAgICByZXNldFRhc2tGb3JtKCk7XG4gICAgICAgIHNhdmUoKTtcbiAgICAgICAgY2xlYXJFbGVtZW50cyhwcm9qZWN0Q2FyZENvbnRhaW5lcik7XG4gICAgICAgIGNsZWFyRWxlbWVudHMocHJvamVjdHNIZWFkZXIpO1xuICAgICAgICByZW5kZXJTZWxlY3RlZFByb2plY3QoKTtcbiAgICAgICAgcmV0dXJuXG4gICAgfSlcbiAgICBmdW5jdGlvbiBwdXNoRm9ybUlucHV0VG9UYXNrcygpIHtcbiAgICAgICAgbGV0IG5ld1Rhc2tEZXRhaWxzID0gbmV3VGFza01vZGFsLnRhc2tEZXRhaWxzSW5wdXQudmFsdWU7XG4gICAgICAgIGlmIChuZXdUYXNrRGV0YWlscyA9PT0gbnVsbCB8fCBuZXdUYXNrRGV0YWlscyA9PT0gJycpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCB0YXNrID0gY3JlYXRDaGVja2xpc3QobmV3VGFza0RldGFpbHMpO1xuICAgICAgICBsZXQgb3Blbk1vZGFsQnRuSWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5ldy10YXNrLWJ0bicpO1xuICAgICAgICBsZXQgY3VycmVudFByb2plY3RJZCA9IG9wZW5Nb2RhbEJ0bklkLmRhdGFzZXQucHJvamVjdElkO1xuICAgICAgICBsZXQgY3VycmVudFByb2plY3QgPSBwcm9qZWN0cy5maW5kKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gY3VycmVudFByb2plY3RJZCk7XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0LmNoZWNrbGlzdC5wdXNoKHRhc2spO1xuICAgICAgICBjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG4gICAgICAgIHJldHVyblxuICAgIH1cbiAgICBmdW5jdGlvbiByZXNldFRhc2tGb3JtKCkge1xuICAgICAgICBuZXdUYXNrTW9kYWwudGFza0RldGFpbHNJbnB1dC52YWx1ZSA9IG51bGw7XG4gICAgICAgIG5ld1Rhc2tNb2RhbC50aGVNb2RhbC5jbG9zZSgpO1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIEV2ZW50IGxpc3RlbmVycyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIGZ1bmN0aW9uIHByb2plY3RIZWFkZXJFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgcHJvamVjdHNIZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnb3Blbi1wcm9qZWN0LW1vZGFsLWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1Byb2plY3RNb2RhbC50aGVNb2RhbC5zaG93TW9kYWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3NvcnQtYnktbW9zdC1idG4nKSkge1xuICAgICAgICAgICAgICAgIHNvcnRCeU1vc3RUYWtzKCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdzb3J0LWJ5LWxlYXN0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgc29ydEJ5TGVhc3RUYWtzKCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvamVjdENhcmRFdmVudExpc3RlbmVycygpIHtcbiAgICAgICAgcHJvamVjdENhcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXByb2plY3QtYnRuJykpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcihwcm9qZWN0ID0+IHByb2plY3QuaWQgIT09IGUudGFyZ2V0LmRhdGFzZXQucHJvamVjdElkKTtcbiAgICAgICAgICAgICAgICByZW5kZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ3Byb2plY3QtY2FyZCcpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdHMuZmlsdGVyKHByb2plY3QgPT4gcHJvamVjdC5pZCA9PT0gZS50YXJnZXQuZGF0YXNldC5wcm9qZWN0SWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlbGVjdGVkUHJvamVjdCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyU2VsZWN0ZWRQcm9qZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjbG9zZS1wcm9qZWN0LWJ0bicpKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJFbGVtZW50cyhwcm9qZWN0Q2FyZENvbnRhaW5lcik7XG4gICAgICAgICAgICAgICAgcmVuZGVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdhZGQtbmV3LXRhc2stYnRuJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3VGFza01vZGFsLnRoZU1vZGFsLnNob3dNb2RhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnZGVsZXRlLXRhc2stYnRuJykpIHtcbiAgICAgICAgICAgICAgICBwcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgICAgICAgICBwcm9qZWN0LmNoZWNrbGlzdCA9IHByb2plY3QuY2hlY2tsaXN0LmZpbHRlcihsaXN0ID0+IGxpc3QuaWQgIT09IGUudGFyZ2V0LmRhdGFzZXQuY2hlY2tsaXN0SWQpICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICBzYXZlKCk7XG4gICAgICAgICAgICAgICAgcmVuZGVyU2VsZWN0ZWRQcm9qZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLyBIVE1MIHJlbmRlciBmdW5jdGlvbnMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgZnVuY3Rpb24gc2F2ZSgpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oTE9DQUxfU1RPUkFHRV9QUk9KRUNUU19LRVksIEpTT04uc3RyaW5naWZ5KHByb2plY3RzKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAgICAgc2F2ZSgpO1xuICAgICAgICBjbGVhckVsZW1lbnRzKHByb2plY3RDYXJkQ29udGFpbmVyKTtcbiAgICAgICAgY2xlYXJFbGVtZW50cyhwcm9qZWN0c0hlYWRlcik7XG4gICAgICAgIHJlbmRlclByb2plY3RzSGVhZGVyKCk7XG4gICAgICAgIHJlbmRlclByb2plY3RzKCk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGNsZWFyRWxlbWVudHMoZWxlbWVudCkge1xuICAgICAgICB3aGlsZShlbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLy0tLU1ha2VzIHRoZSBoZWFkZXIgb3ZlciB0aGUgbGlzdCBvZiBwcm9qZWN0c1xuICAgIGZ1bmN0aW9uIHJlbmRlclByb2plY3RzSGVhZGVyKCkge1xuICAgICAgICBsZXQgcHJvamVjdEhlYWRlclNvcnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdEhlYWRlclNvcnRDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1oZWFkZXItc29ydC1jb250YWluZXInKVxuICAgICAgICBwcm9qZWN0c0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lcilcblxuICAgICAgICBsZXQgcHJvamVjdEhlYWRlclRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBwcm9qZWN0SGVhZGVyVGl0bGUuaW5uZXJUZXh0ID0gXCJTb3J0IFByb2plY3RzXCI7XG4gICAgICAgIHByb2plY3RIZWFkZXJUaXRsZS5jbGFzc0xpc3QuYWRkKCdzb3J0LXByb2plY3QtbWVudS10aXRsZScpXG4gICAgICAgIHByb2plY3RIZWFkZXJTb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXJUaXRsZSk7XG5cbiAgICAgICAgbGV0IHNvcnRCeVRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHByb2plY3RIZWFkZXJTb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNvcnRCeVRhc2tzQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IHByb2plY3RIZWFkZXJUYXNrQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgIHByb2plY3RIZWFkZXJUYXNrQ291bnQuaW5uZXJUZXh0ID0gXCJUYXNrczpcIjtcbiAgICAgICAgc29ydEJ5VGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRlclRhc2tDb3VudCk7XG4gICAgICAgIGxldCBwcm9qZWN0U29ydEJ5TW9zdFRhc2tzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHByb2plY3RTb3J0QnlNb3N0VGFza3NCdG4uY2xhc3NMaXN0LmFkZCgnc29ydC1ieS1tb3N0LWJ0bicpXG4gICAgICAgIHByb2plY3RTb3J0QnlNb3N0VGFza3NCdG4uaW5uZXJUZXh0ID0gXCJNb3N0XCI7XG4gICAgICAgIHNvcnRCeVRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlNb3N0VGFza3NCdG4pO1xuICAgICAgICBsZXQgcHJvamVjdFNvcnRCeUxlYXN0VGFza3NCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgcHJvamVjdFNvcnRCeUxlYXN0VGFza3NCdG4uY2xhc3NMaXN0LmFkZCgnc29ydC1ieS1sZWFzdC1idG4nKVxuICAgICAgICBwcm9qZWN0U29ydEJ5TGVhc3RUYXNrc0J0bi5pbm5lclRleHQgPSBcIkxlYXN0XCI7XG4gICAgICAgIHNvcnRCeVRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlMZWFzdFRhc2tzQnRuKTtcblxuICAgICAgICBsZXQgc29ydEJ5UHJpb3JpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcHJvamVjdEhlYWRlclNvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc29ydEJ5UHJpb3JpdHlDb250YWluZXIpO1xuICAgICAgICBsZXQgcHJvamVjdFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBwcm9qZWN0UHJpb3JpdHkuaW5uZXJUZXh0ID0gXCJQcmlvcml0eTpcIjtcbiAgICAgICAgc29ydEJ5UHJpb3JpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdFByaW9yaXR5KTtcbiAgICAgICAgbGV0IHByb2plY3RTb3J0QnlIaWdoZXN0UHJpb3JpdHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgcHJvamVjdFNvcnRCeUhpZ2hlc3RQcmlvcml0eUJ0bi5pbm5lclRleHQgPSBcIkhpZ2hlc3RcIjtcbiAgICAgICAgc29ydEJ5UHJpb3JpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdFNvcnRCeUhpZ2hlc3RQcmlvcml0eUJ0bik7XG4gICAgICAgIGxldCBwcm9qZWN0U29ydEJ5TGVhc3RQcmlvcml0eUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBwcm9qZWN0U29ydEJ5TGVhc3RQcmlvcml0eUJ0bi5pbm5lclRleHQgPSBcIkxlYXN0XCI7XG4gICAgICAgIHNvcnRCeVByaW9yaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlMZWFzdFByaW9yaXR5QnRuKTtcblxuICAgICAgICBsZXQgc29ydEJ5RGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lci5hcHBlbmRDaGlsZChzb3J0QnlEYXRlQ29udGFpbmVyKTtcbiAgICAgICAgbGV0IHByb2plY3REdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICBwcm9qZWN0RHVlRGF0ZS5pbm5lclRleHQgPSBcIkRhdGU6XCI7XG4gICAgICAgIHNvcnRCeURhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdER1ZURhdGUpO1xuICAgICAgICBsZXQgcHJvamVjdFNvcnRCeUNsb3Nlc3REYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIHByb2plY3RTb3J0QnlDbG9zZXN0RGF0ZUJ0bi5pbm5lclRleHQgPSBcIkNsb3Nlc3RcIjtcbiAgICAgICAgc29ydEJ5RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0U29ydEJ5Q2xvc2VzdERhdGVCdG4pO1xuICAgICAgICBsZXQgcHJvamVjdFNvcnRCeUZhcnRoZXN0RGF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBwcm9qZWN0U29ydEJ5RmFydGhlc3REYXRlQnRuLmlubmVyVGV4dCA9IFwiRmFydGhlc3RcIjtcbiAgICAgICAgc29ydEJ5RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0U29ydEJ5RmFydGhlc3REYXRlQnRuKTtcblxuICAgICAgICBsZXQgb3BlblByb2plY3RNb2RhbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICBvcGVuUHJvamVjdE1vZGFsQnRuLmNsYXNzTGlzdC5hZGQoJ29wZW4tcHJvamVjdC1tb2RhbC1idG4nKVxuICAgICAgICBvcGVuUHJvamVjdE1vZGFsQnRuLmlubmVyVGV4dCA9IFwiKyBQcm9qZWN0XCI7XG4gICAgICAgIHByb2plY3RzSGVhZGVyLmFwcGVuZENoaWxkKG9wZW5Qcm9qZWN0TW9kYWxCdG4pO1xuICAgICAgICBcblxuICAgIH1cbiAgICAvLy0tLU1ha2VzIHRoZSBsaXN0IG9mIHByb2plY3RzXG4gICAgZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMoKSB7XG4gICAgICAgIHNvcnRlZFByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vQ3JlYXRlcyBDYXJkcyBmb3IgRWFjaCBQcm9qZWN0Ly8vLy8vLy8vLy8vLy9cbiAgICAgICAgICAgIGxldCBwcm9qZWN0Q2FyZERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcHJvamVjdENhcmREaXYuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1jYXJkJyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZERpdi5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZERpdik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGxldCBwcm9qZWN0Q2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkVGl0bGUuaW5uZXJUZXh0ID0gcHJvamVjdC50aXRsZTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkRGl2LmFwcGVuZENoaWxkKHByb2plY3RDYXJkVGl0bGUpO1xuXG4gICAgICAgICAgICBsZXQgcHJvamVjdENhcmRDaGVja2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZENoZWNrbGlzdC5pbm5lclRleHQgPSBgT3BlbiBUYXNrczogJHtwcm9qZWN0LmNoZWNrbGlzdC5sZW5ndGh9YDtcbiAgICAgICAgICAgIHByb2plY3RDYXJkRGl2LmFwcGVuZENoaWxkKHByb2plY3RDYXJkQ2hlY2tsaXN0KVxuXG4gICAgICAgICAgICBsZXQgcHJvamVjdENhcmRQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkUHJpb3JpdHkuaW5uZXJUZXh0ID0gYFByaW9yaXR5OiAke3Byb2plY3QucHJpb3JpdHl9YDtcbiAgICAgICAgICAgIHByb2plY3RDYXJkRGl2LmFwcGVuZENoaWxkKHByb2plY3RDYXJkUHJpb3JpdHkpXG5cbiAgICAgICAgICAgIGxldCBwcm9qZWN0Q2FyZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBwcm9qZWN0Q2FyZER1ZURhdGUuaW5uZXJUZXh0ID0gYENvbXBsZXRlIGJ5OiAke3Byb2plY3QuZHVlRGF0ZX1gO1xuICAgICAgICAgICAgcHJvamVjdENhcmREaXYuYXBwZW5kQ2hpbGQocHJvamVjdENhcmREdWVEYXRlKVxuXG4gICAgICAgICAgICAvLy8vLy8vLy8vLy8vLy9DcmVhdGUgRWRpdCBhbmQgRGVsZXRlIFByb2plY3RzIEJ1dHRvbnMvLy8vLy8vLy8vXG4gICAgICAgICAgICBsZXQgcHJvamVjdEJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgcHJvamVjdEJ0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdwcm9qZWN0LWJ0bi1jb250YWluZXInKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkRGl2LmFwcGVuZENoaWxkKHByb2plY3RCdG5Db250YWluZXIpXG5cbiAgICAgICAgICAgIGxldCBlZGl0UHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZWRpdFByb2plY3RCdG4uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XG4gICAgICAgICAgICBlZGl0UHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKCdlZGl0LXByb2plY3QtYnRuJyk7XG4gICAgICAgICAgICBwcm9qZWN0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRQcm9qZWN0QnRuKVxuXG4gICAgICAgICAgICBsZXQgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgZGVsZXRlUHJvamVjdEJ0bi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiXG4gICAgICAgICAgICBkZWxldGVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoJ2RlbGV0ZS1wcm9qZWN0LWJ0bicpO1xuICAgICAgICAgICAgZGVsZXRlUHJvamVjdEJ0bi5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XG4gICAgICAgICAgICBwcm9qZWN0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pXG4gICAgICAgIH0pXG4gICAgfVxuICAgIC8vLS0tTWFrZXMgdGhlIHNlbGVjdGVkIHByb2plY3QgZnVsbCBzY3JlZW5cbiAgICBmdW5jdGlvbiByZW5kZXJTZWxlY3RlZFByb2plY3QoKSB7XG4gICAgICAgIGNsZWFyRWxlbWVudHMocHJvamVjdENhcmRDb250YWluZXIpO1xuICAgICAgICBjbGVhckVsZW1lbnRzKHByb2plY3RzSGVhZGVyKTtcbiAgICAgICAgc2VsZWN0ZWRQcm9qZWN0LmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRQcm9qZWN0Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0Q2FyZC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1wcm9qZWN0LWNhcmQnKTtcbiAgICAgICAgICAgIHByb2plY3RDYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdENhcmQpO1xuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRQcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3RIZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtcHJvamVjdC1oZWFkZXInKTtcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdENhcmQuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0SGVhZGVyKTtcblxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkUHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKTtcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdFRpdGxlLmlubmVyVGV4dCA9IHByb2plY3QudGl0bGU7XG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3RIZWFkZXIuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0VGl0bGUpO1xuXG4gICAgICAgICAgICBsZXQgY2xvc2VQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgICAgICBjbG9zZVByb2plY3RCdG4uY2xhc3NMaXN0LmFkZCgnY2xvc2UtcHJvamVjdC1idG4nKTtcbiAgICAgICAgICAgIGNsb3NlUHJvamVjdEJ0bi5pbm5lclRleHQgPSBcIkJhY2sgdG8gUHJvamVjdCBMaXN0XCJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdEhlYWRlci5hcHBlbmRDaGlsZChjbG9zZVByb2plY3RCdG4pO1xuXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRQcm9qZWN0QXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdEFzaWRlLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLXByb2plY3QtYXNpZGUnKTtcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdENhcmQuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0QXNpZGUpO1xuXG4gICAgICAgICAgICBsZXQgcHJvamVjdERlYWRsaW5lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBwcm9qZWN0RGVhZGxpbmVDb250YWluZXIuY2xhc3NMaXN0LmFkZCgncHJvamVjdC1kZWFkbGluZS1jb250YWluZXInKTtcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdEFzaWRlLmFwcGVuZENoaWxkKHByb2plY3REZWFkbGluZUNvbnRhaW5lcik7XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFByb2plY3REdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0RHVlRGF0ZS5pbm5lclRleHQgPSBcIkR1ZTogXCIgKyBwcm9qZWN0LmR1ZURhdGU7XG4gICAgICAgICAgICBwcm9qZWN0RGVhZGxpbmVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0RHVlRGF0ZSk7XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFByb2plY3RQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdFByaW9yaXR5LmlubmVyVGV4dCA9IFwiUHJpb3JpdHk6IFwiICsgcHJvamVjdC5wcmlvcml0eTtcbiAgICAgICAgICAgIHByb2plY3REZWFkbGluZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RQcmlvcml0eSk7XG5cbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFByb2plY3RDYXJkRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3RDYXJkRGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZCgncHJvamVjdC1kZXNjcmlwdGlvbicpO1xuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0Q2FyZERlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHByb2plY3QuZGVzY3JpcHRpb247XG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3RBc2lkZS5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RDYXJkRGVzY3JpcHRpb24pO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1wcm9qZWN0LXRhc2stY29udGFpbmVyJyk7XG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3RDYXJkLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdFRhc2tDb250YWluZXIpO1xuXG4gICAgICAgICAgICAvLy0tLWZpbHRlciBhbmQgYWRkIHRhc2tzIHRvIHRhc2sgbGlzdFxuICAgICAgICAgICAgbGV0IHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdEZpbHRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0RmlsdGVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stZmlsdGVyLWNhcmQnKTtcblxuICAgICAgICAgICAgbGV0IGZpbHRlclRhc2tzQnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICBmaWx0ZXJUYXNrc0J0bkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdmaWx0ZXItdGFza3MtYnRuLWNvbnRhaW5lcicpXG4gICAgICAgICAgICBzZWxlY3RlZFByb2plY3RDaGVja2xpc3RGaWx0ZXIuYXBwZW5kQ2hpbGQoZmlsdGVyVGFza3NCdG5Db250YWluZXIpO1xuXG4gICAgICAgICAgICBsZXQgZmlsdGVyVGFza3NMYWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgICAgICAgIGZpbHRlclRhc2tzTGFibGUuaW5uZXJUZXh0ID0gXCJGaWx0ZXIgVGFza3M6XCJcbiAgICAgICAgICAgIGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGZpbHRlclRhc2tzTGFibGUpO1xuXG4gICAgICAgICAgICBsZXQgYWxsVGFza3NCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGFsbFRhc2tzQnRuLmlubmVyVGV4dCA9IFwiQWxsXCJcbiAgICAgICAgICAgIGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGFsbFRhc2tzQnRuKTtcblxuICAgICAgICAgICAgbGV0IG9wZW5UYXNrc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgb3BlblRhc2tzQnRuLmlubmVyVGV4dCA9IFwiT3BlblwiXG4gICAgICAgICAgICBmaWx0ZXJUYXNrc0J0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChvcGVuVGFza3NCdG4pO1xuXG4gICAgICAgICAgICBsZXQgY2xvc2VkVGFza3NCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGNsb3NlZFRhc2tzQnRuLmlubmVyVGV4dCA9IFwiQ2xvc2VkXCJcbiAgICAgICAgICAgIGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb3NlZFRhc2tzQnRuKTtcblxuICAgICAgICAgICAgbGV0IGFkZE5ld1Rhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICAgICAgICAgIGFkZE5ld1Rhc2tCdG4uZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0LmlkO1xuICAgICAgICAgICAgYWRkTmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKCdhZGQtbmV3LXRhc2stYnRuJyk7XG4gICAgICAgICAgICBhZGROZXdUYXNrQnRuLmlubmVyVGV4dCA9IFwiKyBUYXNrXCJcbiAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdEZpbHRlci5hcHBlbmRDaGlsZChhZGROZXdUYXNrQnRuKTtcblxuICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RDaGVja2xpc3RGaWx0ZXIpO1xuXG5cbiAgICAgICAgICAgIHByb2plY3QuY2hlY2tsaXN0LmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdC5jbGFzc0xpc3QuYWRkKCd0YXNrLWNhcmQnKTtcblxuICAgICAgICAgICAgICAgIGxldCB0YXNrT3B0aW9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhc2tPcHRpb25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3Rhc2stb3B0aW9ucy1jb250YWluZXInKTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFByb2plY3RDaGVja2xpc3QuYXBwZW5kQ2hpbGQodGFza09wdGlvbnNDb250YWluZXIpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tDaGVja2JveENvbmF0aW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIHRhc2tDaGVja2JveENvbmF0aW5lci5jbGFzc0xpc3QuYWRkKCd0YXNrLWNoZWNrYm94LWNvbmF0aW5lcicpO1xuICAgICAgICAgICAgICAgIHRhc2tPcHRpb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDaGVja2JveENvbmF0aW5lcilcblxuICAgICAgICAgICAgICAgIGxldCB0YXNrQ2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgIHRhc2tDaGVja0JveC50eXBlID0gXCJjaGVja2JveFwiO1xuICAgICAgICAgICAgICAgIHRhc2tDaGVja0JveC5pZCA9IHRhc2suaWQ7XG4gICAgICAgICAgICAgICAgdGFza0NoZWNrYm94Q29uYXRpbmVyLmFwcGVuZENoaWxkKHRhc2tDaGVja0JveCk7XG5cbiAgICAgICAgICAgICAgICBsZXQgY2hlY2tib3hEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJyk7XG4gICAgICAgICAgICAgICAgY2hlY2tib3hEZXNjcmlwdGlvbi5pbm5lclRleHQgPSBcIkNoZWNrIENvbXBsZXRlXCI7XG4gICAgICAgICAgICAgICAgY2hlY2tib3hEZXNjcmlwdGlvbi5odG1sRm9yID0gdGFzay5pZDtcbiAgICAgICAgICAgICAgICB0YXNrQ2hlY2tib3hDb25hdGluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3hEZXNjcmlwdGlvbik7XG5cbiAgICAgICAgICAgICAgICBsZXQgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZVRhc2tCdG4uY2xhc3NMaXN0LmFkZCgnZGVsZXRlLXRhc2stYnRuJyk7XG4gICAgICAgICAgICAgICAgZGVsZXRlVGFza0J0bi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiXG4gICAgICAgICAgICAgICAgZGVsZXRlVGFza0J0bi5kYXRhc2V0LmNoZWNrbGlzdElkID0gdGFzay5pZDtcbiAgICAgICAgICAgICAgICB0YXNrT3B0aW9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnRuKVxuXG4gICAgICAgICAgICAgICAgbGV0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgICAgICAgICAgICAgIHRhc2tUZXh0LmlubmVyVGV4dCA9IHRhc2sudGFza0RldGFpbHM7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0LmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcblxuXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RDaGVja2xpc3QpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vIFNvcnQgIGZ1bmN0aW9ucyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuICAgIC8vLS0tU29ydCBQcm9qZWN0c1xuICAgIGZ1bmN0aW9uIHNvcnRCeU1vc3RUYWtzKCkge1xuICAgICAgICBsZXQgcHJvamVjdHNCeU1vc3RUYXNrcyA9IHByb2plY3RzO1xuICAgICAgICBwcm9qZWN0c0J5TW9zdFRhc2tzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGIuY2hlY2tsaXN0Lmxlbmd0aCAtIGEuY2hlY2tsaXN0Lmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgc29ydGVkUHJvamVjdHMgPSBwcm9qZWN0c0J5TW9zdFRhc2tzXG4gICAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvcnRCeUxlYXN0VGFrcygpIHtcbiAgICAgICAgbGV0IHByb2plY3RzQnlMZWFzdFRhc2tzID0gcHJvamVjdHM7XG4gICAgICAgIHByb2plY3RzQnlMZWFzdFRhc2tzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEuY2hlY2tsaXN0Lmxlbmd0aCAtIGIuY2hlY2tsaXN0Lmxlbmd0aFxuICAgICAgICB9KTtcbiAgICAgICAgc29ydGVkUHJvamVjdHMgPSBwcm9qZWN0c0J5TGVhc3RUYXNrc1xuICAgICAgICByZXR1cm5cbiAgICB9XG5cblxuICAgIHJldHVybiB7XG4gICAgICAgIFxuICAgICAgICByZW5kZXJQcm9qZWN0c0hlYWRlcixcbiAgICAgICAgcmVuZGVyUHJvamVjdHMsXG4gICAgICAgIHJlbmRlclNlbGVjdGVkUHJvamVjdCxcbiAgICAgICAgcHJvamVjdEhlYWRlckV2ZW50TGlzdGVuZXJzLFxuICAgICAgICBwcm9qZWN0Q2FyZEV2ZW50TGlzdGVuZXJzLFxuICAgIH1cblxufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgbXlQcm9qZWN0cyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==