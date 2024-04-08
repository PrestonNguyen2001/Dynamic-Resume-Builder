# Dynamic-Resume-Builder

## Concept
Welcome to our Interactive Front-End Project, where we showcase our collaborative skills and coding abilities. For this project, our team was tasked to create a front-end application that could solve a real-world problem. Our project, Dynamic Resume Builder, aims to provide users with a convenient and efficient way to create and customize their resumes online.  In today's competitive job market, having a well-designed and professional resume is essential for job seekers. However, many individuals struggle with the formatting and organization of their resumes. Our application addresses this challenge by offering a user-friendly interface and customizable templates to streamline the resume-building process.

## Motivation for Development
The motivation behind developing Dynamic Resume Builder was to empower users to create high-quality resumes tailored to their unique skills and experiences. We recognized the need for a solution that simplifies the resume creation process while still allowing for customization and personalization. By providing users with a dynamic platform to build their resumes, we aim to enhance their job search experience and increase their chances of landing their desired roles.

## Project Overview

### User Story
```markdown
AS A job seeker,
I WANT to create a professional resume online,
SO THAT I can effectively showcase my skills and experiences to potential employers.
```

### Acceptance Criteria
```markdown
GIVEN a resume builder
WHEN I load the app,
THEN I am presented with a landing page containing a home, templates, features, and faq section. 
WHEN I click the "Create Your Resume" button,
THEN I am navigated to the builder.html webpage.
WHEN I am taken to the builder webpage,
THEN I am presented with a form with inputs for personal and professional information.
WHEN I finish entering my information,
THEN I am able to select between different resume templates.
WHEN I select a template,
THEN I am presented with a preview of my resume.
WHEN I view the resume,
THEN I have the options to change the color or go back to the form.
WHEN I go back to the form,
THEN all of my previous inputs are saved, allowing me to make changes easily. 
```

## Key Features
- **User-Friendly Interface**: Intuitive interface for entering and editing resume details.
- **Multiple Sections**: Sections for personal information, education, work experience, skills, interests, and more.
- **Template Selection**: Option to choose from multiple resume templates for different styles and layouts.
- **Preview and Edit**: Ability to preview the resume once the form is submitted and make changes as needed.
- **Download and Print**: Ability to download the generated resume as a PDF file or print it directly from the browser.
- **Customization**: Options to customize the appearance of the resume, including profile picture and color palette. 

## Technologies Used
- **Frontend**: 
    - HTML, CSS, JavaScript, Bootstrap
- **Frontend Frameworks/Libraries**: 
    - Bootstrap 5.1.1, jQuery 3.5.1
- **Fonts**: 
    - Google Fonts (Poppins)
- **Icon Libraries**: 
    - Bootstrap Icons, Font Awesome
- **Third-Party API's**:
    - Universal Tutorial API is used to obtain an access token for accessing country, state, and city data.
    - Apilayer Phone Number Validation API is used to validate phone numbers. 
- **Data Storage**: 
    - Local storage (for temporary storage of phone number)
- **Other Tools/Services**:
    - HTML2Canvas for converting HTML elements to canvas
    - Canvas2Image to convert canvas elements to images
    - Local file references (/assets/css/builder.css, /assets/js/script.js, /templates/template2.js) for additional CSS and JavaScript files

## Dependencies
- This project may use libraries or frameworks such as Bootstrap, jQuery, or Font Awesome for enhanced styling and functionality.
- Ensure an active internet connection for accessing any external resources or APIs used in the project.

## Usage Instructions
- You can access this project on GitHub repository: https://github.com/PrestonNguyen2001/Dynamic-Resume-Builder

- You can also access the deployed version of this project at: https://prestonnguyen2001.github.io/Dynamic-Resume-Builder/


1. Accessing the Application:
    - Open your web browser and navigate to the landing page URL of the Dynamic Resume Builder application.
2. Navigating the Landing Page:
    - Upon loading the landing page, you will be presented with sections including home, templates, features, and FAQ.
3. Creating Your Resume:
    - To start creating your resume, click on the "Create Your Resume" button prominently displayed on the landing page.
4. Entering Personal and Professional Information:
    - You will be redirected to the resume builder page (builder.html), where you'll find a form with inputs for personal and professional information.
    - Fill in the required details accurately, including your name, contact information, education, work experience, skills, interests, etc.
5. Selecting a Template:
    - Once you finish entering your information, you'll be prompted to choose from different resume templates available.
    - Select the template that best suits your preferences and style.
6. Previewing Your Resume:
    - After selecting a template, you'll be presented with a preview of your resume based on the information provided.
    - Take your time to review the layout and content of your resume.
7. Customizing Your Resume:
    - If desired, you can customize the appearance of your resume by changing the color scheme.
8. Making Changes:
    - If you wish to make changes to your resume, you have the option to go back to the form where all your previous inputs are saved.
9. Saving and Downloading:
    - Once you're satisfied with your resume, you can save it or download it as a PDF file for further use.

## License
This project is licensed under the [MIT License](LICENSE).


