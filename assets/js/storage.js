/********** Class Objects **********/

// Person
class Person {
    constructor(firstName, lastName, emailAddress, phoneNumber, label, picture) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.label = label;
        this.picture = picture;

    }

    toString() {
        return `Person:\n
                First Name: ${this.firstName}\n
                Last Name: ${this.lastName}\n
                Email Address: ${this.emailAddress}\n
                Phone Number: ${this.phoneNumber}\n
                Picture label: ${this.label}`; 
    }

}

// Location
class Location {
    constructor(streetAddress, zipCode, city, state, countryCode) {
        this.streetAddress = streetAddress;
        this.zipCode = zipCode;
        this.city = city;
        this.state = state;
        this.countryCode = countryCode;
    }

    toString() {
        return `Location:\n
                Street: ${this.streetAddress}\n
                City: ${this.city}\n
                State: ${this.state}\n
                Zip Code: ${this.zipCode}\n`;
    }

}

// Profiles
class Profiles {
    constructor(linkedIn, website) {
        this.linkedIn = linkedIn;
        this.website = website;
    }

    toString() {
        return `Profiles: \n
            LinkedIn: ${this.linkedIn}\n
            Website: ${this.website}`; 
    }
}

// experience
class Experience {
    constructor(company, position, startdate, endDate, summary, highlights) {
        this.company = company;
        this.position = position;
        this.startdate = startdate;
        this.endDate = endDate;
        this.summary = summary;
        this.highlights = highlights;  // array of highlights
    }

    toString() {
        return `Experience: \n
            Company: ${this.company}\n
            Positiion: ${this.position}\n
            Start Date: ${this.startdate}\n
            End Date: ${this.endDate}\n
            Summary: ${this.summary}\n
            Highlights: ${this.highlights}`;
    }

}

// Education
class Education {
    constructor(institution, area, studyType, startdate, endDate, gpa) {
        this.institution = institution;
        this.area = area;
        this.studyType = studyType;
        this.startdate = startdate;
        this.endDate = endDate;
        this.gpa = gpa;
    }

    toString() {
        return `Education:\n
            Institution: ${this.institution}\n
            Area: ${this.area}
            Study Type: ${this.studyType}\n
            Start Date: ${this.startdate}\n
            End Date: ${this.endDate}\n
            GPA: ${this.gpa}`; 
    }

}

// Awards
class Awards {
    constructor(title, date, awarder, summary) {
        this.title = title;
        this.date = date;
        this.awarder = awarder;
        this.summary = summary
    }

    toString() {
        return `Awards: \n
            Title: ${this.title}\n
            Date: ${this.date}\n
            Awarder: ${this.awarder}\n
            Summary: ${this.summary}`; 
    }    
    
}

// skills

// interests

// languages

// references

// Resume object
class Resume {
    constructor(person, label, picture, location, profiles, work, education, skills, interests, languages, references) {
        this.person = person;
        this.label = label;
        this.picture = picture;
        this.location = location;
        this.profiles = profiles;
        this.work = work;
        this.education = education;
        this.skills = skills;
        this.interests = interests;
        this.languages = languages;
        this.references = references;
    }

    toString() {
        return `Resume: (${this.person.toString}\n
                        ${this.label.toString}\n
                        ${this.location.toString}\n
                        ${this.profiles.toString = function() {
                            return this.map(obj => obj.toString()).join('\n');
                        }};
                        ${this.work.toString = function() {
                            return this.map(obj => obj.toString()).join('\n');
                        }};
                        ${this.education.toString  = function() {
                            return this.map(obj => obj.toString()).join('\n');
                        }};
                        ${this.skills.toString}\n
                        ${this.interests.toString}\n
                        ${this.languages.toString}\n
                        ${this.references.toString})`; 
    }    
                           

}

// determine key and same resuem to local storage
function saveResumeLs(resume) {

    //store
     localStorage.setItem(determineKey(), JSON.stringify(resume));

}

// determine key based on data in resume
function determineKey(resume) {

    // this is temp until I come up with something better :-)
    return key = resume.firstName[0] + resume.lastName + resume.location.zipCode;

}

// retrieve resume - use same determine key to find data in local storage
function retreiveResume() {

    return JSON.parse(localStorage.getItem(determineKey()));

}



