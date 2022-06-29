import findDOMElements from './DOMElements.js'

/*Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into. */
const myProjects = (function () {
    
    let projectCardContainer = findDOMElements.HTML_ANCHORS.projectCardContainer
    let newProjectModal = findDOMElements.newProjectModal
    let projectsHeader = findDOMElements.HTML_ANCHORS.projectsHeader

    let projects = [
        {
            id: "123456789", //pull time stamp to make a uniqe id
            title: "Test Project", //user input from html form
            description: "A description of the test", //user input from html form
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
            id: "564654987", //pull time stamp to make a uniqe id
            title: "Test Project", //user input from html form
            description: "A description of the test", //user input from html form
            checklist: [
                {
                    id: "", //pull time stamp to make a uniqer id
                    taskDetails: "", //user input from a html form
                    complete: false, // user click to toggle 
                }
            ],
            dueDate: "07/01/22", // user input
            priority: "High", // user input (maybe do a background color gradiant to show priority level. also make a sort function to show tasks in that priority range)
        }
    ]

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

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ///// event listeners and form interactions for adding a project ///////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    newProjectModal.openModalBtn.addEventListener('click', () => {
        return newProjectModal.theModal.showModal();
    })
    
    newProjectModal.theModal.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    
    newProjectModal.saveBtn.addEventListener('click', () => {
        pushFormInputToProjects();
        console.log(projects);
        //render();
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
        resetForm();
        render();
        return
    }
    //---- resets project form to defalut
    function resetForm() {
        newProjectModal.titleInput.value = null;
        newProjectModal.descriptionInput.value = null;
        newProjectModal.dueDateInput.value = null;
        let defaultPriority = document.getElementById('none');
        defaultPriority.checked = true
        newProjectModal.theModal.close();
        return
    }

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    /////////////////// HTML render functions //////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    function render() {
        clearElements(projectCardContainer);
        renderProjects();
    }
    
    function clearElements(element) {
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    
    function renderProjectsHeader() {
        let projectHeaderTitle = document.createElement('p');
        projectHeaderTitle.innerText = "Title";
        projectsHeader.appendChild(projectHeaderTitle)
        let projectHeaderDescription = document.createElement('p');
        projectHeaderDescription.innerText = "Description";
        projectsHeader.appendChild(projectHeaderDescription)
        let projectHeaderTaskCount = document.createElement('p');
        projectHeaderTaskCount.innerText = "Open Tasks";
        projectsHeader.appendChild(projectHeaderTaskCount)
        let projectPriority = document.createElement('p');
        projectPriority.innerText = "Priority Level";
        projectsHeader.appendChild(projectPriority)
        let projectDueDate = document.createElement('p');
        projectDueDate.innerText = "Due Date";
        projectsHeader.appendChild(projectDueDate)
    }

    function renderProjects() {
        projects.forEach(project => {
            ///////////////////Creates Cards for Each Project//////////////
            let projectCardDiv = document.createElement('div');
            projectCardDiv.classList.add('project-card');
            projectCardDiv.dataset.projectId = project.id;
            projectCardContainer.appendChild(projectCardDiv);

            let projectCardTextContainer = document.createElement('div');
            projectCardTextContainer.classList.add('project-card-text-container');
            projectCardDiv.appendChild(projectCardTextContainer);
            
            let projectCardTitle = document.createElement('h3');
            projectCardTitle.innerText = project.title;
            projectCardTextContainer.appendChild(projectCardTitle);

            let projectCardDescription = document.createElement('p');
            projectCardDescription.innerText = project.description;
            projectCardTextContainer.appendChild(projectCardDescription);

            let projectCardChecklist = document.createElement('p');
            projectCardChecklist.innerText = project.checklist.length;
            projectCardTextContainer.appendChild(projectCardChecklist)

            let projectCardPriority = document.createElement('p');
            projectCardPriority.innerText = project.priority;
            projectCardTextContainer.appendChild(projectCardPriority)

            let projectCardDueDate = document.createElement('p');
            projectCardDueDate.innerText = project.dueDate;
            projectCardTextContainer.appendChild(projectCardDueDate)

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

    function renderSelectedProject() {
        selectedProject.forEach(project => {
            let selectedProjectCard = document.createElement('div');
            selectedProjectCard.classList.add('selected-project-card');
            projectCardContainer.appendChild(selectedProjectCard);

            let selectedProjectTitle = document.createElement('h3');
            selectedProjectTitle.innerText = project.title;
            selectedProjectCard.appendChild(selectedProjectTitle);

            let selectedProjectCardDescription = document.createElement('p');
            selectedProjectCardDescription.innerText = project.description;
            selectedProjectCard.appendChild(selectedProjectCardDescription);
        })

    }

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    //////////// Event listeners on project cards //////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    function projectCardEventListeners() {
        projectCardContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('delete-project-btn')) {
                projects = projects.filter(project => project.id !== e.target.dataset.projectId);
                render();
            }
            if (e.target.classList.contains('project-card')) {
                clearElements(projectCardContainer);
                clearElements(projectsHeader);
                selectedProject = projects.filter(project => project.id === e.target.dataset.projectId);
                console.log(selectedProject);
                renderSelectedProject();
            }
        })
    }

    return {
        
        renderProjectsHeader,
        renderProjects,
        renderSelectedProject,
        projectCardEventListeners,
    }

})();

export default myProjects