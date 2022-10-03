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
	const LOCAL_STORAGE_PROJECTS_KEY = "myProjectManager.Project";
	let projects =
		JSON.parse(localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)) || [];

	let projectCardContainer =
		_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].HTML_ANCHORS.projectCardContainer;
	let newProjectModal = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].newProjectModal;
	let newTaskModal = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].newTaskModal;
	let projectsHeader = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].HTML_ANCHORS.projectsHeader;

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

	let sortedProjects = projects;

	let selectedProject = [];

	const createProject = (title, description, dueDate, priority) => {
		return {
			id: Date.now().toString(),
			title: title,
			description: description,
			checklist: [],
			dueDate: dueDate,
			priority: priority,
		};
	};

	const creatChecklist = (taskDetails) => {
		return {
			id: Date.now().toString(),
			taskDetails: taskDetails,
			complete: false,
		};
	};

	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	/////////////// form interactions for adding a project /////////////////
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	newProjectModal.theModal.addEventListener("submit", (e) => {
		e.preventDefault();
	});

	newProjectModal.saveBtn.addEventListener("click", () => {
		pushFormInputToProjects();
		console.log(projects);
		render();
		return;
	});

	//---on form submit btn event - takes input value and pushes to projects array
	function pushFormInputToProjects() {
		let newProjectTitle = newProjectModal.titleInput.value;
		if (newProjectTitle === null || newProjectTitle === "") {
			return;
		}
		let newProjectDescription = newProjectModal.descriptionInput.value;
		let newProjectDueDate = newProjectModal.dueDateInput.value;

		let newProjectPriorityInput = document.querySelector(
			"input[type=radio][name=priority]:checked"
		);
		let newProjectPriority = newProjectPriorityInput.value;

		let project = createProject(
			newProjectTitle,
			newProjectDescription,
			newProjectDueDate,
			newProjectPriority
		);

		projects.push(project);
		resetProjectForm();
		return;
	}
	//---- resets project form to defalut
	function resetProjectForm() {
		newProjectModal.titleInput.value = null;
		newProjectModal.descriptionInput.value = null;
		newProjectModal.dueDateInput.value = null;
		let defaultPriority = document.getElementById("none");
		defaultPriority.checked = true;
		newProjectModal.theModal.close();
		return;
	}

	newTaskModal.theModal.addEventListener("submit", (e) => {
		e.preventDefault();
	});
	newTaskModal.saveBtn.addEventListener("click", () => {
		pushFormInputToTasks();
		resetTaskForm();
		save();
		clearElements(projectCardContainer);
		clearElements(projectsHeader);
		renderSelectedProject();
		return;
	});
	function pushFormInputToTasks() {
		let newTaskDetails = newTaskModal.taskDetailsInput.value;
		if (newTaskDetails === null || newTaskDetails === "") {
			return;
		}
		let task = creatChecklist(newTaskDetails);
		let openModalBtnId = document.querySelector(".add-new-task-btn");
		let currentProjectId = openModalBtnId.dataset.projectId;
		let currentProject = projects.find(
			(project) => project.id === currentProjectId
		);
		currentProject.checklist.push(task);
		console.log(projects);
		return;
	}
	function resetTaskForm() {
		newTaskModal.taskDetailsInput.value = null;
		newTaskModal.theModal.close();
		return;
	}

	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	///////////////////////// Event listeners //////////////////////////////
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////

	function projectHeaderEventListeners() {
		projectsHeader.addEventListener("click", (e) => {
			if (e.target.classList.contains("open-project-modal-btn")) {
				return newProjectModal.theModal.showModal();
			}
			if (e.target.classList.contains("sort-by-most-btn")) {
				sortByMostTaks();
				render();
			}
			if (e.target.classList.contains("sort-by-least-btn")) {
				sortByLeastTaks();
				render();
			}
		});
	}

	function projectCardEventListeners() {
		projectCardContainer.addEventListener("click", (e) => {
			if (e.target.classList.contains("delete-project-btn")) {
				projects = projects.filter(
					(project) => project.id !== e.target.dataset.projectId
				);
				render();
			}
			if (e.target.classList.contains("project-card")) {
				selectedProject = projects.filter(
					(project) => project.id === e.target.dataset.projectId
				);
				renderSelectedProject();
			}
			if (e.target.classList.contains("close-project-btn")) {
				clearElements(projectCardContainer);
				render();
			}
			if (e.target.classList.contains("add-new-task-btn")) {
				return newTaskModal.theModal.showModal();
			}
			if (
				e.target.classList.contains(
					"task-checkbox-conatiner" ||
						0 ||
						0
				)
			) {
				selectedProject[0].checklist.forEach((list) => {
					if (list.id === e.target.id) {
						list.complete = !list.complete;
					}
				});
				save();
				renderSelectedProject();
			}
			if (e.target.classList.contains("delete-task-btn")) {
				projects.forEach((project) => {
					project.checklist = project.checklist.filter(
						(list) => list.id !== e.target.dataset.checklistId
					);
				});
				save();
				renderSelectedProject();
			}
		});
	}

	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	/////////////////// HTML render functions //////////////////////////////
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	function save() {
		localStorage.setItem(
			LOCAL_STORAGE_PROJECTS_KEY,
			JSON.stringify(projects)
		);
	}
	function render() {
		save();
		clearElements(projectCardContainer);
		clearElements(projectsHeader);
		renderProjectsHeader();
		renderProjects();
	}

	function clearElements(element) {
		while (element.firstChild) {
			element.removeChild(element.firstChild);
		}
	}
	//---Makes the header over the list of projects
	function renderProjectsHeader() {
		let projectHeaderSortContainer = document.createElement("div");
		projectHeaderSortContainer.classList.add(
			"project-header-sort-container"
		);
		projectsHeader.appendChild(projectHeaderSortContainer);

		let projectHeaderTitle = document.createElement("p");
		projectHeaderTitle.innerText = "Sort Projects";
		projectHeaderTitle.classList.add("sort-project-menu-title");
		projectHeaderSortContainer.appendChild(projectHeaderTitle);

		let sortByTasksContainer = document.createElement("div");
		projectHeaderSortContainer.appendChild(sortByTasksContainer);
		let projectHeaderTaskCount = document.createElement("p");
		projectHeaderTaskCount.innerText = "Tasks:";
		sortByTasksContainer.appendChild(projectHeaderTaskCount);
		let projectSortByMostTasksBtn = document.createElement("button");
		projectSortByMostTasksBtn.classList.add("sort-by-most-btn");
		projectSortByMostTasksBtn.innerText = "Most";
		sortByTasksContainer.appendChild(projectSortByMostTasksBtn);
		let projectSortByLeastTasksBtn = document.createElement("button");
		projectSortByLeastTasksBtn.classList.add("sort-by-least-btn");
		projectSortByLeastTasksBtn.innerText = "Least";
		sortByTasksContainer.appendChild(projectSortByLeastTasksBtn);

		let sortByPriorityContainer = document.createElement("div");
		projectHeaderSortContainer.appendChild(sortByPriorityContainer);
		let projectPriority = document.createElement("p");
		projectPriority.innerText = "Priority:";
		sortByPriorityContainer.appendChild(projectPriority);
		let projectSortByHighestPriorityBtn = document.createElement("button");
		projectSortByHighestPriorityBtn.innerText = "Highest";
		sortByPriorityContainer.appendChild(projectSortByHighestPriorityBtn);
		let projectSortByLeastPriorityBtn = document.createElement("button");
		projectSortByLeastPriorityBtn.innerText = "Least";
		sortByPriorityContainer.appendChild(projectSortByLeastPriorityBtn);

		let sortByDateContainer = document.createElement("div");
		projectHeaderSortContainer.appendChild(sortByDateContainer);
		let projectDueDate = document.createElement("p");
		projectDueDate.innerText = "Date:";
		sortByDateContainer.appendChild(projectDueDate);
		let projectSortByClosestDateBtn = document.createElement("button");
		projectSortByClosestDateBtn.innerText = "Closest";
		sortByDateContainer.appendChild(projectSortByClosestDateBtn);
		let projectSortByFarthestDateBtn = document.createElement("button");
		projectSortByFarthestDateBtn.innerText = "Farthest";
		sortByDateContainer.appendChild(projectSortByFarthestDateBtn);

		let openProjectModalBtn = document.createElement("button");
		openProjectModalBtn.classList.add("open-project-modal-btn");
		openProjectModalBtn.innerText = "+ Project";
		projectsHeader.appendChild(openProjectModalBtn);
	}
	//---Makes the list of projects
	function renderProjects() {
		sortedProjects.forEach((project) => {
			///////////////////Creates Cards for Each Project//////////////
			let projectCardDiv = document.createElement("div");
			projectCardDiv.classList.add("project-card");
			projectCardDiv.dataset.projectId = project.id;
			projectCardContainer.appendChild(projectCardDiv);

			let projectCardTitle = document.createElement("h3");
			projectCardTitle.innerText = project.title;
			projectCardDiv.appendChild(projectCardTitle);

			let projectCardChecklist = document.createElement("p");
			projectCardChecklist.innerText = `Tasks: ${project.checklist.length}`;
			projectCardDiv.appendChild(projectCardChecklist);

			let projectCardPriority = document.createElement("p");
			projectCardPriority.innerText = `Priority: ${project.priority}`;
			projectCardDiv.appendChild(projectCardPriority);

			let projectCardDueDate = document.createElement("p");
			projectCardDueDate.innerText = `Complete by: ${project.dueDate}`;
			projectCardDiv.appendChild(projectCardDueDate);

			///////////////Create Edit and Delete Projects Buttons//////////
			let projectBtnContainer = document.createElement("div");
			projectBtnContainer.classList.add("project-btn-container");
			projectCardDiv.appendChild(projectBtnContainer);

			let editProjectBtn = document.createElement("button");
			editProjectBtn.innerText = "Edit";
			editProjectBtn.classList.add("edit-project-btn");
			projectBtnContainer.appendChild(editProjectBtn);

			let deleteProjectBtn = document.createElement("button");
			deleteProjectBtn.innerText = "Delete";
			deleteProjectBtn.classList.add("delete-project-btn");
			deleteProjectBtn.dataset.projectId = project.id;
			projectBtnContainer.appendChild(deleteProjectBtn);
		});
	}
	//---Makes the selected project full screen
	function renderSelectedProject() {
		clearElements(projectCardContainer);
		clearElements(projectsHeader);
		selectedProject.forEach((project) => {
			let selectedProjectCard = document.createElement("div");
			selectedProjectCard.classList.add("selected-project-card");
			projectCardContainer.appendChild(selectedProjectCard);

			let selectedProjectHeader = document.createElement("div");
			selectedProjectHeader.classList.add("selected-project-header");
			selectedProjectCard.appendChild(selectedProjectHeader);

			let selectedProjectTitle = document.createElement("h3");
			selectedProjectTitle.innerText = project.title;
			selectedProjectHeader.appendChild(selectedProjectTitle);

			let closeProjectBtn = document.createElement("button");
			closeProjectBtn.classList.add("close-project-btn");
			closeProjectBtn.innerText = "Back to Project List";
			selectedProjectHeader.appendChild(closeProjectBtn);

			let selectedProjectAside = document.createElement("div");
			selectedProjectAside.classList.add("selected-project-aside");
			selectedProjectCard.appendChild(selectedProjectAside);

			let projectDeadlineContainer = document.createElement("div");
			projectDeadlineContainer.classList.add(
				"project-deadline-container"
			);
			selectedProjectAside.appendChild(projectDeadlineContainer);

			let selectedProjectDueDate = document.createElement("p");
			selectedProjectDueDate.innerText = "Due: " + project.dueDate;
			projectDeadlineContainer.appendChild(selectedProjectDueDate);

			let selectedProjectPriority = document.createElement("p");
			selectedProjectPriority.innerText = "Priority: " + project.priority;
			projectDeadlineContainer.appendChild(selectedProjectPriority);

			let selectedProjectCardDescription = document.createElement("p");
			selectedProjectCardDescription.classList.add("project-description");
			selectedProjectCardDescription.innerText = project.description;
			selectedProjectAside.appendChild(selectedProjectCardDescription);

			let selectedProjectTaskContainer = document.createElement("div");
			selectedProjectTaskContainer.classList.add(
				"selected-project-task-container"
			);
			selectedProjectCard.appendChild(selectedProjectTaskContainer);

			//---filter and add tasks to task list
			let selectedProjectChecklistFilter = document.createElement("div");
			selectedProjectChecklistFilter.classList.add("task-filter-card");

			let filterTasksBtnContainer = document.createElement("div");
			filterTasksBtnContainer.classList.add("filter-tasks-btn-container");
			selectedProjectChecklistFilter.appendChild(filterTasksBtnContainer);

			let filterTasksLable = document.createElement("p");
			filterTasksLable.innerText = "Filter Tasks:";
			filterTasksBtnContainer.appendChild(filterTasksLable);

			let allTasksBtn = document.createElement("button");
			allTasksBtn.innerText = "All";
			filterTasksBtnContainer.appendChild(allTasksBtn);

			let openTasksBtn = document.createElement("button");
			openTasksBtn.innerText = "Open";
			filterTasksBtnContainer.appendChild(openTasksBtn);

			let closedTasksBtn = document.createElement("button");
			closedTasksBtn.innerText = "Closed";
			filterTasksBtnContainer.appendChild(closedTasksBtn);

			let addNewTaskBtn = document.createElement("button");
			addNewTaskBtn.dataset.projectId = project.id;
			addNewTaskBtn.classList.add("add-new-task-btn");
			addNewTaskBtn.innerText = "+ Task";
			selectedProjectChecklistFilter.appendChild(addNewTaskBtn);

			selectedProjectTaskContainer.appendChild(
				selectedProjectChecklistFilter
			);

			project.checklist.forEach((task) => {
				let selectedProjectChecklist = document.createElement("div");
				selectedProjectChecklist.classList.add("task-card");
				if (task.complete) {
					selectedProjectChecklist.classList.add("complete");
				}

				let taskOptionsContainer = document.createElement("div");
				taskOptionsContainer.classList.add("task-options-container");
				selectedProjectChecklist.appendChild(taskOptionsContainer);

				let taskCheckboxConatiner = document.createElement("div");
				taskCheckboxConatiner.classList.add("task-checkbox-conatiner");
				taskCheckboxConatiner.id = task.id;
				taskOptionsContainer.appendChild(taskCheckboxConatiner);

				let taskCheckBox = document.createElement("input");
				taskCheckBox.type = "checkbox";
				taskCheckBox.classList.add("task-checkbox");
				taskCheckBox.id = task.id;
				if (task.complete) {
					taskCheckBox.checked = true;
				}
				taskCheckboxConatiner.appendChild(taskCheckBox);

				let checkboxDescription = document.createElement("label");
				checkboxDescription.innerText = "Check Complete";
				checkboxDescription.classList.add("task-checkbox-label");
				checkboxDescription.htmlFor = task.id;
				taskCheckboxConatiner.appendChild(checkboxDescription);

				let deleteTaskBtn = document.createElement("button");
				deleteTaskBtn.classList.add("delete-task-btn");
				deleteTaskBtn.innerText = "Delete";
				deleteTaskBtn.dataset.checklistId = task.id;
				taskOptionsContainer.appendChild(deleteTaskBtn);

				let taskText = document.createElement("p");
				taskText.innerText = task.taskDetails;
				if (task.complete) {
					taskText.classList.add("complete");
				}
				selectedProjectChecklist.appendChild(taskText);

				selectedProjectTaskContainer.appendChild(
					selectedProjectChecklist
				);
			});
		});
	}

	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	/////////////////////// Sort  functions ////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	//---Sort Projects
	function sortByMostTaks() {
		let projectsByMostTasks = projects;
		projectsByMostTasks.sort(function (a, b) {
			return b.checklist.length - a.checklist.length;
		});
		sortedProjects = projectsByMostTasks;
		return;
	}

	function sortByLeastTaks() {
		let projectsByLeastTasks = projects;
		projectsByLeastTasks.sort(function (a, b) {
			return a.checklist.length - b.checklist.length;
		});
		sortedProjects = projectsByLeastTasks;
		return;
	}

	return {
		renderProjectsHeader,
		renderProjects,
		renderSelectedProject,
		projectHeaderEventListeners,
		projectCardEventListeners,
	};
})();

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (myProjects);


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/script.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7O0FBSUQsaUVBQWU7Ozs7Ozs7Ozs7Ozs7OztBQzFDZ0M7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxFQUFFLHlGQUFpRDtBQUNuRCx1QkFBdUIsdUVBQStCO0FBQ3RELG9CQUFvQixvRUFBNEI7QUFDaEQsc0JBQXNCLG1GQUEyQzs7QUFFakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sQ0FBcUI7QUFDM0IsTUFBTSxDQUFlO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMseUJBQXlCO0FBQ3ZFOztBQUVBO0FBQ0EsZ0RBQWdELGlCQUFpQjtBQUNqRTs7QUFFQTtBQUNBLGtEQUFrRCxnQkFBZ0I7QUFDbEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxVQUFVLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXItZGFzaGJvYXJkLy4vc3JjL0RPTUVsZW1lbnRzLmpzIiwid2VicGFjazovL3Byb2plY3QtbWFuYWdlci1kYXNoYm9hcmQvLi9zcmMvc2NyaXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZpbmRET01FbGVtZW50cyA9IChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IEhUTUxfQU5DSE9SUyA9IHtcbiAgICAgICAgcHJvamVjdHNIZWFkZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0cy1saXN0LWhlYWRlcicpLFxuICAgICAgICBwcm9qZWN0Q2FyZENvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtY2FyZC1jb250YWluZXInKSxcbiAgICB9XG5cblxuICAgIGNvbnN0IG5ld1Byb2plY3RNb2RhbCA9IHtcbiAgICAgICAgXG4gICAgICAgIG9wZW5Nb2RhbEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW4tcHJvamVjdC1tb2RhbC1idG4nKSxcbiAgICAgICAgdGhlTW9kYWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtbmV3LXByb2plY3QtbW9kYWwnKSxcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLW1vZGFsIGZvcm0gaW5wdXRzXG4gICAgICAgIHRpdGxlSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0X3RpdGxlJyksXG4gICAgICAgIGRlc2NyaXB0aW9uSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0X2Rlc2NyaXB0aW9uJyksXG4gICAgICAgIGR1ZURhdGVJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1ZV9kYXRlJyksXG4gICAgICAgIHNhdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzYXZlLXByb2plY3QnKSxcblxuICAgICAgICAvLy8vLy8vLyByYWRpbyBpbnB1dCBpcyBmb3VuZCB3aXRoaW4gc3VibWl0IGV2ZW50IC8vLy8vLy8vLy8vXG4gICAgfTtcblxuICAgIGNvbnN0IG5ld1Rhc2tNb2RhbCA9IHtcbiAgICAgICAgXG4gICAgICAgIG9wZW5Nb2RhbEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFkZC1uZXctdGFzay1idG4nKSxcbiAgICAgICAgdGhlTW9kYWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhZGQtbmV3LXRhc2stbW9kYWwnKSxcblxuICAgICAgICAvLy0tLS0tLS0tLS0tLW1vZGFsIGZvcm0gaW5wdXRzXG4gICAgICAgIHRhc2tEZXRhaWxzSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YXNrX2RldGFpbHMnKSxcbiAgICAgICAgc2F2ZUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtdGFzaycpLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBIVE1MX0FOQ0hPUlMsXG4gICAgICAgIG5ld1Byb2plY3RNb2RhbCxcbiAgICAgICAgbmV3VGFza01vZGFsLFxuICAgIH1cbiAgICAgXG59KSgpO1xuXG5cblxuZXhwb3J0IGRlZmF1bHQgZmluZERPTUVsZW1lbnRzIiwiaW1wb3J0IGZpbmRET01FbGVtZW50cyBmcm9tIFwiLi9ET01FbGVtZW50cy5qc1wiO1xuXG4vKllvdXIgdG9kbyBsaXN0IHNob3VsZCBoYXZlIHByb2plY3RzIG9yIHNlcGFyYXRlIGxpc3RzIG9mIHRvZG9zLiBXaGVuIGEgdXNlciBmaXJzdCBvcGVucyB0aGUgYXBwLCB0aGVyZSBzaG91bGQgYmUgc29tZSBzb3J0IG9mIOKAmGRlZmF1bHTigJkgcHJvamVjdCB0byB3aGljaCBhbGwgb2YgdGhlaXIgdG9kb3MgYXJlIHB1dC4gVXNlcnMgc2hvdWxkIGJlIGFibGUgdG8gY3JlYXRlIG5ldyBwcm9qZWN0cyBhbmQgY2hvb3NlIHdoaWNoIHByb2plY3QgdGhlaXIgdG9kb3MgZ28gaW50by4gKi9cbmNvbnN0IG15UHJvamVjdHMgPSAoZnVuY3Rpb24gKCkge1xuXHRjb25zdCBMT0NBTF9TVE9SQUdFX1BST0pFQ1RTX0tFWSA9IFwibXlQcm9qZWN0TWFuYWdlci5Qcm9qZWN0XCI7XG5cdGxldCBwcm9qZWN0cyA9XG5cdFx0SlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX1BST0pFQ1RTX0tFWSkpIHx8IFtdO1xuXG5cdGxldCBwcm9qZWN0Q2FyZENvbnRhaW5lciA9XG5cdFx0ZmluZERPTUVsZW1lbnRzLkhUTUxfQU5DSE9SUy5wcm9qZWN0Q2FyZENvbnRhaW5lcjtcblx0bGV0IG5ld1Byb2plY3RNb2RhbCA9IGZpbmRET01FbGVtZW50cy5uZXdQcm9qZWN0TW9kYWw7XG5cdGxldCBuZXdUYXNrTW9kYWwgPSBmaW5kRE9NRWxlbWVudHMubmV3VGFza01vZGFsO1xuXHRsZXQgcHJvamVjdHNIZWFkZXIgPSBmaW5kRE9NRWxlbWVudHMuSFRNTF9BTkNIT1JTLnByb2plY3RzSGVhZGVyO1xuXG5cdC8qbGV0IHByb2plY3RzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCIxMjM0NTY3ODlcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlIGlkXG4gICAgICAgICAgICB0aXRsZTogXCJQcm9qZWN0IFdpdGggYSBDb29sIE5hbWVcIiwgLy91c2VyIGlucHV0IGZyb20gaHRtbCBmb3JtXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBIGRlc2NyaXB0aW9uIG9mIHRoZSBwcm9qZWN0XCIsIC8vdXNlciBpbnB1dCBmcm9tIGh0bWwgZm9ybVxuICAgICAgICAgICAgY2hlY2tsaXN0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlciBpZFxuICAgICAgICAgICAgICAgICAgICB0YXNrRGV0YWlsczogXCJcIiwgLy91c2VyIGlucHV0IGZyb20gYSBodG1sIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLCAvLyB1c2VyIGNsaWNrIHRvIHRvZ2dsZSBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZHVlRGF0ZTogXCIwNy8wMS8yMlwiLCAvLyB1c2VyIGlucHV0XG4gICAgICAgICAgICBwcmlvcml0eTogXCJIaWdoXCIsIC8vIHVzZXIgaW5wdXQgKG1heWJlIGRvIGEgYmFja2dyb3VuZCBjb2xvciBncmFkaWFudCB0byBzaG93IHByaW9yaXR5IGxldmVsLiBhbHNvIG1ha2UgYSBzb3J0IGZ1bmN0aW9uIHRvIHNob3cgdGFza3MgaW4gdGhhdCBwcmlvcml0eSByYW5nZSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiMTIzNDU2Nzg5XCIsIC8vcHVsbCB0aW1lIHN0YW1wIHRvIG1ha2UgYSB1bmlxZSBpZFxuICAgICAgICAgICAgdGl0bGU6IFwiUHJvamVjdCBXaXRoIGEgQ29vbCBOYW1lXCIsIC8vdXNlciBpbnB1dCBmcm9tIGh0bWwgZm9ybVxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQSBkZXNjcmlwdGlvbiBvZiB0aGUgcHJvamVjdFwiLCAvL3VzZXIgaW5wdXQgZnJvbSBodG1sIGZvcm1cbiAgICAgICAgICAgIGNoZWNrbGlzdDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsIC8vcHVsbCB0aW1lIHN0YW1wIHRvIG1ha2UgYSB1bmlxZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgdGFza0RldGFpbHM6IFwiXCIsIC8vdXNlciBpbnB1dCBmcm9tIGEgaHRtbCBmb3JtXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSwgLy8gdXNlciBjbGljayB0byB0b2dnbGUgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWVyIGlkXG4gICAgICAgICAgICAgICAgICAgIHRhc2tEZXRhaWxzOiBcIlwiLCAvL3VzZXIgaW5wdXQgZnJvbSBhIGh0bWwgZm9ybVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsIC8vIHVzZXIgY2xpY2sgdG8gdG9nZ2xlIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlciBpZFxuICAgICAgICAgICAgICAgICAgICB0YXNrRGV0YWlsczogXCJcIiwgLy91c2VyIGlucHV0IGZyb20gYSBodG1sIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLCAvLyB1c2VyIGNsaWNrIHRvIHRvZ2dsZSBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZHVlRGF0ZTogXCIwNy8wMS8yMlwiLCAvLyB1c2VyIGlucHV0XG4gICAgICAgICAgICBwcmlvcml0eTogXCJIaWdoXCIsIC8vIHVzZXIgaW5wdXQgKG1heWJlIGRvIGEgYmFja2dyb3VuZCBjb2xvciBncmFkaWFudCB0byBzaG93IHByaW9yaXR5IGxldmVsLiBhbHNvIG1ha2UgYSBzb3J0IGZ1bmN0aW9uIHRvIHNob3cgdGFza3MgaW4gdGhhdCBwcmlvcml0eSByYW5nZSlcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgaWQ6IFwiNTY0NjU0OTg3XCIsIC8vcHVsbCB0aW1lIHN0YW1wIHRvIG1ha2UgYSB1bmlxZSBpZFxuICAgICAgICAgICAgdGl0bGU6IFwiTWVoIFByb2plY3RcIiwgLy91c2VyIGlucHV0IGZyb20gaHRtbCBmb3JtXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzaWNpbmcgZWxpdC4gTmVtbywgaXVyZSBwZXJmZXJlbmRpcyBpcHNhbSBwb3NzaW11cyBpcHN1bSwgYW1ldCBpZCBxdWFzIGNvcnJ1cHRpIGV1bSBuYW0gaWxsdW0gcXVpIHJlY3VzYW5kYWUgbWludXMgY3VwaWRpdGF0ZSBhc3N1bWVuZGEgaW4gcmVwcmVoZW5kZXJpdD8gQXNwZXJpb3JlcyBxdW9zIHBvc3NpbXVzIGV2ZW5pZXQgdm9sdXB0YXRlcyBpcHNhIGFwZXJpYW0gbmVtbyBleGNlcHR1cmkgZGlnbmlzc2ltb3MgYWNjdXNhbXVzIGRpc3RpbmN0aW8/XCIsIC8vdXNlciBpbnB1dCBmcm9tIGh0bWwgZm9ybVxuICAgICAgICAgICAgY2hlY2tsaXN0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlciBpZFxuICAgICAgICAgICAgICAgICAgICB0YXNrRGV0YWlsczogXCJzb21lIHNhbXBsZSB0ZXh0XCIsIC8vdXNlciBpbnB1dCBmcm9tIGEgaHRtbCBmb3JtXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSwgLy8gdXNlciBjbGljayB0byB0b2dnbGUgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWVyIGlkXG4gICAgICAgICAgICAgICAgICAgIHRhc2tEZXRhaWxzOiBcInNvbWUgbW9yZSBzYW1wbGUgdGV4dFwiLCAvL3VzZXIgaW5wdXQgZnJvbSBhIGh0bWwgZm9ybVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsIC8vIHVzZXIgY2xpY2sgdG8gdG9nZ2xlIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkdWVEYXRlOiBcIjA3LzAxLzIyXCIsIC8vIHVzZXIgaW5wdXRcbiAgICAgICAgICAgIHByaW9yaXR5OiBcIkxvd1wiLCAvLyB1c2VyIGlucHV0IChtYXliZSBkbyBhIGJhY2tncm91bmQgY29sb3IgZ3JhZGlhbnQgdG8gc2hvdyBwcmlvcml0eSBsZXZlbC4gYWxzbyBtYWtlIGEgc29ydCBmdW5jdGlvbiB0byBzaG93IHRhc2tzIGluIHRoYXQgcHJpb3JpdHkgcmFuZ2UpXG4gICAgICAgIH1cbiAgICBdOyAqL1xuXG5cdGxldCBzb3J0ZWRQcm9qZWN0cyA9IHByb2plY3RzO1xuXG5cdGxldCBzZWxlY3RlZFByb2plY3QgPSBbXTtcblxuXHRjb25zdCBjcmVhdGVQcm9qZWN0ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcblx0XHRcdHRpdGxlOiB0aXRsZSxcblx0XHRcdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcblx0XHRcdGNoZWNrbGlzdDogW10sXG5cdFx0XHRkdWVEYXRlOiBkdWVEYXRlLFxuXHRcdFx0cHJpb3JpdHk6IHByaW9yaXR5LFxuXHRcdH07XG5cdH07XG5cblx0Y29uc3QgY3JlYXRDaGVja2xpc3QgPSAodGFza0RldGFpbHMpID0+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcblx0XHRcdHRhc2tEZXRhaWxzOiB0YXNrRGV0YWlscyxcblx0XHRcdGNvbXBsZXRlOiBmYWxzZSxcblx0XHR9O1xuXHR9O1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vIGZvcm0gaW50ZXJhY3Rpb25zIGZvciBhZGRpbmcgYSBwcm9qZWN0IC8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0bmV3UHJvamVjdE1vZGFsLnRoZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH0pO1xuXG5cdG5ld1Byb2plY3RNb2RhbC5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0cHVzaEZvcm1JbnB1dFRvUHJvamVjdHMoKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdFx0cmVuZGVyKCk7XG5cdFx0cmV0dXJuO1xuXHR9KTtcblxuXHQvLy0tLW9uIGZvcm0gc3VibWl0IGJ0biBldmVudCAtIHRha2VzIGlucHV0IHZhbHVlIGFuZCBwdXNoZXMgdG8gcHJvamVjdHMgYXJyYXlcblx0ZnVuY3Rpb24gcHVzaEZvcm1JbnB1dFRvUHJvamVjdHMoKSB7XG5cdFx0bGV0IG5ld1Byb2plY3RUaXRsZSA9IG5ld1Byb2plY3RNb2RhbC50aXRsZUlucHV0LnZhbHVlO1xuXHRcdGlmIChuZXdQcm9qZWN0VGl0bGUgPT09IG51bGwgfHwgbmV3UHJvamVjdFRpdGxlID09PSBcIlwiKSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGxldCBuZXdQcm9qZWN0RGVzY3JpcHRpb24gPSBuZXdQcm9qZWN0TW9kYWwuZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcblx0XHRsZXQgbmV3UHJvamVjdER1ZURhdGUgPSBuZXdQcm9qZWN0TW9kYWwuZHVlRGF0ZUlucHV0LnZhbHVlO1xuXG5cdFx0bGV0IG5ld1Byb2plY3RQcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdFwiaW5wdXRbdHlwZT1yYWRpb11bbmFtZT1wcmlvcml0eV06Y2hlY2tlZFwiXG5cdFx0KTtcblx0XHRsZXQgbmV3UHJvamVjdFByaW9yaXR5ID0gbmV3UHJvamVjdFByaW9yaXR5SW5wdXQudmFsdWU7XG5cblx0XHRsZXQgcHJvamVjdCA9IGNyZWF0ZVByb2plY3QoXG5cdFx0XHRuZXdQcm9qZWN0VGl0bGUsXG5cdFx0XHRuZXdQcm9qZWN0RGVzY3JpcHRpb24sXG5cdFx0XHRuZXdQcm9qZWN0RHVlRGF0ZSxcblx0XHRcdG5ld1Byb2plY3RQcmlvcml0eVxuXHRcdCk7XG5cblx0XHRwcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuXHRcdHJlc2V0UHJvamVjdEZvcm0oKTtcblx0XHRyZXR1cm47XG5cdH1cblx0Ly8tLS0tIHJlc2V0cyBwcm9qZWN0IGZvcm0gdG8gZGVmYWx1dFxuXHRmdW5jdGlvbiByZXNldFByb2plY3RGb3JtKCkge1xuXHRcdG5ld1Byb2plY3RNb2RhbC50aXRsZUlucHV0LnZhbHVlID0gbnVsbDtcblx0XHRuZXdQcm9qZWN0TW9kYWwuZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IG51bGw7XG5cdFx0bmV3UHJvamVjdE1vZGFsLmR1ZURhdGVJbnB1dC52YWx1ZSA9IG51bGw7XG5cdFx0bGV0IGRlZmF1bHRQcmlvcml0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibm9uZVwiKTtcblx0XHRkZWZhdWx0UHJpb3JpdHkuY2hlY2tlZCA9IHRydWU7XG5cdFx0bmV3UHJvamVjdE1vZGFsLnRoZU1vZGFsLmNsb3NlKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bmV3VGFza01vZGFsLnRoZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH0pO1xuXHRuZXdUYXNrTW9kYWwuc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdHB1c2hGb3JtSW5wdXRUb1Rhc2tzKCk7XG5cdFx0cmVzZXRUYXNrRm9ybSgpO1xuXHRcdHNhdmUoKTtcblx0XHRjbGVhckVsZW1lbnRzKHByb2plY3RDYXJkQ29udGFpbmVyKTtcblx0XHRjbGVhckVsZW1lbnRzKHByb2plY3RzSGVhZGVyKTtcblx0XHRyZW5kZXJTZWxlY3RlZFByb2plY3QoKTtcblx0XHRyZXR1cm47XG5cdH0pO1xuXHRmdW5jdGlvbiBwdXNoRm9ybUlucHV0VG9UYXNrcygpIHtcblx0XHRsZXQgbmV3VGFza0RldGFpbHMgPSBuZXdUYXNrTW9kYWwudGFza0RldGFpbHNJbnB1dC52YWx1ZTtcblx0XHRpZiAobmV3VGFza0RldGFpbHMgPT09IG51bGwgfHwgbmV3VGFza0RldGFpbHMgPT09IFwiXCIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IHRhc2sgPSBjcmVhdENoZWNrbGlzdChuZXdUYXNrRGV0YWlscyk7XG5cdFx0bGV0IG9wZW5Nb2RhbEJ0bklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtbmV3LXRhc2stYnRuXCIpO1xuXHRcdGxldCBjdXJyZW50UHJvamVjdElkID0gb3Blbk1vZGFsQnRuSWQuZGF0YXNldC5wcm9qZWN0SWQ7XG5cdFx0bGV0IGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHMuZmluZChcblx0XHRcdChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBjdXJyZW50UHJvamVjdElkXG5cdFx0KTtcblx0XHRjdXJyZW50UHJvamVjdC5jaGVja2xpc3QucHVzaCh0YXNrKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGZ1bmN0aW9uIHJlc2V0VGFza0Zvcm0oKSB7XG5cdFx0bmV3VGFza01vZGFsLnRhc2tEZXRhaWxzSW5wdXQudmFsdWUgPSBudWxsO1xuXHRcdG5ld1Rhc2tNb2RhbC50aGVNb2RhbC5jbG9zZSgpO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBFdmVudCBsaXN0ZW5lcnMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXHRmdW5jdGlvbiBwcm9qZWN0SGVhZGVyRXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0cHJvamVjdHNIZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwib3Blbi1wcm9qZWN0LW1vZGFsLWJ0blwiKSkge1xuXHRcdFx0XHRyZXR1cm4gbmV3UHJvamVjdE1vZGFsLnRoZU1vZGFsLnNob3dNb2RhbCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNvcnQtYnktbW9zdC1idG5cIikpIHtcblx0XHRcdFx0c29ydEJ5TW9zdFRha3MoKTtcblx0XHRcdFx0cmVuZGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic29ydC1ieS1sZWFzdC1idG5cIikpIHtcblx0XHRcdFx0c29ydEJ5TGVhc3RUYWtzKCk7XG5cdFx0XHRcdHJlbmRlcigpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gcHJvamVjdENhcmRFdmVudExpc3RlbmVycygpIHtcblx0XHRwcm9qZWN0Q2FyZENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtcHJvamVjdC1idG5cIikpIHtcblx0XHRcdFx0cHJvamVjdHMgPSBwcm9qZWN0cy5maWx0ZXIoXG5cdFx0XHRcdFx0KHByb2plY3QpID0+IHByb2plY3QuaWQgIT09IGUudGFyZ2V0LmRhdGFzZXQucHJvamVjdElkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlbmRlcigpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInByb2plY3QtY2FyZFwiKSkge1xuXHRcdFx0XHRzZWxlY3RlZFByb2plY3QgPSBwcm9qZWN0cy5maWx0ZXIoXG5cdFx0XHRcdFx0KHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IGUudGFyZ2V0LmRhdGFzZXQucHJvamVjdElkXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlbmRlclNlbGVjdGVkUHJvamVjdCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNsb3NlLXByb2plY3QtYnRuXCIpKSB7XG5cdFx0XHRcdGNsZWFyRWxlbWVudHMocHJvamVjdENhcmRDb250YWluZXIpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGQtbmV3LXRhc2stYnRuXCIpKSB7XG5cdFx0XHRcdHJldHVybiBuZXdUYXNrTW9kYWwudGhlTW9kYWwuc2hvd01vZGFsKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcblx0XHRcdFx0XHRcInRhc2stY2hlY2tib3gtY29uYXRpbmVyXCIgfHxcblx0XHRcdFx0XHRcdFwidGFzay1jaGVja2JveC1sYWJlbFwiIHx8XG5cdFx0XHRcdFx0XHRcInRhc2stY2hlY2tib3hcIlxuXHRcdFx0XHQpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0WzBdLmNoZWNrbGlzdC5mb3JFYWNoKChsaXN0KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGxpc3QuaWQgPT09IGUudGFyZ2V0LmlkKSB7XG5cdFx0XHRcdFx0XHRsaXN0LmNvbXBsZXRlID0gIWxpc3QuY29tcGxldGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRyZW5kZXJTZWxlY3RlZFByb2plY3QoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtdGFzay1idG5cIikpIHtcblx0XHRcdFx0cHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0XHRcdHByb2plY3QuY2hlY2tsaXN0ID0gcHJvamVjdC5jaGVja2xpc3QuZmlsdGVyKFxuXHRcdFx0XHRcdFx0KGxpc3QpID0+IGxpc3QuaWQgIT09IGUudGFyZ2V0LmRhdGFzZXQuY2hlY2tsaXN0SWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRyZW5kZXJTZWxlY3RlZFByb2plY3QoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLyBIVE1MIHJlbmRlciBmdW5jdGlvbnMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0ZnVuY3Rpb24gc2F2ZSgpIHtcblx0XHRsb2NhbFN0b3JhZ2Uuc2V0SXRlbShcblx0XHRcdExPQ0FMX1NUT1JBR0VfUFJPSkVDVFNfS0VZLFxuXHRcdFx0SlNPTi5zdHJpbmdpZnkocHJvamVjdHMpXG5cdFx0KTtcblx0fVxuXHRmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0c2F2ZSgpO1xuXHRcdGNsZWFyRWxlbWVudHMocHJvamVjdENhcmRDb250YWluZXIpO1xuXHRcdGNsZWFyRWxlbWVudHMocHJvamVjdHNIZWFkZXIpO1xuXHRcdHJlbmRlclByb2plY3RzSGVhZGVyKCk7XG5cdFx0cmVuZGVyUHJvamVjdHMoKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGNsZWFyRWxlbWVudHMoZWxlbWVudCkge1xuXHRcdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcblx0XHRcdGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcblx0XHR9XG5cdH1cblx0Ly8tLS1NYWtlcyB0aGUgaGVhZGVyIG92ZXIgdGhlIGxpc3Qgb2YgcHJvamVjdHNcblx0ZnVuY3Rpb24gcmVuZGVyUHJvamVjdHNIZWFkZXIoKSB7XG5cdFx0bGV0IHByb2plY3RIZWFkZXJTb3J0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFxuXHRcdFx0XCJwcm9qZWN0LWhlYWRlci1zb3J0LWNvbnRhaW5lclwiXG5cdFx0KTtcblx0XHRwcm9qZWN0c0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lcik7XG5cblx0XHRsZXQgcHJvamVjdEhlYWRlclRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0cHJvamVjdEhlYWRlclRpdGxlLmlubmVyVGV4dCA9IFwiU29ydCBQcm9qZWN0c1wiO1xuXHRcdHByb2plY3RIZWFkZXJUaXRsZS5jbGFzc0xpc3QuYWRkKFwic29ydC1wcm9qZWN0LW1lbnUtdGl0bGVcIik7XG5cdFx0cHJvamVjdEhlYWRlclNvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRlclRpdGxlKTtcblxuXHRcdGxldCBzb3J0QnlUYXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdEhlYWRlclNvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc29ydEJ5VGFza3NDb250YWluZXIpO1xuXHRcdGxldCBwcm9qZWN0SGVhZGVyVGFza0NvdW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0cHJvamVjdEhlYWRlclRhc2tDb3VudC5pbm5lclRleHQgPSBcIlRhc2tzOlwiO1xuXHRcdHNvcnRCeVRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXJUYXNrQ291bnQpO1xuXHRcdGxldCBwcm9qZWN0U29ydEJ5TW9zdFRhc2tzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRwcm9qZWN0U29ydEJ5TW9zdFRhc2tzQnRuLmNsYXNzTGlzdC5hZGQoXCJzb3J0LWJ5LW1vc3QtYnRuXCIpO1xuXHRcdHByb2plY3RTb3J0QnlNb3N0VGFza3NCdG4uaW5uZXJUZXh0ID0gXCJNb3N0XCI7XG5cdFx0c29ydEJ5VGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdFNvcnRCeU1vc3RUYXNrc0J0bik7XG5cdFx0bGV0IHByb2plY3RTb3J0QnlMZWFzdFRhc2tzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRwcm9qZWN0U29ydEJ5TGVhc3RUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKFwic29ydC1ieS1sZWFzdC1idG5cIik7XG5cdFx0cHJvamVjdFNvcnRCeUxlYXN0VGFza3NCdG4uaW5uZXJUZXh0ID0gXCJMZWFzdFwiO1xuXHRcdHNvcnRCeVRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlMZWFzdFRhc2tzQnRuKTtcblxuXHRcdGxldCBzb3J0QnlQcmlvcml0eUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdEhlYWRlclNvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc29ydEJ5UHJpb3JpdHlDb250YWluZXIpO1xuXHRcdGxldCBwcm9qZWN0UHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRwcm9qZWN0UHJpb3JpdHkuaW5uZXJUZXh0ID0gXCJQcmlvcml0eTpcIjtcblx0XHRzb3J0QnlQcmlvcml0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0UHJpb3JpdHkpO1xuXHRcdGxldCBwcm9qZWN0U29ydEJ5SGlnaGVzdFByaW9yaXR5QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRwcm9qZWN0U29ydEJ5SGlnaGVzdFByaW9yaXR5QnRuLmlubmVyVGV4dCA9IFwiSGlnaGVzdFwiO1xuXHRcdHNvcnRCeVByaW9yaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlIaWdoZXN0UHJpb3JpdHlCdG4pO1xuXHRcdGxldCBwcm9qZWN0U29ydEJ5TGVhc3RQcmlvcml0eUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0cHJvamVjdFNvcnRCeUxlYXN0UHJpb3JpdHlCdG4uaW5uZXJUZXh0ID0gXCJMZWFzdFwiO1xuXHRcdHNvcnRCeVByaW9yaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlMZWFzdFByaW9yaXR5QnRuKTtcblxuXHRcdGxldCBzb3J0QnlEYXRlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lci5hcHBlbmRDaGlsZChzb3J0QnlEYXRlQ29udGFpbmVyKTtcblx0XHRsZXQgcHJvamVjdER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRwcm9qZWN0RHVlRGF0ZS5pbm5lclRleHQgPSBcIkRhdGU6XCI7XG5cdFx0c29ydEJ5RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RHVlRGF0ZSk7XG5cdFx0bGV0IHByb2plY3RTb3J0QnlDbG9zZXN0RGF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0cHJvamVjdFNvcnRCeUNsb3Nlc3REYXRlQnRuLmlubmVyVGV4dCA9IFwiQ2xvc2VzdFwiO1xuXHRcdHNvcnRCeURhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdFNvcnRCeUNsb3Nlc3REYXRlQnRuKTtcblx0XHRsZXQgcHJvamVjdFNvcnRCeUZhcnRoZXN0RGF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0cHJvamVjdFNvcnRCeUZhcnRoZXN0RGF0ZUJ0bi5pbm5lclRleHQgPSBcIkZhcnRoZXN0XCI7XG5cdFx0c29ydEJ5RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0U29ydEJ5RmFydGhlc3REYXRlQnRuKTtcblxuXHRcdGxldCBvcGVuUHJvamVjdE1vZGFsQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRvcGVuUHJvamVjdE1vZGFsQnRuLmNsYXNzTGlzdC5hZGQoXCJvcGVuLXByb2plY3QtbW9kYWwtYnRuXCIpO1xuXHRcdG9wZW5Qcm9qZWN0TW9kYWxCdG4uaW5uZXJUZXh0ID0gXCIrIFByb2plY3RcIjtcblx0XHRwcm9qZWN0c0hlYWRlci5hcHBlbmRDaGlsZChvcGVuUHJvamVjdE1vZGFsQnRuKTtcblx0fVxuXHQvLy0tLU1ha2VzIHRoZSBsaXN0IG9mIHByb2plY3RzXG5cdGZ1bmN0aW9uIHJlbmRlclByb2plY3RzKCkge1xuXHRcdHNvcnRlZFByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy9DcmVhdGVzIENhcmRzIGZvciBFYWNoIFByb2plY3QvLy8vLy8vLy8vLy8vL1xuXHRcdFx0bGV0IHByb2plY3RDYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHByb2plY3RDYXJkRGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWNhcmRcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XG5cdFx0XHRwcm9qZWN0Q2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZERpdik7XG5cblx0XHRcdGxldCBwcm9qZWN0Q2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXHRcdFx0cHJvamVjdENhcmRUaXRsZS5pbm5lclRleHQgPSBwcm9qZWN0LnRpdGxlO1xuXHRcdFx0cHJvamVjdENhcmREaXYuYXBwZW5kQ2hpbGQocHJvamVjdENhcmRUaXRsZSk7XG5cblx0XHRcdGxldCBwcm9qZWN0Q2FyZENoZWNrbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0cHJvamVjdENhcmRDaGVja2xpc3QuaW5uZXJUZXh0ID0gYFRhc2tzOiAke3Byb2plY3QuY2hlY2tsaXN0Lmxlbmd0aH1gO1xuXHRcdFx0cHJvamVjdENhcmREaXYuYXBwZW5kQ2hpbGQocHJvamVjdENhcmRDaGVja2xpc3QpO1xuXG5cdFx0XHRsZXQgcHJvamVjdENhcmRQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0cHJvamVjdENhcmRQcmlvcml0eS5pbm5lclRleHQgPSBgUHJpb3JpdHk6ICR7cHJvamVjdC5wcmlvcml0eX1gO1xuXHRcdFx0cHJvamVjdENhcmREaXYuYXBwZW5kQ2hpbGQocHJvamVjdENhcmRQcmlvcml0eSk7XG5cblx0XHRcdGxldCBwcm9qZWN0Q2FyZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHByb2plY3RDYXJkRHVlRGF0ZS5pbm5lclRleHQgPSBgQ29tcGxldGUgYnk6ICR7cHJvamVjdC5kdWVEYXRlfWA7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZER1ZURhdGUpO1xuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy9DcmVhdGUgRWRpdCBhbmQgRGVsZXRlIFByb2plY3RzIEJ1dHRvbnMvLy8vLy8vLy8vXG5cdFx0XHRsZXQgcHJvamVjdEJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRwcm9qZWN0QnRuQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWJ0bi1jb250YWluZXJcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0QnRuQ29udGFpbmVyKTtcblxuXHRcdFx0bGV0IGVkaXRQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdGVkaXRQcm9qZWN0QnRuLmlubmVyVGV4dCA9IFwiRWRpdFwiO1xuXHRcdFx0ZWRpdFByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtcHJvamVjdC1idG5cIik7XG5cdFx0XHRwcm9qZWN0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRQcm9qZWN0QnRuKTtcblxuXHRcdFx0bGV0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0ZGVsZXRlUHJvamVjdEJ0bi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiO1xuXHRcdFx0ZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpO1xuXHRcdFx0ZGVsZXRlUHJvamVjdEJ0bi5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XG5cdFx0XHRwcm9qZWN0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pO1xuXHRcdH0pO1xuXHR9XG5cdC8vLS0tTWFrZXMgdGhlIHNlbGVjdGVkIHByb2plY3QgZnVsbCBzY3JlZW5cblx0ZnVuY3Rpb24gcmVuZGVyU2VsZWN0ZWRQcm9qZWN0KCkge1xuXHRcdGNsZWFyRWxlbWVudHMocHJvamVjdENhcmRDb250YWluZXIpO1xuXHRcdGNsZWFyRWxlbWVudHMocHJvamVjdHNIZWFkZXIpO1xuXHRcdHNlbGVjdGVkUHJvamVjdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RDYXJkLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZC1wcm9qZWN0LWNhcmRcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RDYXJkKTtcblxuXHRcdFx0bGV0IHNlbGVjdGVkUHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RIZWFkZXIuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkLXByb2plY3QtaGVhZGVyXCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2FyZC5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RIZWFkZXIpO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RUaXRsZS5pbm5lclRleHQgPSBwcm9qZWN0LnRpdGxlO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdFRpdGxlKTtcblxuXHRcdFx0bGV0IGNsb3NlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRjbG9zZVByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcImNsb3NlLXByb2plY3QtYnRuXCIpO1xuXHRcdFx0Y2xvc2VQcm9qZWN0QnRuLmlubmVyVGV4dCA9IFwiQmFjayB0byBQcm9qZWN0IExpc3RcIjtcblx0XHRcdHNlbGVjdGVkUHJvamVjdEhlYWRlci5hcHBlbmRDaGlsZChjbG9zZVByb2plY3RCdG4pO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0QXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0QXNpZGUuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkLXByb2plY3QtYXNpZGVcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RDYXJkLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdEFzaWRlKTtcblxuXHRcdFx0bGV0IHByb2plY3REZWFkbGluZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRwcm9qZWN0RGVhZGxpbmVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcblx0XHRcdFx0XCJwcm9qZWN0LWRlYWRsaW5lLWNvbnRhaW5lclwiXG5cdFx0XHQpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0QXNpZGUuYXBwZW5kQ2hpbGQocHJvamVjdERlYWRsaW5lQ29udGFpbmVyKTtcblxuXHRcdFx0bGV0IHNlbGVjdGVkUHJvamVjdER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdER1ZURhdGUuaW5uZXJUZXh0ID0gXCJEdWU6IFwiICsgcHJvamVjdC5kdWVEYXRlO1xuXHRcdFx0cHJvamVjdERlYWRsaW5lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdER1ZURhdGUpO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0UHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdFByaW9yaXR5LmlubmVyVGV4dCA9IFwiUHJpb3JpdHk6IFwiICsgcHJvamVjdC5wcmlvcml0eTtcblx0XHRcdHByb2plY3REZWFkbGluZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RQcmlvcml0eSk7XG5cblx0XHRcdGxldCBzZWxlY3RlZFByb2plY3RDYXJkRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENhcmREZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1kZXNjcmlwdGlvblwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENhcmREZXNjcmlwdGlvbi5pbm5lclRleHQgPSBwcm9qZWN0LmRlc2NyaXB0aW9uO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0QXNpZGUuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0Q2FyZERlc2NyaXB0aW9uKTtcblxuXHRcdFx0bGV0IHNlbGVjdGVkUHJvamVjdFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFxuXHRcdFx0XHRcInNlbGVjdGVkLXByb2plY3QtdGFzay1jb250YWluZXJcIlxuXHRcdFx0KTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENhcmQuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lcik7XG5cblx0XHRcdC8vLS0tZmlsdGVyIGFuZCBhZGQgdGFza3MgdG8gdGFzayBsaXN0XG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0RmlsdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdEZpbHRlci5jbGFzc0xpc3QuYWRkKFwidGFzay1maWx0ZXItY2FyZFwiKTtcblxuXHRcdFx0bGV0IGZpbHRlclRhc2tzQnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmaWx0ZXItdGFza3MtYnRuLWNvbnRhaW5lclwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdEZpbHRlci5hcHBlbmRDaGlsZChmaWx0ZXJUYXNrc0J0bkNvbnRhaW5lcik7XG5cblx0XHRcdGxldCBmaWx0ZXJUYXNrc0xhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0XHRmaWx0ZXJUYXNrc0xhYmxlLmlubmVyVGV4dCA9IFwiRmlsdGVyIFRhc2tzOlwiO1xuXHRcdFx0ZmlsdGVyVGFza3NCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZmlsdGVyVGFza3NMYWJsZSk7XG5cblx0XHRcdGxldCBhbGxUYXNrc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRhbGxUYXNrc0J0bi5pbm5lclRleHQgPSBcIkFsbFwiO1xuXHRcdFx0ZmlsdGVyVGFza3NCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoYWxsVGFza3NCdG4pO1xuXG5cdFx0XHRsZXQgb3BlblRhc2tzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdG9wZW5UYXNrc0J0bi5pbm5lclRleHQgPSBcIk9wZW5cIjtcblx0XHRcdGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKG9wZW5UYXNrc0J0bik7XG5cblx0XHRcdGxldCBjbG9zZWRUYXNrc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRjbG9zZWRUYXNrc0J0bi5pbm5lclRleHQgPSBcIkNsb3NlZFwiO1xuXHRcdFx0ZmlsdGVyVGFza3NCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoY2xvc2VkVGFza3NCdG4pO1xuXG5cdFx0XHRsZXQgYWRkTmV3VGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRhZGROZXdUYXNrQnRuLmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdC5pZDtcblx0XHRcdGFkZE5ld1Rhc2tCdG4uY2xhc3NMaXN0LmFkZChcImFkZC1uZXctdGFzay1idG5cIik7XG5cdFx0XHRhZGROZXdUYXNrQnRuLmlubmVyVGV4dCA9IFwiKyBUYXNrXCI7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RDaGVja2xpc3RGaWx0ZXIuYXBwZW5kQ2hpbGQoYWRkTmV3VGFza0J0bik7XG5cblx0XHRcdHNlbGVjdGVkUHJvamVjdFRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoXG5cdFx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdEZpbHRlclxuXHRcdFx0KTtcblxuXHRcdFx0cHJvamVjdC5jaGVja2xpc3QuZm9yRWFjaCgodGFzaykgPT4ge1xuXHRcdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNhcmRcIik7XG5cdFx0XHRcdGlmICh0YXNrLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZVwiKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGxldCB0YXNrT3B0aW9uc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdHRhc2tPcHRpb25zQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLW9wdGlvbnMtY29udGFpbmVyXCIpO1xuXHRcdFx0XHRzZWxlY3RlZFByb2plY3RDaGVja2xpc3QuYXBwZW5kQ2hpbGQodGFza09wdGlvbnNDb250YWluZXIpO1xuXG5cdFx0XHRcdGxldCB0YXNrQ2hlY2tib3hDb25hdGluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHR0YXNrQ2hlY2tib3hDb25hdGluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tib3gtY29uYXRpbmVyXCIpO1xuXHRcdFx0XHR0YXNrQ2hlY2tib3hDb25hdGluZXIuaWQgPSB0YXNrLmlkO1xuXHRcdFx0XHR0YXNrT3B0aW9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tib3hDb25hdGluZXIpO1xuXG5cdFx0XHRcdGxldCB0YXNrQ2hlY2tCb3ggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG5cdFx0XHRcdHRhc2tDaGVja0JveC50eXBlID0gXCJjaGVja2JveFwiO1xuXHRcdFx0XHR0YXNrQ2hlY2tCb3guY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tib3hcIik7XG5cdFx0XHRcdHRhc2tDaGVja0JveC5pZCA9IHRhc2suaWQ7XG5cdFx0XHRcdGlmICh0YXNrLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0dGFza0NoZWNrQm94LmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHRhc2tDaGVja2JveENvbmF0aW5lci5hcHBlbmRDaGlsZCh0YXNrQ2hlY2tCb3gpO1xuXG5cdFx0XHRcdGxldCBjaGVja2JveERlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxhYmVsXCIpO1xuXHRcdFx0XHRjaGVja2JveERlc2NyaXB0aW9uLmlubmVyVGV4dCA9IFwiQ2hlY2sgQ29tcGxldGVcIjtcblx0XHRcdFx0Y2hlY2tib3hEZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwidGFzay1jaGVja2JveC1sYWJlbFwiKTtcblx0XHRcdFx0Y2hlY2tib3hEZXNjcmlwdGlvbi5odG1sRm9yID0gdGFzay5pZDtcblx0XHRcdFx0dGFza0NoZWNrYm94Q29uYXRpbmVyLmFwcGVuZENoaWxkKGNoZWNrYm94RGVzY3JpcHRpb24pO1xuXG5cdFx0XHRcdGxldCBkZWxldGVUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdFx0ZGVsZXRlVGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXRhc2stYnRuXCIpO1xuXHRcdFx0XHRkZWxldGVUYXNrQnRuLmlubmVyVGV4dCA9IFwiRGVsZXRlXCI7XG5cdFx0XHRcdGRlbGV0ZVRhc2tCdG4uZGF0YXNldC5jaGVja2xpc3RJZCA9IHRhc2suaWQ7XG5cdFx0XHRcdHRhc2tPcHRpb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZVRhc2tCdG4pO1xuXG5cdFx0XHRcdGxldCB0YXNrVGV4dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0XHR0YXNrVGV4dC5pbm5lclRleHQgPSB0YXNrLnRhc2tEZXRhaWxzO1xuXHRcdFx0XHRpZiAodGFzay5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdHRhc2tUZXh0LmNsYXNzTGlzdC5hZGQoXCJjb21wbGV0ZVwiKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWxlY3RlZFByb2plY3RDaGVja2xpc3QuYXBwZW5kQ2hpbGQodGFza1RleHQpO1xuXG5cdFx0XHRcdHNlbGVjdGVkUHJvamVjdFRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoXG5cdFx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0XG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU29ydCAgZnVuY3Rpb25zIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8tLS1Tb3J0IFByb2plY3RzXG5cdGZ1bmN0aW9uIHNvcnRCeU1vc3RUYWtzKCkge1xuXHRcdGxldCBwcm9qZWN0c0J5TW9zdFRhc2tzID0gcHJvamVjdHM7XG5cdFx0cHJvamVjdHNCeU1vc3RUYXNrcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gYi5jaGVja2xpc3QubGVuZ3RoIC0gYS5jaGVja2xpc3QubGVuZ3RoO1xuXHRcdH0pO1xuXHRcdHNvcnRlZFByb2plY3RzID0gcHJvamVjdHNCeU1vc3RUYXNrcztcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmdW5jdGlvbiBzb3J0QnlMZWFzdFRha3MoKSB7XG5cdFx0bGV0IHByb2plY3RzQnlMZWFzdFRhc2tzID0gcHJvamVjdHM7XG5cdFx0cHJvamVjdHNCeUxlYXN0VGFza3Muc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0cmV0dXJuIGEuY2hlY2tsaXN0Lmxlbmd0aCAtIGIuY2hlY2tsaXN0Lmxlbmd0aDtcblx0XHR9KTtcblx0XHRzb3J0ZWRQcm9qZWN0cyA9IHByb2plY3RzQnlMZWFzdFRhc2tzO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cmVuZGVyUHJvamVjdHNIZWFkZXIsXG5cdFx0cmVuZGVyUHJvamVjdHMsXG5cdFx0cmVuZGVyU2VsZWN0ZWRQcm9qZWN0LFxuXHRcdHByb2plY3RIZWFkZXJFdmVudExpc3RlbmVycyxcblx0XHRwcm9qZWN0Q2FyZEV2ZW50TGlzdGVuZXJzLFxuXHR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgbXlQcm9qZWN0cztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==