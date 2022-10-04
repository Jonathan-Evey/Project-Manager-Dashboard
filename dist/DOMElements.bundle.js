"use strict";
(self["webpackChunkproject_manager_dashboard"] = self["webpackChunkproject_manager_dashboard"] || []).push([["DOMElements"],{

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


/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/DOMElements.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRE9NRWxlbWVudHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxpRUFBZSxlQUFlLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wcm9qZWN0LW1hbmFnZXItZGFzaGJvYXJkLy4vc3JjL0RPTUVsZW1lbnRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IGZpbmRET01FbGVtZW50cyA9IChmdW5jdGlvbiAoKSB7XG5cdGNvbnN0IEhUTUxfQU5DSE9SUyA9IHtcblx0XHRwcm9qZWN0c0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0cy1saXN0LWhlYWRlclwiKSxcblx0XHRwcm9qZWN0Q2FyZENvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0LWNhcmQtY29udGFpbmVyXCIpLFxuXHR9O1xuXG5cdGNvbnN0IG5ld1Byb2plY3RNb2RhbCA9IHtcblx0XHRvcGVuTW9kYWxCdG46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3Blbi1wcm9qZWN0LW1vZGFsLWJ0blwiKSxcblx0XHR0aGVNb2RhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhZGQtbmV3LXByb2plY3QtbW9kYWxcIiksXG5cblx0XHQvLy0tLS0tLS0tLS0tLW1vZGFsIGZvcm0gaW5wdXRzXG5cdFx0dGl0bGVJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwcm9qZWN0X3RpdGxlXCIpLFxuXHRcdGRlc2NyaXB0aW9uSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJvamVjdF9kZXNjcmlwdGlvblwiKSxcblx0XHRkdWVEYXRlSW5wdXQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVlX2RhdGVcIiksXG5cdFx0c2F2ZUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzYXZlLXByb2plY3RcIiksXG5cdFx0cmFkaW9JbnB1dHM6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudXJnZW5jeS1jaGVja2JveFwiKSxcblx0XHQvLy8vLy8vLyByYWRpbyBpbnB1dCBpcyBmb3VuZCB3aXRoaW4gc3VibWl0IGV2ZW50IC8vLy8vLy8vLy8vXG5cdH07XG5cblx0Y29uc3QgbmV3VGFza01vZGFsID0ge1xuXHRcdG9wZW5Nb2RhbEJ0bjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hZGQtbmV3LXRhc2stYnRuXCIpLFxuXHRcdHRoZU1vZGFsOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFkZC1uZXctdGFzay1tb2RhbFwiKSxcblxuXHRcdC8vLS0tLS0tLS0tLS0tbW9kYWwgZm9ybSBpbnB1dHNcblx0XHR0YXNrRGV0YWlsc0lucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRhc2tfZGV0YWlsc1wiKSxcblx0XHRzYXZlQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNhdmUtdGFza1wiKSxcblx0fTtcblxuXHRyZXR1cm4ge1xuXHRcdEhUTUxfQU5DSE9SUyxcblx0XHRuZXdQcm9qZWN0TW9kYWwsXG5cdFx0bmV3VGFza01vZGFsLFxuXHR9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgZmluZERPTUVsZW1lbnRzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9