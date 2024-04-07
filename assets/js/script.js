/*-----------------------------------*\
  #MODALS
\*-----------------------------------*/
// Hiding the modal initially
const modal = document.querySelector(".modal");
modal.style.display = "none";

const modalImport = document.querySelector(".importModal");
modalImport.style.display = "none";

// Function to open the modal
function openModal() {
    modal.style.display = "block";
}

// Function to close the modal
function closeModal() {
    modal.style.display = "none";
}
  
// Event listener for the "Create New" button
document.querySelector(".resumeBtn").addEventListener("click", openModal);
  
// Function to open the import modal
function openImportModal() {
    var modal = document.querySelector('.importModal');
    modal.classList.add('is-open');
    modal.style.display = "block";
}
  
// Function to close the import modal
function closeImportModal() {
    var modal = document.querySelector('.importModal');
    modal.classList.remove('is-open');
}
  
// Event listener for the import button
document.querySelector('.resumeBtn.import').addEventListener('click', function() {
    openImportModal();
});

/*-----------------------------------*\
  #FORMS
\*-----------------------------------*/
const nextButton = document.querySelector(".btn-next");
const prevButton = document.querySelector(".btn-prev");
const steps = document.querySelectorAll(".step");
const form_steps = document.querySelectorAll(".form-step");
let active = 1;

// Event listeners for next and previous buttons
nextButton.addEventListener("click", () => {
    active++;
    if (active > steps.length) {
        active = steps.length;
    }
    updateProgress();
});
  
prevButton.addEventListener("click", () => {
    active--;
    if (active < 1) {
        active = 1;
    }
    updateProgress();
});



// Function to update progress and toggle active steps
const updateProgress = () => {
    steps.forEach((step, i) => {
        if (i == (active - 1)) {
            step.classList.add("active");
            form_steps[i].classList.add("active");
        } else {
            step.classList.remove("active");
            form_steps[i].classList.remove("active");
        }
    });
  
    // Enable or disable prev and next buttons
    if (active === 1) {
        prevButton.disabled = true;
    } else if (active === steps.length) {
        nextButton.disabled = true;
    } else { 
        prevButton.disabled = false;
        nextButton.disabled = false;
    }
};

// Flip Card Functions
$(document).ready(function () {
    let currentlyOpenFlipCard = null;

    function slideTog(el) {
        $(el).next().slideToggle(300);
    }

    $(".flip0, .flip1, .flip2, .flip3, .flip4, .flip5, .flip6, .flip7").click(function () {
        // Check if another flip card is open, close it if it's different from the clicked one
        if (currentlyOpenFlipCard && currentlyOpenFlipCard !== this) {
            $(currentlyOpenFlipCard).next().slideUp(300);
        }
        // Toggle the clicked flip card
        slideTog(this);
        currentlyOpenFlipCard = this;
    });

    //**************** Form Steps ****************//
    let steps = Array.from(document.querySelectorAll('form.step'));
    let next_btn = document.querySelectorAll('form .next_btn');
    let prev_btn = document.querySelectorAll('form .prev_btn');

    next_btn.forEach(button => {
        button.addEventListener('click', () => {
            if (validate_form1(this))
                changeStep('next');
        });
    });

    prev_btn.forEach(button => {
        button.addEventListener('click', () => {
            changeStep('prev');
        });
    });

    let index = 0;
    function changeStep(btn) {
        let active = document.querySelector('form.step.active')
        index = steps.indexOf(active);
        steps[index].classList.remove('active');
        if (btn === 'next') {
            if ((index < steps.length - 1))
                index++;
        }
        else if (btn === 'prev')
            index--;
        steps[index].classList.add('active');
    }
});

// Visibility Control Functions
function visibler() {
    $(".dwnldimage, .printCv, .back-to-form, .palette").css('display', 'inline-block').fadeIn();
}
  
function printer() {
    $(".dwnldimage, .printCv, .back-to-form, .palette").css('display', 'none'); 
    window.print();
    setTimeout(visibler, 500);
}

// Image Upload & Preview
$('.imgContainer').click(function () {
    $('#inputImg').click();
});
  
$('#inputImg').change(function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        $('#previewText').css('display', 'none');
        $('.imgContainer').css('border', 'none');
        $('#image').css('display', 'block');
        reader.addEventListener('load', function () {
            $('#image').attr('src', this.result);
        });
        reader.readAsDataURL(file);
    } else {
        document.getElementById('previewText').style.display = null;
        document.getElementById('image').style.display = null;
        document.getElementsByClassName('imgContainer')[0].style.border = null;
        $('#image').attr('src', '');
    }
});

//  **********    **********    Country, state and city API   **********    **********

let auth_token;
$('#country').click(function () {
  getCountries();
  $('#country').unbind('click');
})

$(document).ready(function () {
  $.ajax({
    type: 'get',
    url: 'https://www.universal-tutorial.com/api/getaccesstoken',
    success: function (data) {
      auth_token = data.auth_token;
    },
    error: function (error) {
      console.log(error);
    },
    headers: {
      "Accept": "application/json",
      "api-token": "QFZCxL-P9DDVZzxIYTti85dbkTb-RZYqW4fG39dTvmeLJ9TCRmVj-UQSruPENKH3MCw",
      "user-email": "murtazamister1@gmail.com"
    }
  })
})
function getCountries() {
  $.ajax({
    type: 'get',
    url: 'https://www.universal-tutorial.com/api/countries',
    success: function (data) {
      $('#country').empty();
      data.forEach((ele) => {
        $('#country').append(`<option value="${ele.country_name}">${ele.country_name}</option>`);
      })
      getStates();
    },
    error: function (error) {
      console.log(error);
    },
    headers: {
      "Authorization": "Bearer " + auth_token,
      "Accept": "application/json"
    }
  })
}
function getStates() {
  $.ajax({
    type: 'get',
    url: 'https://www.universal-tutorial.com/api/states/' + $('#country').val(),
    success: function (data) {
      $('#state').empty();
      data.forEach((ele) => {
        $('#state').append(`<option value="${ele.state_name}">${ele.state_name}</option>`);
      })
      getCities();
    },
    error: function (error) {
      console.log(error);
    },
    headers: {
      "Authorization": "Bearer " + auth_token,
      "Accept": "application/json"
    }
  })
}
function getCities() {
  $.ajax({
    type: 'get',
    url: 'https://www.universal-tutorial.com/api/cities/' + $('#state').val(),
    success: function (data) {
      $('#city').empty();
      data.forEach((ele) => {
        $('#city').append(`<option value="${ele.city_name}">${ele.city_name}</option>`);
      })
    },
    error: function (error) {
      console.log(error);
    },
    headers: {
      "Authorization": "Bearer " + auth_token,
      "Accept": "application/json"
    }
  })
}

/*-----------------------------------*\
  #VALIDATION
\*-----------------------------------*/
let edu = 0;
let skill = 0;
let work = 0;
let interest = 0;
let lang = 0;

function adder(event, element) {
  if (event.key === 'Enter') {
    if (element == 'skill') {
      $('#add_skill').click();
      document.getElementsByClassName('skill')[$('.skill').length - 1].focus();
    }
    else if (element == 'hobby') {
      $('#add_interest').click();
      document.getElementsByClassName('hobby')[$('.hobby').length - 1].focus();
    }
    else {
      $('#add_lang').click();
      document.getElementsByClassName('lang')[$('.lang').length - 1].focus();
    }
  }
}

//  **********    **********  Form - 1  Validation  **********    **********    **********


function validate_form1(btn) {
    let finalValid = true;
    let isValid = true;
    let img_div = document.getElementsByClassName('imgContainer')[0];
    if ($('#inputImg').val() == "") { validate_chg_color(img_div); isValid = false; finalValid = false; }
    $('#form1').find('select').each(function () {
      if ($(this).attr('city') == 'city' || $(this).attr('country') == 'country' || $(this).attr('state') == 'state') { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } }
    });
    $('#form1').find('input').each(function () {
      if ($(this).attr('id') == 'linkedIn' || $(this).attr('id') == 'website') { }
      else {
        isValid = validate_chg_color(this);
        if (!isValid) { finalValid = false; }
      }
    });
    if (isValid == false) {
      // btn.preventDefault();
    }
    return finalValid;
}

//  **********  ********** Education and Qualifications **********  **********

function updateEdu() {
    for (let i = 0; i < $('#accordionEdu .accordion-item').length; i++) {
  
      let a = ($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`).val().trim() == '') ? 'Education' : $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`).val().trim();
  
      let c = ($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`).val().trim() == '') ? '' : ' from ' + $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`).val().trim();
  
      $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .accordion-button`).html(a + c);
    }
}
  
function emakeVisible() {
    $("#accordionEdu .accordion-header").css("display", "block");
    updateEdu();
}
  
function delEdu2(event) {
    event.preventDefault();
    if ($("#accordionEdu .accordion-item").length > 1) {
      emakeVisible();
      event.target.parentElement.parentElement.parentElement.remove();
    }
    event.stopPropagation();
}
  
  
$('.flipCard1').click(function () {
    edu = 1;
    $('.flipCard1').off('click');
});
  
let eduAdder = $("#accordionEdu").html();
let eduCounter = 1;
  
$("#add_edu").click(function (e) {
    let isValid = true;
    let finalValid = true;
    $('#accordionEdu .accordion-item:last-child').find('input').each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });
  
    if (!finalValid) {
      e.preventDefault();
    }
    else {
      updateEdu();
      eduCounter++;
      if ($("#accordionEdu .accordion-item").length > 0) {
        $("#accordionEdu .accordion-header").css("display", "block");
        let count = $("#accordionEdu .accordion-item").length;
        if (document.getElementById("accordionEdu").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
          document.getElementById("accordionEdu").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
        }
      }
      $("#accordionEdu").append(eduAdder);
      $("#accordionEdu .accordion-header").last().attr("id", "eheading" + eduCounter);
      $("#accordionEdu .accordion-collapse").last().attr("aria-labelledby", "eheading" + eduCounter);
      $("#accordionEdu .accordion-collapse").last().attr("id", "ecollapse" + eduCounter);
      $("#accordionEdu .accordion-button").last().attr("data-bs-target", "#ecollapse" + eduCounter);
      $("#accordionEdu .accordion-button").last().attr("aria-controls", "ecollapse" + eduCounter);
    }
});
  

//  **********  ********** Work Experience  **********  **********

function updateWork() {
    for (let i = 0; i < $('#accordionWork .accordion-item').length; i++) {
      let a = ($(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`).val().trim() == '') ? 'Work Experience' : $(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`).val().trim();
  
      let c = ($(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`).val().trim() == '') ? '' : ' at ' + $(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`).val().trim();
  
      $(`#accordionWork .accordion-item:nth-child(${i + 1}) .accordion-button`).html(a + c);
    }
  }
  
function wmakeVisible() {
    $("#accordionWork .accordion-header").css("display", "block");
    updateWork();
}
  
function delWork2(event) {
    event.preventDefault();
    if ($("#accordionWork .accordion-item").length > 1) {
      wmakeVisible();
      event.target.parentElement.parentElement.parentElement.remove();
    }
    event.stopPropagation();
}
  
$('.flipCard2').click(function () {
    work = 1;
    $('.flipCard2').off('click');
  })
  let workAdder = $("#accordionWork").html();
  let workCounter = 1;
  
  $("#add_work").click(function (e) {
    let isValid = true;
    let finalValid = true;
    $("#accordionWork .accordion-item:last-child").find("input").each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });
  
    if (!finalValid) {
      e.preventDefault();
    }
    else {
      updateWork();
      workCounter++;
      if ($("#accordionWork .accordion-item").length > 0) {
        $("#accordionWork .accordion-header").css("display", "block");
        let count = $("#accordionWork .accordion-item").length;
        if (document.getElementById("accordionWork").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
          document.getElementById("accordionWork").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
        }
      }
      $("#accordionWork").append(workAdder);
      $("#accordionWork .accordion-header").last().attr("id", "wheading" + workCounter);
      $("#accordionWork .accordion-collapse").last().attr("aria-labelledby", "wheading" + workCounter);
      $("#accordionWork .accordion-collapse").last().attr("id", "wcollapse" + workCounter);
      $("#accordionWork .accordion-button").last().attr("data-bs-target", "#wcollapse" + workCounter);
      $("#accordionWork .accordion-button").last().attr("aria-controls", "wcollapse" + workCounter);
    }
});

//  **********  ********** Skills **********  **********

function updateSkill() {
    for (let i = 0; i < $('#accordionSkill .accordion-item').length; i++) {
      let a = ($('#accordionSkill .accordion-item:nth-child(' + (i + 1) + ') .skill').val().trim() == '') ? 'Skill' : $('#accordionSkill .accordion-item:nth-child(' + (i + 1) + ') .skill').val().trim();
      $('#accordionSkill .accordion-item:nth-child(' + (i + 1) + ') .accordion-button').html(a);
    }
  }
  
function smakeVisible() {
    $("#accordionSkill .accordion-header").css("display", "block");
    updateSkill();
}
  
function delSkill2(event) {
    event.preventDefault();
    if ($("#accordionSkill .accordion-item").length > 1) {
      smakeVisible();
      event.target.parentElement.parentElement.parentElement.remove();
    }
    event.stopPropagation();
}
  
$('.flipCard3').click(function () {
    skill = 1;
    $('.flipCard3').off('click');
});
  
let skillAdder = $("#accordionSkill").html();
let skillCounter = 1;
  
$("#add_skill").click(function (e) {
    let isValid = true;
    let finalValid = true;
    $("#accordionSkill .accordion-item:last-child").find("input, select").each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });
    if (!finalValid) {
      e.preventDefault();
    }
    else {
      updateSkill();
      skillCounter++;
      if ($("#accordionSkill .accordion-item").length > 0) {
        $("#accordionSkill .accordion-header").css("display", "block");
        let count = $("#accordionSkill .accordion-item").length;
        if (document.getElementById("accordionSkill").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
          document.getElementById("accordionSkill").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
        }
      }
      $("#accordionSkill").append(skillAdder);
      $("#accordionSkill .accordion-header").last().attr("id", "sheading" + skillCounter);
      $("#accordionSkill .accordion-collapse").last().attr("aria-labelledby", "sheading" + skillCounter);
      $("#accordionSkill .accordion-collapse").last().attr("id", "scollapse" + skillCounter);
      $("#accordionSkill .accordion-button").last().attr("data-bs-target", "#scollapse" + skillCounter);
      $("#accordionSkill .accordion-button").last().attr("aria-controls", "scollapse" + skillCounter);
    }
});
  
$(".flipCard3").mouseleave(function () {
    if (skill == 0) { return; }
    let timer = window.setTimeout(function () {
      smakeVisible();
      let count = $("#accordionSkill .accordion-item").length;
      for (let i = 0; i < count; i++) {
        if (document.getElementById("accordionSkill").getElementsByClassName("accordion-item")[i].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
          document.getElementById("accordionSkill").getElementsByClassName("accordion-button")[i].click();
        }
      }
    }, 5000);
    $(".flipCard3").mouseenter(function () {
      window.clearTimeout(timer);
      $(".flipCard3").unbind('mouseenter');
    });
});
  
//  **********  ********** Interests **********  **********

function updateInterest() {
    for (let i = 0; i < $('#accordionInt .accordion-item').length; i++) {
      let a = ($('#accordionInt .accordion-item:nth-child(' + (i + 1) + ') .hobby').val().trim() == '') ? 'Hobby' : $('#accordionInt .accordion-item:nth-child(' + (i + 1) + ') .hobby').val().trim();
      $('#accordionInt .accordion-item:nth-child(' + (i + 1) + ') .accordion-button').html(a);
    }
}
  
function imakeVisible() {
    $("#accordionInt .accordion-header").css("display", "block");
    updateInterest();
}
  
function delInt2(event) {
    event.preventDefault();
    if ($("#accordionInt .accordion-item").length > 1) {
      imakeVisible();
      event.target.parentElement.parentElement.parentElement.remove();
    }
    event.stopPropagation();
}
  
$('.flipCard4').click(function () {
    interest = 1;
    $('.flipCard4').off('click');
});
  
let interestAdder = $("#accordionInt").html();
let interestCounter = 1;
  
$("#add_interest").click(function () {
    let isValid = true;
    let finalValid = true;
    $("#accordionInt .accordion-item:last-child").find('input').each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });
    if (!finalValid) {
      e.preventDefault();
    }
    else {
      updateInterest();
      interestCounter++;
      if ($("#accordionInt .accordion-item").length > 0) {
        $("#accordionInt .accordion-header").css("display", "block");
        let count = $("#accordionInt .accordion-item").length;
        if (document.getElementById("accordionInt").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
          document.getElementById("accordionInt").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
        }
      }
      $("#accordionInt").append(interestAdder);
      $("#accordionInt .accordion-header").last().attr("id", "iheading" + interestCounter);
      $("#accordionInt .accordion-collapse").last().attr("aria-labelledby", "iheading" + interestCounter);
      $("#accordionInt .accordion-collapse").last().attr("id", "icollapse" + interestCounter);
      $("#accordionInt .accordion-button").last().attr("data-bs-target", "#icollapse" + interestCounter);
      $("#accordionInt .accordion-button").last().attr("aria-controls", "icollapse" + interestCounter);
    }
});
  
$(".flipCard4").mouseleave(function () {
    if (interest == 0) { return; }
    let timer = window.setTimeout(function () {
      imakeVisible();
      let count = $("#accordionInt .accordion-item").length;
      for (let i = 0; i < count; i++) {
        if (document.getElementById("accordionInt").getElementsByClassName("accordion-item")[i].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
          document.getElementById("accordionInt").getElementsByClassName("accordion-button")[i].click();
        }
      }
    }, 5000);
    $(".flipCard4").mouseenter(function () {
      window.clearTimeout(timer);
      $(".flipCard4").unbind('mouseenter');
    });
});


//  **********  ********** Languages **********  **********

function updateLang() {
    for (let i = 0; i < $('#accordionLang .accordion-item').length; i++) {
      let a = ($('#accordionLang .accordion-item:nth-child(' + (i + 1) + ') .lang').val().trim() == '') ? 'Language' : $('#accordionLang .accordion-item:nth-child(' + (i + 1) + ') .lang').val().trim();
      $('#accordionLang .accordion-item:nth-child(' + (i + 1) + ') .accordion-button').html(a);
    }
  }
  
function lmakeVisible() {
    $("#accordionLang .accordion-header").css("display", "block");
    updateLang();
}
  
function delLang2(event) {
    event.preventDefault();
    if ($("#accordionLang .accordion-item").length > 1) {
      lmakeVisible();
      event.target.parentElement.parentElement.parentElement.remove();
    }
    event.stopPropagation();
}
  
$('.flipCard6').click(function () {
    lang = 1;
    $('.flipCard6').off('click');
});
  
let langAdder = $("#accordionLang").html();
let langCounter = 1;
  
$("#add_lang").click(function (e) {
    let isValid = true;
    let finalValid = true;
    $("#accordionLang .accordion-item:last-child").find('input').each(function () { isValid = validate_chg_color(this); if (!isValid) { finalValid = false; } });
    if (!finalValid) {
      e.preventDefault();
    }
    else {
      updateLang();
      langCounter++;
      if ($("#accordionLang .accordion-item").length > 0) {
        $("#accordionLang .accordion-header").css("display", "block");
        let count = $("#accordionLang .accordion-item").length;
        if (document.getElementById("accordionLang").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-collapse")[0].classList.contains("show")) {
          document.getElementById("accordionLang").getElementsByClassName("accordion-item")[count - 1].getElementsByClassName("accordion-button")[0].click();
        }
      }
      $("#accordionLang").append(langAdder);
      $("#accordionLang .accordion-header").last().attr("id", "lheading" + langCounter);
      $("#accordionLang .accordion-collapse").last().attr("aria-labelledby", "lheading" + langCounter);
      $("#accordionLang .accordion-collapse").last().attr("id", "lcollapse" + langCounter);
      $("#accordionLang .accordion-button").last().attr("data-bs-target", "#lcollapse" + langCounter);
      $("#accordionLang .accordion-button").last().attr("aria-controls", "lcollapse" + langCounter);
    }
});

/*-----------------------------------*\
    #DISPLAY
\*-----------------------------------*/
$(document).ready(function () {
    $('.one').css("border", "3px solid white");
    $('.pelement').click(function () {
      $('.pelement').css("border", "3px solid transparent");
      $(this).css("border", "3px solid white");
      $('.left_side').css("background-color", $(this).css("background-color"));
    })
  });

function toggChk(el) {
    let ele = $(el).parent('div').parent('div').prev().find("input")[0];
    ele.disabled = !ele.disabled;
    if ($(el).is(':checked'))
      $(ele).parent('div').css({ 'display': 'none' });
    else
      $(ele).parent('div').css({ 'display': 'block' });
  }
  
function validate_chg_color(el) {
    let isValid = true;
  
    if ($(el).hasClass('end_date')) {
      let chk_pre = $(el).parent().next('div').find('input')[0].checked;
      if (chk_pre)
        return true;
    }
    if ($(el).attr('type') == 'checkbox') {
    }
    else if ($.trim($(el).val()) == '' || $.trim($(el).val()) == 'Select level') {
      isValid = false;
      $(el).css({ "border": "1.5px solid red" });
    }
    else {
      $(el).css({ "border": "1.5px solid rgb(206, 212, 218)" });
    }
    return isValid;
}

function isValidEmail(email) {
    // Basic email validation regex
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  function generateCvAndUpdateTemplate(template) {
    let email = $('#email').val().trim();
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    generateCV(template);
  }
  


function templateRadioSelector(ele) {
    for (let i = 0; i < $('#form3 .card').length; i++) {
      // $(`#form3 .card:nth-child(${i+1})`).css('border','1px solid rgba(0,0,0,.125)');
      $(`#form3 .card:nth-child(${i + 1})`).css('background-color', 'white');
    }
    // $(ele).css('border', '10px solid green');
    $(ele).css('background-color', '#80808088');
    $(ele).find('input').prop('checked', true);
}
  
function template_selector() {
    if ($('#template_1').prop('checked') == true) {
      generateCV('Template_1');
    }
    else if ($('#template_2').prop('checked') == true) {
      generateCV('Template_2');
    }
    else if ($('#template_3').prop('checked') == true) {
      generateCV('Template_3');
    }
    else {
      alert("Please select a template.");
    }
}

function visibler() {
    $(`.dwnldimage`).css('display', 'inline-block');
    $(`.printCv`).css('display', 'inline-block');
    $(`.back-to-form`).css('display', 'flex');
    $(`.palette`).css('display', 'block');
}
function printer() {
    $(`.dwnldimage`).css('display', 'none');
    $(`.printCv`).css('display', 'none');
    $(`.back-to-form`).css('display', 'none');
    $(`.palette`).css('display', 'none');
    window.print();
    setTimeout(visibler, 500);
}

for (let i = 0; i < 3; i++) {
    document.querySelectorAll('.printCv')[i].addEventListener('click', printer);
  }
  
function generateCV(template) {
    document.getElementById('form3').classList.remove('active');
    modal.style.display = "none";
    if (template == 'Template_3') { document.getElementById(template).style.display = 'block'; }
    else { document.getElementById(template).style.display = 'flex'; }
  
    document.querySelector('#dwnldimage').addEventListener('click', function () {
      let template2Image = $(`#${template}`).find('#target')[0];
      html2canvas(template2Image).then(function (canvas) {
        console.log(canvas);
        return Canvas2Image.saveAsPNG(canvas);
      });
    });
  
    let file = document.getElementById('inputImg').files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      document.getElementById(`${template}`).getElementsByClassName('profilepic')[0].src = reader.result;
    };
  
    $(`#${template} #t_name`).html($('#fname').val() + " " + $('#lname').val());
    $(`#${template} #t_email`).html($('#email').val().trim());
    $(`#${template} #t_number`).html($('#number').val());
    $(`#${template} #t_address`).html($('#address').val() + "<br>" + $('#zip').val() + "<br>" + ($('#city').val() == null ? "" : $('#city').val() + ", ") + $('#state').val() + ", " + $('#country').val());
  
    if ($('#website').val().trim() == "") {
      $(`#${template} #t_website`).parent().css('display', 'none');
    }
    else {
      $(`#${template} #t_website`).html($('#website').val());
    }
  
    if ($('#linkedIn').val().trim() == "") {
      $(`#${template} #t_linkedIn`).parent().css('display', 'none');
    }
    else {
      $(`#${template} #t_linkedIn`).html($('#linkedIn').val());
    }
  
    let edu_items = $('#accordionEdu .accordion-item').length;
    for (let i = 0; i < edu_items; i++) {
      let degree = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .degree`).val().trim();
      let srt_date = new Date($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .edu_start`).val());
      srt_date = srt_date.getFullYear();
  
      let end_date = "";
      if ($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .end_date_toggle`).prop('checked')) {
        end_date = 'Present';
      }
      else {
        end_date = new Date($(`#accordionEdu .accordion-item:nth-child(${i + 1}) .end_date`).val());
        end_date = end_date.getFullYear();
      }
      let school = $(`#accordionEdu .accordion-item:nth-child(${i + 1}) .school`).val().trim();
  
      if (degree == "" || srt_date == NaN || end_date == NaN || school == "") {
        continue;
      }
  
      if (template == "Template_1") {
        $('.t1 .left_side .education ul').append(`<li><span>${srt_date}-${end_date}</span><h5>${degree}</h5><p>${major}</p></li>`);
      }
      else if (template == 'Template_2') {
        $('.t2 .upper .education .content').append(`<div class="edu"><div class="edu_year"><h4>${srt_date}-${end_date}</h4></div><div class="box"><div class="degree">${degree}</div><div class="major">${major}</div></div></div>`);
      }
      else if (template == 'Template_3') {
        $('.t3 .content-box .education').append(`<p class="p1">${degree}&nbsp;(${srt_date}-${end_date})</p><p class="p2">${major}</p>`);
      }
    }
  
    let work_items = $('#accordionWork .accordion-item').length;
    for (let i = 0; i < work_items; i++) {
      let job_title = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .job_title`).val().trim();
      let company_name = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .company_name`).val().trim();
      let srt_date = new Date($(`#accordionWork .accordion-item:nth-child(${i + 1}) .work_start`).val());
      srt_date = srt_date.getFullYear();
  
      let end_date = "";
      if ($(`#accordionWork .accordion-item:nth-child(${i + 1}) .end_date_toggle`).prop('checked')) {
        end_date = 'Present';
      }
      else {
        end_date = new Date($(`#accordionWork .accordion-item:nth-child(${i + 1}) .end_date`).val());
        end_date = end_date.getFullYear();
      }
      let work_desc = $(`#accordionWork .accordion-item:nth-child(${i + 1}) .work_desc`).val().trim();
  
      if (job_title == "" || company_name == "" || srt_date == NaN || end_date == NaN) {
        continue;
      }
  
      if (template == "Template_1") {
        $('.t1 .right_side .experience').append(`<div class="box"><div class="year_company"><h5>${srt_date} - ${end_date}</h5><h5>${company_name}</h5></div><div class="text"><h4>${job_title}</h4><p>${work_desc}</p></div></div>`);
      }
      else if (template == 'Template_2') {
        $('.t2 .lower_right .experience .content').append(`<div class="con"><div class="time"><h4>${srt_date}-${end_date}</h4><h4>${company_name}</h4></div><div class="box"><div class="text">${job_title}</div><div class="exp">${work_desc}</div></div></div>`);
      }
      else if (template == 'Template_3') {
        $('.t3 .content-box .experience').append(`<p class="job-title">${job_title}&nbsp;at&nbsp;${company_name}&nbsp;(${srt_date}-${end_date})</p><p class="par-4">${work_desc}</p>`);
      }
    }
  
    let skill_items = $('#accordionSkill .accordion-item').length;
    for (let i = 0; i < skill_items; i++) {
      let skill = $(`#accordionSkill .accordion-item:nth-child(${i + 1}) .skill`).val().trim();
  
      if (skill == "") {
        continue;
      }
      if (template == "Template_1") {
        $('.t1 .right_side .skills .box').append(`<h4>${skill}</h4>`);
      }
      else if (template == 'Template_2') {
        $('.t2 .lower .lower_left .skills .content').append(`<div class="skill">${skill}</div>`);
      }
      else if (template == 'Template_3') {
        $('.t3 .skills').append(`<li><span>${skill}</span></li>`);
      }
    }
  
    let interest_items = $('#accordionInt .accordion-item').length;
    for (let i = 0; i < interest_items; i++) {
      let interest = $(`#accordionInt .accordion-item:nth-child(${i + 1}) .hobby`).val().trim();
  
      if (interest == "") {
        continue;
      }
  
      if (template == "Template_1") {
        $('.t1 .right_side .interest ul').append(`<li>${interest}</li>`);
      }
      else if (template == 'Template_2') {
        $('.t2 .lower .lower_left .interests .content').append(`<div class="con">${interest}</div>`);
      }
      else if (template == 'Template_3') {
        $('.t3 .interest').append(`<li><span>${interest}</span></li>`);
      }
      
    }
  
    let lang_items = $('#accordionLang .accordion-item').length;
    for (let i = 0; i < lang_items; i++) {
      let lang = $(`#accordionLang .accordion-item:nth-child(${i + 1}) .lang`).val().trim();
  
      if (lang == "") {
        continue;
      }
  
      if (template == "Template_1") {
        $('.t1 .left_side .language ul').append(`<li><span class="text">${lang}</span></li>`);
      }
      else if (template == 'Template_2') {
        $('.t2 .lower .lower_left .languages .content .con').append(`<div class="lang">${lang}</div>`);
      }
      else if (template == 'Template_3') {
        $('.t3 .content-box .languages').append(`<p class="p3">${lang}</p>`);
      }
    }
  
    let achv = $('#achv_description').val().trim().replaceAll("\n", "<br />\r\n");
  
    if (achv !== "") {
      if (template == "Template_1") {
        $('.t1 .right_side .achievements').append(`<p>${achv}</p>`);
      }
      else if (template == 'Template_2') {
        $('.t2 .lower_right .achievements .content .con').append(`<div class="val">${achv}</div>`);
      }
      else if (template == 'Template_3') {
        // Achievements not implemented for Template_3
      }
    }
  
    let summary = $('#summary').val().trim().replaceAll("\n", "<br />\r\n");
    if (summary !== "") {
      if (template == "Template_1") {
        $('.t1 .right_side .prof').append(`<p>${summary}</p>`);
      }
      else if (template == 'Template_2') {
        $('.t2 .lower_right .summary').append(`<div class="content">${summary}</div>`);
      }
      else if (template == 'Template_3') {
        $('.t3 .objective').html(`${summary}`);
      }
    }
}

  function backToForm(ele) {
    $(`.${ele}`).css('display', 'none');
    document.querySelector('.modal').style.display = 'block';
    document.getElementById('form3').classList.add('active');
    // ***************** Emptying education ******************* 
    $('.t1 .left_side .education ul').html('');
    $('.t2 .lower_right .education .content').html('');
    $('.t3 .education').html('');

    // ***************** Emptying work ******************* 
    $('.t1 .right_side .experience').html('<h2 class="title2">Experience</h2>');
    $('.t2 .lower_right .experience .content').html('');
    $('.t3 .content-box .experience').html('');

    // ***************** Emptying skill ******************* 
    $('.t1 .right_side .skills .box').html('');
    $('.t2 .lower .lower_left .skills .content').html('');
    $('.t3 .skills').html('');

    // ***************** Emptying languages ******************* 
    $('.t1 .left_side .language ul').html('');
    $('.t2 .lower .lower_left .languages .content .con').html('');
    $('.t3 .content-box .languages').html('<p class="head">Languages</p>');

    // ***************** Emptying achievements ******************* 
    $('.t1 .right_side .achievements').html(`<h2 class="title2">Achievements</h2>`);
    $('.t2 .lower_right .achievements .content .con').html('');

    // ***************** Emptying profile ******************* 
    $('.t1 .right_side .prof').html('<h2 class="title2">Profile</h2>')
    $('.t2 .lower_right .profile').html('<div class="hr title">Profile</div>')
    $('.t3 .objective').html('');

    // ***************** Emptying interest ******************* 
    $('.t1 .right_side .interest ul').html('');
    $('.t2 .lower .lower_left .interests .content').html('');
    $('.t3 .interest').html('');
}

/*************** Phone number validataion ***************/

$("#phone-input").blur(function() {
  // This function will be executed when the phone number input loses focus
  validatePhoneNumber($(this).val());
});


// validate phone number
// basic validation and call to service to validate
function validatePhoneNumber(phoneNumber) {
  
  console.log("Phone number entered:", phoneNumber);

  // basic audits before calling api
  if (!basicPhoneNumberValidation(phoneNumber)) {
      alert('basic validation failed');
  };

  // check local storage - if passed matches storage no need to revalidate
  const lsPhoneNum = localStorage.getItem('phoneNum');    
  if (lsPhoneNum === phoneNumber) {
      return;
  }

  // call api to validate phone number
  const valPhoneAccessKey = '18138c51516703472e379936d4479762' // valid key
  //const valPhoneAccessKey = '18138c51516703472e379936d44797' // invalid key
  const valPhoneUrl = 'http://apilayer.net/api/validate?access_key=' + valPhoneAccessKey + 
                      '&number=' + 
                      phoneNumber + 
                      '&country_code=US';

  fetch(valPhoneUrl)
      .then(response => {
          if (response.status === 200) {
              return response.json()
          } else {
              // errpr processing
              throw new Error("Error calling phone number validation: " + response.error.info);         
          }
      })
      .then(data => {
          console.log(data);
          if (data.error) {
              throw new Error("Error calling phone number validation: " + data.error.info);
          } else if (!data.valid) {
              throw new Error('the ' + phoneNumber + ' you entered is not valid');
          }
      })
      .catch(error => {
          console.error('Validate Phone Number -', error); 
      });

      // set temp storage
      localStorage.setItem('phoneNum', phoneNumber);

}

// basic phone number audits
// sure there are alot more but this covers the basics
function basicPhoneNumberValidation(phoneNumber) {
  
  const reservedAreaCodes = ["800", "888", "877", "866", "855", "844", "833"];
  
  // Remove non-numeric characters from the phone number
  phoneNumber = phoneNumber.replace(/\D/g, '');
  // get exchange
  const exchange = phoneNumber.substring(3, 6);
  // get area code 
  const areaCode = phoneNumber.substring(0, 2);


  // length has to be greater or
  // can't start 1 or
  // area code can't be 555, 800, 877, 866, 855, 844, 833
  if ((phoneNumber.length < 10) ||  // requires country code default US - 1
//       (phoneNumber.startsWith(1)) || 
     (reservedAreaCodes.includes(areaCode)) ||
     (exchange === '555') ) {
      return false;        
  }

  return true;
}


