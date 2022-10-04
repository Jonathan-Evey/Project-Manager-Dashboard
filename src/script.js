import findDOMElements from "./DOMElements.js";

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
			dueDate: "11/01/22",
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
			dueDate: "12/08/22",
			priority: 4,
		},
	];

	let projectCardContainer =
		findDOMElements.HTML_ANCHORS.projectCardContainer;
	let newProjectModal = findDOMElements.newProjectModal;
	let newTaskModal = findDOMElements.newTaskModal;
	let projectsHeader = findDOMElements.HTML_ANCHORS.projectsHeader;

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
						"task-checkbox-label" ||
						"task-checkbox"
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

export default myProjects;
