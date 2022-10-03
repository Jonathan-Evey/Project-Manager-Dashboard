# Project-Manager-Dashboard

#### Todo List Project - The Odin Project

##### Technology used - HTML | CSS | JavaScript | WebPack

Project assignment from the Odin Project

Assignment details -

-   Use factories or constructors/classes to dynamically create generate "todos"
-   At a minimum they should have a title, description, dueDate and priority. You might also want to include notes or even a checklist.
-   Separate your application logic from the DOM-related stuff, so keep all of those things in separate modules.

Interface minimum should have the following functionality:

-   view all projects
-   view all todos in each project (probably just the title and duedate.. perhaps changing color for different priorities)
-   expand a single todo to see/edit its details
-   delete a todo

Main features include currently -

-   Main landing shows all details on all current projects. Details shown are project title, total tasks, priority level, completion data, and a edit and delete button.
-   Sort projects by how many tasks are on each project.
-   User can select each project and it will show an overview of the project (added by the user at the time the project is added), and a list of all taskes for the selected project. Taskes are added by the use from the project overwiew page.
-   User has the option to show tasks as completed with a checkbox, or delete tasks once completed.

Execution -

-   I used JS Modules to separate JS files, one for main functions and click events, and one for holding HTML DOMelements.
-   Styling was all done with base CSS.
-   It was not in the assignment to make the site responsive, but I made it responsive as a extra challenge.
-   Project uses local storage to save user data.

Features still to implement -

-   Sort projects by priority.
-   Sort projects by date.
-   Ability to edit projects and tasks once they are added.
-   Filter Tasks by open/closed status.

Site Demo -

https://nighistheend.github.io/Project-Manager-Dashboard/
