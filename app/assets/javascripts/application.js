/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

// $(document).ready(function () {
//   window.GOVUKFrontend.initAll()
//
//   let selectElement = document.querySelector('#Select_transaction')
//     accessibleAutocomplete.enhanceSelectElement({
//       defaultValue: '',
//       selectElement: selectElement
//     })
//
//
// })
//
// let selectElement = document.querySelector('#Select_transaction')
//
// accessibleAutocomplete.enhanceSelectElement({
//   defaultValue: '',
//   source: (query, populateResults) => {
//     const options = selectElement.querySelectorAll('option')
//     let results = []
//
//     options.forEach(
//       (opt, i, list) => {
//         let queryRegExp = new RegExp(query.trim(), 'i')
//         let value = opt.getAttribute('value')
//         let text = opt.innerText.trim()
//         if (queryRegExp.test(value) || queryRegExp.test(text)) {
//           results.push(text)
//         }
//       }
//     )
//
//     populateResults(results)
//   },
//   selectElement: selectElement
// })

$(document).ready(function () {
  window.GOVUKFrontend.initAll()

  let selectAutocompletes = document.querySelectorAll('.js-select-autocomplete')

  selectAutocompletes.forEach(
    (selectElement, i, list) => {
      accessibleAutocomplete.enhanceSelectElement({
        defaultValue: '',
        showAllValues: true, dropdownArrow: () => '',
        source: (query, populateResults) => {
          const options = selectElement.querySelectorAll('option')
          let results = []

          options.forEach(
            (opt, i, list) => {
              let queryRegExp = new RegExp(query.trim(), 'i')
              let value = opt.getAttribute('value')
              let text = opt.innerText.trim()
              if (queryRegExp.test(value) || queryRegExp.test(text)) {
                results.push(text)
              }
            }
          )

          populateResults(results)
        },
        selectElement: selectElement
      })
    }
  )
})


// This updates the feeText that appears on the screen, it takes the total of all the feeFields
function updateFeeText(feeFields) {
    var feeTotal = 0
    feeFields.map((fee) => {
        if(fee.value) {
            feeTotal = feeTotal + parseInt(fee.value)
        }
    })
    const feeText = Array.from(document.getElementsByClassName('fee-amount-text'))
    feeText.map((text) => {
        text.textContent = '£' + (feeTotal)
    })
}
const feeFields = Array.from(document.getElementsByClassName("transaction-fee-field"))
// This has to be ran on each page load
updateFeeText(feeFields)
feeFields.map((field) => {
    field.addEventListener("keypress", function (e) {
        disallowCharacters(e)
    })
    // When the fee gets updated it updates the text in the places where the fee amount is mentioned
    field.addEventListener('input', event => {
        updateFeeText(feeFields)
    })
})

function Comma(Num) { //function to add commas to textboxes
        Num += '';
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        Num = Num.replace(',', ''); Num = Num.replace(',', ''); Num = Num.replace(',', '');
        x = Num.split('.');
        x1 = x[0];
        x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1))
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
        return x1 + x2;
    }
