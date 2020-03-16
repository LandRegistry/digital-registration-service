const express = require('express')
const router = express.Router()
const path = require('path')

// Add your routes here - above the module.exports line
router.use('/node_modules', express.static('node_modules'))




// Select/add transferees
router.post('/transactions/transfer/transferee-whichapplicants-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  // This only works if there are two transferees


  // let applicantTransferee1 = req.session.data['applicant-individual-transferee1']
  //
  // console.log(applicantTransferee1)
  //
  // if (applicantTransferee1.checked === false) {
  //   res.redirect('/docs/examples/branching/under-18')
  // } else {
  //   res.redirect('/transactions/transfer/transferee-list')
  // }
  //
  // })

  // let applicantTransferee1 = req.body['applicant-individual-transferee1'];
  // let applicantTransferee2 = req.body['applicant-individual-transferee2'];
  //
  // // console.log(req.body['applicant-individual-transferee1'])
  //
  // if ((applicantTransferee1 === '_unchecked') && (applicantTransferee2 === '_unchecked')) {
  //   res.redirect('/transactions/transfer/add-transferee')
  // } else {
  //   res.redirect('/transactions/transfer/transferee-list')
  // }
  //
  // })

  let applicantTransferee1 = req.session.data['applicant-individual-forename'];
  let applicantTransferee2 = req.session.data['applicant2-individual-forename-2'];
  // let applicantTransferee3 = req.session.data['applicant-individual-forename-3'];
  var checkboxTicked1
  var checkboxTicked2
  // var checkboxTicked3

  if (applicantTransferee1 != '') {
      let checkbox1 = req.body['applicant-individual-transferee1'];
      if (checkbox1 === '_unchecked'){
        checkboxTicked1 = false
      } else {
      checkboxTicked1 = true
      }

  }

  if (applicantTransferee2 != '') {
      let checkbox2 = req.body['applicant-individual-transferee2'];
      if (checkbox2 === '_unchecked'){
        checkboxTicked2 = false
      } else {
      checkboxTicked2 = true
      }

  }

  // if (applicantTransferee3 != '') {
  //     let checkbox3 = req.body['applicant-individual-transferee3'];
  //     if (checkbox3  != '_unchecked'){
  //       checkboxTicked3 = true
  //     } else {
  //     checkboxTicked3 = false
  //     }
  //
  // } else {
  // checkboxTicked3 = false
  // }

  if ((checkboxTicked1 === true) || (checkboxTicked2 === true)) {
    res.redirect('/transactions/transfer/transferee-list')
  } else {
    res.redirect('/transactions/transfer/add-transferee')
  }



  // console.log(req.body['applicant-individual-transferee1'])
  //
  // if ((applicantTransferee1 === '_unchecked') && (applicantTransferee2 === '_unchecked')) {
  //   res.redirect('/transactions/transfer/add-transferee')
  // } else {
  //   res.redirect('/transactions/transfer/transferee-list')
  // }
  //
  })




  // res.redirect('/transactions/transfer/transferee-list')

// Select/add lenders
  router.post('/transactions/charge-without-transfer/applicants-lenders', function (req, res) {

    let applicantLender1 = req.session.data['applicant-company-lender1'];
    var lenderTicked1

    if (applicantLender1 != '') {
        let lendercheckbox1 = req.body['applicant-company-lender1'];
        if (lendercheckbox1 === '_unchecked'){
          lenderTicked1 = false
        } else {
        lenderTicked1 = true
      }
    }

    if (lenderTicked1 === false) {
      res.redirect('/transactions/charge-without-transfer/add-lender')
    } else {
      req.session.data['add-lender'] = 'true';
      req.session.data['cwt-lender-company-name'] = 'Barclays Lending Ltd';
      req.session.data['cwt-lender-company-number'] = '12345678';
      res.redirect('/transactions/charge-without-transfer/charge-without-transfer-lender-list')

    }
})


// Transferee add address for service
router.post('/transactions/transfer/transferee-addresstype-answer', function (req, res) {

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

// Transferee 2 address
router.post('/transactions/transfer/transferee-addresstype-answer2', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let transfereeAddress2 = req.session.data['transfereeAddressType-2']

  if (transfereeAddress2 === 'UK-postal2') {
    res.redirect('/transactions/transfer/transferee-UKaddress2')
}
  if (transfereeAddress2 === 'Overseas-postal2') {
      res.redirect('/transactions/transfer/transferee-overseasAddress2')
    }

})



// charge addresses
router.post('/transactions/charge-without-transfer/address-for-service/cwt-lender-addresstype-answer', function (req, res) {

  let lenderAddress = req.session.data['lenderAddressType']

  if (lenderAddress === 'UK-postal') {
    res.redirect('/transactions/charge-without-transfer/address-for-service/lender-UKaddress')
}
  if (lenderAddress === 'Overseas-postal') {
      res.redirect('/transactions/charge-without-transfer/address-for-service/lender-overseasAddress')
    }

  if (lenderAddress === 'PO-box') {
      res.redirect('/transactions/charge-without-transfer/address-for-service/lender-POboxAddress')
    }

    if (lenderAddress === 'email') {
        res.redirect('/transactions/charge-without-transfer/address-for-service/lender-emailAddress')
      }

      if (lenderAddress === 'DX') {
          res.redirect('/transactions/charge-without-transfer/address-for-service/lender-DX')
        }

        if (lenderAddress === 'BFPO') {
            res.redirect('/transactions/charge-without-transfer/address-for-service/lender-BFPO')
          }

})



//
// router.post('/transactions/transfer/transferor-representation-answer', function (req, res) {
//   // Get the answer from session data
//   // The name between the quotes is the same as the 'name' attribute on the input elements
//   // However in JavaScript we can't use hyphens in variable names
//
//
// if (transferorrep === 'noConveyancer') {
//   res.redirect('/transactions/transfer/transferor-verify')
// } else {
//   res.redirect('/transactions/transfer/transferor-representation')
// }
//
// })


// Discharge method
router.post('/transactions/discharge/method-answer', function (req, res) {

                                            // Name of input
  let dischargeMethod = req.session.data['dischargemethod']

  if (dischargeMethod === 'form') {
    req.session.data['discharge-method'] = 'Form';
    res.redirect('/transactions/tasks')

  } if (dischargeMethod === 'direct') {
    req.session.data['discharge-method'] = 'Direct';
    res.redirect('/transactions/tasks')

  } if (dischargeMethod === 'later') {
    req.session.data['discharge-method'] = 'Later';
    res.redirect('/transactions/tasks')
  }
})


//  discharge representation
router.post('/transactions/discharge/lender-representation-answer', function (req, res) {
      let lenderRep = req.session.data['LenderRepresentation']
      if (lenderRep === 'NotRepresented') {
          req.session.data['lenderReptype'] = 'Not represented';
          res.redirect('/lender-verify')
      } else {
        req.session.data['lenderReptype'] = 'UK Conveyancers Ltd';
        res.redirect('/transactions/discharge/lender-representation')
      }
})

router.post('/transactions/discharge/lender-representation-answer2', function (req, res) {
      let lenderRep = req.session.data['LenderRepresentation2']
      if (lenderRep === 'NotRepresented2') {
          req.session.data['lenderReptype2'] = 'Not represented';
          res.redirect('/lender-verify')
      } else {
        req.session.data['lenderReptype2'] = 'UK Conveyancers Ltd';
        res.redirect('/transactions/discharge/lender-representation')
      }
})

// charge without transfer representation
router.post('/transactions/charge-without-transfer/cwt-lender-representation-answer', function (req, res) {
      let lenderRep = req.session.data['cwt-LenderRepresentation']
      if (lenderRep === 'NotRepresented') {
          req.session.data['lenderReptype'] = 'Not represented';
          res.redirect('')
      } else {
        req.session.data['cwt-lenderReptype'] = 'UK Conveyancers Ltd';
        res.redirect('/transactions/charge-without-transfer/lender-representation')
      }
})

// Set data

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


router.get('/docs/examples/pass-data/Solecharge', function (req, res) {
	req.session.data = {
    "reference": "JT/123/CH",
    "title": "LP12345",
    "whole-or-part": "Whole",
    "part": "",
    "Transactions": "charge",
    "PriceInput1": "120000",
    "FeeInput1": "12",
    "add-applicant": "Company",
    "applicant-company-name": "Barclays Lending Ltd",
    "applicant-company-number": "123456"
}
  res.redirect('/../transactions/charge-without-transfer/charge-without-transfer-tasks')
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
  "applicant2-individual-forename-2": "Jane",
  "applicant2-individual-surname-2": "Smith",
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


// Charge completed tags

router.post('/transactions/charge-without-transfer/charge-without-transfer-borrower1', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let borrowerDetails1 = req.session.data['soleChargeborrowerDetails1']

  if (borrowerDetails1 === 'correct') {
    req.session.data['borrowerDetails1'] = 'Bob Borrower';
    res.redirect('charge-without-transfer-borrower-list')
}
  if (borrowerDetails1 === 'changed') {
      res.redirect('charge-without-transfer-borrower-change')
    }
    if (borrowerDetails1 === 'removed') {
      req.session.data['borrowerDetails1'] = 'Bob Borrower';
        res.redirect('charge-without-transfer-borrower-list')
      }
})



    router.post('/transactions/charge-without-transfer/date-complete', function (req, res) {
          req.session.data['chargeDateComplete'] = 'completed';
          res.redirect('/transactions/charge-without-transfer/MDRef')
    })

// Transfer completed tags

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


router.post('/transferee-list-complete', function (req, res) {
  req.session.data['transfereelistcomplete'] = 'true';
    res.redirect('/../transactions/tasks')
})

router.post('/transactions/transfer/transferee-whichapplicants-answer', function (req, res){
  req.session.data["transfereesnone"]


})

router.post('/transactions/transfer/select-transferees-confirmed', function (req, res) {
  req.session.data['transfereesConfirmed'] = 'true';
    res.redirect('/../transactions/tasks')
})


// Charge documents/tags
router.post('/transactions/charge-without-transfer/documents/Mortgage-attached', function (req, res) {
  req.session.data['mortgageAttached'] = 'true';
    res.redirect('document_prompts')
})

router.post('/transactions/charge-without-transfer/documents/evidence-attached', function (req, res) {
  req.session.data['certificateAttached'] = 'true';
    res.redirect('document_prompts')
})


// Back links


router.post('/transactions/charge-without-transfer/back-link-borrower', function (req, res) {
  req.session.data['borrowerDetails1'] = '';
    res.redirect('charge-without-transfer-tasks')
})

module.exports = router
