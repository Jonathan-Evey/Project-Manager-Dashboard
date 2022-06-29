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

    return {
        HTML_ANCHORS,
        newProjectModal,
    }
     
})();



export default findDOMElements