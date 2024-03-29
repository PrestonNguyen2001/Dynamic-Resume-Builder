var person = {
    firstName: "fred",
    lastName: "hubert",
    gender: "Male",
    dob: "July 12, 1962"
}

//develop code to create key.....for now concate firstName + lastName first initial and dob in MDYYYY ie 7121962
// so key would be fredh7121962
var key = "fredh7121962";

var myLocation = {
    address: "4618 Main Street",
    zipCode: "21042",
    city: "your home town",
    state: "Maryland",
    countryCode: "United States"
}

var myProfiles = {
    linkedIn: "https://linkedin.com/myprofile",
    facebook: "https://facebook.com",
    ig: "https://instagram.com",
    website: "https://www.google.com"
}

var experience = {
    company: "McDondals",
    position: "Hamburgler",
    startdate: "April 1, 2023",
    endDate: "",
    summary: "stealing all the burgers",
    highlights: whatIdid
}

var myExperience = [experience];

var whatIdid = ["eat", "drink", "party"];

var education = {
    institution: "Ronald High School",
    area: "fry cook",
    studyType: "all areas or food prep",
    startdate: "August 28, 2018",
    endDate: "May 28, 2022",
    gpa: "4.0"
}

var myEducation = [education];

var awards = {
    title: "King of the Fries",
    date: "June 1, 2020",
    awarder: "Ronald McDonald",
    summary: "thanked my mom and dad"
}

var myAwards = [awards];

var skills = {
    names: mySkills
}

var mySkills = ["cashier", "cook", "dish washer"]

var interests = {
    names: myInterests
}

var myInterests = ["long walks in the park", "reading"]

languages = {
    names: myLanguages
}

var myLanguages = [];

// build resume object
var resume = {
    person: person,
    label: "",
    picture: "",
    email: "burgerler.999@gmail.com",
    phone: "(555) 555-5555",
    degree: "Bachelor of Bugers",
    website: "https://burgermeister.com",
    summary: "blah blah blah",
    location: myLocation,
    profiles: myProfiles,
    work: myExperience,
    education: myEducation,
    awards: myAwards,
    skills: mySkills,
    interests: myInterests,
    languages: myLanguages

}

// store
localStorage.setItem(key, JSON.stringify(resume));

// retreive
let myResume = JSON.parse(localStorage.getItem(key));

// display verify
console.log("my resume: " + JSON.stringify(myResume));

