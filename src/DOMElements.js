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

export default findDOMElements;
