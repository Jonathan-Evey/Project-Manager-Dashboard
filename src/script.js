import findDOMElements from './DOMElements.js'

/*Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into. */
const myProjects = (function () {
    
    let projectCardContainer = findDOMElements.HTML_ANCHORS.projectCardContainer
    let newProjectModal = findDOMElements.newProjectModal

    let projects = [
        {
            id: "", //pull time stamp to make a uniqe id
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
            priority: "urgent, high, mid, low, none", // user input (maybe do a background color gradiant to show priority level. also make a sort function to show tasks in that priority range)
        }
    ]

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
    ///// event listeners and form interactions for adding a project ///////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////


    function renderProjects() {
        projects.forEach(project => {
            let projectCardDiv = document.createElement('div');
            projectCardDiv.classList.add('project-card');

            projectCardContainer.appendChild(projectCardDiv);
            
            let projectCardTitle = document.createElement('h3');
            projectCardTitle.innerText = project.title;

            projectCardDiv.appendChild(projectCardTitle);

            let projectCardDescription = document.createElement('p');
            projectCardDescription.innerText = project.description;

            projectCardDiv.appendChild(projectCardDescription);

            let projectCardChecklist = document.createElement('p');
            if (project.checklist.length === 0) {
                projectCardChecklist.innerText = 0;
            } else {
                projectCardChecklist.innerText = project.checklist.length;
            }

            projectCardDiv.appendChild(projectCardChecklist)

            let projectCardPriority = document.createElement('p');
            projectCardPriority.innerText = project.priority;

            projectCardDiv.appendChild(projectCardPriority)

            let projectCardDueDate = document.createElement('p');
            projectCardDueDate.innerText = project.dueDate;
            
            projectCardDiv.appendChild(projectCardDueDate)
        })
    }
    return {
        projects,
        renderProjects,
    }

})();

export default myProjects