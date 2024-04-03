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
