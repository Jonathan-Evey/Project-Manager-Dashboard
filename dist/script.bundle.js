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
const findDOMElements = (function () {
	const HTML_ANCHORS = {
		projectsHeader: document.getElementById("projects-list-header"),
		projectCardContainer: document.getElementById("project-card-container"),
	};

	const newProjectModal = {
		openModalBtn: document.getElementById("open-project-modal-btn"),
		theModal: document.getElementById("add-new-project-modal"),

		//------------modal form inputs
		titleInput: document.getElementById("project_title"),
		descriptionInput: document.getElementById("project_description"),
		dueDateInput: document.getElementById("due_date"),
		saveBtn: document.getElementById("save-project"),
		radioInputs: document.querySelectorAll(".urgency-checkbox"),
		//////// radio input is found within submit event ///////////
	};

	const newTaskModal = {
		openModalBtn: document.querySelector(".add-new-task-btn"),
		theModal: document.getElementById("add-new-task-modal"),

		//------------modal form inputs
		taskDetailsInput: document.getElementById("task_details"),
		saveBtn: document.getElementById("save-task"),
	};

	return {
		HTML_ANCHORS,
		newProjectModal,
		newTaskModal,
	};
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

	let projectToEdit;

	let filterTasksBy = "all";

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
		if (
			projectToEdit &&
			newProjectModal.saveBtn.dataset.projectId === projectToEdit[0].id
		) {
			const index = projects.findIndex((project) => {
				return project.id === newProjectModal.saveBtn.dataset.projectId;
			});

			projects[index].title = newProjectModal.titleInput.value;
			projects[index].description =
				newProjectModal.descriptionInput.value;
			projects[index].dueDate = newProjectModal.dueDateInput.value;
			let newProjectPriorityInput = document.querySelector(
				"input[type=radio][name=priority]:checked"
			);
			projects[index].priority = findPriorityValue(
				newProjectPriorityInput.value
			);
		} else {
			let newProjectTitle = newProjectModal.titleInput.value;
			if (newProjectTitle === null || newProjectTitle === "") {
				return;
			}
			let newProjectDescription = newProjectModal.descriptionInput.value;
			let newProjectDueDate = newProjectModal.dueDateInput.value;

			let newProjectPriorityInput = document.querySelector(
				"input[type=radio][name=priority]:checked"
			);
			let newProjectPriority = findPriorityValue(
				newProjectPriorityInput.value
			);

			let project = createProject(
				newProjectTitle,
				newProjectDescription,
				newProjectDueDate,
				newProjectPriority
			);

			projects.push(project);
		}
		resetProjectForm();
		closeProjectModal();
		return;
	}
	//---- resets project form to defalut
	function resetProjectForm() {
		newProjectModal.titleInput.value = null;
		newProjectModal.descriptionInput.value = null;
		newProjectModal.dueDateInput.value = null;
		let defaultPriority = document.getElementById("none");
		defaultPriority.checked = true;
		return;
	}
	function closeProjectModal() {
		return newProjectModal.theModal.close();
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
	function findPriorityValue(value) {
		if (value === "low") {
			return 1;
		} else if (value === "mid") {
			return 2;
		} else if (value === "high") {
			return 3;
		} else if (value === "urgent") {
			return 4;
		} else {
			return 0;
		}
	}
	function checkPriority(value) {
		if (value === 1) {
			return "Low";
		} else if (value === 2) {
			return "Mid";
		} else if (value === 3) {
			return "High";
		} else if (value === 4) {
			return "Urgent";
		} else {
			return "None";
		}
	}

	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////
	///////////////////////// Event listeners //////////////////////////////
	////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////

	function projectHeaderEventListeners() {
		projectsHeader.addEventListener("click", (e) => {
			if (e.target.classList.contains("open-project-modal-btn")) {
				newProjectModal.saveBtn.dataset.projectId = "";
				resetProjectForm();
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
			if (e.target.classList.contains("sort-by-highest-btn")) {
				sortByPrioityHighest();
				render();
			}
			if (e.target.classList.contains("sort-by-lowest-btn")) {
				sortByPrioityLowest();
				render();
			}
			if (e.target.classList.contains("sort-by-closest-btn")) {
				sortByDateClosest();
				render();
			}
			if (e.target.classList.contains("sort-by-farthest-btn")) {
				sortByDateFarthest();
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
			if (e.target.classList.contains("edit-project-btn")) {
				projectToEdit = projects.filter((project) => {
					if (project.id === e.target.dataset.projectId) {
						return { ...project };
					} else {
						return;
					}
				});

				console.log(projectToEdit);
				openEditModel();
			}
			if (e.target.classList.contains("project-card")) {
				selectedProject = projects.filter(
					(project) => project.id === e.target.dataset.projectId
				);
				renderSelectedProject();
			}
			if (e.target.classList.contains("close-project-btn")) {
				filterTasks("all");
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
			if (e.target.classList.contains("open-tasks-btn")) {
				filterTasks("open");
				renderSelectedProject();
			}
			if (e.target.classList.contains("closed-tasks-btn")) {
				filterTasks("closed");
				renderSelectedProject();
			}
			if (e.target.classList.contains("all-tasks-btn")) {
				filterTasks("all");
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
		projectSortByHighestPriorityBtn.classList.add("sort-by-highest-btn");
		projectSortByHighestPriorityBtn.innerText = "Highest";
		sortByPriorityContainer.appendChild(projectSortByHighestPriorityBtn);
		let projectSortByLeastPriorityBtn = document.createElement("button");
		projectSortByLeastPriorityBtn.classList.add("sort-by-lowest-btn");
		projectSortByLeastPriorityBtn.innerText = "Lowest";
		sortByPriorityContainer.appendChild(projectSortByLeastPriorityBtn);

		let sortByDateContainer = document.createElement("div");
		projectHeaderSortContainer.appendChild(sortByDateContainer);
		let projectDueDate = document.createElement("p");
		projectDueDate.innerText = "Date:";
		sortByDateContainer.appendChild(projectDueDate);
		let projectSortByClosestDateBtn = document.createElement("button");
		projectSortByClosestDateBtn.classList.add("sort-by-closest-btn");
		projectSortByClosestDateBtn.innerText = "Closest";
		sortByDateContainer.appendChild(projectSortByClosestDateBtn);
		let projectSortByFarthestDateBtn = document.createElement("button");
		projectSortByFarthestDateBtn.classList.add("sort-by-farthest-btn");
		projectSortByFarthestDateBtn.innerText = "Farthest";
		sortByDateContainer.appendChild(projectSortByFarthestDateBtn);

		let openProjectModalBtn = document.createElement("button");
		openProjectModalBtn.classList.add("open-project-modal-btn");
		openProjectModalBtn.innerText = "+ Project";
		projectsHeader.appendChild(openProjectModalBtn);
	}
	//---Makes the list of projects
	function renderProjects() {
		console.log(sortedProjects);
		//sortedProjects = [];
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
			projectCardPriority.innerText = `Priority: ${checkPriority(
				project.priority
			)}`;
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
			editProjectBtn.dataset.projectId = project.id;
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
			selectedProjectPriority.innerText =
				"Priority: " + checkPriority(project.priority);
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
			allTasksBtn.classList.add("all-tasks-btn");
			allTasksBtn.innerText = "All";
			filterTasksBtnContainer.appendChild(allTasksBtn);

			let openTasksBtn = document.createElement("button");
			openTasksBtn.classList.add("open-tasks-btn");
			openTasksBtn.innerText = "Open";
			filterTasksBtnContainer.appendChild(openTasksBtn);

			let closedTasksBtn = document.createElement("button");
			closedTasksBtn.classList.add("closed-tasks-btn");
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
				if (filterTasksBy === "all") {
					selectedProjectTaskContainer.appendChild(
						selectedProjectChecklist
					);
				}
				if (
					filterTasksBy === "not-completed" &&
					task.complete === false
				) {
					selectedProjectTaskContainer.appendChild(
						selectedProjectChecklist
					);
				}
				if (filterTasksBy === "completed" && task.complete === true) {
					selectedProjectTaskContainer.appendChild(
						selectedProjectChecklist
					);
				}
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

	function sortByPrioityHighest() {
		let projectsByHighestPrioity = projects;
		projectsByHighestPrioity.sort(function (a, b) {
			return b.priority - a.priority;
		});
		sortedProjects = projectsByHighestPrioity;
		return;
	}
	function sortByPrioityLowest() {
		let projectsByLowestPrioity = projects;
		projectsByLowestPrioity.sort(function (a, b) {
			return a.priority - b.priority;
		});
		sortedProjects = projectsByLowestPrioity;
		return;
	}

	function sortByDateClosest() {
		let projectsByDateClosest = projects;
		projectsByDateClosest.sort(function (a, b) {
			return (
				new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
			);
		});
		sortedProjects = projectsByDateClosest;
		return;
	}

	function sortByDateFarthest() {
		let projectsByDateFarthest = projects;
		projectsByDateFarthest.sort(function (a, b) {
			return (
				new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
			);
		});
		sortedProjects = projectsByDateFarthest;
		return;
	}

	function filterTasks(data) {
		if (data === "open") {
			filterTasksBy = "not-completed";
		} else if (data === "closed") {
			filterTasksBy = "completed";
		} else {
			filterTasksBy = "all";
		}
	}

	function openEditModel() {
		newProjectModal.theModal.showModal();
		newProjectModal.titleInput.value = projectToEdit[0].title;
		newProjectModal.descriptionInput.value = projectToEdit[0].description;
		newProjectModal.dueDateInput.value = projectToEdit[0].dueDate;
		newProjectModal.radioInputs.forEach((input) => {
			console.log(input);
			console.log(checkPriority(projectToEdit[0].priority).toLowerCase());
			console.log(input.id);
			if (
				checkPriority(projectToEdit[0].priority).toLowerCase() ===
				input.id
			) {
				input.checked = true;
			} else {
				input.checked = false;
			}
		});
		newProjectModal.saveBtn.dataset.projectId = projectToEdit[0].id;
	}

	return {
		renderProjectsHeader,
		renderProjects,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsZUFBZSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkNnQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEVBQUUseUZBQWlEO0FBQ25ELHVCQUF1Qix1RUFBK0I7QUFDdEQsb0JBQW9CLG9FQUE0QjtBQUNoRCxzQkFBc0IsbUZBQTJDOztBQUVqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTs7QUFFRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTs7QUFFSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2YsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLENBQXFCO0FBQzNCLE1BQU0sQ0FBZTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOENBQThDLHlCQUF5QjtBQUN2RTs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLGtEQUFrRCxnQkFBZ0I7QUFDbEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtbWFuYWdlci1kYXNoYm9hcmQvLi9zcmMvRE9NRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1tYW5hZ2VyLWRhc2hib2FyZC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmluZERPTUVsZW1lbnRzID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgSFRNTF9BTkNIT1JTID0ge1xuXHRcdHByb2plY3RzSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLWxpc3QtaGVhZGVyXCIpLFxuXHRcdHByb2plY3RDYXJkQ29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtY2FyZC1jb250YWluZXJcIiksXG5cdH07XG5cblx0Y29uc3QgbmV3UHJvamVjdE1vZGFsID0ge1xuXHRcdG9wZW5Nb2RhbEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuLXByb2plY3QtbW9kYWwtYnRuXCIpLFxuXHRcdHRoZU1vZGFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1uZXctcHJvamVjdC1tb2RhbFwiKSxcblxuXHRcdC8vLS0tLS0tLS0tLS0tbW9kYWwgZm9ybSBpbnB1dHNcblx0XHR0aXRsZUlucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RfdGl0bGVcIiksXG5cdFx0ZGVzY3JpcHRpb25JbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0X2Rlc2NyaXB0aW9uXCIpLFxuXHRcdGR1ZURhdGVJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVfZGF0ZVwiKSxcblx0XHRzYXZlQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhdmUtcHJvamVjdFwiKSxcblx0XHRyYWRpb0lucHV0czogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51cmdlbmN5LWNoZWNrYm94XCIpLFxuXHRcdC8vLy8vLy8vIHJhZGlvIGlucHV0IGlzIGZvdW5kIHdpdGhpbiBzdWJtaXQgZXZlbnQgLy8vLy8vLy8vLy9cblx0fTtcblxuXHRjb25zdCBuZXdUYXNrTW9kYWwgPSB7XG5cdFx0b3Blbk1vZGFsQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1uZXctdGFzay1idG5cIiksXG5cdFx0dGhlTW9kYWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLW5ldy10YXNrLW1vZGFsXCIpLFxuXG5cdFx0Ly8tLS0tLS0tLS0tLS1tb2RhbCBmb3JtIGlucHV0c1xuXHRcdHRhc2tEZXRhaWxzSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19kZXRhaWxzXCIpLFxuXHRcdHNhdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2F2ZS10YXNrXCIpLFxuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0SFRNTF9BTkNIT1JTLFxuXHRcdG5ld1Byb2plY3RNb2RhbCxcblx0XHRuZXdUYXNrTW9kYWwsXG5cdH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmaW5kRE9NRWxlbWVudHM7XG4iLCJpbXBvcnQgZmluZERPTUVsZW1lbnRzIGZyb20gXCIuL0RPTUVsZW1lbnRzLmpzXCI7XG5cbi8qWW91ciB0b2RvIGxpc3Qgc2hvdWxkIGhhdmUgcHJvamVjdHMgb3Igc2VwYXJhdGUgbGlzdHMgb2YgdG9kb3MuIFdoZW4gYSB1c2VyIGZpcnN0IG9wZW5zIHRoZSBhcHAsIHRoZXJlIHNob3VsZCBiZSBzb21lIHNvcnQgb2Yg4oCYZGVmYXVsdOKAmSBwcm9qZWN0IHRvIHdoaWNoIGFsbCBvZiB0aGVpciB0b2RvcyBhcmUgcHV0LiBVc2VycyBzaG91bGQgYmUgYWJsZSB0byBjcmVhdGUgbmV3IHByb2plY3RzIGFuZCBjaG9vc2Ugd2hpY2ggcHJvamVjdCB0aGVpciB0b2RvcyBnbyBpbnRvLiAqL1xuY29uc3QgbXlQcm9qZWN0cyA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IExPQ0FMX1NUT1JBR0VfUFJPSkVDVFNfS0VZID0gXCJteVByb2plY3RNYW5hZ2VyLlByb2plY3RcIjtcblx0bGV0IHByb2plY3RzID1cblx0XHRKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKExPQ0FMX1NUT1JBR0VfUFJPSkVDVFNfS0VZKSkgfHwgW107XG5cblx0bGV0IHByb2plY3RDYXJkQ29udGFpbmVyID1cblx0XHRmaW5kRE9NRWxlbWVudHMuSFRNTF9BTkNIT1JTLnByb2plY3RDYXJkQ29udGFpbmVyO1xuXHRsZXQgbmV3UHJvamVjdE1vZGFsID0gZmluZERPTUVsZW1lbnRzLm5ld1Byb2plY3RNb2RhbDtcblx0bGV0IG5ld1Rhc2tNb2RhbCA9IGZpbmRET01FbGVtZW50cy5uZXdUYXNrTW9kYWw7XG5cdGxldCBwcm9qZWN0c0hlYWRlciA9IGZpbmRET01FbGVtZW50cy5IVE1MX0FOQ0hPUlMucHJvamVjdHNIZWFkZXI7XG5cblx0LypsZXQgcHJvamVjdHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcIjEyMzQ1Njc4OVwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWUgaWRcbiAgICAgICAgICAgIHRpdGxlOiBcIlByb2plY3QgV2l0aCBhIENvb2wgTmFtZVwiLCAvL3VzZXIgaW5wdXQgZnJvbSBodG1sIGZvcm1cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkEgZGVzY3JpcHRpb24gb2YgdGhlIHByb2plY3RcIiwgLy91c2VyIGlucHV0IGZyb20gaHRtbCBmb3JtXG4gICAgICAgICAgICBjaGVja2xpc3Q6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWVyIGlkXG4gICAgICAgICAgICAgICAgICAgIHRhc2tEZXRhaWxzOiBcIlwiLCAvL3VzZXIgaW5wdXQgZnJvbSBhIGh0bWwgZm9ybVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsIC8vIHVzZXIgY2xpY2sgdG8gdG9nZ2xlIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkdWVEYXRlOiBcIjA3LzAxLzIyXCIsIC8vIHVzZXIgaW5wdXRcbiAgICAgICAgICAgIHByaW9yaXR5OiBcIkhpZ2hcIiwgLy8gdXNlciBpbnB1dCAobWF5YmUgZG8gYSBiYWNrZ3JvdW5kIGNvbG9yIGdyYWRpYW50IHRvIHNob3cgcHJpb3JpdHkgbGV2ZWwuIGFsc28gbWFrZSBhIHNvcnQgZnVuY3Rpb24gdG8gc2hvdyB0YXNrcyBpbiB0aGF0IHByaW9yaXR5IHJhbmdlKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCIxMjM0NTY3ODlcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlIGlkXG4gICAgICAgICAgICB0aXRsZTogXCJQcm9qZWN0IFdpdGggYSBDb29sIE5hbWVcIiwgLy91c2VyIGlucHV0IGZyb20gaHRtbCBmb3JtXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJBIGRlc2NyaXB0aW9uIG9mIHRoZSBwcm9qZWN0XCIsIC8vdXNlciBpbnB1dCBmcm9tIGh0bWwgZm9ybVxuICAgICAgICAgICAgY2hlY2tsaXN0OiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlciBpZFxuICAgICAgICAgICAgICAgICAgICB0YXNrRGV0YWlsczogXCJcIiwgLy91c2VyIGlucHV0IGZyb20gYSBodG1sIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLCAvLyB1c2VyIGNsaWNrIHRvIHRvZ2dsZSBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsIC8vcHVsbCB0aW1lIHN0YW1wIHRvIG1ha2UgYSB1bmlxZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgdGFza0RldGFpbHM6IFwiXCIsIC8vdXNlciBpbnB1dCBmcm9tIGEgaHRtbCBmb3JtXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSwgLy8gdXNlciBjbGljayB0byB0b2dnbGUgXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWVyIGlkXG4gICAgICAgICAgICAgICAgICAgIHRhc2tEZXRhaWxzOiBcIlwiLCAvL3VzZXIgaW5wdXQgZnJvbSBhIGh0bWwgZm9ybVxuICAgICAgICAgICAgICAgICAgICBjb21wbGV0ZTogZmFsc2UsIC8vIHVzZXIgY2xpY2sgdG8gdG9nZ2xlIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkdWVEYXRlOiBcIjA3LzAxLzIyXCIsIC8vIHVzZXIgaW5wdXRcbiAgICAgICAgICAgIHByaW9yaXR5OiBcIkhpZ2hcIiwgLy8gdXNlciBpbnB1dCAobWF5YmUgZG8gYSBiYWNrZ3JvdW5kIGNvbG9yIGdyYWRpYW50IHRvIHNob3cgcHJpb3JpdHkgbGV2ZWwuIGFsc28gbWFrZSBhIHNvcnQgZnVuY3Rpb24gdG8gc2hvdyB0YXNrcyBpbiB0aGF0IHByaW9yaXR5IHJhbmdlKVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICBpZDogXCI1NjQ2NTQ5ODdcIiwgLy9wdWxsIHRpbWUgc3RhbXAgdG8gbWFrZSBhIHVuaXFlIGlkXG4gICAgICAgICAgICB0aXRsZTogXCJNZWggUHJvamVjdFwiLCAvL3VzZXIgaW5wdXQgZnJvbSBodG1sIGZvcm1cbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBcIkxvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNpY2luZyBlbGl0LiBOZW1vLCBpdXJlIHBlcmZlcmVuZGlzIGlwc2FtIHBvc3NpbXVzIGlwc3VtLCBhbWV0IGlkIHF1YXMgY29ycnVwdGkgZXVtIG5hbSBpbGx1bSBxdWkgcmVjdXNhbmRhZSBtaW51cyBjdXBpZGl0YXRlIGFzc3VtZW5kYSBpbiByZXByZWhlbmRlcml0PyBBc3BlcmlvcmVzIHF1b3MgcG9zc2ltdXMgZXZlbmlldCB2b2x1cHRhdGVzIGlwc2EgYXBlcmlhbSBuZW1vIGV4Y2VwdHVyaSBkaWduaXNzaW1vcyBhY2N1c2FtdXMgZGlzdGluY3Rpbz9cIiwgLy91c2VyIGlucHV0IGZyb20gaHRtbCBmb3JtXG4gICAgICAgICAgICBjaGVja2xpc3Q6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcIlwiLCAvL3B1bGwgdGltZSBzdGFtcCB0byBtYWtlIGEgdW5pcWVyIGlkXG4gICAgICAgICAgICAgICAgICAgIHRhc2tEZXRhaWxzOiBcInNvbWUgc2FtcGxlIHRleHRcIiwgLy91c2VyIGlucHV0IGZyb20gYSBodG1sIGZvcm1cbiAgICAgICAgICAgICAgICAgICAgY29tcGxldGU6IGZhbHNlLCAvLyB1c2VyIGNsaWNrIHRvIHRvZ2dsZSBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiXCIsIC8vcHVsbCB0aW1lIHN0YW1wIHRvIG1ha2UgYSB1bmlxZXIgaWRcbiAgICAgICAgICAgICAgICAgICAgdGFza0RldGFpbHM6IFwic29tZSBtb3JlIHNhbXBsZSB0ZXh0XCIsIC8vdXNlciBpbnB1dCBmcm9tIGEgaHRtbCBmb3JtXG4gICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmYWxzZSwgLy8gdXNlciBjbGljayB0byB0b2dnbGUgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGR1ZURhdGU6IFwiMDcvMDEvMjJcIiwgLy8gdXNlciBpbnB1dFxuICAgICAgICAgICAgcHJpb3JpdHk6IFwiTG93XCIsIC8vIHVzZXIgaW5wdXQgKG1heWJlIGRvIGEgYmFja2dyb3VuZCBjb2xvciBncmFkaWFudCB0byBzaG93IHByaW9yaXR5IGxldmVsLiBhbHNvIG1ha2UgYSBzb3J0IGZ1bmN0aW9uIHRvIHNob3cgdGFza3MgaW4gdGhhdCBwcmlvcml0eSByYW5nZSlcbiAgICAgICAgfVxuICAgIF07ICovXG5cblx0bGV0IHNvcnRlZFByb2plY3RzID0gcHJvamVjdHM7XG5cblx0bGV0IHNlbGVjdGVkUHJvamVjdCA9IFtdO1xuXG5cdGxldCBwcm9qZWN0VG9FZGl0O1xuXG5cdGxldCBmaWx0ZXJUYXNrc0J5ID0gXCJhbGxcIjtcblxuXHRjb25zdCBjcmVhdGVQcm9qZWN0ID0gKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpID0+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcblx0XHRcdHRpdGxlOiB0aXRsZSxcblx0XHRcdGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbixcblx0XHRcdGNoZWNrbGlzdDogW10sXG5cdFx0XHRkdWVEYXRlOiBkdWVEYXRlLFxuXHRcdFx0cHJpb3JpdHk6IHByaW9yaXR5LFxuXHRcdH07XG5cdH07XG5cblx0Y29uc3QgY3JlYXRDaGVja2xpc3QgPSAodGFza0RldGFpbHMpID0+IHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aWQ6IERhdGUubm93KCkudG9TdHJpbmcoKSxcblx0XHRcdHRhc2tEZXRhaWxzOiB0YXNrRGV0YWlscyxcblx0XHRcdGNvbXBsZXRlOiBmYWxzZSxcblx0XHR9O1xuXHR9O1xuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vIGZvcm0gaW50ZXJhY3Rpb25zIGZvciBhZGRpbmcgYSBwcm9qZWN0IC8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0bmV3UHJvamVjdE1vZGFsLnRoZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH0pO1xuXG5cdG5ld1Byb2plY3RNb2RhbC5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0cHVzaEZvcm1JbnB1dFRvUHJvamVjdHMoKTtcblx0XHRjb25zb2xlLmxvZyhwcm9qZWN0cyk7XG5cdFx0cmVuZGVyKCk7XG5cdFx0cmV0dXJuO1xuXHR9KTtcblxuXHQvLy0tLW9uIGZvcm0gc3VibWl0IGJ0biBldmVudCAtIHRha2VzIGlucHV0IHZhbHVlIGFuZCBwdXNoZXMgdG8gcHJvamVjdHMgYXJyYXlcblx0ZnVuY3Rpb24gcHVzaEZvcm1JbnB1dFRvUHJvamVjdHMoKSB7XG5cdFx0aWYgKFxuXHRcdFx0cHJvamVjdFRvRWRpdCAmJlxuXHRcdFx0bmV3UHJvamVjdE1vZGFsLnNhdmVCdG4uZGF0YXNldC5wcm9qZWN0SWQgPT09IHByb2plY3RUb0VkaXRbMF0uaWRcblx0XHQpIHtcblx0XHRcdGNvbnN0IGluZGV4ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdHJldHVybiBwcm9qZWN0LmlkID09PSBuZXdQcm9qZWN0TW9kYWwuc2F2ZUJ0bi5kYXRhc2V0LnByb2plY3RJZDtcblx0XHRcdH0pO1xuXG5cdFx0XHRwcm9qZWN0c1tpbmRleF0udGl0bGUgPSBuZXdQcm9qZWN0TW9kYWwudGl0bGVJbnB1dC52YWx1ZTtcblx0XHRcdHByb2plY3RzW2luZGV4XS5kZXNjcmlwdGlvbiA9XG5cdFx0XHRcdG5ld1Byb2plY3RNb2RhbC5kZXNjcmlwdGlvbklucHV0LnZhbHVlO1xuXHRcdFx0cHJvamVjdHNbaW5kZXhdLmR1ZURhdGUgPSBuZXdQcm9qZWN0TW9kYWwuZHVlRGF0ZUlucHV0LnZhbHVlO1xuXHRcdFx0bGV0IG5ld1Byb2plY3RQcmlvcml0eUlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihcblx0XHRcdFx0XCJpbnB1dFt0eXBlPXJhZGlvXVtuYW1lPXByaW9yaXR5XTpjaGVja2VkXCJcblx0XHRcdCk7XG5cdFx0XHRwcm9qZWN0c1tpbmRleF0ucHJpb3JpdHkgPSBmaW5kUHJpb3JpdHlWYWx1ZShcblx0XHRcdFx0bmV3UHJvamVjdFByaW9yaXR5SW5wdXQudmFsdWVcblx0XHRcdCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGxldCBuZXdQcm9qZWN0VGl0bGUgPSBuZXdQcm9qZWN0TW9kYWwudGl0bGVJbnB1dC52YWx1ZTtcblx0XHRcdGlmIChuZXdQcm9qZWN0VGl0bGUgPT09IG51bGwgfHwgbmV3UHJvamVjdFRpdGxlID09PSBcIlwiKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGxldCBuZXdQcm9qZWN0RGVzY3JpcHRpb24gPSBuZXdQcm9qZWN0TW9kYWwuZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcblx0XHRcdGxldCBuZXdQcm9qZWN0RHVlRGF0ZSA9IG5ld1Byb2plY3RNb2RhbC5kdWVEYXRlSW5wdXQudmFsdWU7XG5cblx0XHRcdGxldCBuZXdQcm9qZWN0UHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHRcdFwiaW5wdXRbdHlwZT1yYWRpb11bbmFtZT1wcmlvcml0eV06Y2hlY2tlZFwiXG5cdFx0XHQpO1xuXHRcdFx0bGV0IG5ld1Byb2plY3RQcmlvcml0eSA9IGZpbmRQcmlvcml0eVZhbHVlKFxuXHRcdFx0XHRuZXdQcm9qZWN0UHJpb3JpdHlJbnB1dC52YWx1ZVxuXHRcdFx0KTtcblxuXHRcdFx0bGV0IHByb2plY3QgPSBjcmVhdGVQcm9qZWN0KFxuXHRcdFx0XHRuZXdQcm9qZWN0VGl0bGUsXG5cdFx0XHRcdG5ld1Byb2plY3REZXNjcmlwdGlvbixcblx0XHRcdFx0bmV3UHJvamVjdER1ZURhdGUsXG5cdFx0XHRcdG5ld1Byb2plY3RQcmlvcml0eVxuXHRcdFx0KTtcblxuXHRcdFx0cHJvamVjdHMucHVzaChwcm9qZWN0KTtcblx0XHR9XG5cdFx0cmVzZXRQcm9qZWN0Rm9ybSgpO1xuXHRcdGNsb3NlUHJvamVjdE1vZGFsKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdC8vLS0tLSByZXNldHMgcHJvamVjdCBmb3JtIHRvIGRlZmFsdXRcblx0ZnVuY3Rpb24gcmVzZXRQcm9qZWN0Rm9ybSgpIHtcblx0XHRuZXdQcm9qZWN0TW9kYWwudGl0bGVJbnB1dC52YWx1ZSA9IG51bGw7XG5cdFx0bmV3UHJvamVjdE1vZGFsLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBudWxsO1xuXHRcdG5ld1Byb2plY3RNb2RhbC5kdWVEYXRlSW5wdXQudmFsdWUgPSBudWxsO1xuXHRcdGxldCBkZWZhdWx0UHJpb3JpdHkgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm5vbmVcIik7XG5cdFx0ZGVmYXVsdFByaW9yaXR5LmNoZWNrZWQgPSB0cnVlO1xuXHRcdHJldHVybjtcblx0fVxuXHRmdW5jdGlvbiBjbG9zZVByb2plY3RNb2RhbCgpIHtcblx0XHRyZXR1cm4gbmV3UHJvamVjdE1vZGFsLnRoZU1vZGFsLmNsb3NlKCk7XG5cdH1cblxuXHRuZXdUYXNrTW9kYWwudGhlTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fSk7XG5cdG5ld1Rhc2tNb2RhbC5zYXZlQnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG5cdFx0cHVzaEZvcm1JbnB1dFRvVGFza3MoKTtcblx0XHRyZXNldFRhc2tGb3JtKCk7XG5cdFx0c2F2ZSgpO1xuXHRcdGNsZWFyRWxlbWVudHMocHJvamVjdENhcmRDb250YWluZXIpO1xuXHRcdGNsZWFyRWxlbWVudHMocHJvamVjdHNIZWFkZXIpO1xuXHRcdHJlbmRlclNlbGVjdGVkUHJvamVjdCgpO1xuXHRcdHJldHVybjtcblx0fSk7XG5cdGZ1bmN0aW9uIHB1c2hGb3JtSW5wdXRUb1Rhc2tzKCkge1xuXHRcdGxldCBuZXdUYXNrRGV0YWlscyA9IG5ld1Rhc2tNb2RhbC50YXNrRGV0YWlsc0lucHV0LnZhbHVlO1xuXHRcdGlmIChuZXdUYXNrRGV0YWlscyA9PT0gbnVsbCB8fCBuZXdUYXNrRGV0YWlscyA9PT0gXCJcIikge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblx0XHRsZXQgdGFzayA9IGNyZWF0Q2hlY2tsaXN0KG5ld1Rhc2tEZXRhaWxzKTtcblx0XHRsZXQgb3Blbk1vZGFsQnRuSWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1uZXctdGFzay1idG5cIik7XG5cdFx0bGV0IGN1cnJlbnRQcm9qZWN0SWQgPSBvcGVuTW9kYWxCdG5JZC5kYXRhc2V0LnByb2plY3RJZDtcblx0XHRsZXQgY3VycmVudFByb2plY3QgPSBwcm9qZWN0cy5maW5kKFxuXHRcdFx0KHByb2plY3QpID0+IHByb2plY3QuaWQgPT09IGN1cnJlbnRQcm9qZWN0SWRcblx0XHQpO1xuXHRcdGN1cnJlbnRQcm9qZWN0LmNoZWNrbGlzdC5wdXNoKHRhc2spO1xuXHRcdGNvbnNvbGUubG9nKHByb2plY3RzKTtcblx0XHRyZXR1cm47XG5cdH1cblx0ZnVuY3Rpb24gcmVzZXRUYXNrRm9ybSgpIHtcblx0XHRuZXdUYXNrTW9kYWwudGFza0RldGFpbHNJbnB1dC52YWx1ZSA9IG51bGw7XG5cdFx0bmV3VGFza01vZGFsLnRoZU1vZGFsLmNsb3NlKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGZ1bmN0aW9uIGZpbmRQcmlvcml0eVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09PSBcImxvd1wiKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSBcIm1pZFwiKSB7XG5cdFx0XHRyZXR1cm4gMjtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSBcImhpZ2hcIikge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJ1cmdlbnRcIikge1xuXHRcdFx0cmV0dXJuIDQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBjaGVja1ByaW9yaXR5KHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09PSAxKSB7XG5cdFx0XHRyZXR1cm4gXCJMb3dcIjtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSAyKSB7XG5cdFx0XHRyZXR1cm4gXCJNaWRcIjtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSAzKSB7XG5cdFx0XHRyZXR1cm4gXCJIaWdoXCI7XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSA9PT0gNCkge1xuXHRcdFx0cmV0dXJuIFwiVXJnZW50XCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIk5vbmVcIjtcblx0XHR9XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gRXZlbnQgbGlzdGVuZXJzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0ZnVuY3Rpb24gcHJvamVjdEhlYWRlckV2ZW50TGlzdGVuZXJzKCkge1xuXHRcdHByb2plY3RzSGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW4tcHJvamVjdC1tb2RhbC1idG5cIikpIHtcblx0XHRcdFx0bmV3UHJvamVjdE1vZGFsLnNhdmVCdG4uZGF0YXNldC5wcm9qZWN0SWQgPSBcIlwiO1xuXHRcdFx0XHRyZXNldFByb2plY3RGb3JtKCk7XG5cdFx0XHRcdHJldHVybiBuZXdQcm9qZWN0TW9kYWwudGhlTW9kYWwuc2hvd01vZGFsKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic29ydC1ieS1tb3N0LWJ0blwiKSkge1xuXHRcdFx0XHRzb3J0QnlNb3N0VGFrcygpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzb3J0LWJ5LWxlYXN0LWJ0blwiKSkge1xuXHRcdFx0XHRzb3J0QnlMZWFzdFRha3MoKTtcblx0XHRcdFx0cmVuZGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic29ydC1ieS1oaWdoZXN0LWJ0blwiKSkge1xuXHRcdFx0XHRzb3J0QnlQcmlvaXR5SGlnaGVzdCgpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzb3J0LWJ5LWxvd2VzdC1idG5cIikpIHtcblx0XHRcdFx0c29ydEJ5UHJpb2l0eUxvd2VzdCgpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzb3J0LWJ5LWNsb3Nlc3QtYnRuXCIpKSB7XG5cdFx0XHRcdHNvcnRCeURhdGVDbG9zZXN0KCk7XG5cdFx0XHRcdHJlbmRlcigpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNvcnQtYnktZmFydGhlc3QtYnRuXCIpKSB7XG5cdFx0XHRcdHNvcnRCeURhdGVGYXJ0aGVzdCgpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHByb2plY3RDYXJkRXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0cHJvamVjdENhcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpKSB7XG5cdFx0XHRcdHByb2plY3RzID0gcHJvamVjdHMuZmlsdGVyKFxuXHRcdFx0XHRcdChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkICE9PSBlLnRhcmdldC5kYXRhc2V0LnByb2plY3RJZFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJlZGl0LXByb2plY3QtYnRuXCIpKSB7XG5cdFx0XHRcdHByb2plY3RUb0VkaXQgPSBwcm9qZWN0cy5maWx0ZXIoKHByb2plY3QpID0+IHtcblx0XHRcdFx0XHRpZiAocHJvamVjdC5pZCA9PT0gZS50YXJnZXQuZGF0YXNldC5wcm9qZWN0SWQpIHtcblx0XHRcdFx0XHRcdHJldHVybiB7IC4uLnByb2plY3QgfTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cblx0XHRcdFx0Y29uc29sZS5sb2cocHJvamVjdFRvRWRpdCk7XG5cdFx0XHRcdG9wZW5FZGl0TW9kZWwoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJwcm9qZWN0LWNhcmRcIikpIHtcblx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0ID0gcHJvamVjdHMuZmlsdGVyKFxuXHRcdFx0XHRcdChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBlLnRhcmdldC5kYXRhc2V0LnByb2plY3RJZFxuXHRcdFx0XHQpO1xuXHRcdFx0XHRyZW5kZXJTZWxlY3RlZFByb2plY3QoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjbG9zZS1wcm9qZWN0LWJ0blwiKSkge1xuXHRcdFx0XHRmaWx0ZXJUYXNrcyhcImFsbFwiKTtcblx0XHRcdFx0Y2xlYXJFbGVtZW50cyhwcm9qZWN0Q2FyZENvbnRhaW5lcik7XG5cdFx0XHRcdHJlbmRlcigpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFkZC1uZXctdGFzay1idG5cIikpIHtcblx0XHRcdFx0cmV0dXJuIG5ld1Rhc2tNb2RhbC50aGVNb2RhbC5zaG93TW9kYWwoKTtcblx0XHRcdH1cblx0XHRcdGlmIChcblx0XHRcdFx0ZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFxuXHRcdFx0XHRcdFwidGFzay1jaGVja2JveC1jb25hdGluZXJcIiB8fFxuXHRcdFx0XHRcdFx0XCJ0YXNrLWNoZWNrYm94LWxhYmVsXCIgfHxcblx0XHRcdFx0XHRcdFwidGFzay1jaGVja2JveFwiXG5cdFx0XHRcdClcblx0XHRcdCkge1xuXHRcdFx0XHRzZWxlY3RlZFByb2plY3RbMF0uY2hlY2tsaXN0LmZvckVhY2goKGxpc3QpID0+IHtcblx0XHRcdFx0XHRpZiAobGlzdC5pZCA9PT0gZS50YXJnZXQuaWQpIHtcblx0XHRcdFx0XHRcdGxpc3QuY29tcGxldGUgPSAhbGlzdC5jb21wbGV0ZTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzYXZlKCk7XG5cdFx0XHRcdHJlbmRlclNlbGVjdGVkUHJvamVjdCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImRlbGV0ZS10YXNrLWJ0blwiKSkge1xuXHRcdFx0XHRwcm9qZWN0cy5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdFx0cHJvamVjdC5jaGVja2xpc3QgPSBwcm9qZWN0LmNoZWNrbGlzdC5maWx0ZXIoXG5cdFx0XHRcdFx0XHQobGlzdCkgPT4gbGlzdC5pZCAhPT0gZS50YXJnZXQuZGF0YXNldC5jaGVja2xpc3RJZFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRzYXZlKCk7XG5cdFx0XHRcdHJlbmRlclNlbGVjdGVkUHJvamVjdCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW4tdGFza3MtYnRuXCIpKSB7XG5cdFx0XHRcdGZpbHRlclRhc2tzKFwib3BlblwiKTtcblx0XHRcdFx0cmVuZGVyU2VsZWN0ZWRQcm9qZWN0KCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xvc2VkLXRhc2tzLWJ0blwiKSkge1xuXHRcdFx0XHRmaWx0ZXJUYXNrcyhcImNsb3NlZFwiKTtcblx0XHRcdFx0cmVuZGVyU2VsZWN0ZWRQcm9qZWN0KCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWxsLXRhc2tzLWJ0blwiKSkge1xuXHRcdFx0XHRmaWx0ZXJUYXNrcyhcImFsbFwiKTtcblx0XHRcdFx0cmVuZGVyU2VsZWN0ZWRQcm9qZWN0KCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8gSFRNTCByZW5kZXIgZnVuY3Rpb25zIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdGZ1bmN0aW9uIHNhdmUoKSB7XG5cdFx0bG9jYWxTdG9yYWdlLnNldEl0ZW0oXG5cdFx0XHRMT0NBTF9TVE9SQUdFX1BST0pFQ1RTX0tFWSxcblx0XHRcdEpTT04uc3RyaW5naWZ5KHByb2plY3RzKVxuXHRcdCk7XG5cdH1cblx0ZnVuY3Rpb24gcmVuZGVyKCkge1xuXHRcdHNhdmUoKTtcblx0XHRjbGVhckVsZW1lbnRzKHByb2plY3RDYXJkQ29udGFpbmVyKTtcblx0XHRjbGVhckVsZW1lbnRzKHByb2plY3RzSGVhZGVyKTtcblx0XHRyZW5kZXJQcm9qZWN0c0hlYWRlcigpO1xuXHRcdHJlbmRlclByb2plY3RzKCk7XG5cdH1cblxuXHRmdW5jdGlvbiBjbGVhckVsZW1lbnRzKGVsZW1lbnQpIHtcblx0XHR3aGlsZSAoZWxlbWVudC5maXJzdENoaWxkKSB7XG5cdFx0XHRlbGVtZW50LnJlbW92ZUNoaWxkKGVsZW1lbnQuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXHR9XG5cdC8vLS0tTWFrZXMgdGhlIGhlYWRlciBvdmVyIHRoZSBsaXN0IG9mIHByb2plY3RzXG5cdGZ1bmN0aW9uIHJlbmRlclByb2plY3RzSGVhZGVyKCkge1xuXHRcdGxldCBwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdEhlYWRlclNvcnRDb250YWluZXIuY2xhc3NMaXN0LmFkZChcblx0XHRcdFwicHJvamVjdC1oZWFkZXItc29ydC1jb250YWluZXJcIlxuXHRcdCk7XG5cdFx0cHJvamVjdHNIZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRlclNvcnRDb250YWluZXIpO1xuXG5cdFx0bGV0IHByb2plY3RIZWFkZXJUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdHByb2plY3RIZWFkZXJUaXRsZS5pbm5lclRleHQgPSBcIlNvcnQgUHJvamVjdHNcIjtcblx0XHRwcm9qZWN0SGVhZGVyVGl0bGUuY2xhc3NMaXN0LmFkZChcInNvcnQtcHJvamVjdC1tZW51LXRpdGxlXCIpO1xuXHRcdHByb2plY3RIZWFkZXJTb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXJUaXRsZSk7XG5cblx0XHRsZXQgc29ydEJ5VGFza3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3RIZWFkZXJTb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNvcnRCeVRhc2tzQ29udGFpbmVyKTtcblx0XHRsZXQgcHJvamVjdEhlYWRlclRhc2tDb3VudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdHByb2plY3RIZWFkZXJUYXNrQ291bnQuaW5uZXJUZXh0ID0gXCJUYXNrczpcIjtcblx0XHRzb3J0QnlUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGVyVGFza0NvdW50KTtcblx0XHRsZXQgcHJvamVjdFNvcnRCeU1vc3RUYXNrc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0cHJvamVjdFNvcnRCeU1vc3RUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKFwic29ydC1ieS1tb3N0LWJ0blwiKTtcblx0XHRwcm9qZWN0U29ydEJ5TW9zdFRhc2tzQnRuLmlubmVyVGV4dCA9IFwiTW9zdFwiO1xuXHRcdHNvcnRCeVRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlNb3N0VGFza3NCdG4pO1xuXHRcdGxldCBwcm9qZWN0U29ydEJ5TGVhc3RUYXNrc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0cHJvamVjdFNvcnRCeUxlYXN0VGFza3NCdG4uY2xhc3NMaXN0LmFkZChcInNvcnQtYnktbGVhc3QtYnRuXCIpO1xuXHRcdHByb2plY3RTb3J0QnlMZWFzdFRhc2tzQnRuLmlubmVyVGV4dCA9IFwiTGVhc3RcIjtcblx0XHRzb3J0QnlUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0U29ydEJ5TGVhc3RUYXNrc0J0bik7XG5cblx0XHRsZXQgc29ydEJ5UHJpb3JpdHlDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3RIZWFkZXJTb3J0Q29udGFpbmVyLmFwcGVuZENoaWxkKHNvcnRCeVByaW9yaXR5Q29udGFpbmVyKTtcblx0XHRsZXQgcHJvamVjdFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0cHJvamVjdFByaW9yaXR5LmlubmVyVGV4dCA9IFwiUHJpb3JpdHk6XCI7XG5cdFx0c29ydEJ5UHJpb3JpdHlDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdFByaW9yaXR5KTtcblx0XHRsZXQgcHJvamVjdFNvcnRCeUhpZ2hlc3RQcmlvcml0eUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0cHJvamVjdFNvcnRCeUhpZ2hlc3RQcmlvcml0eUJ0bi5jbGFzc0xpc3QuYWRkKFwic29ydC1ieS1oaWdoZXN0LWJ0blwiKTtcblx0XHRwcm9qZWN0U29ydEJ5SGlnaGVzdFByaW9yaXR5QnRuLmlubmVyVGV4dCA9IFwiSGlnaGVzdFwiO1xuXHRcdHNvcnRCeVByaW9yaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlIaWdoZXN0UHJpb3JpdHlCdG4pO1xuXHRcdGxldCBwcm9qZWN0U29ydEJ5TGVhc3RQcmlvcml0eUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0cHJvamVjdFNvcnRCeUxlYXN0UHJpb3JpdHlCdG4uY2xhc3NMaXN0LmFkZChcInNvcnQtYnktbG93ZXN0LWJ0blwiKTtcblx0XHRwcm9qZWN0U29ydEJ5TGVhc3RQcmlvcml0eUJ0bi5pbm5lclRleHQgPSBcIkxvd2VzdFwiO1xuXHRcdHNvcnRCeVByaW9yaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlMZWFzdFByaW9yaXR5QnRuKTtcblxuXHRcdGxldCBzb3J0QnlEYXRlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lci5hcHBlbmRDaGlsZChzb3J0QnlEYXRlQ29udGFpbmVyKTtcblx0XHRsZXQgcHJvamVjdER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRwcm9qZWN0RHVlRGF0ZS5pbm5lclRleHQgPSBcIkRhdGU6XCI7XG5cdFx0c29ydEJ5RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RHVlRGF0ZSk7XG5cdFx0bGV0IHByb2plY3RTb3J0QnlDbG9zZXN0RGF0ZUJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0cHJvamVjdFNvcnRCeUNsb3Nlc3REYXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJzb3J0LWJ5LWNsb3Nlc3QtYnRuXCIpO1xuXHRcdHByb2plY3RTb3J0QnlDbG9zZXN0RGF0ZUJ0bi5pbm5lclRleHQgPSBcIkNsb3Nlc3RcIjtcblx0XHRzb3J0QnlEYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlDbG9zZXN0RGF0ZUJ0bik7XG5cdFx0bGV0IHByb2plY3RTb3J0QnlGYXJ0aGVzdERhdGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdHByb2plY3RTb3J0QnlGYXJ0aGVzdERhdGVCdG4uY2xhc3NMaXN0LmFkZChcInNvcnQtYnktZmFydGhlc3QtYnRuXCIpO1xuXHRcdHByb2plY3RTb3J0QnlGYXJ0aGVzdERhdGVCdG4uaW5uZXJUZXh0ID0gXCJGYXJ0aGVzdFwiO1xuXHRcdHNvcnRCeURhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdFNvcnRCeUZhcnRoZXN0RGF0ZUJ0bik7XG5cblx0XHRsZXQgb3BlblByb2plY3RNb2RhbEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0b3BlblByb2plY3RNb2RhbEJ0bi5jbGFzc0xpc3QuYWRkKFwib3Blbi1wcm9qZWN0LW1vZGFsLWJ0blwiKTtcblx0XHRvcGVuUHJvamVjdE1vZGFsQnRuLmlubmVyVGV4dCA9IFwiKyBQcm9qZWN0XCI7XG5cdFx0cHJvamVjdHNIZWFkZXIuYXBwZW5kQ2hpbGQob3BlblByb2plY3RNb2RhbEJ0bik7XG5cdH1cblx0Ly8tLS1NYWtlcyB0aGUgbGlzdCBvZiBwcm9qZWN0c1xuXHRmdW5jdGlvbiByZW5kZXJQcm9qZWN0cygpIHtcblx0XHRjb25zb2xlLmxvZyhzb3J0ZWRQcm9qZWN0cyk7XG5cdFx0Ly9zb3J0ZWRQcm9qZWN0cyA9IFtdO1xuXHRcdHNvcnRlZFByb2plY3RzLmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdC8vLy8vLy8vLy8vLy8vLy8vLy9DcmVhdGVzIENhcmRzIGZvciBFYWNoIFByb2plY3QvLy8vLy8vLy8vLy8vL1xuXHRcdFx0bGV0IHByb2plY3RDYXJkRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHByb2plY3RDYXJkRGl2LmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWNhcmRcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XG5cdFx0XHRwcm9qZWN0Q2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZERpdik7XG5cblx0XHRcdGxldCBwcm9qZWN0Q2FyZFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuXHRcdFx0cHJvamVjdENhcmRUaXRsZS5pbm5lclRleHQgPSBwcm9qZWN0LnRpdGxlO1xuXHRcdFx0cHJvamVjdENhcmREaXYuYXBwZW5kQ2hpbGQocHJvamVjdENhcmRUaXRsZSk7XG5cblx0XHRcdGxldCBwcm9qZWN0Q2FyZENoZWNrbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0cHJvamVjdENhcmRDaGVja2xpc3QuaW5uZXJUZXh0ID0gYFRhc2tzOiAke3Byb2plY3QuY2hlY2tsaXN0Lmxlbmd0aH1gO1xuXHRcdFx0cHJvamVjdENhcmREaXYuYXBwZW5kQ2hpbGQocHJvamVjdENhcmRDaGVja2xpc3QpO1xuXG5cdFx0XHRsZXQgcHJvamVjdENhcmRQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0cHJvamVjdENhcmRQcmlvcml0eS5pbm5lclRleHQgPSBgUHJpb3JpdHk6ICR7Y2hlY2tQcmlvcml0eShcblx0XHRcdFx0cHJvamVjdC5wcmlvcml0eVxuXHRcdFx0KX1gO1xuXHRcdFx0cHJvamVjdENhcmREaXYuYXBwZW5kQ2hpbGQocHJvamVjdENhcmRQcmlvcml0eSk7XG5cblx0XHRcdGxldCBwcm9qZWN0Q2FyZER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHByb2plY3RDYXJkRHVlRGF0ZS5pbm5lclRleHQgPSBgQ29tcGxldGUgYnk6ICR7cHJvamVjdC5kdWVEYXRlfWA7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZER1ZURhdGUpO1xuXG5cdFx0XHQvLy8vLy8vLy8vLy8vLy9DcmVhdGUgRWRpdCBhbmQgRGVsZXRlIFByb2plY3RzIEJ1dHRvbnMvLy8vLy8vLy8vXG5cdFx0XHRsZXQgcHJvamVjdEJ0bkNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRwcm9qZWN0QnRuQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWJ0bi1jb250YWluZXJcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0QnRuQ29udGFpbmVyKTtcblxuXHRcdFx0bGV0IGVkaXRQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdGVkaXRQcm9qZWN0QnRuLmlubmVyVGV4dCA9IFwiRWRpdFwiO1xuXHRcdFx0ZWRpdFByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcImVkaXQtcHJvamVjdC1idG5cIik7XG5cdFx0XHRlZGl0UHJvamVjdEJ0bi5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XG5cdFx0XHRwcm9qZWN0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGVkaXRQcm9qZWN0QnRuKTtcblxuXHRcdFx0bGV0IGRlbGV0ZVByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0ZGVsZXRlUHJvamVjdEJ0bi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiO1xuXHRcdFx0ZGVsZXRlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpO1xuXHRcdFx0ZGVsZXRlUHJvamVjdEJ0bi5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XG5cdFx0XHRwcm9qZWN0QnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGRlbGV0ZVByb2plY3RCdG4pO1xuXHRcdH0pO1xuXHR9XG5cdC8vLS0tTWFrZXMgdGhlIHNlbGVjdGVkIHByb2plY3QgZnVsbCBzY3JlZW5cblx0ZnVuY3Rpb24gcmVuZGVyU2VsZWN0ZWRQcm9qZWN0KCkge1xuXHRcdGNsZWFyRWxlbWVudHMocHJvamVjdENhcmRDb250YWluZXIpO1xuXHRcdGNsZWFyRWxlbWVudHMocHJvamVjdHNIZWFkZXIpO1xuXHRcdHNlbGVjdGVkUHJvamVjdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RDYXJkLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZC1wcm9qZWN0LWNhcmRcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZENvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RDYXJkKTtcblxuXHRcdFx0bGV0IHNlbGVjdGVkUHJvamVjdEhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RIZWFkZXIuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkLXByb2plY3QtaGVhZGVyXCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2FyZC5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RIZWFkZXIpO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RUaXRsZS5pbm5lclRleHQgPSBwcm9qZWN0LnRpdGxlO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdFRpdGxlKTtcblxuXHRcdFx0bGV0IGNsb3NlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRjbG9zZVByb2plY3RCdG4uY2xhc3NMaXN0LmFkZChcImNsb3NlLXByb2plY3QtYnRuXCIpO1xuXHRcdFx0Y2xvc2VQcm9qZWN0QnRuLmlubmVyVGV4dCA9IFwiQmFjayB0byBQcm9qZWN0IExpc3RcIjtcblx0XHRcdHNlbGVjdGVkUHJvamVjdEhlYWRlci5hcHBlbmRDaGlsZChjbG9zZVByb2plY3RCdG4pO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0QXNpZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0QXNpZGUuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkLXByb2plY3QtYXNpZGVcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RDYXJkLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdEFzaWRlKTtcblxuXHRcdFx0bGV0IHByb2plY3REZWFkbGluZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRwcm9qZWN0RGVhZGxpbmVDb250YWluZXIuY2xhc3NMaXN0LmFkZChcblx0XHRcdFx0XCJwcm9qZWN0LWRlYWRsaW5lLWNvbnRhaW5lclwiXG5cdFx0XHQpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0QXNpZGUuYXBwZW5kQ2hpbGQocHJvamVjdERlYWRsaW5lQ29udGFpbmVyKTtcblxuXHRcdFx0bGV0IHNlbGVjdGVkUHJvamVjdER1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdER1ZURhdGUuaW5uZXJUZXh0ID0gXCJEdWU6IFwiICsgcHJvamVjdC5kdWVEYXRlO1xuXHRcdFx0cHJvamVjdERlYWRsaW5lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdER1ZURhdGUpO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0UHJpb3JpdHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdFByaW9yaXR5LmlubmVyVGV4dCA9XG5cdFx0XHRcdFwiUHJpb3JpdHk6IFwiICsgY2hlY2tQcmlvcml0eShwcm9qZWN0LnByaW9yaXR5KTtcblx0XHRcdHByb2plY3REZWFkbGluZUNvbnRhaW5lci5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RQcmlvcml0eSk7XG5cblx0XHRcdGxldCBzZWxlY3RlZFByb2plY3RDYXJkRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENhcmREZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKFwicHJvamVjdC1kZXNjcmlwdGlvblwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENhcmREZXNjcmlwdGlvbi5pbm5lclRleHQgPSBwcm9qZWN0LmRlc2NyaXB0aW9uO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0QXNpZGUuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0Q2FyZERlc2NyaXB0aW9uKTtcblxuXHRcdFx0bGV0IHNlbGVjdGVkUHJvamVjdFRhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFxuXHRcdFx0XHRcInNlbGVjdGVkLXByb2plY3QtdGFzay1jb250YWluZXJcIlxuXHRcdFx0KTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENhcmQuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lcik7XG5cblx0XHRcdC8vLS0tZmlsdGVyIGFuZCBhZGQgdGFza3MgdG8gdGFzayBsaXN0XG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0RmlsdGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdEZpbHRlci5jbGFzc0xpc3QuYWRkKFwidGFzay1maWx0ZXItY2FyZFwiKTtcblxuXHRcdFx0bGV0IGZpbHRlclRhc2tzQnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJmaWx0ZXItdGFza3MtYnRuLWNvbnRhaW5lclwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdEZpbHRlci5hcHBlbmRDaGlsZChmaWx0ZXJUYXNrc0J0bkNvbnRhaW5lcik7XG5cblx0XHRcdGxldCBmaWx0ZXJUYXNrc0xhYmxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0XHRmaWx0ZXJUYXNrc0xhYmxlLmlubmVyVGV4dCA9IFwiRmlsdGVyIFRhc2tzOlwiO1xuXHRcdFx0ZmlsdGVyVGFza3NCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZmlsdGVyVGFza3NMYWJsZSk7XG5cblx0XHRcdGxldCBhbGxUYXNrc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRhbGxUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKFwiYWxsLXRhc2tzLWJ0blwiKTtcblx0XHRcdGFsbFRhc2tzQnRuLmlubmVyVGV4dCA9IFwiQWxsXCI7XG5cdFx0XHRmaWx0ZXJUYXNrc0J0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChhbGxUYXNrc0J0bik7XG5cblx0XHRcdGxldCBvcGVuVGFza3NCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0b3BlblRhc2tzQnRuLmNsYXNzTGlzdC5hZGQoXCJvcGVuLXRhc2tzLWJ0blwiKTtcblx0XHRcdG9wZW5UYXNrc0J0bi5pbm5lclRleHQgPSBcIk9wZW5cIjtcblx0XHRcdGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKG9wZW5UYXNrc0J0bik7XG5cblx0XHRcdGxldCBjbG9zZWRUYXNrc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRjbG9zZWRUYXNrc0J0bi5jbGFzc0xpc3QuYWRkKFwiY2xvc2VkLXRhc2tzLWJ0blwiKTtcblx0XHRcdGNsb3NlZFRhc2tzQnRuLmlubmVyVGV4dCA9IFwiQ2xvc2VkXCI7XG5cdFx0XHRmaWx0ZXJUYXNrc0J0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChjbG9zZWRUYXNrc0J0bik7XG5cblx0XHRcdGxldCBhZGROZXdUYXNrQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdGFkZE5ld1Rhc2tCdG4uZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0LmlkO1xuXHRcdFx0YWRkTmV3VGFza0J0bi5jbGFzc0xpc3QuYWRkKFwiYWRkLW5ldy10YXNrLWJ0blwiKTtcblx0XHRcdGFkZE5ld1Rhc2tCdG4uaW5uZXJUZXh0ID0gXCIrIFRhc2tcIjtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdEZpbHRlci5hcHBlbmRDaGlsZChhZGROZXdUYXNrQnRuKTtcblxuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChcblx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0RmlsdGVyXG5cdFx0XHQpO1xuXG5cdFx0XHRwcm9qZWN0LmNoZWNrbGlzdC5mb3JFYWNoKCh0YXNrKSA9PiB7XG5cdFx0XHRcdGxldCBzZWxlY3RlZFByb2plY3RDaGVja2xpc3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHRzZWxlY3RlZFByb2plY3RDaGVja2xpc3QuY2xhc3NMaXN0LmFkZChcInRhc2stY2FyZFwiKTtcblx0XHRcdFx0aWYgKHRhc2suY29tcGxldGUpIHtcblx0XHRcdFx0XHRzZWxlY3RlZFByb2plY3RDaGVja2xpc3QuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlXCIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0bGV0IHRhc2tPcHRpb25zQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0dGFza09wdGlvbnNDb250YWluZXIuY2xhc3NMaXN0LmFkZChcInRhc2stb3B0aW9ucy1jb250YWluZXJcIik7XG5cdFx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdC5hcHBlbmRDaGlsZCh0YXNrT3B0aW9uc0NvbnRhaW5lcik7XG5cblx0XHRcdFx0bGV0IHRhc2tDaGVja2JveENvbmF0aW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdHRhc2tDaGVja2JveENvbmF0aW5lci5jbGFzc0xpc3QuYWRkKFwidGFzay1jaGVja2JveC1jb25hdGluZXJcIik7XG5cdFx0XHRcdHRhc2tDaGVja2JveENvbmF0aW5lci5pZCA9IHRhc2suaWQ7XG5cdFx0XHRcdHRhc2tPcHRpb25zQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tDaGVja2JveENvbmF0aW5lcik7XG5cblx0XHRcdFx0bGV0IHRhc2tDaGVja0JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcblx0XHRcdFx0dGFza0NoZWNrQm94LnR5cGUgPSBcImNoZWNrYm94XCI7XG5cdFx0XHRcdHRhc2tDaGVja0JveC5jbGFzc0xpc3QuYWRkKFwidGFzay1jaGVja2JveFwiKTtcblx0XHRcdFx0dGFza0NoZWNrQm94LmlkID0gdGFzay5pZDtcblx0XHRcdFx0aWYgKHRhc2suY29tcGxldGUpIHtcblx0XHRcdFx0XHR0YXNrQ2hlY2tCb3guY2hlY2tlZCA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0dGFza0NoZWNrYm94Q29uYXRpbmVyLmFwcGVuZENoaWxkKHRhc2tDaGVja0JveCk7XG5cblx0XHRcdFx0bGV0IGNoZWNrYm94RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGFiZWxcIik7XG5cdFx0XHRcdGNoZWNrYm94RGVzY3JpcHRpb24uaW5uZXJUZXh0ID0gXCJDaGVjayBDb21wbGV0ZVwiO1xuXHRcdFx0XHRjaGVja2JveERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNoZWNrYm94LWxhYmVsXCIpO1xuXHRcdFx0XHRjaGVja2JveERlc2NyaXB0aW9uLmh0bWxGb3IgPSB0YXNrLmlkO1xuXHRcdFx0XHR0YXNrQ2hlY2tib3hDb25hdGluZXIuYXBwZW5kQ2hpbGQoY2hlY2tib3hEZXNjcmlwdGlvbik7XG5cblx0XHRcdFx0bGV0IGRlbGV0ZVRhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0XHRkZWxldGVUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtdGFzay1idG5cIik7XG5cdFx0XHRcdGRlbGV0ZVRhc2tCdG4uaW5uZXJUZXh0ID0gXCJEZWxldGVcIjtcblx0XHRcdFx0ZGVsZXRlVGFza0J0bi5kYXRhc2V0LmNoZWNrbGlzdElkID0gdGFzay5pZDtcblx0XHRcdFx0dGFza09wdGlvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQoZGVsZXRlVGFza0J0bik7XG5cblx0XHRcdFx0bGV0IHRhc2tUZXh0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0XHRcdHRhc2tUZXh0LmlubmVyVGV4dCA9IHRhc2sudGFza0RldGFpbHM7XG5cdFx0XHRcdGlmICh0YXNrLmNvbXBsZXRlKSB7XG5cdFx0XHRcdFx0dGFza1RleHQuY2xhc3NMaXN0LmFkZChcImNvbXBsZXRlXCIpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdC5hcHBlbmRDaGlsZCh0YXNrVGV4dCk7XG5cdFx0XHRcdGlmIChmaWx0ZXJUYXNrc0J5ID09PSBcImFsbFwiKSB7XG5cdFx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChcblx0XHRcdFx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGZpbHRlclRhc2tzQnkgPT09IFwibm90LWNvbXBsZXRlZFwiICYmXG5cdFx0XHRcdFx0dGFzay5jb21wbGV0ZSA9PT0gZmFsc2Vcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChcblx0XHRcdFx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGZpbHRlclRhc2tzQnkgPT09IFwiY29tcGxldGVkXCIgJiYgdGFzay5jb21wbGV0ZSA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRcdHNlbGVjdGVkUHJvamVjdFRhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQoXG5cdFx0XHRcdFx0XHRzZWxlY3RlZFByb2plY3RDaGVja2xpc3Rcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fVxuXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gU29ydCAgZnVuY3Rpb25zIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8tLS1Tb3J0IFByb2plY3RzXG5cdGZ1bmN0aW9uIHNvcnRCeU1vc3RUYWtzKCkge1xuXHRcdGxldCBwcm9qZWN0c0J5TW9zdFRhc2tzID0gcHJvamVjdHM7XG5cdFx0cHJvamVjdHNCeU1vc3RUYXNrcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gYi5jaGVja2xpc3QubGVuZ3RoIC0gYS5jaGVja2xpc3QubGVuZ3RoO1xuXHRcdH0pO1xuXHRcdHNvcnRlZFByb2plY3RzID0gcHJvamVjdHNCeU1vc3RUYXNrcztcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmdW5jdGlvbiBzb3J0QnlMZWFzdFRha3MoKSB7XG5cdFx0bGV0IHByb2plY3RzQnlMZWFzdFRhc2tzID0gcHJvamVjdHM7XG5cdFx0cHJvamVjdHNCeUxlYXN0VGFza3Muc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0cmV0dXJuIGEuY2hlY2tsaXN0Lmxlbmd0aCAtIGIuY2hlY2tsaXN0Lmxlbmd0aDtcblx0XHR9KTtcblx0XHRzb3J0ZWRQcm9qZWN0cyA9IHByb2plY3RzQnlMZWFzdFRhc2tzO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZ1bmN0aW9uIHNvcnRCeVByaW9pdHlIaWdoZXN0KCkge1xuXHRcdGxldCBwcm9qZWN0c0J5SGlnaGVzdFByaW9pdHkgPSBwcm9qZWN0cztcblx0XHRwcm9qZWN0c0J5SGlnaGVzdFByaW9pdHkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0cmV0dXJuIGIucHJpb3JpdHkgLSBhLnByaW9yaXR5O1xuXHRcdH0pO1xuXHRcdHNvcnRlZFByb2plY3RzID0gcHJvamVjdHNCeUhpZ2hlc3RQcmlvaXR5O1xuXHRcdHJldHVybjtcblx0fVxuXHRmdW5jdGlvbiBzb3J0QnlQcmlvaXR5TG93ZXN0KCkge1xuXHRcdGxldCBwcm9qZWN0c0J5TG93ZXN0UHJpb2l0eSA9IHByb2plY3RzO1xuXHRcdHByb2plY3RzQnlMb3dlc3RQcmlvaXR5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdHJldHVybiBhLnByaW9yaXR5IC0gYi5wcmlvcml0eTtcblx0XHR9KTtcblx0XHRzb3J0ZWRQcm9qZWN0cyA9IHByb2plY3RzQnlMb3dlc3RQcmlvaXR5O1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZ1bmN0aW9uIHNvcnRCeURhdGVDbG9zZXN0KCkge1xuXHRcdGxldCBwcm9qZWN0c0J5RGF0ZUNsb3Nlc3QgPSBwcm9qZWN0cztcblx0XHRwcm9qZWN0c0J5RGF0ZUNsb3Nlc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0bmV3IERhdGUoYS5kdWVEYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShiLmR1ZURhdGUpLmdldFRpbWUoKVxuXHRcdFx0KTtcblx0XHR9KTtcblx0XHRzb3J0ZWRQcm9qZWN0cyA9IHByb2plY3RzQnlEYXRlQ2xvc2VzdDtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRmdW5jdGlvbiBzb3J0QnlEYXRlRmFydGhlc3QoKSB7XG5cdFx0bGV0IHByb2plY3RzQnlEYXRlRmFydGhlc3QgPSBwcm9qZWN0cztcblx0XHRwcm9qZWN0c0J5RGF0ZUZhcnRoZXN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdG5ldyBEYXRlKGIuZHVlRGF0ZSkuZ2V0VGltZSgpIC0gbmV3IERhdGUoYS5kdWVEYXRlKS5nZXRUaW1lKClcblx0XHRcdCk7XG5cdFx0fSk7XG5cdFx0c29ydGVkUHJvamVjdHMgPSBwcm9qZWN0c0J5RGF0ZUZhcnRoZXN0O1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZ1bmN0aW9uIGZpbHRlclRhc2tzKGRhdGEpIHtcblx0XHRpZiAoZGF0YSA9PT0gXCJvcGVuXCIpIHtcblx0XHRcdGZpbHRlclRhc2tzQnkgPSBcIm5vdC1jb21wbGV0ZWRcIjtcblx0XHR9IGVsc2UgaWYgKGRhdGEgPT09IFwiY2xvc2VkXCIpIHtcblx0XHRcdGZpbHRlclRhc2tzQnkgPSBcImNvbXBsZXRlZFwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRmaWx0ZXJUYXNrc0J5ID0gXCJhbGxcIjtcblx0XHR9XG5cdH1cblxuXHRmdW5jdGlvbiBvcGVuRWRpdE1vZGVsKCkge1xuXHRcdG5ld1Byb2plY3RNb2RhbC50aGVNb2RhbC5zaG93TW9kYWwoKTtcblx0XHRuZXdQcm9qZWN0TW9kYWwudGl0bGVJbnB1dC52YWx1ZSA9IHByb2plY3RUb0VkaXRbMF0udGl0bGU7XG5cdFx0bmV3UHJvamVjdE1vZGFsLmRlc2NyaXB0aW9uSW5wdXQudmFsdWUgPSBwcm9qZWN0VG9FZGl0WzBdLmRlc2NyaXB0aW9uO1xuXHRcdG5ld1Byb2plY3RNb2RhbC5kdWVEYXRlSW5wdXQudmFsdWUgPSBwcm9qZWN0VG9FZGl0WzBdLmR1ZURhdGU7XG5cdFx0bmV3UHJvamVjdE1vZGFsLnJhZGlvSW5wdXRzLmZvckVhY2goKGlucHV0KSA9PiB7XG5cdFx0XHRjb25zb2xlLmxvZyhpbnB1dCk7XG5cdFx0XHRjb25zb2xlLmxvZyhjaGVja1ByaW9yaXR5KHByb2plY3RUb0VkaXRbMF0ucHJpb3JpdHkpLnRvTG93ZXJDYXNlKCkpO1xuXHRcdFx0Y29uc29sZS5sb2coaW5wdXQuaWQpO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRjaGVja1ByaW9yaXR5KHByb2plY3RUb0VkaXRbMF0ucHJpb3JpdHkpLnRvTG93ZXJDYXNlKCkgPT09XG5cdFx0XHRcdGlucHV0LmlkXG5cdFx0XHQpIHtcblx0XHRcdFx0aW5wdXQuY2hlY2tlZCA9IHRydWU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpbnB1dC5jaGVja2VkID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0bmV3UHJvamVjdE1vZGFsLnNhdmVCdG4uZGF0YXNldC5wcm9qZWN0SWQgPSBwcm9qZWN0VG9FZGl0WzBdLmlkO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRyZW5kZXJQcm9qZWN0c0hlYWRlcixcblx0XHRyZW5kZXJQcm9qZWN0cyxcblx0XHRwcm9qZWN0SGVhZGVyRXZlbnRMaXN0ZW5lcnMsXG5cdFx0cHJvamVjdENhcmRFdmVudExpc3RlbmVycyxcblx0fTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IG15UHJvamVjdHM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=