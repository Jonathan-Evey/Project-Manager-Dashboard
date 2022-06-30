import findDOMElements from './DOMElements.js'

/*Your todo list should have projects or separate lists of todos. When a user first opens the app, there should be some sort of ‘default’ project to which all of their todos are put. Users should be able to create new projects and choose which project their todos go into. */
const myProjects = (function () {
    
    let projectCardContainer = findDOMElements.HTML_ANCHORS.projectCardContainer
    let newProjectModal = findDOMElements.newProjectModal
    let projectsHeader = findDOMElements.HTML_ANCHORS.projectsHeader

    let projects = [
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
    ];

    let sortedProjects = projects

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
    /////////////// form interactions for adding a project /////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    newProjectModal.theModal.addEventListener('submit', (e) => {
        e.preventDefault();
    })
    
    newProjectModal.saveBtn.addEventListener('click', () => {
        pushFormInputToProjects();
        console.log(projects);
        render();
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
    ///////////////////////// Event listeners //////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////

    function projectHeaderEventListeners() {
        projectsHeader.addEventListener('click', (e) => {
            if (e.target.classList.contains('open-project-modal-btn')) {
                return newProjectModal.theModal.showModal();
            }
            if (e.target.classList.contains('sort-by-most-btn')) {
                sortByMostTaks();
                render();
            }
            if (e.target.classList.contains('sort-by-least-btn')) {
                sortByLeastTaks();
                render();
            }
        })
    }

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
            if (e.target.classList.contains('close-project-btn')) {
                clearElements(projectCardContainer);
                render();
            }
        })
    }

    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    /////////////////// HTML render functions //////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    function render() {
        clearElements(projectCardContainer);
        clearElements(projectsHeader);
        renderProjectsHeader()
        renderProjects();
    }
    
    function clearElements(element) {
        while(element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }
    //---Makes the header over the list of projects
    function renderProjectsHeader() {
        let projectHeaderSortContainer = document.createElement('div');
        projectHeaderSortContainer.classList.add('project-header-sort-container')
        projectsHeader.appendChild(projectHeaderSortContainer)

        let projectHeaderTitle = document.createElement('p');
        projectHeaderTitle.innerText = "Sort Projects";
        projectHeaderTitle.classList.add('sort-project-menu-title')
        projectHeaderSortContainer.appendChild(projectHeaderTitle);

        let sortByTasksContainer = document.createElement('div');
        projectHeaderSortContainer.appendChild(sortByTasksContainer);
        let projectHeaderTaskCount = document.createElement('p');
        projectHeaderTaskCount.innerText = "Tasks:";
        sortByTasksContainer.appendChild(projectHeaderTaskCount);
        let projectSortByMostTasksBtn = document.createElement('button');
        projectSortByMostTasksBtn.classList.add('sort-by-most-btn')
        projectSortByMostTasksBtn.innerText = "Most";
        sortByTasksContainer.appendChild(projectSortByMostTasksBtn);
        let projectSortByLeastTasksBtn = document.createElement('button');
        projectSortByLeastTasksBtn.classList.add('sort-by-least-btn')
        projectSortByLeastTasksBtn.innerText = "Least";
        sortByTasksContainer.appendChild(projectSortByLeastTasksBtn);

        let sortByPriorityContainer = document.createElement('div');
        projectHeaderSortContainer.appendChild(sortByPriorityContainer);
        let projectPriority = document.createElement('p');
        projectPriority.innerText = "Priority:";
        sortByPriorityContainer.appendChild(projectPriority);
        let projectSortByHighestPriorityBtn = document.createElement('button');
        projectSortByHighestPriorityBtn.innerText = "Highest";
        sortByPriorityContainer.appendChild(projectSortByHighestPriorityBtn);
        let projectSortByLeastPriorityBtn = document.createElement('button');
        projectSortByLeastPriorityBtn.innerText = "Least";
        sortByPriorityContainer.appendChild(projectSortByLeastPriorityBtn);

        let sortByDateContainer = document.createElement('div');
        projectHeaderSortContainer.appendChild(sortByDateContainer);
        let projectDueDate = document.createElement('p');
        projectDueDate.innerText = "Date:";
        sortByDateContainer.appendChild(projectDueDate);
        let projectSortByClosestDateBtn = document.createElement('button');
        projectSortByClosestDateBtn.innerText = "Closest";
        sortByDateContainer.appendChild(projectSortByClosestDateBtn);
        let projectSortByFarthestDateBtn = document.createElement('button');
        projectSortByFarthestDateBtn.innerText = "Farthest";
        sortByDateContainer.appendChild(projectSortByFarthestDateBtn);

        let openProjectModalBtn = document.createElement('button');
        openProjectModalBtn.classList.add('open-project-modal-btn')
        openProjectModalBtn.innerText = "+ Project";
        projectsHeader.appendChild(openProjectModalBtn);
        

    }
    //---Makes the list of projects
    function renderProjects() {
        sortedProjects.forEach(project => {
            ///////////////////Creates Cards for Each Project//////////////
            let projectCardDiv = document.createElement('div');
            projectCardDiv.classList.add('project-card');
            projectCardDiv.dataset.projectId = project.id;
            projectCardContainer.appendChild(projectCardDiv);
            
            let projectCardTitle = document.createElement('h3');
            projectCardTitle.innerText = project.title;
            projectCardDiv.appendChild(projectCardTitle);

            let projectCardChecklist = document.createElement('p');
            projectCardChecklist.innerText = `Open Tasks: ${project.checklist.length}`;
            projectCardDiv.appendChild(projectCardChecklist)

            let projectCardPriority = document.createElement('p');
            projectCardPriority.innerText = `Priority: ${project.priority}`;
            projectCardDiv.appendChild(projectCardPriority)

            let projectCardDueDate = document.createElement('p');
            projectCardDueDate.innerText = `Complete by: ${project.dueDate}`;
            projectCardDiv.appendChild(projectCardDueDate)

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
    //---Makes the selected project full screen
    function renderSelectedProject() {
        selectedProject.forEach(project => {
            let selectedProjectCard = document.createElement('div');
            selectedProjectCard.classList.add('selected-project-card');
            projectCardContainer.appendChild(selectedProjectCard);

            let selectedProjectHeader = document.createElement('div');
            selectedProjectHeader.classList.add('selected-project-header');
            selectedProjectCard.appendChild(selectedProjectHeader);

            let selectedProjectTitle = document.createElement('h3');
            selectedProjectTitle.innerText = project.title;
            selectedProjectHeader.appendChild(selectedProjectTitle);

            let closeProjectBtn = document.createElement('button');
            closeProjectBtn.classList.add('close-project-btn');
            closeProjectBtn.innerText = "Back to Project List"
            selectedProjectHeader.appendChild(closeProjectBtn);

            let selectedProjectAside = document.createElement('div');
            selectedProjectAside.classList.add('selected-project-aside');
            selectedProjectCard.appendChild(selectedProjectAside);

            let projectDeadlineContainer = document.createElement('div');
            projectDeadlineContainer.classList.add('project-deadline-container');
            selectedProjectAside.appendChild(projectDeadlineContainer);

            let selectedProjectDueDate = document.createElement('p');
            selectedProjectDueDate.innerText = "Due: " + project.dueDate;
            projectDeadlineContainer.appendChild(selectedProjectDueDate);

            let selectedProjectPriority = document.createElement('p');
            selectedProjectPriority.innerText = "Priority: " + project.priority;
            projectDeadlineContainer.appendChild(selectedProjectPriority);

            let selectedProjectCardDescription = document.createElement('p');
            selectedProjectCardDescription.classList.add('project-description');
            selectedProjectCardDescription.innerText = project.description;
            selectedProjectAside.appendChild(selectedProjectCardDescription);
            
            let selectedProjectTaskContainer = document.createElement('div');
            selectedProjectTaskContainer.classList.add('selected-project-task-container');
            selectedProjectCard.appendChild(selectedProjectTaskContainer);

            //---filter and add tasks to task list
            let selectedProjectChecklistFilter = document.createElement('div');
            selectedProjectChecklistFilter.classList.add('task-filter-card');

            let filterTasksBtnContainer = document.createElement('div');
            filterTasksBtnContainer.classList.add('filter-tasks-btn-container')
            selectedProjectChecklistFilter.appendChild(filterTasksBtnContainer);

            let filterTasksLable = document.createElement('p');
            filterTasksLable.innerText = "Filter Tasks:"
            filterTasksBtnContainer.appendChild(filterTasksLable);

            let allTasksBtn = document.createElement('button');
            allTasksBtn.innerText = "All"
            filterTasksBtnContainer.appendChild(allTasksBtn);

            let openTasksBtn = document.createElement('button');
            openTasksBtn.innerText = "Open"
            filterTasksBtnContainer.appendChild(openTasksBtn);

            let closedTasksBtn = document.createElement('button');
            closedTasksBtn.innerText = "Closed"
            filterTasksBtnContainer.appendChild(closedTasksBtn);

            let addNewTaskBtn = document.createElement('button');
            addNewTaskBtn.innerText = "+ Task"
            selectedProjectChecklistFilter.appendChild(addNewTaskBtn);

            selectedProjectTaskContainer.appendChild(selectedProjectChecklistFilter);


            project.checklist.forEach(task => {
                let selectedProjectChecklist = document.createElement('div');
                selectedProjectChecklist.classList.add('task-card');

                let taskOptionsContainer = document.createElement('div');
                taskOptionsContainer.classList.add('task-options-container');
                selectedProjectChecklist.appendChild(taskOptionsContainer);

                let taskCheckboxConatiner = document.createElement('div');
                taskCheckboxConatiner.classList.add('task-checkbox-conatiner');
                taskOptionsContainer.appendChild(taskCheckboxConatiner)

                let taskCheckBox = document.createElement('input');
                taskCheckBox.type = "checkbox";
                taskCheckboxConatiner.appendChild(taskCheckBox);

                let checkboxDescription = document.createElement('p');
                checkboxDescription.innerText = "Check Complete";
                taskCheckboxConatiner.appendChild(checkboxDescription);

                let deleteTaskBtn = document.createElement('button');
                deleteTaskBtn.classList.add('delete-task-btn');
                deleteTaskBtn.innerText = "Delete"
                taskOptionsContainer.appendChild(deleteTaskBtn)

                let taskText = document.createElement('p');
                taskText.innerText = task.taskDetails;
                selectedProjectChecklist.appendChild(taskText);


                selectedProjectTaskContainer.appendChild(selectedProjectChecklist);
            })
        })

    }


    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    /////////////////////// Sort  functions ////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    //---Sort Projects
    function sortByMostTaks() {
        let projectsByMostTasks = projects;
        projectsByMostTasks.sort(function(a, b) {
            return b.checklist.length - a.checklist.length
        });
        sortedProjects = projectsByMostTasks
        return
    }

    function sortByLeastTaks() {
        let projectsByLeastTasks = projects;
        projectsByLeastTasks.sort(function(a, b) {
            return a.checklist.length - b.checklist.length
        });
        sortedProjects = projectsByLeastTasks
        return
    }


    return {
        
        renderProjectsHeader,
        renderProjects,
        renderSelectedProject,
        projectHeaderEventListeners,
        projectCardEventListeners,
    }

})();

export default myProjects