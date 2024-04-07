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


