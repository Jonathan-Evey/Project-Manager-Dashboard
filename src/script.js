import findDOMElements from './DOMElements.js'

/*Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into. */
const myProjects = (function () {
    
    let newProjectModal = findDOMElements.newProjectModal

    let projects = [
        {
            id: "", //pull time stamp to make a uniqe id
            title: "", //user input from html form
            description: "", //user input from html form
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

    newProjectModal.openModalBtn.addEventListener('click', () => {
        return newProjectModal.theModal.showModal();
    })
    
    newProjectModal.theModal.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    
    newProjectModal.saveBtn.addEventListener('click', () => {
        formInputToProjects();
        console.log(projects);
        //render();
        return
    })

    function formInputToProjects() {
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

    function resetForm() {
        newProjectModal.titleInput.value = null;
        newProjectModal.descriptionInput.value = null;
        newProjectModal.dueDateInput.value = null;
        let defaultPriority = document.getElementById('none');
        defaultPriority.checked = true
        newProjectModal.theModal.close();
    }

})();

export default myProjects