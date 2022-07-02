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

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/DOMElements.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRE9NRWxlbWVudHMuYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRCxpRUFBZSIsInNvdXJjZXMiOlsid2VicGFjazovL3Byb2plY3QtbWFuYWdlci1kYXNoYm9hcmQvLi9zcmMvRE9NRWxlbWVudHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZmluZERPTUVsZW1lbnRzID0gKGZ1bmN0aW9uKCkge1xuXG4gICAgY29uc3QgSFRNTF9BTkNIT1JTID0ge1xuICAgICAgICBwcm9qZWN0c0hlYWRlcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RzLWxpc3QtaGVhZGVyJyksXG4gICAgICAgIHByb2plY3RDYXJkQ29udGFpbmVyOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC1jYXJkLWNvbnRhaW5lcicpLFxuICAgIH1cblxuXG4gICAgY29uc3QgbmV3UHJvamVjdE1vZGFsID0ge1xuICAgICAgICBcbiAgICAgICAgb3Blbk1vZGFsQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3Blbi1wcm9qZWN0LW1vZGFsLWJ0bicpLFxuICAgICAgICB0aGVNb2RhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1uZXctcHJvamVjdC1tb2RhbCcpLFxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tbW9kYWwgZm9ybSBpbnB1dHNcbiAgICAgICAgdGl0bGVJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RfdGl0bGUnKSxcbiAgICAgICAgZGVzY3JpcHRpb25JbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3RfZGVzY3JpcHRpb24nKSxcbiAgICAgICAgZHVlRGF0ZUlucHV0OiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZHVlX2RhdGUnKSxcbiAgICAgICAgc2F2ZUJ0bjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NhdmUtcHJvamVjdCcpLFxuXG4gICAgICAgIC8vLy8vLy8vIHJhZGlvIGlucHV0IGlzIGZvdW5kIHdpdGhpbiBzdWJtaXQgZXZlbnQgLy8vLy8vLy8vLy9cbiAgICB9O1xuXG4gICAgY29uc3QgbmV3VGFza01vZGFsID0ge1xuICAgICAgICBcbiAgICAgICAgb3Blbk1vZGFsQnRuOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkLW5ldy10YXNrLWJ0bicpLFxuICAgICAgICB0aGVNb2RhbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FkZC1uZXctdGFzay1tb2RhbCcpLFxuXG4gICAgICAgIC8vLS0tLS0tLS0tLS0tbW9kYWwgZm9ybSBpbnB1dHNcbiAgICAgICAgdGFza0RldGFpbHNJbnB1dDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rhc2tfZGV0YWlscycpLFxuICAgICAgICBzYXZlQnRuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2F2ZS10YXNrJyksXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIEhUTUxfQU5DSE9SUyxcbiAgICAgICAgbmV3UHJvamVjdE1vZGFsLFxuICAgICAgICBuZXdUYXNrTW9kYWwsXG4gICAgfVxuICAgICBcbn0pKCk7XG5cblxuXG5leHBvcnQgZGVmYXVsdCBmaW5kRE9NRWxlbWVudHMiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=