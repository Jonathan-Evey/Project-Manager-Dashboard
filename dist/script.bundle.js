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
	let projects = JSON.parse(
		localStorage.getItem(LOCAL_STORAGE_PROJECTS_KEY)
	) || [
		{
			id: "123456789",
			title: "Example Project",
			description:
				"This is an example project description. The goal of this project is to show what the project manager looks like with projects added to it.",
			checklist: [
				{
					id: "12",
					taskDetails: "Fill out example project infromation",
					complete: true,
				},
				{
					id: "15",
					taskDetails: "Add multiple tasks to example project",
					complete: true,
				},
				{
					id: "16",
					taskDetails: "Some task that is not done yet",
					complete: false,
				},
			],
			dueDate: "2022-11-01",
			priority: 3,
		},
		{
			id: "987654321",
			title: "Better Example Project",
			description:
				"This is an better example project description. The goal of this project is to show what the project manager looks like with projects added to it.", //user input from html form
			checklist: [
				{
					id: "12",
					taskDetails: "Finish adding example project infromation",
					complete: false,
				},
				{
					id: "15",
					taskDetails: "Add multiple tasks to example project",
					complete: true,
				},
				{
					id: "16",
					taskDetails: "Some task that is not done yet",
					complete: false,
				},
				{
					id: "18",
					taskDetails: "Another task that is not done yet",
					complete: false,
				},
			],
			dueDate: "2022-12-08",
			priority: 4,
		},
	];

	let projectCardContainer =
		_DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].HTML_ANCHORS.projectCardContainer;
	let newProjectModal = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].newProjectModal;
	let newTaskModal = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].newTaskModal;
	let projectsHeader = _DOMElements_js__WEBPACK_IMPORTED_MODULE_0__["default"].HTML_ANCHORS.projectsHeader;

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
				const index = projects.findIndex((project) => {
					return project.id === e.target.dataset.projectId;
				});
				projects.splice(index, 1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyaXB0LmJ1bmRsZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsZUFBZSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7O0FDbkNnQjs7QUFFL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBLEVBQUUseUZBQWlEO0FBQ25ELHVCQUF1Qix1RUFBK0I7QUFDdEQsb0JBQW9CLG9FQUE0QjtBQUNoRCxzQkFBc0IsbUZBQTJDOztBQUVqRTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxDQUFxQjtBQUMzQixNQUFNLENBQWU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOENBQThDLHlCQUF5QjtBQUN2RTs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLGtEQUFrRCxnQkFBZ0I7QUFDbEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtbWFuYWdlci1kYXNoYm9hcmQvLi9zcmMvRE9NRWxlbWVudHMuanMiLCJ3ZWJwYWNrOi8vcHJvamVjdC1tYW5hZ2VyLWRhc2hib2FyZC8uL3NyYy9zY3JpcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmluZERPTUVsZW1lbnRzID0gKGZ1bmN0aW9uICgpIHtcblx0Y29uc3QgSFRNTF9BTkNIT1JTID0ge1xuXHRcdHByb2plY3RzSGVhZGVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RzLWxpc3QtaGVhZGVyXCIpLFxuXHRcdHByb2plY3RDYXJkQ29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3QtY2FyZC1jb250YWluZXJcIiksXG5cdH07XG5cblx0Y29uc3QgbmV3UHJvamVjdE1vZGFsID0ge1xuXHRcdG9wZW5Nb2RhbEJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuLXByb2plY3QtbW9kYWwtYnRuXCIpLFxuXHRcdHRoZU1vZGFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1uZXctcHJvamVjdC1tb2RhbFwiKSxcblxuXHRcdC8vLS0tLS0tLS0tLS0tbW9kYWwgZm9ybSBpbnB1dHNcblx0XHR0aXRsZUlucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInByb2plY3RfdGl0bGVcIiksXG5cdFx0ZGVzY3JpcHRpb25JbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0X2Rlc2NyaXB0aW9uXCIpLFxuXHRcdGR1ZURhdGVJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdWVfZGF0ZVwiKSxcblx0XHRzYXZlQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhdmUtcHJvamVjdFwiKSxcblx0XHRyYWRpb0lucHV0czogZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi51cmdlbmN5LWNoZWNrYm94XCIpLFxuXHRcdC8vLy8vLy8vIHJhZGlvIGlucHV0IGlzIGZvdW5kIHdpdGhpbiBzdWJtaXQgZXZlbnQgLy8vLy8vLy8vLy9cblx0fTtcblxuXHRjb25zdCBuZXdUYXNrTW9kYWwgPSB7XG5cdFx0b3Blbk1vZGFsQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1uZXctdGFzay1idG5cIiksXG5cdFx0dGhlTW9kYWw6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYWRkLW5ldy10YXNrLW1vZGFsXCIpLFxuXG5cdFx0Ly8tLS0tLS0tLS0tLS1tb2RhbCBmb3JtIGlucHV0c1xuXHRcdHRhc2tEZXRhaWxzSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidGFza19kZXRhaWxzXCIpLFxuXHRcdHNhdmVCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2F2ZS10YXNrXCIpLFxuXHR9O1xuXG5cdHJldHVybiB7XG5cdFx0SFRNTF9BTkNIT1JTLFxuXHRcdG5ld1Byb2plY3RNb2RhbCxcblx0XHRuZXdUYXNrTW9kYWwsXG5cdH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBmaW5kRE9NRWxlbWVudHM7XG4iLCJpbXBvcnQgZmluZERPTUVsZW1lbnRzIGZyb20gXCIuL0RPTUVsZW1lbnRzLmpzXCI7XG5cbi8qWW91ciB0b2RvIGxpc3Qgc2hvdWxkIGhhdmUgcHJvamVjdHMgb3Igc2VwYXJhdGUgbGlzdHMgb2YgdG9kb3MuIFdoZW4gYSB1c2VyIGZpcnN0IG9wZW5zIHRoZSBhcHAsIHRoZXJlIHNob3VsZCBiZSBzb21lIHNvcnQgb2Yg4oCYZGVmYXVsdOKAmSBwcm9qZWN0IHRvIHdoaWNoIGFsbCBvZiB0aGVpciB0b2RvcyBhcmUgcHV0LiBVc2VycyBzaG91bGQgYmUgYWJsZSB0byBjcmVhdGUgbmV3IHByb2plY3RzIGFuZCBjaG9vc2Ugd2hpY2ggcHJvamVjdCB0aGVpciB0b2RvcyBnbyBpbnRvLiAqL1xuY29uc3QgbXlQcm9qZWN0cyA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IExPQ0FMX1NUT1JBR0VfUFJPSkVDVFNfS0VZID0gXCJteVByb2plY3RNYW5hZ2VyLlByb2plY3RcIjtcblx0bGV0IHByb2plY3RzID0gSlNPTi5wYXJzZShcblx0XHRsb2NhbFN0b3JhZ2UuZ2V0SXRlbShMT0NBTF9TVE9SQUdFX1BST0pFQ1RTX0tFWSlcblx0KSB8fCBbXG5cdFx0e1xuXHRcdFx0aWQ6IFwiMTIzNDU2Nzg5XCIsXG5cdFx0XHR0aXRsZTogXCJFeGFtcGxlIFByb2plY3RcIixcblx0XHRcdGRlc2NyaXB0aW9uOlxuXHRcdFx0XHRcIlRoaXMgaXMgYW4gZXhhbXBsZSBwcm9qZWN0IGRlc2NyaXB0aW9uLiBUaGUgZ29hbCBvZiB0aGlzIHByb2plY3QgaXMgdG8gc2hvdyB3aGF0IHRoZSBwcm9qZWN0IG1hbmFnZXIgbG9va3MgbGlrZSB3aXRoIHByb2plY3RzIGFkZGVkIHRvIGl0LlwiLFxuXHRcdFx0Y2hlY2tsaXN0OiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogXCIxMlwiLFxuXHRcdFx0XHRcdHRhc2tEZXRhaWxzOiBcIkZpbGwgb3V0IGV4YW1wbGUgcHJvamVjdCBpbmZyb21hdGlvblwiLFxuXHRcdFx0XHRcdGNvbXBsZXRlOiB0cnVlLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWQ6IFwiMTVcIixcblx0XHRcdFx0XHR0YXNrRGV0YWlsczogXCJBZGQgbXVsdGlwbGUgdGFza3MgdG8gZXhhbXBsZSBwcm9qZWN0XCIsXG5cdFx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogXCIxNlwiLFxuXHRcdFx0XHRcdHRhc2tEZXRhaWxzOiBcIlNvbWUgdGFzayB0aGF0IGlzIG5vdCBkb25lIHlldFwiLFxuXHRcdFx0XHRcdGNvbXBsZXRlOiBmYWxzZSxcblx0XHRcdFx0fSxcblx0XHRcdF0sXG5cdFx0XHRkdWVEYXRlOiBcIjIwMjItMTEtMDFcIixcblx0XHRcdHByaW9yaXR5OiAzLFxuXHRcdH0sXG5cdFx0e1xuXHRcdFx0aWQ6IFwiOTg3NjU0MzIxXCIsXG5cdFx0XHR0aXRsZTogXCJCZXR0ZXIgRXhhbXBsZSBQcm9qZWN0XCIsXG5cdFx0XHRkZXNjcmlwdGlvbjpcblx0XHRcdFx0XCJUaGlzIGlzIGFuIGJldHRlciBleGFtcGxlIHByb2plY3QgZGVzY3JpcHRpb24uIFRoZSBnb2FsIG9mIHRoaXMgcHJvamVjdCBpcyB0byBzaG93IHdoYXQgdGhlIHByb2plY3QgbWFuYWdlciBsb29rcyBsaWtlIHdpdGggcHJvamVjdHMgYWRkZWQgdG8gaXQuXCIsIC8vdXNlciBpbnB1dCBmcm9tIGh0bWwgZm9ybVxuXHRcdFx0Y2hlY2tsaXN0OiBbXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogXCIxMlwiLFxuXHRcdFx0XHRcdHRhc2tEZXRhaWxzOiBcIkZpbmlzaCBhZGRpbmcgZXhhbXBsZSBwcm9qZWN0IGluZnJvbWF0aW9uXCIsXG5cdFx0XHRcdFx0Y29tcGxldGU6IGZhbHNlLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR7XG5cdFx0XHRcdFx0aWQ6IFwiMTVcIixcblx0XHRcdFx0XHR0YXNrRGV0YWlsczogXCJBZGQgbXVsdGlwbGUgdGFza3MgdG8gZXhhbXBsZSBwcm9qZWN0XCIsXG5cdFx0XHRcdFx0Y29tcGxldGU6IHRydWUsXG5cdFx0XHRcdH0sXG5cdFx0XHRcdHtcblx0XHRcdFx0XHRpZDogXCIxNlwiLFxuXHRcdFx0XHRcdHRhc2tEZXRhaWxzOiBcIlNvbWUgdGFzayB0aGF0IGlzIG5vdCBkb25lIHlldFwiLFxuXHRcdFx0XHRcdGNvbXBsZXRlOiBmYWxzZSxcblx0XHRcdFx0fSxcblx0XHRcdFx0e1xuXHRcdFx0XHRcdGlkOiBcIjE4XCIsXG5cdFx0XHRcdFx0dGFza0RldGFpbHM6IFwiQW5vdGhlciB0YXNrIHRoYXQgaXMgbm90IGRvbmUgeWV0XCIsXG5cdFx0XHRcdFx0Y29tcGxldGU6IGZhbHNlLFxuXHRcdFx0XHR9LFxuXHRcdFx0XSxcblx0XHRcdGR1ZURhdGU6IFwiMjAyMi0xMi0wOFwiLFxuXHRcdFx0cHJpb3JpdHk6IDQsXG5cdFx0fSxcblx0XTtcblxuXHRsZXQgcHJvamVjdENhcmRDb250YWluZXIgPVxuXHRcdGZpbmRET01FbGVtZW50cy5IVE1MX0FOQ0hPUlMucHJvamVjdENhcmRDb250YWluZXI7XG5cdGxldCBuZXdQcm9qZWN0TW9kYWwgPSBmaW5kRE9NRWxlbWVudHMubmV3UHJvamVjdE1vZGFsO1xuXHRsZXQgbmV3VGFza01vZGFsID0gZmluZERPTUVsZW1lbnRzLm5ld1Rhc2tNb2RhbDtcblx0bGV0IHByb2plY3RzSGVhZGVyID0gZmluZERPTUVsZW1lbnRzLkhUTUxfQU5DSE9SUy5wcm9qZWN0c0hlYWRlcjtcblxuXHRsZXQgc29ydGVkUHJvamVjdHMgPSBwcm9qZWN0cztcblxuXHRsZXQgc2VsZWN0ZWRQcm9qZWN0ID0gW107XG5cblx0bGV0IHByb2plY3RUb0VkaXQ7XG5cblx0bGV0IGZpbHRlclRhc2tzQnkgPSBcImFsbFwiO1xuXG5cdGNvbnN0IGNyZWF0ZVByb2plY3QgPSAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkgPT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHRpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuXHRcdFx0dGl0bGU6IHRpdGxlLFxuXHRcdFx0ZGVzY3JpcHRpb246IGRlc2NyaXB0aW9uLFxuXHRcdFx0Y2hlY2tsaXN0OiBbXSxcblx0XHRcdGR1ZURhdGU6IGR1ZURhdGUsXG5cdFx0XHRwcmlvcml0eTogcHJpb3JpdHksXG5cdFx0fTtcblx0fTtcblxuXHRjb25zdCBjcmVhdENoZWNrbGlzdCA9ICh0YXNrRGV0YWlscykgPT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHRpZDogRGF0ZS5ub3coKS50b1N0cmluZygpLFxuXHRcdFx0dGFza0RldGFpbHM6IHRhc2tEZXRhaWxzLFxuXHRcdFx0Y29tcGxldGU6IGZhbHNlLFxuXHRcdH07XG5cdH07XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8gZm9ybSBpbnRlcmFjdGlvbnMgZm9yIGFkZGluZyBhIHByb2plY3QgLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRuZXdQcm9qZWN0TW9kYWwudGhlTW9kYWwuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0fSk7XG5cblx0bmV3UHJvamVjdE1vZGFsLnNhdmVCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcblx0XHRwdXNoRm9ybUlucHV0VG9Qcm9qZWN0cygpO1xuXHRcdHJlbmRlcigpO1xuXHRcdHJldHVybjtcblx0fSk7XG5cblx0Ly8tLS1vbiBmb3JtIHN1Ym1pdCBidG4gZXZlbnQgLSB0YWtlcyBpbnB1dCB2YWx1ZSBhbmQgcHVzaGVzIHRvIHByb2plY3RzIGFycmF5XG5cdGZ1bmN0aW9uIHB1c2hGb3JtSW5wdXRUb1Byb2plY3RzKCkge1xuXHRcdGlmIChcblx0XHRcdHByb2plY3RUb0VkaXQgJiZcblx0XHRcdG5ld1Byb2plY3RNb2RhbC5zYXZlQnRuLmRhdGFzZXQucHJvamVjdElkID09PSBwcm9qZWN0VG9FZGl0WzBdLmlkXG5cdFx0KSB7XG5cdFx0XHRjb25zdCBpbmRleCA9IHByb2plY3RzLmZpbmRJbmRleCgocHJvamVjdCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gcHJvamVjdC5pZCA9PT0gbmV3UHJvamVjdE1vZGFsLnNhdmVCdG4uZGF0YXNldC5wcm9qZWN0SWQ7XG5cdFx0XHR9KTtcblxuXHRcdFx0cHJvamVjdHNbaW5kZXhdLnRpdGxlID0gbmV3UHJvamVjdE1vZGFsLnRpdGxlSW5wdXQudmFsdWU7XG5cdFx0XHRwcm9qZWN0c1tpbmRleF0uZGVzY3JpcHRpb24gPVxuXHRcdFx0XHRuZXdQcm9qZWN0TW9kYWwuZGVzY3JpcHRpb25JbnB1dC52YWx1ZTtcblx0XHRcdHByb2plY3RzW2luZGV4XS5kdWVEYXRlID0gbmV3UHJvamVjdE1vZGFsLmR1ZURhdGVJbnB1dC52YWx1ZTtcblx0XHRcdGxldCBuZXdQcm9qZWN0UHJpb3JpdHlJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG5cdFx0XHRcdFwiaW5wdXRbdHlwZT1yYWRpb11bbmFtZT1wcmlvcml0eV06Y2hlY2tlZFwiXG5cdFx0XHQpO1xuXHRcdFx0cHJvamVjdHNbaW5kZXhdLnByaW9yaXR5ID0gZmluZFByaW9yaXR5VmFsdWUoXG5cdFx0XHRcdG5ld1Byb2plY3RQcmlvcml0eUlucHV0LnZhbHVlXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRsZXQgbmV3UHJvamVjdFRpdGxlID0gbmV3UHJvamVjdE1vZGFsLnRpdGxlSW5wdXQudmFsdWU7XG5cdFx0XHRpZiAobmV3UHJvamVjdFRpdGxlID09PSBudWxsIHx8IG5ld1Byb2plY3RUaXRsZSA9PT0gXCJcIikge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRsZXQgbmV3UHJvamVjdERlc2NyaXB0aW9uID0gbmV3UHJvamVjdE1vZGFsLmRlc2NyaXB0aW9uSW5wdXQudmFsdWU7XG5cdFx0XHRsZXQgbmV3UHJvamVjdER1ZURhdGUgPSBuZXdQcm9qZWN0TW9kYWwuZHVlRGF0ZUlucHV0LnZhbHVlO1xuXG5cdFx0XHRsZXQgbmV3UHJvamVjdFByaW9yaXR5SW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuXHRcdFx0XHRcImlucHV0W3R5cGU9cmFkaW9dW25hbWU9cHJpb3JpdHldOmNoZWNrZWRcIlxuXHRcdFx0KTtcblx0XHRcdGxldCBuZXdQcm9qZWN0UHJpb3JpdHkgPSBmaW5kUHJpb3JpdHlWYWx1ZShcblx0XHRcdFx0bmV3UHJvamVjdFByaW9yaXR5SW5wdXQudmFsdWVcblx0XHRcdCk7XG5cblx0XHRcdGxldCBwcm9qZWN0ID0gY3JlYXRlUHJvamVjdChcblx0XHRcdFx0bmV3UHJvamVjdFRpdGxlLFxuXHRcdFx0XHRuZXdQcm9qZWN0RGVzY3JpcHRpb24sXG5cdFx0XHRcdG5ld1Byb2plY3REdWVEYXRlLFxuXHRcdFx0XHRuZXdQcm9qZWN0UHJpb3JpdHlcblx0XHRcdCk7XG5cblx0XHRcdHByb2plY3RzLnB1c2gocHJvamVjdCk7XG5cdFx0fVxuXHRcdHJlc2V0UHJvamVjdEZvcm0oKTtcblx0XHRjbG9zZVByb2plY3RNb2RhbCgpO1xuXHRcdHJldHVybjtcblx0fVxuXHQvLy0tLS0gcmVzZXRzIHByb2plY3QgZm9ybSB0byBkZWZhbHV0XG5cdGZ1bmN0aW9uIHJlc2V0UHJvamVjdEZvcm0oKSB7XG5cdFx0bmV3UHJvamVjdE1vZGFsLnRpdGxlSW5wdXQudmFsdWUgPSBudWxsO1xuXHRcdG5ld1Byb2plY3RNb2RhbC5kZXNjcmlwdGlvbklucHV0LnZhbHVlID0gbnVsbDtcblx0XHRuZXdQcm9qZWN0TW9kYWwuZHVlRGF0ZUlucHV0LnZhbHVlID0gbnVsbDtcblx0XHRsZXQgZGVmYXVsdFByaW9yaXR5ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJub25lXCIpO1xuXHRcdGRlZmF1bHRQcmlvcml0eS5jaGVja2VkID0gdHJ1ZTtcblx0XHRyZXR1cm47XG5cdH1cblx0ZnVuY3Rpb24gY2xvc2VQcm9qZWN0TW9kYWwoKSB7XG5cdFx0cmV0dXJuIG5ld1Byb2plY3RNb2RhbC50aGVNb2RhbC5jbG9zZSgpO1xuXHR9XG5cblx0bmV3VGFza01vZGFsLnRoZU1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcblx0XHRlLnByZXZlbnREZWZhdWx0KCk7XG5cdH0pO1xuXHRuZXdUYXNrTW9kYWwuc2F2ZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuXHRcdHB1c2hGb3JtSW5wdXRUb1Rhc2tzKCk7XG5cdFx0cmVzZXRUYXNrRm9ybSgpO1xuXHRcdHNhdmUoKTtcblx0XHRjbGVhckVsZW1lbnRzKHByb2plY3RDYXJkQ29udGFpbmVyKTtcblx0XHRjbGVhckVsZW1lbnRzKHByb2plY3RzSGVhZGVyKTtcblx0XHRyZW5kZXJTZWxlY3RlZFByb2plY3QoKTtcblx0XHRyZXR1cm47XG5cdH0pO1xuXHRmdW5jdGlvbiBwdXNoRm9ybUlucHV0VG9UYXNrcygpIHtcblx0XHRsZXQgbmV3VGFza0RldGFpbHMgPSBuZXdUYXNrTW9kYWwudGFza0RldGFpbHNJbnB1dC52YWx1ZTtcblx0XHRpZiAobmV3VGFza0RldGFpbHMgPT09IG51bGwgfHwgbmV3VGFza0RldGFpbHMgPT09IFwiXCIpIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cdFx0bGV0IHRhc2sgPSBjcmVhdENoZWNrbGlzdChuZXdUYXNrRGV0YWlscyk7XG5cdFx0bGV0IG9wZW5Nb2RhbEJ0bklkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtbmV3LXRhc2stYnRuXCIpO1xuXHRcdGxldCBjdXJyZW50UHJvamVjdElkID0gb3Blbk1vZGFsQnRuSWQuZGF0YXNldC5wcm9qZWN0SWQ7XG5cdFx0bGV0IGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdHMuZmluZChcblx0XHRcdChwcm9qZWN0KSA9PiBwcm9qZWN0LmlkID09PSBjdXJyZW50UHJvamVjdElkXG5cdFx0KTtcblx0XHRjdXJyZW50UHJvamVjdC5jaGVja2xpc3QucHVzaCh0YXNrKTtcblx0XHRyZXR1cm47XG5cdH1cblx0ZnVuY3Rpb24gcmVzZXRUYXNrRm9ybSgpIHtcblx0XHRuZXdUYXNrTW9kYWwudGFza0RldGFpbHNJbnB1dC52YWx1ZSA9IG51bGw7XG5cdFx0bmV3VGFza01vZGFsLnRoZU1vZGFsLmNsb3NlKCk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGZ1bmN0aW9uIGZpbmRQcmlvcml0eVZhbHVlKHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09PSBcImxvd1wiKSB7XG5cdFx0XHRyZXR1cm4gMTtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSBcIm1pZFwiKSB7XG5cdFx0XHRyZXR1cm4gMjtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSBcImhpZ2hcIikge1xuXHRcdFx0cmV0dXJuIDM7XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJ1cmdlbnRcIikge1xuXHRcdFx0cmV0dXJuIDQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiAwO1xuXHRcdH1cblx0fVxuXHRmdW5jdGlvbiBjaGVja1ByaW9yaXR5KHZhbHVlKSB7XG5cdFx0aWYgKHZhbHVlID09PSAxKSB7XG5cdFx0XHRyZXR1cm4gXCJMb3dcIjtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSAyKSB7XG5cdFx0XHRyZXR1cm4gXCJNaWRcIjtcblx0XHR9IGVsc2UgaWYgKHZhbHVlID09PSAzKSB7XG5cdFx0XHRyZXR1cm4gXCJIaWdoXCI7XG5cdFx0fSBlbHNlIGlmICh2YWx1ZSA9PT0gNCkge1xuXHRcdFx0cmV0dXJuIFwiVXJnZW50XCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIk5vbmVcIjtcblx0XHR9XG5cdH1cblxuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8gRXZlbnQgbGlzdGVuZXJzIC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblx0ZnVuY3Rpb24gcHJvamVjdEhlYWRlckV2ZW50TGlzdGVuZXJzKCkge1xuXHRcdHByb2plY3RzSGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcIm9wZW4tcHJvamVjdC1tb2RhbC1idG5cIikpIHtcblx0XHRcdFx0bmV3UHJvamVjdE1vZGFsLnNhdmVCdG4uZGF0YXNldC5wcm9qZWN0SWQgPSBcIlwiO1xuXHRcdFx0XHRyZXNldFByb2plY3RGb3JtKCk7XG5cdFx0XHRcdHJldHVybiBuZXdQcm9qZWN0TW9kYWwudGhlTW9kYWwuc2hvd01vZGFsKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic29ydC1ieS1tb3N0LWJ0blwiKSkge1xuXHRcdFx0XHRzb3J0QnlNb3N0VGFrcygpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzb3J0LWJ5LWxlYXN0LWJ0blwiKSkge1xuXHRcdFx0XHRzb3J0QnlMZWFzdFRha3MoKTtcblx0XHRcdFx0cmVuZGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwic29ydC1ieS1oaWdoZXN0LWJ0blwiKSkge1xuXHRcdFx0XHRzb3J0QnlQcmlvaXR5SGlnaGVzdCgpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzb3J0LWJ5LWxvd2VzdC1idG5cIikpIHtcblx0XHRcdFx0c29ydEJ5UHJpb2l0eUxvd2VzdCgpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJzb3J0LWJ5LWNsb3Nlc3QtYnRuXCIpKSB7XG5cdFx0XHRcdHNvcnRCeURhdGVDbG9zZXN0KCk7XG5cdFx0XHRcdHJlbmRlcigpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInNvcnQtYnktZmFydGhlc3QtYnRuXCIpKSB7XG5cdFx0XHRcdHNvcnRCeURhdGVGYXJ0aGVzdCgpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGZ1bmN0aW9uIHByb2plY3RDYXJkRXZlbnRMaXN0ZW5lcnMoKSB7XG5cdFx0cHJvamVjdENhcmRDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZGVsZXRlLXByb2plY3QtYnRuXCIpKSB7XG5cdFx0XHRcdGNvbnN0IGluZGV4ID0gcHJvamVjdHMuZmluZEluZGV4KChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIHByb2plY3QuaWQgPT09IGUudGFyZ2V0LmRhdGFzZXQucHJvamVjdElkO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cHJvamVjdHMuc3BsaWNlKGluZGV4LCAxKTtcblx0XHRcdFx0cmVuZGVyKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZWRpdC1wcm9qZWN0LWJ0blwiKSkge1xuXHRcdFx0XHRwcm9qZWN0VG9FZGl0ID0gcHJvamVjdHMuZmlsdGVyKChwcm9qZWN0KSA9PiB7XG5cdFx0XHRcdFx0aWYgKHByb2plY3QuaWQgPT09IGUudGFyZ2V0LmRhdGFzZXQucHJvamVjdElkKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4geyAuLi5wcm9qZWN0IH07XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRvcGVuRWRpdE1vZGVsKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwicHJvamVjdC1jYXJkXCIpKSB7XG5cdFx0XHRcdHNlbGVjdGVkUHJvamVjdCA9IHByb2plY3RzLmZpbHRlcihcblx0XHRcdFx0XHQocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gZS50YXJnZXQuZGF0YXNldC5wcm9qZWN0SWRcblx0XHRcdFx0KTtcblx0XHRcdFx0cmVuZGVyU2VsZWN0ZWRQcm9qZWN0KCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwiY2xvc2UtcHJvamVjdC1idG5cIikpIHtcblx0XHRcdFx0ZmlsdGVyVGFza3MoXCJhbGxcIik7XG5cdFx0XHRcdGNsZWFyRWxlbWVudHMocHJvamVjdENhcmRDb250YWluZXIpO1xuXHRcdFx0XHRyZW5kZXIoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJhZGQtbmV3LXRhc2stYnRuXCIpKSB7XG5cdFx0XHRcdHJldHVybiBuZXdUYXNrTW9kYWwudGhlTW9kYWwuc2hvd01vZGFsKCk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcblx0XHRcdFx0XHRcInRhc2stY2hlY2tib3gtY29uYXRpbmVyXCIgfHxcblx0XHRcdFx0XHRcdFwidGFzay1jaGVja2JveC1sYWJlbFwiIHx8XG5cdFx0XHRcdFx0XHRcInRhc2stY2hlY2tib3hcIlxuXHRcdFx0XHQpXG5cdFx0XHQpIHtcblx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0WzBdLmNoZWNrbGlzdC5mb3JFYWNoKChsaXN0KSA9PiB7XG5cdFx0XHRcdFx0aWYgKGxpc3QuaWQgPT09IGUudGFyZ2V0LmlkKSB7XG5cdFx0XHRcdFx0XHRsaXN0LmNvbXBsZXRlID0gIWxpc3QuY29tcGxldGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRyZW5kZXJTZWxlY3RlZFByb2plY3QoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJkZWxldGUtdGFzay1idG5cIikpIHtcblx0XHRcdFx0cHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0XHRcdHByb2plY3QuY2hlY2tsaXN0ID0gcHJvamVjdC5jaGVja2xpc3QuZmlsdGVyKFxuXHRcdFx0XHRcdFx0KGxpc3QpID0+IGxpc3QuaWQgIT09IGUudGFyZ2V0LmRhdGFzZXQuY2hlY2tsaXN0SWRcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0c2F2ZSgpO1xuXHRcdFx0XHRyZW5kZXJTZWxlY3RlZFByb2plY3QoKTtcblx0XHRcdH1cblx0XHRcdGlmIChlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJvcGVuLXRhc2tzLWJ0blwiKSkge1xuXHRcdFx0XHRmaWx0ZXJUYXNrcyhcIm9wZW5cIik7XG5cdFx0XHRcdHJlbmRlclNlbGVjdGVkUHJvamVjdCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImNsb3NlZC10YXNrcy1idG5cIikpIHtcblx0XHRcdFx0ZmlsdGVyVGFza3MoXCJjbG9zZWRcIik7XG5cdFx0XHRcdHJlbmRlclNlbGVjdGVkUHJvamVjdCgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImFsbC10YXNrcy1idG5cIikpIHtcblx0XHRcdFx0ZmlsdGVyVGFza3MoXCJhbGxcIik7XG5cdFx0XHRcdHJlbmRlclNlbGVjdGVkUHJvamVjdCgpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vIEhUTUwgcmVuZGVyIGZ1bmN0aW9ucyAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHRmdW5jdGlvbiBzYXZlKCkge1xuXHRcdGxvY2FsU3RvcmFnZS5zZXRJdGVtKFxuXHRcdFx0TE9DQUxfU1RPUkFHRV9QUk9KRUNUU19LRVksXG5cdFx0XHRKU09OLnN0cmluZ2lmeShwcm9qZWN0cylcblx0XHQpO1xuXHR9XG5cdGZ1bmN0aW9uIHJlbmRlcigpIHtcblx0XHRzYXZlKCk7XG5cdFx0Y2xlYXJFbGVtZW50cyhwcm9qZWN0Q2FyZENvbnRhaW5lcik7XG5cdFx0Y2xlYXJFbGVtZW50cyhwcm9qZWN0c0hlYWRlcik7XG5cdFx0cmVuZGVyUHJvamVjdHNIZWFkZXIoKTtcblx0XHRyZW5kZXJQcm9qZWN0cygpO1xuXHR9XG5cblx0ZnVuY3Rpb24gY2xlYXJFbGVtZW50cyhlbGVtZW50KSB7XG5cdFx0d2hpbGUgKGVsZW1lbnQuZmlyc3RDaGlsZCkge1xuXHRcdFx0ZWxlbWVudC5yZW1vdmVDaGlsZChlbGVtZW50LmZpcnN0Q2hpbGQpO1xuXHRcdH1cblx0fVxuXHQvLy0tLU1ha2VzIHRoZSBoZWFkZXIgb3ZlciB0aGUgbGlzdCBvZiBwcm9qZWN0c1xuXHRmdW5jdGlvbiByZW5kZXJQcm9qZWN0c0hlYWRlcigpIHtcblx0XHRsZXQgcHJvamVjdEhlYWRlclNvcnRDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdHByb2plY3RIZWFkZXJTb3J0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXG5cdFx0XHRcInByb2plY3QtaGVhZGVyLXNvcnQtY29udGFpbmVyXCJcblx0XHQpO1xuXHRcdHByb2plY3RzSGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3RIZWFkZXJTb3J0Q29udGFpbmVyKTtcblxuXHRcdGxldCBwcm9qZWN0SGVhZGVyVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRwcm9qZWN0SGVhZGVyVGl0bGUuaW5uZXJUZXh0ID0gXCJTb3J0IFByb2plY3RzXCI7XG5cdFx0cHJvamVjdEhlYWRlclRpdGxlLmNsYXNzTGlzdC5hZGQoXCJzb3J0LXByb2plY3QtbWVudS10aXRsZVwiKTtcblx0XHRwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SGVhZGVyVGl0bGUpO1xuXG5cdFx0bGV0IHNvcnRCeVRhc2tzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lci5hcHBlbmRDaGlsZChzb3J0QnlUYXNrc0NvbnRhaW5lcik7XG5cdFx0bGV0IHByb2plY3RIZWFkZXJUYXNrQ291bnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRwcm9qZWN0SGVhZGVyVGFza0NvdW50LmlubmVyVGV4dCA9IFwiVGFza3M6XCI7XG5cdFx0c29ydEJ5VGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEhlYWRlclRhc2tDb3VudCk7XG5cdFx0bGV0IHByb2plY3RTb3J0QnlNb3N0VGFza3NCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdHByb2plY3RTb3J0QnlNb3N0VGFza3NCdG4uY2xhc3NMaXN0LmFkZChcInNvcnQtYnktbW9zdC1idG5cIik7XG5cdFx0cHJvamVjdFNvcnRCeU1vc3RUYXNrc0J0bi5pbm5lclRleHQgPSBcIk1vc3RcIjtcblx0XHRzb3J0QnlUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0U29ydEJ5TW9zdFRhc2tzQnRuKTtcblx0XHRsZXQgcHJvamVjdFNvcnRCeUxlYXN0VGFza3NCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdHByb2plY3RTb3J0QnlMZWFzdFRhc2tzQnRuLmNsYXNzTGlzdC5hZGQoXCJzb3J0LWJ5LWxlYXN0LWJ0blwiKTtcblx0XHRwcm9qZWN0U29ydEJ5TGVhc3RUYXNrc0J0bi5pbm5lclRleHQgPSBcIkxlYXN0XCI7XG5cdFx0c29ydEJ5VGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdFNvcnRCeUxlYXN0VGFza3NCdG4pO1xuXG5cdFx0bGV0IHNvcnRCeVByaW9yaXR5Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRwcm9qZWN0SGVhZGVyU29ydENvbnRhaW5lci5hcHBlbmRDaGlsZChzb3J0QnlQcmlvcml0eUNvbnRhaW5lcik7XG5cdFx0bGV0IHByb2plY3RQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdHByb2plY3RQcmlvcml0eS5pbm5lclRleHQgPSBcIlByaW9yaXR5OlwiO1xuXHRcdHNvcnRCeVByaW9yaXR5Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RQcmlvcml0eSk7XG5cdFx0bGV0IHByb2plY3RTb3J0QnlIaWdoZXN0UHJpb3JpdHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdHByb2plY3RTb3J0QnlIaWdoZXN0UHJpb3JpdHlCdG4uY2xhc3NMaXN0LmFkZChcInNvcnQtYnktaGlnaGVzdC1idG5cIik7XG5cdFx0cHJvamVjdFNvcnRCeUhpZ2hlc3RQcmlvcml0eUJ0bi5pbm5lclRleHQgPSBcIkhpZ2hlc3RcIjtcblx0XHRzb3J0QnlQcmlvcml0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0U29ydEJ5SGlnaGVzdFByaW9yaXR5QnRuKTtcblx0XHRsZXQgcHJvamVjdFNvcnRCeUxlYXN0UHJpb3JpdHlCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdHByb2plY3RTb3J0QnlMZWFzdFByaW9yaXR5QnRuLmNsYXNzTGlzdC5hZGQoXCJzb3J0LWJ5LWxvd2VzdC1idG5cIik7XG5cdFx0cHJvamVjdFNvcnRCeUxlYXN0UHJpb3JpdHlCdG4uaW5uZXJUZXh0ID0gXCJMb3dlc3RcIjtcblx0XHRzb3J0QnlQcmlvcml0eUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0U29ydEJ5TGVhc3RQcmlvcml0eUJ0bik7XG5cblx0XHRsZXQgc29ydEJ5RGF0ZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0cHJvamVjdEhlYWRlclNvcnRDb250YWluZXIuYXBwZW5kQ2hpbGQoc29ydEJ5RGF0ZUNvbnRhaW5lcik7XG5cdFx0bGV0IHByb2plY3REdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0cHJvamVjdER1ZURhdGUuaW5uZXJUZXh0ID0gXCJEYXRlOlwiO1xuXHRcdHNvcnRCeURhdGVDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdER1ZURhdGUpO1xuXHRcdGxldCBwcm9qZWN0U29ydEJ5Q2xvc2VzdERhdGVCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdHByb2plY3RTb3J0QnlDbG9zZXN0RGF0ZUJ0bi5jbGFzc0xpc3QuYWRkKFwic29ydC1ieS1jbG9zZXN0LWJ0blwiKTtcblx0XHRwcm9qZWN0U29ydEJ5Q2xvc2VzdERhdGVCdG4uaW5uZXJUZXh0ID0gXCJDbG9zZXN0XCI7XG5cdFx0c29ydEJ5RGF0ZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0U29ydEJ5Q2xvc2VzdERhdGVCdG4pO1xuXHRcdGxldCBwcm9qZWN0U29ydEJ5RmFydGhlc3REYXRlQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRwcm9qZWN0U29ydEJ5RmFydGhlc3REYXRlQnRuLmNsYXNzTGlzdC5hZGQoXCJzb3J0LWJ5LWZhcnRoZXN0LWJ0blwiKTtcblx0XHRwcm9qZWN0U29ydEJ5RmFydGhlc3REYXRlQnRuLmlubmVyVGV4dCA9IFwiRmFydGhlc3RcIjtcblx0XHRzb3J0QnlEYXRlQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RTb3J0QnlGYXJ0aGVzdERhdGVCdG4pO1xuXG5cdFx0bGV0IG9wZW5Qcm9qZWN0TW9kYWxCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdG9wZW5Qcm9qZWN0TW9kYWxCdG4uY2xhc3NMaXN0LmFkZChcIm9wZW4tcHJvamVjdC1tb2RhbC1idG5cIik7XG5cdFx0b3BlblByb2plY3RNb2RhbEJ0bi5pbm5lclRleHQgPSBcIisgUHJvamVjdFwiO1xuXHRcdHByb2plY3RzSGVhZGVyLmFwcGVuZENoaWxkKG9wZW5Qcm9qZWN0TW9kYWxCdG4pO1xuXHR9XG5cdC8vLS0tTWFrZXMgdGhlIGxpc3Qgb2YgcHJvamVjdHNcblx0ZnVuY3Rpb24gcmVuZGVyUHJvamVjdHMoKSB7XG5cdFx0c29ydGVkUHJvamVjdHMuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuXHRcdFx0Ly8vLy8vLy8vLy8vLy8vLy8vL0NyZWF0ZXMgQ2FyZHMgZm9yIEVhY2ggUHJvamVjdC8vLy8vLy8vLy8vLy8vXG5cdFx0XHRsZXQgcHJvamVjdENhcmREaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0cHJvamVjdENhcmREaXYuY2xhc3NMaXN0LmFkZChcInByb2plY3QtY2FyZFwiKTtcblx0XHRcdHByb2plY3RDYXJkRGl2LmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdC5pZDtcblx0XHRcdHByb2plY3RDYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RDYXJkRGl2KTtcblxuXHRcdFx0bGV0IHByb2plY3RDYXJkVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDNcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZFRpdGxlLmlubmVyVGV4dCA9IHByb2plY3QudGl0bGU7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZFRpdGxlKTtcblxuXHRcdFx0bGV0IHByb2plY3RDYXJkQ2hlY2tsaXN0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZENoZWNrbGlzdC5pbm5lclRleHQgPSBgVGFza3M6ICR7cHJvamVjdC5jaGVja2xpc3QubGVuZ3RofWA7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZENoZWNrbGlzdCk7XG5cblx0XHRcdGxldCBwcm9qZWN0Q2FyZFByaW9yaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XG5cdFx0XHRwcm9qZWN0Q2FyZFByaW9yaXR5LmlubmVyVGV4dCA9IGBQcmlvcml0eTogJHtjaGVja1ByaW9yaXR5KFxuXHRcdFx0XHRwcm9qZWN0LnByaW9yaXR5XG5cdFx0XHQpfWA7XG5cdFx0XHRwcm9qZWN0Q2FyZERpdi5hcHBlbmRDaGlsZChwcm9qZWN0Q2FyZFByaW9yaXR5KTtcblxuXHRcdFx0bGV0IHByb2plY3RDYXJkRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0cHJvamVjdENhcmREdWVEYXRlLmlubmVyVGV4dCA9IGBDb21wbGV0ZSBieTogJHtwcm9qZWN0LmR1ZURhdGV9YDtcblx0XHRcdHByb2plY3RDYXJkRGl2LmFwcGVuZENoaWxkKHByb2plY3RDYXJkRHVlRGF0ZSk7XG5cblx0XHRcdC8vLy8vLy8vLy8vLy8vL0NyZWF0ZSBFZGl0IGFuZCBEZWxldGUgUHJvamVjdHMgQnV0dG9ucy8vLy8vLy8vLy9cblx0XHRcdGxldCBwcm9qZWN0QnRuQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHByb2plY3RCdG5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcInByb2plY3QtYnRuLWNvbnRhaW5lclwiKTtcblx0XHRcdHByb2plY3RDYXJkRGl2LmFwcGVuZENoaWxkKHByb2plY3RCdG5Db250YWluZXIpO1xuXG5cdFx0XHRsZXQgZWRpdFByb2plY3RCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0ZWRpdFByb2plY3RCdG4uaW5uZXJUZXh0ID0gXCJFZGl0XCI7XG5cdFx0XHRlZGl0UHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiZWRpdC1wcm9qZWN0LWJ0blwiKTtcblx0XHRcdGVkaXRQcm9qZWN0QnRuLmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdC5pZDtcblx0XHRcdHByb2plY3RCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdFByb2plY3RCdG4pO1xuXG5cdFx0XHRsZXQgZGVsZXRlUHJvamVjdEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRkZWxldGVQcm9qZWN0QnRuLmlubmVyVGV4dCA9IFwiRGVsZXRlXCI7XG5cdFx0XHRkZWxldGVQcm9qZWN0QnRuLmNsYXNzTGlzdC5hZGQoXCJkZWxldGUtcHJvamVjdC1idG5cIik7XG5cdFx0XHRkZWxldGVQcm9qZWN0QnRuLmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdC5pZDtcblx0XHRcdHByb2plY3RCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQoZGVsZXRlUHJvamVjdEJ0bik7XG5cdFx0fSk7XG5cdH1cblx0Ly8tLS1NYWtlcyB0aGUgc2VsZWN0ZWQgcHJvamVjdCBmdWxsIHNjcmVlblxuXHRmdW5jdGlvbiByZW5kZXJTZWxlY3RlZFByb2plY3QoKSB7XG5cdFx0Y2xlYXJFbGVtZW50cyhwcm9qZWN0Q2FyZENvbnRhaW5lcik7XG5cdFx0Y2xlYXJFbGVtZW50cyhwcm9qZWN0c0hlYWRlcik7XG5cdFx0c2VsZWN0ZWRQcm9qZWN0LmZvckVhY2goKHByb2plY3QpID0+IHtcblx0XHRcdGxldCBzZWxlY3RlZFByb2plY3RDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENhcmQuY2xhc3NMaXN0LmFkZChcInNlbGVjdGVkLXByb2plY3QtY2FyZFwiKTtcblx0XHRcdHByb2plY3RDYXJkQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdENhcmQpO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0SGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdEhlYWRlci5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtcHJvamVjdC1oZWFkZXJcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RDYXJkLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdEhlYWRlcik7XG5cblx0XHRcdGxldCBzZWxlY3RlZFByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdFRpdGxlLmlubmVyVGV4dCA9IHByb2plY3QudGl0bGU7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RIZWFkZXIuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0VGl0bGUpO1xuXG5cdFx0XHRsZXQgY2xvc2VQcm9qZWN0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdGNsb3NlUHJvamVjdEJ0bi5jbGFzc0xpc3QuYWRkKFwiY2xvc2UtcHJvamVjdC1idG5cIik7XG5cdFx0XHRjbG9zZVByb2plY3RCdG4uaW5uZXJUZXh0ID0gXCJCYWNrIHRvIFByb2plY3QgTGlzdFwiO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0SGVhZGVyLmFwcGVuZENoaWxkKGNsb3NlUHJvamVjdEJ0bik7XG5cblx0XHRcdGxldCBzZWxlY3RlZFByb2plY3RBc2lkZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RBc2lkZS5jbGFzc0xpc3QuYWRkKFwic2VsZWN0ZWQtcHJvamVjdC1hc2lkZVwiKTtcblx0XHRcdHNlbGVjdGVkUHJvamVjdENhcmQuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0QXNpZGUpO1xuXG5cdFx0XHRsZXQgcHJvamVjdERlYWRsaW5lQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdHByb2plY3REZWFkbGluZUNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFxuXHRcdFx0XHRcInByb2plY3QtZGVhZGxpbmUtY29udGFpbmVyXCJcblx0XHRcdCk7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RBc2lkZS5hcHBlbmRDaGlsZChwcm9qZWN0RGVhZGxpbmVDb250YWluZXIpO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0RHVlRGF0ZS5pbm5lclRleHQgPSBcIkR1ZTogXCIgKyBwcm9qZWN0LmR1ZURhdGU7XG5cdFx0XHRwcm9qZWN0RGVhZGxpbmVDb250YWluZXIuYXBwZW5kQ2hpbGQoc2VsZWN0ZWRQcm9qZWN0RHVlRGF0ZSk7XG5cblx0XHRcdGxldCBzZWxlY3RlZFByb2plY3RQcmlvcml0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0UHJpb3JpdHkuaW5uZXJUZXh0ID1cblx0XHRcdFx0XCJQcmlvcml0eTogXCIgKyBjaGVja1ByaW9yaXR5KHByb2plY3QucHJpb3JpdHkpO1xuXHRcdFx0cHJvamVjdERlYWRsaW5lQ29udGFpbmVyLmFwcGVuZENoaWxkKHNlbGVjdGVkUHJvamVjdFByaW9yaXR5KTtcblxuXHRcdFx0bGV0IHNlbGVjdGVkUHJvamVjdENhcmREZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2FyZERlc2NyaXB0aW9uLmNsYXNzTGlzdC5hZGQoXCJwcm9qZWN0LWRlc2NyaXB0aW9uXCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2FyZERlc2NyaXB0aW9uLmlubmVyVGV4dCA9IHByb2plY3QuZGVzY3JpcHRpb247XG5cdFx0XHRzZWxlY3RlZFByb2plY3RBc2lkZS5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RDYXJkRGVzY3JpcHRpb24pO1xuXG5cdFx0XHRsZXQgc2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRzZWxlY3RlZFByb2plY3RUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXG5cdFx0XHRcdFwic2VsZWN0ZWQtcHJvamVjdC10YXNrLWNvbnRhaW5lclwiXG5cdFx0XHQpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2FyZC5hcHBlbmRDaGlsZChzZWxlY3RlZFByb2plY3RUYXNrQ29udGFpbmVyKTtcblxuXHRcdFx0Ly8tLS1maWx0ZXIgYW5kIGFkZCB0YXNrcyB0byB0YXNrIGxpc3Rcblx0XHRcdGxldCBzZWxlY3RlZFByb2plY3RDaGVja2xpc3RGaWx0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0RmlsdGVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWZpbHRlci1jYXJkXCIpO1xuXG5cdFx0XHRsZXQgZmlsdGVyVGFza3NCdG5Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0ZmlsdGVyVGFza3NCdG5Db250YWluZXIuY2xhc3NMaXN0LmFkZChcImZpbHRlci10YXNrcy1idG4tY29udGFpbmVyXCIpO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0RmlsdGVyLmFwcGVuZENoaWxkKGZpbHRlclRhc2tzQnRuQ29udGFpbmVyKTtcblxuXHRcdFx0bGV0IGZpbHRlclRhc2tzTGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdGZpbHRlclRhc2tzTGFibGUuaW5uZXJUZXh0ID0gXCJGaWx0ZXIgVGFza3M6XCI7XG5cdFx0XHRmaWx0ZXJUYXNrc0J0bkNvbnRhaW5lci5hcHBlbmRDaGlsZChmaWx0ZXJUYXNrc0xhYmxlKTtcblxuXHRcdFx0bGV0IGFsbFRhc2tzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdGFsbFRhc2tzQnRuLmNsYXNzTGlzdC5hZGQoXCJhbGwtdGFza3MtYnRuXCIpO1xuXHRcdFx0YWxsVGFza3NCdG4uaW5uZXJUZXh0ID0gXCJBbGxcIjtcblx0XHRcdGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGFsbFRhc2tzQnRuKTtcblxuXHRcdFx0bGV0IG9wZW5UYXNrc0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRvcGVuVGFza3NCdG4uY2xhc3NMaXN0LmFkZChcIm9wZW4tdGFza3MtYnRuXCIpO1xuXHRcdFx0b3BlblRhc2tzQnRuLmlubmVyVGV4dCA9IFwiT3BlblwiO1xuXHRcdFx0ZmlsdGVyVGFza3NCdG5Db250YWluZXIuYXBwZW5kQ2hpbGQob3BlblRhc2tzQnRuKTtcblxuXHRcdFx0bGV0IGNsb3NlZFRhc2tzQnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKTtcblx0XHRcdGNsb3NlZFRhc2tzQnRuLmNsYXNzTGlzdC5hZGQoXCJjbG9zZWQtdGFza3MtYnRuXCIpO1xuXHRcdFx0Y2xvc2VkVGFza3NCdG4uaW5uZXJUZXh0ID0gXCJDbG9zZWRcIjtcblx0XHRcdGZpbHRlclRhc2tzQnRuQ29udGFpbmVyLmFwcGVuZENoaWxkKGNsb3NlZFRhc2tzQnRuKTtcblxuXHRcdFx0bGV0IGFkZE5ld1Rhc2tCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpO1xuXHRcdFx0YWRkTmV3VGFza0J0bi5kYXRhc2V0LnByb2plY3RJZCA9IHByb2plY3QuaWQ7XG5cdFx0XHRhZGROZXdUYXNrQnRuLmNsYXNzTGlzdC5hZGQoXCJhZGQtbmV3LXRhc2stYnRuXCIpO1xuXHRcdFx0YWRkTmV3VGFza0J0bi5pbm5lclRleHQgPSBcIisgVGFza1wiO1xuXHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0RmlsdGVyLmFwcGVuZENoaWxkKGFkZE5ld1Rhc2tCdG4pO1xuXG5cdFx0XHRzZWxlY3RlZFByb2plY3RUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuXHRcdFx0XHRzZWxlY3RlZFByb2plY3RDaGVja2xpc3RGaWx0ZXJcblx0XHRcdCk7XG5cblx0XHRcdHByb2plY3QuY2hlY2tsaXN0LmZvckVhY2goKHRhc2spID0+IHtcblx0XHRcdFx0bGV0IHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG5cdFx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdC5jbGFzc0xpc3QuYWRkKFwidGFzay1jYXJkXCIpO1xuXHRcdFx0XHRpZiAodGFzay5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVcIik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRsZXQgdGFza09wdGlvbnNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuXHRcdFx0XHR0YXNrT3B0aW9uc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwidGFzay1vcHRpb25zLWNvbnRhaW5lclwiKTtcblx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0LmFwcGVuZENoaWxkKHRhc2tPcHRpb25zQ29udGFpbmVyKTtcblxuXHRcdFx0XHRsZXQgdGFza0NoZWNrYm94Q29uYXRpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcblx0XHRcdFx0dGFza0NoZWNrYm94Q29uYXRpbmVyLmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNoZWNrYm94LWNvbmF0aW5lclwiKTtcblx0XHRcdFx0dGFza0NoZWNrYm94Q29uYXRpbmVyLmlkID0gdGFzay5pZDtcblx0XHRcdFx0dGFza09wdGlvbnNDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0NoZWNrYm94Q29uYXRpbmVyKTtcblxuXHRcdFx0XHRsZXQgdGFza0NoZWNrQm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuXHRcdFx0XHR0YXNrQ2hlY2tCb3gudHlwZSA9IFwiY2hlY2tib3hcIjtcblx0XHRcdFx0dGFza0NoZWNrQm94LmNsYXNzTGlzdC5hZGQoXCJ0YXNrLWNoZWNrYm94XCIpO1xuXHRcdFx0XHR0YXNrQ2hlY2tCb3guaWQgPSB0YXNrLmlkO1xuXHRcdFx0XHRpZiAodGFzay5jb21wbGV0ZSkge1xuXHRcdFx0XHRcdHRhc2tDaGVja0JveC5jaGVja2VkID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0YXNrQ2hlY2tib3hDb25hdGluZXIuYXBwZW5kQ2hpbGQodGFza0NoZWNrQm94KTtcblxuXHRcdFx0XHRsZXQgY2hlY2tib3hEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsYWJlbFwiKTtcblx0XHRcdFx0Y2hlY2tib3hEZXNjcmlwdGlvbi5pbm5lclRleHQgPSBcIkNoZWNrIENvbXBsZXRlXCI7XG5cdFx0XHRcdGNoZWNrYm94RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChcInRhc2stY2hlY2tib3gtbGFiZWxcIik7XG5cdFx0XHRcdGNoZWNrYm94RGVzY3JpcHRpb24uaHRtbEZvciA9IHRhc2suaWQ7XG5cdFx0XHRcdHRhc2tDaGVja2JveENvbmF0aW5lci5hcHBlbmRDaGlsZChjaGVja2JveERlc2NyaXB0aW9uKTtcblxuXHRcdFx0XHRsZXQgZGVsZXRlVGFza0J0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIik7XG5cdFx0XHRcdGRlbGV0ZVRhc2tCdG4uY2xhc3NMaXN0LmFkZChcImRlbGV0ZS10YXNrLWJ0blwiKTtcblx0XHRcdFx0ZGVsZXRlVGFza0J0bi5pbm5lclRleHQgPSBcIkRlbGV0ZVwiO1xuXHRcdFx0XHRkZWxldGVUYXNrQnRuLmRhdGFzZXQuY2hlY2tsaXN0SWQgPSB0YXNrLmlkO1xuXHRcdFx0XHR0YXNrT3B0aW9uc0NvbnRhaW5lci5hcHBlbmRDaGlsZChkZWxldGVUYXNrQnRuKTtcblxuXHRcdFx0XHRsZXQgdGFza1RleHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcblx0XHRcdFx0dGFza1RleHQuaW5uZXJUZXh0ID0gdGFzay50YXNrRGV0YWlscztcblx0XHRcdFx0aWYgKHRhc2suY29tcGxldGUpIHtcblx0XHRcdFx0XHR0YXNrVGV4dC5jbGFzc0xpc3QuYWRkKFwiY29tcGxldGVcIik7XG5cdFx0XHRcdH1cblx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0LmFwcGVuZENoaWxkKHRhc2tUZXh0KTtcblx0XHRcdFx0aWYgKGZpbHRlclRhc2tzQnkgPT09IFwiYWxsXCIpIHtcblx0XHRcdFx0XHRzZWxlY3RlZFByb2plY3RUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuXHRcdFx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0ZmlsdGVyVGFza3NCeSA9PT0gXCJub3QtY29tcGxldGVkXCIgJiZcblx0XHRcdFx0XHR0YXNrLmNvbXBsZXRlID09PSBmYWxzZVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHRzZWxlY3RlZFByb2plY3RUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKFxuXHRcdFx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0Q2hlY2tsaXN0XG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZmlsdGVyVGFza3NCeSA9PT0gXCJjb21wbGV0ZWRcIiAmJiB0YXNrLmNvbXBsZXRlID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0c2VsZWN0ZWRQcm9qZWN0VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZChcblx0XHRcdFx0XHRcdHNlbGVjdGVkUHJvamVjdENoZWNrbGlzdFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLyBTb3J0ICBmdW5jdGlvbnMgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblx0Ly8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cdC8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXHQvLy0tLVNvcnQgUHJvamVjdHNcblx0ZnVuY3Rpb24gc29ydEJ5TW9zdFRha3MoKSB7XG5cdFx0bGV0IHByb2plY3RzQnlNb3N0VGFza3MgPSBwcm9qZWN0cztcblx0XHRwcm9qZWN0c0J5TW9zdFRhc2tzLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcblx0XHRcdHJldHVybiBiLmNoZWNrbGlzdC5sZW5ndGggLSBhLmNoZWNrbGlzdC5sZW5ndGg7XG5cdFx0fSk7XG5cdFx0c29ydGVkUHJvamVjdHMgPSBwcm9qZWN0c0J5TW9zdFRhc2tzO1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZ1bmN0aW9uIHNvcnRCeUxlYXN0VGFrcygpIHtcblx0XHRsZXQgcHJvamVjdHNCeUxlYXN0VGFza3MgPSBwcm9qZWN0cztcblx0XHRwcm9qZWN0c0J5TGVhc3RUYXNrcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gYS5jaGVja2xpc3QubGVuZ3RoIC0gYi5jaGVja2xpc3QubGVuZ3RoO1xuXHRcdH0pO1xuXHRcdHNvcnRlZFByb2plY3RzID0gcHJvamVjdHNCeUxlYXN0VGFza3M7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZnVuY3Rpb24gc29ydEJ5UHJpb2l0eUhpZ2hlc3QoKSB7XG5cdFx0bGV0IHByb2plY3RzQnlIaWdoZXN0UHJpb2l0eSA9IHByb2plY3RzO1xuXHRcdHByb2plY3RzQnlIaWdoZXN0UHJpb2l0eS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gYi5wcmlvcml0eSAtIGEucHJpb3JpdHk7XG5cdFx0fSk7XG5cdFx0c29ydGVkUHJvamVjdHMgPSBwcm9qZWN0c0J5SGlnaGVzdFByaW9pdHk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cdGZ1bmN0aW9uIHNvcnRCeVByaW9pdHlMb3dlc3QoKSB7XG5cdFx0bGV0IHByb2plY3RzQnlMb3dlc3RQcmlvaXR5ID0gcHJvamVjdHM7XG5cdFx0cHJvamVjdHNCeUxvd2VzdFByaW9pdHkuc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0cmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5O1xuXHRcdH0pO1xuXHRcdHNvcnRlZFByb2plY3RzID0gcHJvamVjdHNCeUxvd2VzdFByaW9pdHk7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZnVuY3Rpb24gc29ydEJ5RGF0ZUNsb3Nlc3QoKSB7XG5cdFx0bGV0IHByb2plY3RzQnlEYXRlQ2xvc2VzdCA9IHByb2plY3RzO1xuXHRcdHByb2plY3RzQnlEYXRlQ2xvc2VzdC5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRuZXcgRGF0ZShhLmR1ZURhdGUpLmdldFRpbWUoKSAtIG5ldyBEYXRlKGIuZHVlRGF0ZSkuZ2V0VGltZSgpXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHRcdHNvcnRlZFByb2plY3RzID0gcHJvamVjdHNCeURhdGVDbG9zZXN0O1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGZ1bmN0aW9uIHNvcnRCeURhdGVGYXJ0aGVzdCgpIHtcblx0XHRsZXQgcHJvamVjdHNCeURhdGVGYXJ0aGVzdCA9IHByb2plY3RzO1xuXHRcdHByb2plY3RzQnlEYXRlRmFydGhlc3Quc29ydChmdW5jdGlvbiAoYSwgYikge1xuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0bmV3IERhdGUoYi5kdWVEYXRlKS5nZXRUaW1lKCkgLSBuZXcgRGF0ZShhLmR1ZURhdGUpLmdldFRpbWUoKVxuXHRcdFx0KTtcblx0XHR9KTtcblx0XHRzb3J0ZWRQcm9qZWN0cyA9IHByb2plY3RzQnlEYXRlRmFydGhlc3Q7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0ZnVuY3Rpb24gZmlsdGVyVGFza3MoZGF0YSkge1xuXHRcdGlmIChkYXRhID09PSBcIm9wZW5cIikge1xuXHRcdFx0ZmlsdGVyVGFza3NCeSA9IFwibm90LWNvbXBsZXRlZFwiO1xuXHRcdH0gZWxzZSBpZiAoZGF0YSA9PT0gXCJjbG9zZWRcIikge1xuXHRcdFx0ZmlsdGVyVGFza3NCeSA9IFwiY29tcGxldGVkXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGZpbHRlclRhc2tzQnkgPSBcImFsbFwiO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIG9wZW5FZGl0TW9kZWwoKSB7XG5cdFx0bmV3UHJvamVjdE1vZGFsLnRoZU1vZGFsLnNob3dNb2RhbCgpO1xuXHRcdG5ld1Byb2plY3RNb2RhbC50aXRsZUlucHV0LnZhbHVlID0gcHJvamVjdFRvRWRpdFswXS50aXRsZTtcblx0XHRuZXdQcm9qZWN0TW9kYWwuZGVzY3JpcHRpb25JbnB1dC52YWx1ZSA9IHByb2plY3RUb0VkaXRbMF0uZGVzY3JpcHRpb247XG5cdFx0bmV3UHJvamVjdE1vZGFsLmR1ZURhdGVJbnB1dC52YWx1ZSA9IHByb2plY3RUb0VkaXRbMF0uZHVlRGF0ZTtcblx0XHRuZXdQcm9qZWN0TW9kYWwucmFkaW9JbnB1dHMuZm9yRWFjaCgoaW5wdXQpID0+IHtcblx0XHRcdGlmIChcblx0XHRcdFx0Y2hlY2tQcmlvcml0eShwcm9qZWN0VG9FZGl0WzBdLnByaW9yaXR5KS50b0xvd2VyQ2FzZSgpID09PVxuXHRcdFx0XHRpbnB1dC5pZFxuXHRcdFx0KSB7XG5cdFx0XHRcdGlucHV0LmNoZWNrZWQgPSB0cnVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aW5wdXQuY2hlY2tlZCA9IGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdG5ld1Byb2plY3RNb2RhbC5zYXZlQnRuLmRhdGFzZXQucHJvamVjdElkID0gcHJvamVjdFRvRWRpdFswXS5pZDtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0cmVuZGVyUHJvamVjdHNIZWFkZXIsXG5cdFx0cmVuZGVyUHJvamVjdHMsXG5cdFx0cHJvamVjdEhlYWRlckV2ZW50TGlzdGVuZXJzLFxuXHRcdHByb2plY3RDYXJkRXZlbnRMaXN0ZW5lcnMsXG5cdH07XG59KSgpO1xuXG5leHBvcnQgZGVmYXVsdCBteVByb2plY3RzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9