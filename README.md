# Events Registration App

## Description
[Events Registration App](https://event-registration-frontend-rouge.vercel.app) is a web application that allows users to register for events, view event details, and organize them. The application features a user-friendly interface for creating, viewing, sorting, and filtering events.

## Technologies

- **Frontend**: React, React Router, React Hook Form, Zod, Axios
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Design**: CSS

## Functionality

- Creation of new events.
- Registration of participants for events.
- Viewing a list of events with sorting and filtering options.
- Pagination of events.
- Ability to add participants to events.

## Implemented Features

### Base Level

1. **Events Page**:
   - Implemented an interactive page where users can view a paginated list of available events.
   - Users can view event information, including:
     - **Title**: a brief description of the event.
     - **Description**: detailed information about the event, including all necessary details.
     - **Event Date**: the date and time when the event will take place.
     - **Organizer**: the name or organization hosting the event.
   - The list of events can be pre-populated in the database manually or via a seed script, simplifying testing and demonstration of functionality.

2. **Create Event Page**:
   - Added the ability to create new events through a create event form.
   - The form includes fields for entering:
     - **Title**: the name of the new event.
     - **Description**: a brief description of the event.
     - **Event Date**: the date and time of the event.
     - **Organizer**: the name or organization hosting the event.
   - After filling out and submitting the form, new events are saved to the database and appear in the events list.

3. **Event Registration Page**:
   - Users can register for events by clicking the "Register" button, which redirects them to the registration page.
   - The registration form includes the following fields:
     - **Full Name**: the participant's first and last name.
     - **Email**: the participant's contact information.
     - **Date of Birth**: the participant's date of birth, used for age verification.
     - **How did you hear about this event?**: a field to gather data on the sources of event promotion.
   - After submitting the form, the data is stored in the database for further processing.

4. **Event Participants Page**:
   - Implemented a page where users can view a list of registered participants for each event.
   - This page is accessible via a "View" button, allowing organizers to easily track the number of participants.

### Middle Level

1. **Everything from the Base Level**.
  
2. **Events Page**:
   - Added sorting functionality for events, allowing users to filter the list of events by:
     - **Title**: ability to sort alphabetically.
     - **Event Date**: ability to sort by date from the nearest to the furthest.
     - **Organizer**: ability to sort by the organizer's name.
   - This feature enhances the user experience by enabling quicker access to desired events.

3. **Event Registration Page**:
   - Implemented form validation to ensure the correctness of the entered data:
     - **Full Name**: must contain at least 3 characters.
     - **Email**: must match the standard email format.
     - **Date of Birth**: a required field that should not be in the future.
   - Added a **DatePicker** component for entering the date of birth, making date selection more convenient for users.

4. **Event Participants Page**:
   - Added a search function for participants by:
     - **Full Name**: allows quick searches for specific participants.
     - **Email**: enables filtering of participants by their contact details.
   - This improves participant management and facilitates easy access to information for organizers.

