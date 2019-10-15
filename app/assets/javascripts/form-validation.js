var forms = document.querySelectorAll('[data-validate]');

// TODO: Error summary
// TODO: Extend this for other types of form elements not just inputs

function getSubmitHandler(form, constraints) {
  return function submitHandler(e) {
    e.preventDefault()

    ;[].forEach.call(form.elements, function(el) {
      reset(el)
    })

    var errors = validate(form, constraints)

    if(errors) {
      for (name in errors) {
        if (errors.hasOwnProperty(name)) {

          // TODO: Move this into it's own method

          form[name].classList.add('govuk-input--error')
          form[name].parentNode.classList.add('govuk-form-group--error')

          var errorMessage = document.createElement('span')
          errorMessage.classList.add('govuk-error-message')
          errorMessage.innerHTML = '<span class="govuk-visually-hidden">Error:</span> ' + errors[name]

          form[name].parentNode.insertBefore(errorMessage, form[name])
        }
      }
    } else {
      form.removeEventListener('submit', submitHandler)
      form.submit()
    }
  }
}

;[].forEach.call(forms, function(form) {
  var constraints = JSON.parse(document.getElementById(form.getAttribute('data-validate')).innerHTML)

  form.addEventListener('submit', getSubmitHandler(form, constraints))
})


function reset(element) {
  element.classList.remove('govuk-input--error')
  element.parentNode.classList.remove('govuk-form-group--error')

  var errorMessage = element.parentNode.querySelector('.govuk-error-message')
  errorMessage && errorMessage.parentNode.removeChild(errorMessage)
}
