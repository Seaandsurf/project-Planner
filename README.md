# Project Planner

-   Create a public repository: `project-planner`
-   Duration: 3 days
-   Deadline: 11/01/2024 - 09:00
-   Submission form: TBD

## Learning objectives

-   Dynamic DOM manipulation
-   Handling of dates
-   UX/UI
-   Use map and filter function
-   Use a library to manipulate dates [Date fns](https://date-fns.org/)

## The mission

Wouldn't it be nice to have a tool to manage our projects? Something that would allow us to track the progression of each requirements of our apps.

This is the list of features we would like to see:

-   3 columns layout ( one column for Todo, one column for Doing , one column for Done ) If the column is empty, there should be a message saying it's empty
     *bonus*: Add a secondary view where the layout change into a list. Create a button to toggle between the 2 view. The list view should be sortable ( by urgency or by title ) and filterable ( by status )
-   Allow user to create tasks. Use a **modal element** with a form inside.
      Tasks are composed of:
      - a unique ID ( generated on create, not editable by user)
      - a date of creation ( generated on create, not editable by user)
      - a title (required, should be a string with minimum 3 characters and a maximum of 256 characters)
      - a description (optional, should be a string with minimum 5 character and a maximum of 1024 characters)
      - a completion status of `to do`, `doing` or `done`) (required, default to `to do`)
      - a due date (required, default to '2 weeks from the time of creation', should be a valid date)
        
-   **Validate** the data coming from the user, if the user didn't indicate a correct information, display an **helpful** error message below the input. ( ex: The date should be of format dd-mm-yyyy, This field is required)
-   Allow user to update the tasks. (Re-use the modal element and fill the inputs with the task's data, updated data should also be validated)
-   Allow user to delete the tasks. 
-   Display the tasks, with their remaining time. For instance, if today is the 15th of March and the task is due for the 20th of March, display `in 5 days`, if it's less then a day it should display in hours, and in minutes if it's less then an hour.
-   Allow users to sort their tasks by remainining time, with the most urgent first, or by title.
-   Save tasks in LocalStorage, so that they persist even when the page is refreshed.



There is a lot of project management tools online. You can get some inspirations from popular tools such as Notion, Trello, Asana or [GitHub Projects](https://docs.github.com/en/issues/trying-out-the-new-projects-experience/about-projects) for instance.