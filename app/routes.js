const express = require('express')
const router = express.Router()
const path = require('path')

// Add your routes here - above the module.exports line
router.use('/node_modules', express.static('node_modules'))


// router.post('/app/views/transferee-select-answer', function (req, res) {
//
//   let transferSelect = req.session.data['transferee-select']
//
//   console.log(transferSelect)
//
//   if (transferSelect == 'false') {
//     res.redirect('/app/views/transactions/transfer/add-transferee')
//   } else {
//     res.redirect('/app/views/transactions/transfer/transferee-list')
// //   }
// })

// post(route, callback(request, response) {
//     response.render(template, data);
// });


// // Branching
// router.post('/examples/branching/over-18-answer', function (req, res) {
//   // Get the answer from session data
//   // The name between the quotes is the same as the 'name' attribute on the input elements
//   // However in JavaScript we can't use hyphens in variable names
//
//   let over18 = req.session.data['over-18']
//
//   if (over18 === 'false') {
//     res.redirect('/docs/examples/branching/under-18')
//   } else {
//     res.redirect('/docs/examples/branching/over-18')
//   }
// })

// Branching
router.post('/transactions/transfer/transferee-list-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

                                            // Name of input
  let applicanttransferee = req.session.data['transferee-select']
                            // Value of input
  if (applicanttransferee === 'yes') {
    res.redirect('/transactions/transfer/transferee-list')
  } else {
    res.redirect('/transactions/transfer/transferees-applicants')
  }
})

router.post('/transactions/transfer/transferee-applicants-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let applicanttransfereecheckbox = req.session.data['applicant-transferee']

  if (applicanttransfereecheckbox === 'none') {
    res.redirect('/transactions/transfer/transferees-applicants')
  } else {
    res.redirect('/transactions/transfer/transferee-list')
  }
})

router.post('/transactions/transfer/transferee-addresstype-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let transfereeAddress = req.session.data['transfereeAddressType']

  if (transfereeAddress === 'UK-postal') {
    res.redirect('/transactions/transfer/transferee-UKaddress')
}
  if (transfereeAddress === 'Overseas-postal') {
      res.redirect('/transactions/transfer/transferee-overseasAddress')
    }

  if (transfereeAddress === 'PO-box') {
      res.redirect('/transactions/transfer/transferee-POboxAddress')
    }

    if (transfereeAddress === 'email') {
        res.redirect('/transactions/transfer/transferee-emailAddress')
      }

      if (transfereeAddress === 'DX') {
          res.redirect('/transactions/transfer/transferee-dxAddress')
        }

        if (transfereeAddress === 'BFPO') {
            res.redirect('/transactions/transfer/transferee-BFPOAddress')
          }


})




router.post('/transactions/transfer/transferor-representation-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

let transferorRep = req.session.data['transferorRepresentation']

if (transferorRep === 'conveyancer') {
  res.redirect('/transactions/transfer/transferor-representation')
}

})


router.post('/transactions/discharge/method-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

                                            // Name of input
  let dischargeMethod = req.session.data['discharge-method']
  req.session.data['dischargeAttached'] = 'true';
  if (dischargeMethod === 'form') {
    res.redirect('/transactions/discharge/discharge-upload')
  } else {
    res.redirect('/transactions/tasks')
  }
})


router.get('/docs/examples/pass-data/vehicle-registration-car1', function (req, res) {
	req.session.data = {
  "vehicle-registration": "test-plate",
  "vehicle-type": "Car",
  "vehicle-features": [
    "Heated seats",
    "Radio"
  ]
}
  res.redirect('vehicle-registration')
})

router.get('/docs/examples/pass-data/task-list', function (req, res) {
	req.session.data = {
  "reference": "JT/123/TR1",
  "title": "LP12345",
  "whole-or-part": "Whole",
  "part": "",
  "Transactions": "Transfer for value (TR1)",
  "PriceInput1": "250000",
  "FeeInput1": "12",
  "Transactions0": "Death of a joint proprietor (DJP)",
  "FeeInput2": "0",
  "PriceInput2": "12",
  "Transactions1": "Select a transaction from the list",
  "fee1": "",
  "Price1": "",
  "Transactions2": "Select a transaction from the list",
  "fee2": "",
  "Price2": "",
  "Transactions3": "Select a transaction from the list",
  "fee3": "",
  "Price3": "",
  "add-applicant": "individual",
  "applicant-individual-forename": "John",
  "applicant-individual-surname": "Smith",
  "applicant-individual-forename-2": "Jane",
  "applicant-individual-surname-2": "Smith",
  "applicant-company-name-2": "",
  "applicant-company-number-2": ""
}
  res.redirect('/../transactions/tasks')
})


// Passing data into a page
router.get('/stored-data', function (req, res) {
	console.log(req.session.data)
  res.render('stored-data')
})


router.post('/transactions/transfer/transferee-representation-confirmed', function (req, res) {
  req.session.data['transfereerep'] = 'true';
    res.redirect('/../transactions/tasks')
})

router.post('/transactions/transfer/transferor-representation-confirmed', function (req, res) {
  req.session.data['transferorrep'] = 'true';
    res.redirect('/../transactions/tasks')
})

router.post('/transactions/transfer/documents/attached-required-documents', function (req, res) {
  req.session.data['attached'] = 'true';
    res.redirect('/../transactions/tasks')
})

router.post('/transactions/transfer/documents/TR1-attached', function (req, res) {
  req.session.data['tr1attached'] = 'true';
    res.redirect('document_prompts-1')
})

router.post('/transactions/transfer/documents/consent-attached', function (req, res) {
  req.session.data['suggested_upload'] = 'true';
    res.redirect('document_prompts-1')
})

router.post('/transactions/transfer/documents/other-attached', function (req, res) {
  req.session.data['other_upload'] = 'true';
    res.redirect('document_prompts-1')
})

router.post('/transactions/transfer/overseasAddress', function (req, res) {
    res.redirect('transfereeAddressList')
})

router.post('/transactions/transfer/UKAddress', function (req, res) {
    res.redirect('transfereeAddressList')
})


router.post('/transactions/transfer/POboxAddress', function (req, res) {
    res.redirect('transfereeAddressList')
})

router.post('/transactions/transfer/emailAddress', function (req, res) {
    res.redirect('transfereeAddressList')
})

router.post('/transactions/transfer/DXAddress', function (req, res) {
    res.redirect('transfereeAddressList')
})

router.post('/transactions/transfer/BFPOAddress', function (req, res) {
    res.redirect('transfereeAddressList')
})

router.post('/transactions/discharge/discharge-attached', function (req, res) {
  req.session.data['dischargeAttached'] = 'true';
    res.redirect('/../transactions/tasks')
})





// router.post('/transactions/transfer/transferor-representation-answer', function (req, res) ) {
//     req.session.data['tranferorRepAdd'] = 'UK Conveyancers LLP';
//     res.redireect('/../transactions/transfer/transferee-list')
// })


module.exports = router
