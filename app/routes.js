const express = require('express')
const router = express.Router()
const path = require('path')

// Add your routes here - above the module.exports line
router.use('/node_modules', express.static('node_modules'))

// Lauren's routes
// Does this application affect the whole of the title?
router.post('/whole-part-answer', function (req, res) {

  // Make a variable and give it the value from 'how-many-balls'
  var applicationAffectWhole = req.session.data['yes-or-no']

  // Check whether the variable matches a condition
  if (applicationAffectWhole == "No - only part of the title is affected for some"){
    // Send user to next page
    res.redirect('whole-part_single-title.html')
  } else {
    // Send user to ineligible page
    res.redirect('/app-start')
  }

})



router.post('/transaction-order-selected', function (req, res) {

  // Make a variable and give it the value from 'wholepart'
  var FirstTransaction = req.session.data['Transaction1'];

  // Check whether the variable matches a condition
  if (FirstTransaction == "Transfer for value (TR1, TR5)"){
    res.redirect('/enhancements/end-to-end/register-updates/5-cal-a');
  }

  if (FirstTransaction == "Surrender of lease"){
    res.redirect('/enhancements/end-to-end/register-updates/5-cal-b');
  }

})

router.post('/go-to-task-list', function (req, res) {

  // Make a variable and give it the value from 'wholepart'
  var FirstTransaction = req.session.data['Transaction1'];

  // Check whether the variable matches a condition
  if (FirstTransaction == "Transfer for value (TR1, TR5)"){
    res.redirect('/enhancements/end-to-end/register-updates/9-task-list-a');
  }

  if (FirstTransaction == "Surrender of lease"){
    res.redirect('/enhancements/end-to-end/register-updates/9-task-list-b');
  }

})

// Run this code when a form is submitted to '/application-type-selected'
router.post('/application-type-selected', function (req, res) {

  // Make a variable and give it the value from 'wholepart'
  var applicationType = req.session.data['application-type']

  // Check whether the variable matches a condition
  if (applicationType == "update-register"){
    res.redirect('/enhancements/enter-title-numbers')
  }
  if (applicationType == "register-update-lease"){
    res.redirect('/enhancements/register-new-lease')
  }
  if (applicationType == 'remove-jp1-restriction'){
    res.redirect('/enhancements/enter-title-numbers')
  }

})

// Run this code when a form is submitted to '/application-type-selected'
router.post('/whole-or-part-or-transactions', function (req, res) {

  // Make a variable and give it the value from 'wholepart'
  var applicationType = req.session.data['application-type']
  var applicationLease = req.session.data['register-extend-lease']


  // Check whether the variable matches a condition
  if (applicationType == "update-register"){
    res.redirect('/enhancements/does-application-affect-whole-title')
  }
  if (applicationType == "register-update-lease"){
    if (applicationLease == "new-lease"){
      res.redirect('/enhancements/transactions-newLease')
    }
    if (applicationLease == "extend-lease"){
      res.redirect('/enhancements/transactions-extendLease')
    }

  }
  if (applicationType == "remove-jp1-restriction"){
    res.redirect('/enhancements/document_uploadRemoveJP1')
  }

})


router.post('/jp1Declaration', function (req, res) {

  // Make a variable and give it the value from 'wholepart'
  var jp1declarationCheckbox = req.session.data['jp1-declaration']

  // Check whether the variable matches a condition
  if (jp1declarationCheckbox == "declared"){

    res.redirect('/enhancements/jp1-confirmation')
  }
  else{
    res.redirect('/enhancements/jp1-declaration')

  }

})



// Run this code when a form is submitted to '/affect-whole-title'
router.post('/affect-whole-title', function (req, res) {

  // Make a variable and give it the value from 'wholepart'
  var applicationAffectWhole = req.session.data['wholepart']

  // Check whether the variable matches a condition
  if (applicationAffectWhole == "no"){
    req.session.data['whole-title-impacted'] = 'no';
    res.redirect('/enhancements/titles-in-this-application')
  } else {
    req.session.data['whole-title-impacted'] = 'yes';
    res.redirect('/enhancements/titles-in-this-application')
  }

})

// Select/add transferees
router.post('/transactions/transfer/transferee-whichapplicants-answer', function (req, res) {

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


  if ((checkboxTicked1 === true) || (checkboxTicked2 === true)) {
    res.redirect('/transactions/transfer/transferee-list')
  } else {
    res.redirect('/transactions/transfer/add-transferee')
  }

  })

  // Select/add transferees - ENHANCEMENTS VERSION
router.post('/enhancements/transfer/transferee-whichapplicants-answer', function (req, res) {
  req.session.data['testing-testing'] = 'HELLO';
  // let help = req.session.data['testingtesting'];

  let ApplicantTransferee1 = req.session.data['applicant-individual-forename'];
  let ApplicantTransferee2 = req.session.data['applicant2-individual-forename-2'];
  let companyTransferee1 = req.session.data['applicant-company-name'];
  let companyTransferee2 = req.session.data['applicant2-company-name-2'];

  // let applicantTransferee3 = req.session.data['applicant-individual-forename-3'];
  var checkboxTicked1 = false;
  var checkboxTicked2 = false;
  var checkboxTicked3 = false;
  var checkboxTicked4 = false;


  if ((ApplicantTransferee1 != null) || (companyTransferee1 != null)) {
    req.session.data['first applicant'] = 'inputted';
    if (ApplicantTransferee1 != '') {
      let checkbox1 = req.body['applicant-individual-transferee1'];
      req.session.data['first applicant type'] = 'individual';
      if (checkbox1 == 'applicant1-transferee-1'){
        checkboxTicked1 = true;
        req.session.data['boxIndividual-1'] = 'was ticked';

      } else {
      checkboxTicked1 = false;
      req.session.data['boxIndividual-1'] = 'was not ticked';

      }
    }
    // else{
    //   req.session.data['first applicant checkbox'] = 'applicant 1 hasnt been inputted';
    // }

    if (companyTransferee1 != '') {
      let checkbox3 = req.body['applicant-company-transferee1'];
      req.session.data['first applicant type'] = 'company';
      if (checkbox3 == 'applicant1-company-transferee-1'){
        checkboxTicked3 = true;
        req.session.data['boxCompany-1'] = 'was ticked';

      } else {
      checkboxTicked3 = false;
      req.session.data['boxCompany-1'] = 'was not ticked';

      }
    }

    }

    if (ApplicantTransferee2 != null) {
      req.session.data['second applicant'] = 'inputted';
      if (ApplicantTransferee2 != '') {
        let checkbox2 = req.body['applicant-individual-transferee2'];
        req.session.data['second applicant type'] = 'individual';
        if (checkbox2 == 'applicant2-transferee-2'){
          checkboxTicked2 = true;
          req.session.data['boxIndividual-2'] = 'was ticked';

        } else {
        checkboxTicked2 = false;
        req.session.data['boxIndividual-2'] = 'was not ticked';

        }
    }
    if (companyTransferee2 != '') {
      let checkbox4 = req.body['applicant-company-transferee2'];
      req.session.data['second applicant type'] = 'company';
      if (checkbox4 == 'applicant2-company-transferee-2'){
        checkboxTicked4 = true;
        req.session.data['boxCompany-2'] = 'was ticked';

      } else {
      checkboxTicked4 = false;
      req.session.data['boxCompany-2'] = 'was not ticked';

      }
    }


  }

  if ((checkboxTicked1 === true) || (checkboxTicked2 === true) || (checkboxTicked3 === true) || (checkboxTicked4 === true)) {
    res.redirect('/enhancements/transfer/transferee-list');
  } else {
    res.redirect('/enhancements/transfer/add-transferee');
  }

  })



// charge without transfer Select/add lenders
  router.post('/transactions/charge-without-transfer/applicants-lenders', function (req, res) {

    let applicantLender1 = req.session.data['applicant-individual-lender1'];
    var lenderTicked1

    if (applicantLender1 != '') {
        let lendercheckbox1 = req.body['applicant-individual-lender1'];
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

// charge with transfer select Lenders
// Select/add lenders
  router.post('/transactions/charge/applicants-lenders', function (req, res) {

    let applicantLender1 = req.session.data['applicant-individual-lender1'];
    let applicantLender2 = req.session.data['applicant-individual-lender2'];
    var lenderTicked1

    if (applicantLender1 != '') {
        let lendercheckbox1 = req.body['applicant-individual-lender1'];
        if (lendercheckbox1 === '_unchecked'){
          lenderTicked1 = false
        } else {
        lenderTicked1 = true
      }
    }

    if (applicantLender2 != '') {
        let lendercheckbox1 = req.body['applicant-individual-lender2'];
        if (lendercheckbox1 === '_unchecked'){
          lenderTicked1 = false
        } else {
        lenderTicked1 = true
      }
    }

    if (lenderTicked1 === false) {
      res.redirect('/transactions/charge/add-lender')
    } else {
      req.session.data['add-lender'] = 'true';
      req.session.data['charge-lender-company-name'] = 'Barclays Lending Ltd';
      req.session.data['charge-lender-company-number'] = '12345678';
      res.redirect('/transactions/charge/lender-list')

    }
})


// Transferee add address for service
router.post('/transactions/transfer/transferee-addresstype-answer', function (req, res) {

  let transfereeAddress = req.session.data['transfereeAddressType']

  let transaction = req.session.data['Transaction']


    if (transfereeAddress === 'property') {
      res.redirect('/transactions/transfer/transfereeAddressList')
    }
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


  // Transferee add address for service
router.post('/transactions/transfer/transferee-addresstype-answer_1', function (req, res) {

  let transfereeAddress_1_1 = req.session.data['transfereeAddressType-1']


    if (transfereeAddress_1_1 === 'property') {
        res.redirect('/enhancements/transfer/AddAddresses_forServices/transfereeAddressList')
      }
    if (transfereeAddress_1_1 === 'UK-postal') {
      res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee1/transferee-UKaddress')
      }
    if (transfereeAddress_1_1 === 'Overseas-postal') {
        res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee1/transferee-overseasAddress')
      }
    if (transfereeAddress_1_1 === 'PO-box') {
        res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee1/transferee-POboxAddress')
      }
    if (transfereeAddress_1_1 === 'email') {
        res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee1/transferee-emailAddress')
      }
    if (transfereeAddress_1_1 === 'DX') {
        res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee1/transferee-dxAddress')
      }
    if (transfereeAddress_1_1 === 'BFPO') {
        res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee1/transferee-BFPOAddress')
      }

})

  // Transferee add address for service
  router.post('/transactions/transfer/transferee-addresstype-answer_1_2', function (req, res) {

    let transfereeAddress_1_2 = req.session.data['transfereeAddressType-2']


      if (transfereeAddress_1_2 === 'property') {
          res.redirect('/enhancements/transfer/AddAddresses_forServices/transfereeAddressList')
        }
      if (transfereeAddress_1_2 === 'UK-postal') {
        res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee2/transferee-UKaddress')
        }
      if (transfereeAddress_1_2 === 'Overseas-postal') {
          res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee2/transferee-overseasAddress')
        }
      if (transfereeAddress_1_2 === 'PO-box') {
          res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee2/transferee-POboxAddress')
        }
      if (transfereeAddress_1_2 === 'email') {
          res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee2/transferee-emailAddress')
        }
      if (transfereeAddress_1_2 === 'DX') {
          res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee2/transferee-dxAddress')
        }
      if (transfereeAddress_1_2 === 'BFPO') {
          res.redirect('/enhancements/transfer/AddAddresses_forServices/addAddress/Transferee2/transferee-BFPOAddress')
        }

  })

// // Transferee 2 address
// router.post('/transactions/transfer/transferee-addresstype-answer2', function (req, res) {
//   // Get the answer from session data
//   // The name between the quotes is the same as the 'name' attribute on the input elements
//   // However in JavaScript we can't use hyphens in variable names
//
//   let transfereeAddress2 = req.session.data['transfereeAddressType-2']
//
//   if (transfereeAddress2 === 'UK-postal2') {
//     res.redirect('/transactions/transfer/transferee-UKaddress2')
// }
//   if (transfereeAddress2 === 'Overseas-postal2') {
//       res.redirect('/transactions/transfer/transferee-overseasAddress2')
//     }
//
// })

// Transferee add address for service
router.post('/transactions/transfer/transferee-addresstype2-answer', function (req, res) {

  let transfereeAddress = req.session.data['transfereeAddressType2']

  if (transfereeAddress === 'UK-postal') {
    res.redirect('/transactions/transfer/Address2/transferee-UKaddress2')
    }
  if (transfereeAddress === 'Overseas-postal') {
      res.redirect('/transactions/transfer/Address2/transferee-overseasAddress2')
    }
  if (transfereeAddress === 'PO-box') {
      res.redirect('/transactions/transfer/Address2/transferee-POboxAddress2')
    }
  if (transfereeAddress === 'email') {
      res.redirect('/transactions/transfer/Address2/transferee-emailAddress2')
    }
  if (transfereeAddress === 'DX') {
      res.redirect('/transactions/transfer/Address2/transferee-dxAddress2')
    }
  if (transfereeAddress === 'BFPO') {
      res.redirect('/transactions/transfer/Address2/transferee-BFPOAddress2')
    }
  })



// sole charge addresses
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

// charge with transfer addresses
router.post('/transactions/charge/charge-lender-addresstype-answer', function (req, res) {

  let lenderAddress = req.session.data['lenderAddressType']

  if (lenderAddress === 'UK-postal') {
    res.redirect('/transactions/charge/address-for-service/lender-UKaddress')
}
  if (lenderAddress === 'Overseas-postal') {
      res.redirect('/transactions/charge/address-for-service/lender-overseasAddress')
    }

  if (lenderAddress === 'PO-box') {
      res.redirect('/transactions/charge/address-for-service/lender-POboxAddress')
    }

    if (lenderAddress === 'email') {
        res.redirect('/transactions/charge/address-for-service/lender-emailAddress')
      }

      if (lenderAddress === 'DX') {
          res.redirect('/transactions/charge/address-for-service/lender-DX')
        }

        if (lenderAddress === 'BFPO') {
            res.redirect('/transactions/charge/address-for-service/lender-BFPO')
          }

})

// charge with transfer addresses
router.post('/enhancements/charge/charge-lender-addresstype-answer', function (req, res) {

  let lenderAddress = req.session.data['lenderAddressType']

  if (lenderAddress === 'UK-postal') {
    res.redirect('/enhancements/charge/address-for-service/lender-UKaddress')
}
  if (lenderAddress === 'Overseas-postal') {
      res.redirect('/enhancements/charge/address-for-service/lender-overseasAddress')
    }

  if (lenderAddress === 'PO-box') {
      res.redirect('/enhancements/charge/address-for-service/lender-POboxAddress')
    }

    if (lenderAddress === 'email') {
        res.redirect('/enhancements/charge/address-for-service/lender-emailAddress')
      }

      if (lenderAddress === 'DX') {
          res.redirect('/enhancements/charge/address-for-service/lender-DX')
        }

        if (lenderAddress === 'BFPO') {
            res.redirect('/enhancements/charge/address-for-service/lender-BFPO')
          }

})


router.post('/ChargeLender-addresscomplete', function (req, res) {

  req.session.data['lenderAddressComplete'] = 'true';
  res.redirect('/enhancements/charge/documents/document_prompts')

})

// sole charge md ref
router.post('/transactions/charge-without-transfer/mdrefanswer', function (req, res) {

                                     // Name of input
  let mdreference = req.session.data['MDreferenceinput']

  if (mdreference != '') {
    req.session.data['cwt-lender-company-name'] = 'Barclays Ltd';
    req.session.data['lender-name'] = 'Barclays Ltd';
    req.session.data['add-lender'] = 'true';
    req.session.data['AddRepTask'] = 'true';
    req.session.data['AddAddressTask'] = 'true';
    res.redirect('/transactions/charge-without-transfer/lender-representationAdd')
  } else {
    req.session.data['AddLendersTask'] = 'true';
    req.session.data['AddRepTask'] = 'true';
    req.session.data['AddAddressTask'] = 'true';
    res.redirect('/transactions/charge-without-transfer/charge-without-transfer-charge-lenders')

  }
})

// does charge have MD REF
router.post('/enhancements/charge/mdrefanswer', function (req, res) {

  // Name of input
let mdreference = req.session.data['MDreferenceinput']
let transaction = req.session.data['Transaction']

if (mdreference != '') {
req.session.data['charge-lender-company-name'] = 'Barclays Ltd';
req.session.data['charge-lender-name'] = 'Barclays Ltd';
req.session.data['add-lender'] = 'true';
req.session.data['AddRepTask'] = 'true';
req.session.data['AddAddressTask'] = 'true';
res.redirect('/enhancements/charge/lender-representationAdd')

} else{
req.session.data['AddLendersTask'] = 'true';
req.session.data['AddRepTask'] = 'true';
req.session.data['AddAddressTask'] = 'true';
res.redirect('/enhancements/charge/add-lender')

}
})


// date of charge entered
router.post('/enhancements/charge/date-entered', function (req, res) {
  let day = req.session.data['day']
  let month = req.session.data['month']
  let year = req.session.data['year']

  if ((day != '') && (month != '') && (year != '')) {
    req.session.data['charge-date'] = 'true';

    }
res.redirect('/enhancements/charge/MDRef')

})

// charge with transfer md ref
router.post('/transactions/charge/mdrefanswer', function (req, res) {

                                     // Name of input
  let mdreference = req.session.data['MDreferenceinput']
  let transaction = req.session.data['Transaction']

  if (mdreference != '') {
    req.session.data['charge-lender-company-name'] = 'Barclays Ltd';
    req.session.data['charge-lender-name'] = 'Barclays Ltd';
    req.session.data['add-lender'] = 'true';
    req.session.data['AddRepTask'] = 'true';
    req.session.data['AddAddressTask'] = 'true';
    res.redirect('/transactions/charge/lender-representationAdd')

  } if (transaction = 'DTC'){
    req.session.data['AddLendersTask'] = 'true';
    req.session.data['AddRepTask'] = 'true';
    req.session.data['AddAddressTask'] = 'true';
    res.redirect('/transactions/charge/add-lender')

  }
})

// Discharge method
router.post('/transactions/discharge/method-answer', function (req, res) {
                                    // Name of input
  let dischargeMethod = req.session.data['dischargemethod']
  let transaction3 = req.session.data['Transaction3']
  let transaction2 = req.session.data['Transaction2']
  let transactioncode = req.session.data['Transaction']

  if (transaction3 != '') {
  if (dischargeMethod === 'form') {
    req.session.data['discharge-method'] = 'Form';
    res.redirect('/transactions/charge/tasks')

  } if (dischargeMethod === 'direct') {
    req.session.data['discharge-method'] = 'Direct';
    res.redirect('/transactions/charge/tasks')

  } if (dischargeMethod === 'later') {
    req.session.data['discharge-method'] = 'Later';
    res.redirect('/transactions/charge/tasks') }
  } else {req.session.data['discharge-method'] = 'Form';
    res.redirect('/transactions/tasks')

    } if (dischargeMethod === 'direct') {
    req.session.data['discharge-method'] = 'Direct';
    res.redirect('/transactions/tasks')

    } if (dischargeMethod === 'later') {
    req.session.data['discharge-method'] = 'Later';
    res.redirect('/transactions/tasks')
  }
})

router.post('/transactions/discharge/lendernameadded', function (req, res) {

let transaction = req.session.data['Transaction']

  if (transaction === 'DTC') {
      res.redirect('/transactions/charge/tasks')
  } if (transaction === 'C') {
      res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
  } if (transaction === 'T') {
      res.redirect('/transactions/transfer/transfer-tasks')
  } if (transaction === 'DT') {
      res.redirect('/transactions/tasks')
  } if (transaction === 'TC') {
      res.redirect('/transactions/charge/TC-tasks') }
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

router.post('/transactions/discharge/lenderrepresentationadded', function (req, res) {
      let transaction3 = req.session.data['Transaction3']
      if (transaction3 != '') {
          res.redirect('/transactions/charge/tasks')
      } else {
          res.redirect('/transactions/tasks')
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

// charge with transfer representation
router.post('/transactions/charge/lender-representation-answer', function (req, res) {
      let lenderRep = req.session.data['charge-LenderRepresentation']
      if (lenderRep === 'NotRepresented') {
          req.session.data['charge-lenderReptype'] = 'Not represented';
          res.redirect('')
      } else {
        req.session.data['charge-lenderReptype'] = 'UK Conveyancers Ltd';
        res.redirect('/transactions/charge/lender-representation')
      }
})

// charge with transfer representation
router.post('/enhancements/charge/lender-representation-answer', function (req, res) {
  let lenderRep = req.session.data['LenderRepresentation']
  let otherConveyancer = req.session.data['LenderOtherName']

  if (lenderRep === 'NotRepresented') {
      req.session.data['charge-lenderReptype'] = '-Not represented-';
      res.redirect('/enhancements/charge/lender-representation')
  }
  if (lenderRep === 'UKConveyancersLtd')  {
    req.session.data['charge-lenderReptype'] = 'UK Conveyancers Ltd';
    res.redirect('/enhancements/charge/lender-representation')
  }
  if (lenderRep === 'OtherConveyancer')  {
    req.session.data['charge-lenderReptype'] = otherConveyancer;
    res.redirect('/enhancements/charge/lender-representation')
  }
})

// charge docs attached
router.post('/transactions/charge/documentscomplete', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        res.redirect('/transactions/charge/TC-tasks') }
})


router.post('transactions/charge/charge-review', function (req, res) {
  let mdref = req.session.data['MDreferenceinput']
  if (mdref = '') {
    res.redirect('/transactions/charge-yes/application-review')
  } else {
    res.redirect('/transactions/charge-no/application-review')
  }
})

router.post('transactions/charge-without-transfer/charge-review', function (req, res) {
  let mdref = req.session.data['MDreferenceinput']
  if (mdref = '') {
    res.redirect('/transactions/charge-without-transfer-yes/application-review')
  } else {
    res.redirect('/transactions/charge-without-transfer-no/application-review')
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
  res.redirect('/..transactions/charge-tasks')
})

router.get('/docs/examples/pass-data/charge', function (req, res) {
	req.session.data = {
    "reference": "ABC/123/DTC",
    "title": "LP12345",
    "whole-or-part": "Whole",
    "part": "",
    "Transaction1": "Discharge",
    "PriceInput1": "120000",
    "FeeInput1": "12",
    "Transaction2": "Transfer for value (TR1)",
    "PriceInput2": "120000",
    "FeeInput2": "12",
    "Transaction3": "Charge",
    "PriceInput3": "120000",
    "FeeInput3": "12",
    "user-type": "conveyancer",
    "add-applicant": "individual",
    "applicant-individual-forename": "John",
    "applicant-individual-surname": "Smith",
    "applicant2-individual-forename-2": "Jane",
    "applicant2-individual-surname-2": "Smith",
    "transferor-individual-forename": "Bob",
    "transferor-individual-surname": "Vance",
    "transferor1": "Spencer Reid",
    "Transaction1": "Discharge",
    "Transaction2": "Transfer for value (TR1)",
    "Transaction3": "Charge",
    "Transaction": "DTC"
}
  res.redirect('/../transactions/charge/tasks')
})

router.get('/docs/examples/pass-data/transfer', function (req, res) {
	req.session.data = {
    "reference": "JT/123/CH",
    "title": "LP12345",
    "whole-or-part": "Whole",
    "part": "",
    "Transaction1": "Transfer",
    "PriceInput1": "120000",
    "FeeInput1": "12",
    "add-applicant": "individual",
    "applicant-individual-forename": "John",
    "applicant-individual-surname": "Smith",
    "applicant2-individual-forename-2": "Jane",
    "applicant2-individual-surname-2": "Smith",
    "Transaction1": "Transfer for value (TR1)",
    "Transaction": "T"
}
  res.redirect('/../transactions/transfer/transfer-tasks')
})

router.get('/docs/examples/pass-data/charge-DTC1', function (req, res) {
	req.session.data = 	      		{
  "reference": "JT/123/CH",
  "title": "LP12345",
  "whole-or-part": "Whole",
  "part": "",
  "Transaction1": "Discharge",
  "PriceInput1": "120000",
  "FeeInput1": "12",
  "Transaction2": "Transfer for value (TR1)",
  "PriceInput2": "120000",
  "FeeInput2": "12",
  "Transaction3": "Charge",
  "PriceInput3": "120000",
  "FeeInput3": "12",
  "add-applicant": "individual",
  "applicant-individual-forename": "John",
  "applicant-individual-surname": "Smith",
  "applicant2-individual-forename-2": "Jane",
  "applicant2-individual-surname-2": "Smith",
  "Transaction": "DTC",
  "dischargemethod": "direct",
  "discharge-method": "Direct",
  "lender-name": "HMLR Lending Co.",
  "applicant-individual-transferee1": [
    "applicant1-transferee-1"
  ],
  "applicant-individual-transferee2": [
    "applicant2-transferee-2"
  ],
  "transfereelistcomplete": "true",
  "transfereerep": "true",
  "transfereeAddressType": "UK-postal",
  "UKpostcode": "",
  "applicant2address": [
    "true"
  ],
  "addressResults": "addressresult4",
  "care-of": "",
  "transfereeAddressType2": "email",
  "add-transferor": "individual",
  "transferor-individual-forename": "Bob",
  "transferor-individual-surname": "Jones",
  "transferor-company-name": "",
  "transferor-company-number": "",
  "transferor-overseas-name": [
    "",
    ""
  ],
  "transferor-overseas-number": "",
  "transferor-overseas-country": "select selected",
  "transferorrep": "true",
  "cert": "Certified",
  "tr1attached": "true",
  "suggested_cert": "Certified",
  "suggested_upload": "true",
  "attached": "true"
}

  res.redirect('/../transactions/charge/tasks')
})


router.get('/docs/examples/pass-data/sole-charge', function (req, res) {
	req.session.data = 	      		{
  "reference": "JT/123/CH",
  "title": "LP12345",
  "whole-or-part": "Whole",
  "part": "",
  "Transaction1": "Discharge",
  "PriceInput1": "120000",
  "FeeInput1": "12",
  "Transaction2": "Transfer for value (TR1)",
  "PriceInput2": "120000",
  "FeeInput2": "12",
  "Transaction3": "Charge",
  "PriceInput3": "120000",
  "FeeInput3": "12",
  "add-applicant": "individual",
  "applicant-individual-forename": "John",
  "applicant-individual-surname": "Smith",
  "applicant2-individual-forename-2": "Jane",
  "applicant2-individual-surname-2": "Smith",
  "Transaction": "C",
  "borrower1": "Joe Bloggs",
  "borrower2": "Jane Bloggs"
}
  res.redirect('/../transactions/charge-without-transfer/charge-without-transfer-tasks')
})

// saved transaction: TR1
router.get('/docs/examples/pass-data/task-list', function (req, res) {
	req.session.data = {
  "reference": "JT/123/TR1",
  "title": "LP12345",
  "whole-or-part": "Whole",
  "part": "",
  "Transaction": "DT",
  "PriceInput1": "250000",
  "FeeInput1": "12",
  "FeeInput2": "0",
  "PriceInput2": "12",
  "Transaction1": "Discharge (DS1)",
  "fee1": "12",
  "Price1": "",
  "Transaction2": "Transfer (TR1)",
  "fee2": "12",
  "Price2": "",
  "Transaction3": "Select a transaction from the list",
  "fee3": "",
  "Price3": "",
  "transferor1": "Spencer Reid",
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
  "applicant-company-number-2": "",
  "transferor1": "Spencer Reid"
}
  res.redirect('/../transactions/tasks')
})

router.get('/docs/examples/pass-data/TC', function (req, res) {
	req.session.data = {
    "reference": "JT/123/CH",
    "title": "LP12345",
    "whole-or-part": "Whole",
    "part": "",
    "Transaction1": "Transfer for value (TR1)",
    "PriceInput1": "120000",
    "FeeInput1": "12",
    "Transaction2": "Charge",
    "PriceInput2": "120000",
    "FeeInput2": "12",
    "Transaction3": "",
    "PriceInput3": "",
    "FeeInput3": "",
    "add-applicant": "individual",
    "applicant-individual-forename": "John",
    "applicant-individual-surname": "Smith",
    "applicant2-individual-forename-2": "Jane",
    "applicant2-individual-surname-2": "Smith",
      "transferor1": "Spencer Reid",
    "Transaction1": "Transfer for value (TR1)",
    "Transaction2": "Charge",
    "Transaction3": "",
    "Transaction": "TC"
}
  res.redirect('/../transactions/charge/TC-tasks')
})

router.get('/testing/addresses', function (req, res) {
	req.session.data = {
    "reference": "JT/123/CH",
    "title": "LP12345",
    "whole-or-part": "Whole",
    "part": "",
    "Transaction1": "Transfer for value (TR1)",
    "PriceInput1": "120000",
    "FeeInput1": "12",
    "Transaction2": "Charge",
    "PriceInput2": "120000",
    "FeeInput2": "12",
    "Transaction3": "",
    "PriceInput3": "",
    "FeeInput3": "",
    "add-applicant": "individual",
    "applicant-individual-forename": "John",
    "applicant-individual-surname": "Smith",
    "applicant2-individual-forename-2": "Jane",
    "applicant2-individual-surname-2": "Smith",
      "transferor1": "Spencer Reid",
    "Transaction1": "Transfer for value (TR1)",
    "Transaction2": "Charge",
    "Transaction3": "",
    "Transaction": "TC",
    "applicant-individual-transferee1": [
      "applicant1-transferee-1"
    ],
    "applicant-individual-transferee2": [
      "applicant2-transferee-2"
    ],
      "transfereelistcomplete": "true",
      "TransfereeRepresentation": "UKConveyancersLtd",
      "transfereerep": "true"
    }
  res.redirect('/transactions/transfer/transfer-tasks')
})

//Assents: sole transaction
router.get('/docs/examples/pass-data/assent', function (req, res) {
	req.session.data = 	      		{
  "reference": "JT/123/CH",
  "title": "LP12345",
  "whole-or-part": "Whole",
  "part": "",
  "Transaction1": "Assent",
  "PriceInput1": "120000",
  "FeeInput1": "12",
  "add-applicant": "individual",
  "applicant-individual-forename": "John",
  "applicant-individual-surname": "Smith",
  "Transaction": "ASSENT",
  "borrower1": "Joe Bloggs",
}
  res.redirect('/transactions/assent/tasks')
})


// // Sprint 26 journey
// // Set data
//
// router.get('/sprint26', function (req, res) {
// 	req.session.data = {
//   "sprint": "true"
// }
//   res.redirect('/sprint-26/consideration/app-start')
// })

// Passing data into a page
router.get('/stored-data', function (req, res) {
	console.log(req.session.data)
  res.render('stored-data')
})


router.post('/enhancements/transactionsSelected', function (req, res) {
  let transaction1 = req.session.data['Transaction1']
  let transaction2 = req.session.data['Transaction2']

  if (transaction1 === 'Transfer for value (TR1, TR5)' && transaction2 === 'Charge'){
    req.session.data['Transaction'] = 'TransferCharge';
    res.redirect('COPY-calculate-fees');
  }
})


// Identifying the transaction type - LAUREN COMMENTING OUT BELOW

router.post('/enhancements/lauren', function (req, res) {
      let transaction1 = req.session.data['Transaction1']
      let transaction2 = req.session.data['Transaction2']
      let transaction3 = req.session.data['Transaction3']

      if (transaction1 === 'Discharge (DS1)' && transaction2 === 'Select a transaction from the list' && transaction3 === 'Select a transaction from the list') {
          req.session.data['Transaction'] = 'D';
          res.redirect('/transactions/add-applicants')

      }   if (transaction1 === 'Transfer for value (TR1)' && transaction2 === 'Select a transaction from the list' && transaction3 === 'Select a transaction from the list') {
            req.session.data['Transaction'] = 'T';
            res.redirect('/transactions/calculate-fees')
// set transaction code
      }  if (transaction1 === 'Charge') {
            req.session.data['Transaction'] = 'C';

            res.redirect('/transactions/calculate-fees');

      }   if (transaction1 === 'Discharge (DS1)' && transaction2 === 'Transfer for value (TR1)' && transaction3 === 'Select a transaction from the list') {
            req.session.data['Transaction'] = 'DT';
            res.redirect('/transactions/calculate-fees')

        } if (transaction1 === 'Discharge (DS1)' && transaction2 === 'Charge' && transaction3 === 'Select a transaction from the list') {
              req.session.data['Transaction'] = 'DC';

              res.redirect('/transactions/calculate-fees')

        }  if (transaction1 === 'Discharge (DS1)' && transaction2 === 'Transfer for value (TR1)' && transaction3 === 'Charge') {
              req.session.data['Transaction'] = 'DTC';
              res.redirect('COPY-calculate-fees');

          } if (transaction1 === 'Transfer for value (TR1)' && transaction2 === 'Charge' && transaction3 === '') {
                  req.session.data['Transaction'] = 'TransferCharge';

                  res.redirect('COPY-calculate-fees');
            }
            if (transaction1 === 'Transfer for value (TR1)' && transaction2 === 'Charge') {
              req.session.data['Transaction'] = 'TC';

              res.redirect('/transactions/calculate-fees');}
            //Assent
            if (transaction1 === 'Assent') {
              req.session.data['Transaction'] = 'ASSENT';

              res.redirect('/transactions/calculate-fees')
        }
})

// Using the transaction type to go to a task list
router.post('/transactions/which-task-list', function (req, res) {
      let transaction = req.session.data['Transaction']
      let sprint = req.session.data['sprint']

      if (transaction === 'DTC') {
          res.redirect('/transactions/charge/tasks')
      } if (transaction === 'C') {
          res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
      } if (transaction === 'T') {
          res.redirect('/transactions/transfer/transfer-tasks')
      } if (transaction === 'DT') {
          res.redirect('/transactions/tasks')
      } if (transaction === 'TC') {
          res.redirect('/transactions/charge/TC-tasks')
      } if (transaction === 'ASSENT') {
          res.redirect('/transactions/assent/tasks')
      }
    })

// Using the transaction type to go to a task list ENHANCEMENTS VERSION
router.post('/enhancements/which-task-list', function (req, res) {
  let transaction = req.session.data['Transaction']
  let sprint = req.session.data['sprint']

  if (transaction === 'DTC') {
      res.redirect('/transactions/charge/tasks')
  } if (transaction === 'C') {
      res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
  } if (transaction === 'T') {
      res.redirect('/transactions/transfer/transfer-tasks')
  } if (transaction === 'DT') {
      res.redirect('/transactions/tasks')
  } if (transaction === 'TransferCharge') {
      res.redirect('/enhancements/Transfer-Charge/tasks-complete-your-application')
  } if (transaction === 'ASSENT') {
      res.redirect('/transactions/assent/tasks')
  }
})

// Charge completed tags

router.post('/transactions/charge-without-transfer/charge-without-transfer-borrower1', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let borrowerDetails1 = req.session.data['solechargeborrowerdetails1']

  if (borrowerDetails1 === 'correct') {
    req.session.data['borrowerDetails1'] = 'Bob Smith';
    res.redirect('charge-without-transfer-borrower-details-2')
}
  if (borrowerDetails1 === 'changed') {
      res.redirect('charge-without-transfer-borrower-change')
    }
    if (borrowerDetails1 === 'removed') {
      req.session.data['borrowerDetails1'] = 'Bob Smith';
        res.redirect('charge-without-transfer-borrower-details-2')
      }
})


router.post('/transactions/charge-without-transfer/charge-without-transfer-borrower2', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let borrowerDetails2 = req.session.data['solechargeborrowerdetails2']

  if (borrowerDetails2 === 'correct') {
    req.session.data['borrowerDetails2'] = 'Jane Smith';
    res.redirect('charge-without-transfer-borrower-list')
}
  if (borrowerDetails2 === 'changed') {
      res.redirect('charge-without-transfer-borrower-change-2')
    }
    if (borrowerDetails2 === 'removed') {
      req.session.data['borrowerDetails2'] = 'Jane Smith';
        res.redirect('charge-without-transfer-borrower-list')
      }
})

router.post('/transactions/charge-without-transfer/MDyes', function (req, res) {
      let mdref = req.session.data['MDreferenceinput']
      if (mdref != '') {
          res.redirect('/transactions/charge-without-transfer/documents/document_prompts')
      } else {
        res.redirect('/transactions/charge-without-transfer/address-for-service/lender-addresstype')
      }
})

router.post('/transactions/charge/MDyes', function (req, res) {
      let mdref = req.session.data['MDreferenceinput']
      if (mdref != '') {
          res.redirect('/transactions/charge/documents/document_prompts')
      } else {
        res.redirect('/transactions/charge/address-for-service/lender-addresstype')
      }
})

router.post('/enhancements/charge/MDyes', function (req, res) {
  let mdref = req.session.data['MDreferenceinput']
  if (mdref != '') {
      res.redirect('/enhancements/charge/documents/document_prompts')
  } else {
    res.redirect('/enhancements/charge/address-for-service/lender-addresstype')
  }
})

router.post('/filterTransactions', function (req, res) {
  let applicationType = req.session.data['application-type']
  let wholeORpart = req.session.data['wholepart']
    if (applicationType === 'update-register' && wholeORpart === 'yes') {
        res.redirect('/enhancements/transactions-updateRegisterWHOLE')
    }
    if (applicationType === 'update-register' && wholeORpart === 'no') {
      res.redirect('/enhancements/transactions-updateRegisterPART')
    }
})



router.post('/transferee-AddressList', function (req, res) {
  let mdref = req.session.data['MDreferenceinput']
  if (mdref != '') {
      res.redirect('/enhancements/charge/documents/document_prompts')
  } else {
    res.redirect('/enhancements/charge/address-for-service/lender-addresstype')
  }
})

router.post('/transactions/charge-without-transfer/borrower-representation-answer', function (req, res) {
      let borrowerRep = req.session.data['Borrower1Representation'] //variable req data from name
      if (borrowerRep === 'NotRepresented') { // if variable equals value
          req.session.data['borrowerReptype'] = 'Not represented'; // set variable to 'Not represented'
          res.redirect('/borrower-verify') // redirect user to verify screen
      } else {
        req.session.data['borrowerReptype'] = 'UK Conveyancers Ltd';
        res.redirect('/transactions/charge-without-transfer/borrower-representation')
      }
})


router.post('/transactions/charge-without-transfer/borrower2-representation-answer', function (req, res) {
      let borrowerRep = req.session.data['Borrower2Representation']
      if (borrowerRep === 'NotRepresented') {
          req.session.data['borrowerReptype2'] = 'Not represented';
          res.redirect('/borrower2-verify')
      } else {
        req.session.data['borrowerReptype2'] = 'UK Conveyancers Ltd';
        res.redirect('/transactions/charge-without-transfer/borrower-representation')
      }
})


    router.post('/transactions/charge-without-transfer/date-complete', function (req, res) {
          req.session.data['chargeDateComplete'] = 'completed';
          res.redirect('/transactions/charge-without-transfer/MDRef')
    })

    router.post('/transactions/charge/date-complete', function (req, res) {
          req.session.data['chargeDateComplete'] = 'completed';
          res.redirect('/transactions/charge/MDRef')
    })



// Transfer completed tags
  // rep
router.post('/transactions/transfer/transferee-representation-confirmed', function (req, res) {

  let transaction = req.session.data['Transaction']
  let transfereerep = req.session.data['transfereerep']


    if (transaction === 'DTC') {
        req.session.data['transfereerep'] = 'true';
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        req.session.data['transfereerep'] = 'true';
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        req.session.data['transfereerep'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['transfereerep'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['transfereerep'] = 'true';
        res.redirect('/transactions/charge/TC-tasks')
    }
    if (transaction === 'TransferCharge') {
      req.session.data['transfereerep'] = 'true';
      res.redirect('/enhancements/transfer/AddAddresses_forServices/transfereeAddressList')
  }
})

  // address
router.post('/transactions/transfer/transferee-address-for-service-complete', function (req, res) {

let transaction = req.session.data['Transaction']

  if (transaction === 'DTC') {
      res.redirect('/transactions/charge/tasks')
  } if (transaction === 'C') {
      res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
  } if (transaction === 'T') {
      res.redirect('/transactions/transfer/transfer-tasks')
  } if (transaction === 'DT') {
      res.redirect('/transactions/tasks')
  } if (transaction === 'TC') {
      res.redirect('/transactions/charge/TC-tasks') }
    if (transaction === 'TransferCharge') {
      req.session.data['transfereeAddressComplete'] = 'true';
      res.redirect('/enhancements/transfer/transferor-list')
    }
})

  // transferor
router.post('/transactions/transfer/add-transferor-complete', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        res.redirect('/transactions/charge/TC-tasks')
        req.session.data['transfereeAddressComplete'] = 'true'; }
  })

  router.post('/declaration-or-provisions', function (req, res) {
    // let spencerAttorneyRep = req.session.data['TransferorRepresentationSpencer-attorney'];
    let individual1 = req.session.data['applicant-individual-transferee1'];
    let individual2 = req.session.data['applicant-individual-transferee2'];

    if (typeof individual1 !== 'undefined' && typeof individual2 !== 'undefined'){
      res.redirect('/enhancements/transfer/transfer-declaration')
    }
    else{
      res.redirect('/enhancements/transfer/transfer-provisions')
    }

  } )

  router.post('/transfereeone-address', function (req, res) {
    // let spencerAttorneyRep = req.session.data['TransferorRepresentationSpencer-attorney'];
    let flat = req.session.data['flat'];
    let houseNumber = req.session.data['house-number'];
    let houseStreet = req.session.data['house-street'];
    let placeName = req.session.data['place-name'];
    let townCity = req.session.data['town-city'];
    let postcode = req.session.data['postcode'];
    let Addresscheckbox1 = req.session.data['transfereeAddress-add'];
    let individual2 = req.session.data['applicant2-individual-forename-2'];

    if (typeof Addresscheckbox1 !== 'undefined'){
      if(typeof individual2 !== 'undefined'){
        req.session.data['transfereeAddressType-2'] = 'UK-postal';
        req.session.data['flat2'] = flat;
        req.session.data['house-number2'] = houseNumber;
        req.session.data['house-street2'] = houseStreet;
        req.session.data['place-name2'] = placeName;
        req.session.data['town-city2'] = townCity;
        req.session.data['postcode2'] = postcode;
      }
    }

    res.redirect('/enhancements/transfer/AddAddresses_forServices/transfereeAddressList')

  } )

  router.post('/transfereetwo-address', function (req, res) {
    // let spencerAttorneyRep = req.session.data['TransferorRepresentationSpencer-attorney'];
    let flat2 = req.session.data['flat2'];
    let houseNumber2 = req.session.data['house-number2'];
    let houseStreet2 = req.session.data['house-street2'];
    let placeName2 = req.session.data['place-name2'];
    let townCity2 = req.session.data['town-city2'];
    let postcode2 = req.session.data['postcode2'];
    let Addresscheckbox2 = req.session.data['transfereeAddress-add2'];
    let individual1 = req.session.data['applicant-individual-forename'];

    if (typeof Addresscheckbox2 !== 'undefined'){
      if(typeof individual1 !== 'undefined'){
        req.session.data['transfereeAddressType-1'] = 'UK-postal';
        req.session.data['flat'] = flat2;
        req.session.data['house-number'] = houseNumber2;
        req.session.data['house-street'] = houseStreet2;
        req.session.data['place-name'] = placeName2;
        req.session.data['town-city'] = townCity2;
        req.session.data['postcode'] = postcode2;
      }
    }

    res.redirect('/enhancements/transfer/AddAddresses_forServices/transfereeAddressList')

  } )


  router.post('/spencer-attorney-1', function (req, res) {
    let Attorney = req.session.data['spencer-attorney-1'];

    let maryIncluded = req.body['also-mary'];
      if (maryIncluded == 'also-mary'){
        req.session.data['mary-attorney-1'] = Attorney;
      }
    res.redirect('/enhancements/transfer/transferor-list')

     } )

  router.post('/mary-attorney-1', function (req, res) {
    let attorney = req.session.data['mary-attorney-1'];

    let spencerIncluded = req.body['also-spencer'];
      if (spencerIncluded == 'also-spencer'){
        req.session.data['spencer-attorney-1'] = attorney;
      }

      res.redirect('/enhancements/transfer/transferor-list')
  })

  router.post('/spencer-representation', function (req, res) {
    // let spencerAttorneyRep = req.session.data['TransferorRepresentationSpencer-attorney'];
    let spencerRepType = req.session.data['TransferorRepresentationSpencer'];
    let spencerRepName = req.session.data['TransferorConveyancerNameSpencer'];
    let representsAll = req.session.data['represents-all'];
    let spencerAttorney = req.session.data['spencer-attorney-1'];
    let maryAttorney = req.session.data['mary-attorney-1'];


    // for this one could use     if (representsAll == 'true') instead
    if (typeof representsAll !== 'undefined'){
      req.session.data['code'] = 'is executing here';
      if(spencerRepType === 'UKConveyancersLtd'){
        req.session.data['TransferorRepresentationMary'] = spencerRepType;
        req.session.data['codee'] = 'is executing here also';
        if (typeof spencerAttorney !== 'undefined'){
        req.session.data['TransferorRepresentationSpencer-attorney'] = spencerRepType;
        }
        if (typeof maryAttorney !== 'undefined'){
          req.session.data['TransferorRepresentationMary-attorney'] = spencerRepType;

        }
      }
      if(spencerRepType === 'OtherConveyancer'){
        req.session.data['TransferorRepresentationMary'] = spencerRepType;
        req.session.data['TransferorConveyancerNameMary'] = spencerRepName;

        if (typeof maryAttorney !== 'undefined'){
          req.session.data['TransferorRepresentationMary-attorney'] = spencerRepType;
          req.session.data['TransferorConveyancerNameMary-attorney'] = spencerRepName;
        }

        if (typeof spencerAttorney !== 'undefined'){
          req.session.data['TransferorConveyancerNameSpencer-attorney'] = spencerRepName;
          req.session.data['TransferorRepresentationSpencer-attorney'] = spencerRepType;
        }


      }
    }

    res.redirect('/enhancements/transfer/transferor-representation')

  } )

  router.post('/mary-representation', function (req, res) {
    // let spencerAttorneyRep = req.session.data['TransferorRepresentationSpencer-attorney'];
    let maryRepType = req.session.data['TransferorRepresentationMary'];
    let maryRepName = req.session.data['TransferorConveyancerNameMary'];
    let representsAll = req.session.data['represents-all'];
    let spencerAttorney = req.session.data['spencer-attorney-1'];
    let maryAttorney = req.session.data['mary-attorney-1'];


    // for this one could use     if (representsAll == 'true') instead
    if (typeof representsAll !== 'undefined'){
      req.session.data['code'] = 'is executing here';
      if(maryRepType === 'UKConveyancersLtd'){
        req.session.data['TransferorRepresentationSpencer'] = maryRepType;
        req.session.data['codee'] = 'is executing here also';
        if (typeof spencerAttorney !== 'undefined'){
        req.session.data['TransferorRepresentationSpencer-attorney'] = maryRepType;
        }
        if (typeof maryAttorney !== 'undefined'){
          req.session.data['TransferorRepresentationMary-attorney'] = maryRepType;

        }
      }
      if(maryRepType === 'OtherConveyancer'){
        req.session.data['TransferorRepresentationSpencer'] = maryRepType;
        req.session.data['TransferorConveyancerNameSpencer'] = maryRepName;

        if (typeof maryAttorney !== 'undefined'){
          req.session.data['TransferorConveyancerNameMary-attorney'] = maryRepName;
          req.session.data['TransferorRepresentationMary-attorney'] = maryRepType;
        }

        if (typeof spencerAttorney !== 'undefined'){
          req.session.data['TransferorRepresentationSpencer-attorney'] = maryRepType;
          req.session.data['TransferorConveyancerNameSpencer-attorney'] = maryRepName;
        }
      }
    }

    res.redirect('/enhancements/transfer/transferor-representation')

  } )

  router.post('/spencer-attorney-representation', function (req, res) {
    // let spencerAttorneyRep = req.session.data['TransferorRepresentationSpencer-attorney'];
    let spencerAttorneyRepType = req.session.data['TransferorRepresentationSpencer-attorney'];
    let spencerAttorneyRepName = req.session.data['TransferorConveyancerNameSpencer-attorney'];
    let representsAll = req.session.data['represents-all'];
    let spencerAttorney = req.session.data['spencer-attorney-1'];
    let maryAttorney = req.session.data['mary-attorney-1'];

    if(typeof maryAttorney !== 'undefined'){
      if(spencerAttorney === maryAttorney){
        req.session.data['TransferorRepresentationMary-attorney'] = spencerAttorneyRepType;
        if(spencerAttorneyRepType === 'OtherConveyancer'){
          req.session.data['TransferorConveyancerNameMary-attorney'] = spencerAttorneyRepName;
        }
      }
    }

    // for this one could use     if (representsAll == 'true') instead
    if (typeof representsAll !== 'undefined'){
      req.session.data['code'] = 'is executing here';
      if(spencerAttorneyRepType === 'UKConveyancersLtd'){
        req.session.data['codee'] = 'is executing here also';
        req.session.data['TransferorRepresentationMary'] = spencerAttorneyRepType;
        req.session.data['TransferorRepresentationSpencer'] = spencerAttorneyRepType;

        if (typeof maryAttorney !== 'undefined'){
          req.session.data['TransferorRepresentationMary-attorney'] = spencerAttorneyRepType;
        }
      }
      if(spencerAttorneyRepType === 'OtherConveyancer'){
        req.session.data['TransferorRepresentationMary'] = spencerAttorneyRepType;
        req.session.data['TransferorConveyancerNameMary'] = spencerAttorneyRepName;

        req.session.data['TransferorRepresentationSpencer'] = spencerAttorneyRepType;
        req.session.data['TransferorConveyancerNameSpencer'] = spencerAttorneyRepName;

        if (typeof maryAttorney !== 'undefined'){
          req.session.data['TransferorRepresentationMary-attorney'] = spencerAttorneyRepType;
          req.session.data['TransferorConveyancerNameMary-attorney'] = spencerAttorneyRepName;         }

      }
    }
    res.redirect('/enhancements/transfer/transferor-representation')

  } )

  router.post('/mary-attorney-representation', function (req, res) {
    // let spencerAttorneyRep = req.session.data['TransferorRepresentationSpencer-attorney'];
    let maryAttorneyRepType = req.session.data['TransferorRepresentationMary-attorney'];
    let maryAttorneyRepName = req.session.data['TransferorConveyancerNameMary-attorney'];
    let representsAll = req.session.data['represents-all'];
    let spencerAttorney = req.session.data['spencer-attorney-1'];
    let maryAttorney = req.session.data['mary-attorney-1'];

    if(typeof maryAttorney !== 'undefined'){
      if(spencerAttorney === maryAttorney){
        req.session.data['TransferorRepresentationMary-attorney'] = maryAttorneyRepType;
        if(maryAttorneyRepType === 'OtherConveyancer'){
          req.session.data['TransferorConveyancerNameMary-attorney'] = maryAttorneyRepName;
        }
      }
    }

    // for this one could use     if (representsAll == 'true') instead
    if (typeof representsAll !== 'undefined'){
      req.session.data['code'] = 'is executing here';
      if(maryAttorneyRepType === 'UKConveyancersLtd'){
        req.session.data['codee'] = 'is executing here also';
        req.session.data['TransferorRepresentationMary'] = maryAttorneyRepType;
        req.session.data['TransferorRepresentationSpencer'] = maryAttorneyRepType;

        if (typeof maryAttorney !== 'undefined'){
          req.session.data['TransferorRepresentationMary-attorney'] = maryAttorneyRepType;
        }
      }
      if(maryAttorneyRepType === 'OtherConveyancer'){
        req.session.data['TransferorRepresentationMary'] = maryAttorneyRepType;
        req.session.data['TransferorConveyancerNameMary'] = maryAttorneyRepName;

        req.session.data['TransferorRepresentationSpencer'] = maryAttorneyRepType;
        req.session.data['TransferorConveyancerNameSpencer'] = maryAttorneyRepName;

        if (typeof spencerAttorney !== 'undefined'){
          req.session.data['TransferorRepresentationSpencer-attorney'] = maryAttorneyRepType;
          req.session.data['TransferorConveyancerNameSpencer-attorney'] = maryAttorneyRepName;         }

      }
    }
    res.redirect('/enhancements/transfer/transferor-representation')

  } )


  // rep
router.post('/transactions/transfer/transferor-details-complete', function (req, res) {

  let transaction = req.session.data['Transaction']
  let transferorComplete = req.session.data['transferorComplete']


    if (transaction === 'DTC') {
        req.session.data['transferorComplete'] = 'true';
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        req.session.data['transferorComplete'] = 'true';
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        req.session.data['transferorComplete'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['transferorComplete'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['transferorComplete'] = 'true';
        res.redirect('/transactions/charge/TC-tasks') }
      if (transaction === 'TransferCharge') {
        req.session.data['add-transferor'] = 'true';
        res.redirect('/enhancements/transfer/transferor-representation') }
})


router.post('/enhancements/transfer/dateConfirmed', function (req, res) {
  req.session.data['transfer-date'] = 'true';
  res.redirect('/enhancements/transfer/transfer-guarantee')

})

  // transferor rep
router.post('/transactions/transfer/transferor-representation-confirmed', function (req, res) {

let transaction = req.session.data['Transaction']

if (transaction === 'DTC') {
    req.session.data['transferorrep'] = 'true';
    res.redirect('/transactions/charge/tasks')
} if (transaction === 'C') {
    req.session.data['transferorrep'] = 'true';
    res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
} if (transaction === 'T') {
    req.session.data['transferorrep'] = 'true';
    res.redirect('/transactions/transfer/transfer-tasks')
} if (transaction === 'DT') {
    req.session.data['transferorrep'] = 'true';
    res.redirect('/transactions/tasks')
} if (transaction === 'TC') {
    req.session.data['transferorrep'] = 'true';
    res.redirect('/transactions/charge/TC-tasks') }
  if (transaction === 'TransferCharge') {
    req.session.data['transferorrep'] = 'true';
    res.redirect('/transactions/charge/TC-tasks') }
})



  // transferor rep
  // router.post('/enhancements/transfer/spencer-representation-page', function (req, res) {
  //       res.redirect('/enhancements/transfer/transferor-representation');
  //   })

  // docs attached
router.post('/transactions/transfer/documents/attached-required-documents', function (req, res) {
  let transaction = req.session.data['Transaction']

  if (transaction === 'DTC') {
      req.session.data['attached'] = 'true';
      res.redirect('/transactions/charge/tasks')
  } if (transaction === 'C') {
      req.session.data['attached'] = 'true';
      res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
  } if (transaction === 'T') {
      req.session.data['attached'] = 'true';
      res.redirect('/transactions/transfer/transfer-tasks')
  } if (transaction === 'DT') {
      req.session.data['attached'] = 'true';
      res.redirect('/transactions/tasks')
  } if (transaction === 'TC') {
      req.session.data['attached'] = 'true';
      res.redirect('/transactions/charge/TC-tasks') }
})

router.post('/enhancements/attachedDocuments', function (req, res) {
    req.session.data['attached'] = 'true';
    res.redirect('/enhancements/Transfer-Charge/tasks-complete-your-application')
})


// transfer date
router.post('/transactions/transfer-date-complete', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        req.session.data['transfer-date-complete'] = 'true';
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        req.session.data['transfer-date-complete'] = 'true';
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        req.session.data['transfer-date-complete'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['transfer-date-complete'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['transfer-date-complete'] = 'true';
        res.redirect('/transactions/charge/TC-tasks') }
})


// transfer declaration
router.post('/transactions/transfer-declaration-complete', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        req.session.data['transfer-declaration-complete'] = 'true';
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        req.session.data['transfer-declaration-complete'] = 'true';
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        req.session.data['transfer-declaration-complete'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['transfer-declaration-complete'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['transfer-declaration-complete'] = 'true';
        res.redirect('/transactions/charge/TC-tasks') }
})

// transfer title guarantee
router.post('/transactions/transfer/guarantee-complete', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        req.session.data['title-guarantee-complete'] = 'true';
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        req.session.data['title-guarantee-complete'] = 'true';
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        req.session.data['title-guarantee-complete'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['title-guarantee-complete'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['title-guarantee-complete'] = 'true';
        res.redirect('/transactions/charge/TC-tasks') }
})

// transfer  download
router.post('/enhancements/transfer/downloaded', function (req, res) {
  req.session.data['download'] = 'true';
  res.redirect('/transactions/charge/tasks')

})


// transfer  download
router.post('/transactions/transfer/downloaded', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        req.session.data['download'] = 'true';
        res.redirect('/transactions/charge/tasks')
    }   if (transaction === 'T') {
        req.session.data['download'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['download'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['download'] = 'true';
        res.redirect('/transactions/charge/TC-tasks')
    } if (transaction === 'ASSENT') {
        req.session.data['download'] = 'true';
        res.redirect('/transactions/assent/tasks')
      }

})

// transfer title guarantee
router.post('/transactions/transfer/guarantee-complete', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        req.session.data['title-guarantee'] = 'true';
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        req.session.data['title-guarantee'] = 'true';
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        req.session.data['title-guarantee'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['title-guarantee'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['title-guarantee'] = 'true';
        res.redirect('/transactions/charge/TC-tasks') }
})

// consideration complete
router.post('/task-consideration-complete', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        req.session.data['transfer-consideration'] = 'true';
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        req.session.data['transfer-consideration'] = 'true';
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        req.session.data['transfer-consideration'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['transfer-consideration'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['transfer-consideration'] = 'true';
        res.redirect('/transactions/charge/TC-tasks') }
})

// provisions complete
router.post('/transfer-provisions-complete', function (req, res) {

  let transaction = req.session.data['Transaction']

    if (transaction === 'DTC') {
        req.session.data['transfer-provisions'] = 'true';
        res.redirect('/transactions/charge/tasks')
    } if (transaction === 'C') {
        req.session.data['transfer-provisions'] = 'true';
        res.redirect('/transactions/charge-without-transfer/charge-without-transfer-tasks')
    } if (transaction === 'T') {
        req.session.data['transfer-provisions'] = 'true';
        res.redirect('/transactions/transfer/transfer-tasks')
    } if (transaction === 'DT') {
        req.session.data['transfer-provisions'] = 'true';
        res.redirect('/transactions/tasks')
    } if (transaction === 'TC') {
        req.session.data['transfer-provisions'] = 'true';
        res.redirect('/transactions/charge/TC-tasks') }
})




router.post('/transactions/transfer/documents/TR1-attached', function (req, res) {
  req.session.data['tr1attached'] = 'true';
    res.redirect('document_prompts-1')
})

router.post('/enhancements/transfer/documents/TR1attached', function (req, res) {
  req.session.data['tr1attached'] = 'true';
    res.redirect('document_prompts-1')
})

router.post('/enhancements/transfer/documents/POAMaryattached', function (req, res) {
  req.session.data['poaMaryattached'] = 'true';
    res.redirect('document_prompts-1')
})

router.post('/enhancements/transfer/documents/POASpencerattached', function (req, res) {
  req.session.data['poaSpencerattached'] = 'true';
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


// transferee address 1
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

// transferee address 2

router.post('/transactions/transfer/address2/overseasAddress', function (req, res) {
    res.redirect('/transactions/transfer/transfereeAddressList')
})

router.post('/transactions/transfer/address2/UKAddress', function (req, res) {
    res.redirect('/transactions/transfer/transfereeAddressList')
})


router.post('/transactions/transfer/address2/POboxAddress', function (req, res) {
    res.redirect('/transactions/transfer/transfereeAddressList')
})

router.post('/transactions/transfer/address2/emailAddress', function (req, res) {
    res.redirect('/transactions/transfer/transfereeAddressList')
})

router.post('/transactions/transfer/address2/DXAddress', function (req, res) {
    res.redirect('/transactions/transfer/transfereeAddressList')
})

router.post('/transactions/transfer/address2/BFPOAddress', function (req, res) {
    res.redirect('/transactions/transfer/transfereeAddressList')
})

router.post('/transactions/discharge/discharge-attached', function (req, res) {
  let transaction3 = req.session.data['Transaction3']
  if (transaction3 != ''){
  req.session.data['dischargeAttached'] = 'true';
      res.redirect('/transactions/charge/tasks')
  } else {
  req.session.data['dischargeAttached'] = 'true';
    res.redirect('/../transactions/tasks') }
})


// Transferee list to task list

router.post('/transferee-list-complete', function (req, res) {
  let transaction1 = req.session.data['Transaction1']
  let transaction = req.session.data['Transaction']

  if (transaction === 'DTC') {
      req.session.data['transfereelistcomplete'] = 'true';
      res.redirect('/transactions/charge/tasks')
  } if (transaction === 'T') {
      req.session.data['transfereelistcomplete'] = 'true';
      res.redirect('/transactions/transfer/transfer-tasks')
  } if (transaction === 'DT') {
      req.session.data['transfereelistcomplete'] = 'true';
      res.redirect('/transactions/tasks')
  } if (transaction === 'TC') {
      req.session.data['transfereelistcomplete'] = 'true';
      res.redirect('/transactions/charge/TC-tasks')
  }
  if (transaction === 'TransferCharge') {
    req.session.data['transfereelistcomplete'] = 'true';
    res.redirect('/enhancements/transfer/transferee-representation');
}
})

router.post('/transactions/transfer/transferee-whichapplicants-answer', function (req, res){
  req.session.data["transfereesnone"]
})

// router.post('/transactions/transfer/select-transferees-confirmed', function (req, res) {
//   req.session.data['transfereesConfirmed'] = 'true';
//     res.redirect('/../transactions/tasks')
// })


// Charge documents/tags
router.post('/transactions/charge-without-transfer/documents/Mortgage-attached', function (req, res) {
  req.session.data['mortgageAttached'] = 'true';
    res.redirect('document_prompts')
})

router.post('/transactions/charge/documents/Mortgage-attached', function (req, res) {
  req.session.data['mortgageAttached'] = 'true';
    res.redirect('/transactions/charge/documents/document_prompts')
})

router.post('/enhancements/charge/documents/Mortgage-attached', function (req, res) {
  req.session.data['mortgageAttached'] = 'true';
    res.redirect('/enhancements/charge/documents/document_prompts')
})

router.post('/transactions/charge-without-transfer/documents/evidence-attached', function (req, res) {
  req.session.data['certificateAttached'] = 'true';
    res.redirect('document_prompts')
})

router.post('/transactions/charge/documents/evidence-attached', function (req, res) {
  req.session.data['certificateAttached'] = 'true';
    res.redirect('document_prompts')
})

router.post('/enhancements/charge/documents/evidence-attached', function (req, res) {
  req.session.data['certificateAttached'] = 'true';
    res.redirect('document_prompts')
})

router.post('/transactions/charge-without-transfer/documents/RX1-attached', function (req, res) {
  req.session.data['RX1Attached'] = 'true';
    res.redirect('document_prompts')
})

router.post('/transactions/charge/documents/RX1-attached', function (req, res) {
  req.session.data['RX1Attached'] = 'true';
    res.redirect('/charge/documents/document_prompts')
})

router.post('/transactions/charge-without-transfer/documents/CH2-attached', function (req, res) {
  req.session.data['CH2Attached'] = 'true';
    res.redirect('document_prompts')
})

router.post('/transactions/charge/documents/CH2-attached', function (req, res) {
  req.session.data['CH2Attached'] = 'true';
    res.redirect('/charge/documents/document_prompts')
})





// TR1 enhancement - routing
//
// router.post('/transactions/transfer/check-transferees', function (req, res) {
//   let transaction3 = req.session.data['Transaction3']
//   if (transaction3 != ''){
//   req.session.data['dischargeAttached'] = 'true';
//       res.redirect('/transactions/charge/tasks')
//   } else {
//   req.session.data['dischargeAttached'] = 'true';
//     res.redirect('/../transactions/tasks') }

// Back links

router.post('/transactions/charge-without-transfer/back-link-borrower', function (req, res) {
  req.session.data['borrowerDetails1'] = '';
    res.redirect('transactions/charge-tasks')
})

module.exports = router


// Borrowers flow - Charge without transfer

// Checking if borrower name needs to be removed or amended
router.post('/transactions/charge-without-transfer/charge-without-transfer-details', function (req, res) {

  let amendBorrowerName1 = req.session.data['amendBorrowerName1']

  if (amendBorrowerName1 === 'amended') {
    req.session.data['Borrower1Status'] = 'amended'; //setting variable for borrower1Status to check for amended
    res.redirect('charge-without-transfer-borrower-change')
}
  if (amendBorrowerName1 === 'removed') {
      req.session.data['Borrower1Status'] = 'removed'; //setting variable for borrower1Status to check for removed
      res.redirect('charge-without-transfer-borrower-list')
    }
})


router.post('/DTC-CheckMD', function (req, res) {
  let mdRef = req.session.data['mdRef']

  if (mdRef !== '') {
    res.redirect('/transactions/application-reviews/DischargeTransferCharge-MD.html')
} else {
      res.redirect('index.html')
    }
})



// document checklist
router.post('/discharge-checklist-true', function (req, res) {
  req.session.data['discharge-checklist'] = 'true';
    res.redirect('transactions/discharge/discharge-documents')
})

router.post('/transfer-checklist-true', function (req, res) {
  req.session.data['transfer-checklist'] = 'true';
    res.redirect('/transactions/transfer/documents/document_prompts-1.html')
})

router.post('/enhancements/transfer-checklist', function (req, res) {
  req.session.data['transfer-checklist'] = 'true';
    res.redirect('/enhancements/transfer/documents/document_prompts-1.html')
})

router.post('/charge-checklist-true', function (req, res) {
  req.session.data['charge-checklist'] = 'true';
    res.redirect('/transactions/charge/documents/document_prompts')
})


// Borrower names
// Display borrower names
// Option to change / remove borrower name
// Fontend confirmation of name change / removal
// pull the name through to the borrower rep screen
// If a name has been removed change link to "undo remove"

// router.post('/charge-without-transfer-borrower-list-set', function (req, res){
//
//   let borrower1 = req.session.data['borrower1']
//
//   req.session.data['borrower1'] = 'Joe Bloggs';
//
//   res.redirect('/transactions/charge-without-transfer-borrower-list')
// })

// // Borrower 1 'Remove'
//
// router.post('/transactions/charge-without-transfer/charge-without-transfer-borrower1-amendremove', function (req, res){
//
//
// })


router.get('/docs/examples/pass-data/transfer1', function (req, res) {
	req.session.data = 	      		{
  "transferor1": "Joe Bloggs",
  "transferor2": "Jane Bloggs"
}
  res.redirect('/../Sprint-24/transfer/task-list')
})


// Checking if transferor name needs to be removed or amended
router.post('/transferor-amend-remove', function (req, res) {

  let amendTransferor = req.session.data['amendTransferorName1']

  if (amendTransferor === 'amended') {
    req.session.data['Transferor1Status'] = 'amended'; //setting variable for transferor1Status to check for amended
    res.redirect('/transactions/transfer/names/change')
}
  if (amendTransferor === 'removed') {
      req.session.data['Transferor1Status'] = 'removed'; //setting variable for transferor1Status to check for removed
      res.redirect('/transferor-list')
    }
})


// wes yes no answer
router.post('/wes-yes-no-answer', function (req, res) {

  let wesAnswer = req.session.data['wesAnswer']

  if (wesAnswer === 'yes') {
    req.session.data['wesYesNoAnswer'] = 'yes';
    res.redirect('/testing/wes/wes-doc-prompt')
}
  if (wesAnswer === 'no') {
    req.session.data['wesYesNoAnswer'] = 'no';
      res.redirect('/testing/wes/task-list-dtc.html')
    }
})


//Assent: navigation

router.post('/transactions/assent/deceased-proprietor-confirmation', function (req, res) {
  req.session.data['deceasedProprietor1'] = 'completed';
  res.redirect('/transactions/assent/add-representative')
})

//Assent: confirm date
router.post('/transactions/assent/assent-date-confirmation', function (req, res) {
  req.session.data['charge-date'] = 'completed';
  res.redirect('/transactions/assent/title-guarantee')
})

//Assent: title guarantee
router.post('/transactions/assent/guarantee-complete', function (req, res) {
  req.session.data['chargeDateComplete'] = 'completed'; //???
  res.redirect('/transactions/assent/declaration-of-trust')
})

//Assent: address for service
router.post('/transactions/assent/transferee-address-for-service-complete', function (req, res) {
  req.session.data['chargeDateComplete'] = 'completed'; //???
  res.redirect('/transactions/assent/confirm-date')
})

//Assent: declaration of trust
router.post('/transactions/assent/declaration-complete', function (req, res) {
  req.session.data['chargeDateComplete'] = 'completed'; //???
  res.redirect('/transactions/assent/additional-provisions')
})

router.post('/transactions/assent/declaration-complete', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let over18 = req.session.data['over-18']

  if (over18 === 'false') {
    res.redirect('/docs/examples/branching/under-18')
  } else {
    res.redirect('/docs/examples/branching/over-18')
  }
})



// Assent: select/add transferees
router.post('/transactions/assent/transferee-whichapplicants-answer', function (req, res) {

  let applicantTransferee1 = req.session.data['applicant-individual-forename'];
  let applicantTransferee2 = req.session.data['applicant2-individual-forename-2'];

  var checkboxTicked1
  var checkboxTicked2

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

  if ((checkboxTicked1 === true) || (checkboxTicked2 === true)) {
    res.redirect('/transactions/assent/transferee-list')
  } else {
    res.redirect('/transactions/assent/add-transferee')
  }
  })

//Assent: transferee list
router.post('/transactions/assent/transferee-list-complete', function (req, res) {
  req.session.data['applicant-individual-forename'];
  res.redirect('/transactions/assent/transferee-representationAdd')
  })


//Assent: transferee representation
router.post('/transactions/assent/transferee-representation-confirmed', function (req, res) {
  req.session.data['applicant-individual-forename'];
  res.redirect('/transactions/assent/transfereeAddressList')
  })

//Assent: transferee address playback
router.post('/transactions/assent/transferee-address-answer', function (req, res) {

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

// Is the user a conveyancer? - removed temporarily for MT testing
// router.post('/setup/user-type-answer', function (req, res) {
//   let userType = req.session.data['user-type'];
//   res.redirect('/setup/enter-title')
//   if (userType === 'conveyancer') {
//       req.session.data['user-type'] = 'conveyancer';
//   } else {
//     req.session.data['user-type'] = 'non-conveyancer';
//   }
// })



// Multi-titles whole or part


router.post('/wholepart-answer', function (req, res) {
  let wholepart = req.session.data['wholepart'];

  if (wholepart === 'yes') {
      res.redirect('/Sprint-38/multi-titles/summary')
  } else {
    res.redirect('/Sprint-38/multi-titles/part')

  }
})

router.post('/multi-titles_answer', function (req, res) {
  let wholepart = req.session.data['wholepart'];

  if (wholepart === 'yes') {
      res.redirect('/setup/summary')
  } else {
    res.redirect('/setup/multi-titles_part')

  }
})


// transferor details linear set existing names
router.post('/start-transferors', function (req,res) {

  req.session.data = 	      		{
  "transferor-1-name": "John Smith",
  "transferor-2-name": "Globex UK",
  "transferor-3-name": "Globex Global",
  "transferor-4-name": "Globex Corporation Charity Endeavour",
  }

  res.redirect('/../Sprint-43/linear/tasks')
  })

  // transferor details linear set existing names
  router.post('/complete-tasks', function (req,res) {

    req.session.data = 	      		{
    "transferorComplete": "true"
    }

    res.redirect('/../Sprint-43/linear/tasks')
    })

    // transferor details simplify set existing names
    router.post('/transferor-details-b', function (req,res) {

      req.session.data = 	      		{
      "show-individual": "TRUE",
      "individual": "Joseph R. Bloggs",
      "uk_comp": "UK Conveyancing and Legal Services Limited",
      "uk_comp-number": "123456789",
      "int_comp": "International Conveyancing and Legal Services Limited",
      "int_comp-number": "234567891",
      "int_comp-territory": "UNITED STATES OF AMERICA",
      "other_org": "Community Trust for the Protection of Pets",
      }

      res.redirect('/../Sprint-43/simplify/tasks')
      })

      // transferor details simplify hide individual
      router.post('/hide-transferor-individual', function (req, res) {
        req.session.data['show-individual'] = 'FALSE';
          res.redirect('/../Sprint-43/simplify/transferor-list-1')
      })


// restriction form selector
router.post('/restriction-form', function (req, res) {

let form = req.session.data['form']

//  if (form === 'Form A (Restriction on dispositions by sole proprietor)') {
//      res.redirect('/restrictions/formA-nature')
//      }
  if (form === 'Form P (Disposition by registered proprietor of registered estate or proprietor of charge – consent of proprietor of specified charge or certificate required)') {
      res.redirect('/restrictions/formP-consent')
      }
  if (form === 'Form L (Disposition by registered proprietor of a registered estate or proprietor of charge – certificate required)') {
      res.redirect('/restrictions/L/certification')
      }
})



// Form P consent branching
router.post('/formP-consent-answer', function (req, res) {

let consent = req.session.data['P-consent']

  if (consent === 'consent-required') {
      res.redirect('/restrictions/FormP-period')
      }
  if (consent === 'consent-included') {
     res.redirect('/restrictions/formP-certificate-name')
      }
  if (consent === 'consent-not-included') {
    res.redirect('/restrictions/FormP-period')
      }
})

// Form P address for Service
router.post('/formP-addresstype-answer', function (req, res) {

  let certificateAddress = req.session.data['certificateAddressType']

  if (certificateAddress === 'UK-postal') {
    res.redirect('restrictions/formP-address-UK')
    }
  if (certificateAddress === 'Overseas-postal') {
      res.redirect('Overseas')
    }
  if (certificateAddress === 'PO-box') {
      res.redirect('PO')
    }
  if (certificateAddress === 'email') {
      res.redirect('email')
    }
  if (certificateAddress === 'DX') {
      res.redirect('DX')
    }
  if (certificateAddress === 'BFPO') {
      res.redirect('BFPO')
    }
  })

  // Form L certification branching
  router.post('/certification-answer', function (req, res) {

  let certification = req.session.data['L-Certification']

  if (certification === 'conveyancer') {
    res.redirect('/restrictions/L/limitation')
  }
  if (certification === 'single') {
    res.redirect('/restrictions/L/signatory-sole')
  }
  if (certification === 'two-named') {
    res.redirect('/restrictions/L/signatory-1')
  }
  if (certification === 'one-of-two') {
    res.redirect('/restrictions/L/signatory-1')
  }

  })

  // Form L 1st Signatory address answer
  router.post('/signatory1-addresstype-answer', function (req, res) {

    let signatoryAddress = req.session.data['signatory1AddressType']

    if (signatoryAddress === 'UK-postal') {
      res.redirect('/restrictions/L/Signatory-1-UK')
      }
    if (signatoryAddress === 'Overseas-postal') {
        res.redirect('Overseas')
      }
    if (signatoryAddress === 'PO-box') {
        res.redirect('PO')
      }
    if (signatoryAddress === 'email') {
        res.redirect('email')
      }
    if (signatoryAddress === 'DX') {
        res.redirect('DX')
      }
    if (signatoryAddress === 'BFPO') {
        res.redirect('BFPO')
      }
    })

    // Form L limitation answer
    router.post('/limitation-answer', function (req, res) {

      let limitation = req.session.data['limitation']

      if (limitation === 'death of one person') {
        res.redirect('/restrictions/L/limitation-sole')
        }
      if (limitation === 'death of survivor') {
        res.redirect('/restrictions/L/death-of-survivor-infill')
        }
      if (limitation === 'limitation date') {
        res.redirect('/restrictions/L/date-infills')
        }
      if (limitation === 'no limitation') {
        res.redirect('/restrictions/L/no-limitation-infills')
        }


      })

// Single journey branching from titles
  router.post('/titles-branching', function (req, res) {

    let transaction1 = req.session.data['Transaction1']

    if (transaction1 === 'Transfer for value (TR1)') {
      res.redirect('single-journey/calculate-fee');
    } else {
      res.redirect('single-journey/document_prompts-1');
    }
  })

  router.post('/startpage-testing/lease-extension/application-type', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    const ApplicationType = req.session.data['Application-type']

    switch (ApplicationType) {

      case 'register-updates':
        res.redirect('/startpage-testing/lease-extension/register-updates/enter_titles-0');
        break;

      case 'transfer-of-part':
        res.redirect('/startpage-testing/lease-extension/transfer-part/enter_titles-0');
        break;

      case 'new-lease':
        res.redirect('/startpage-testing/lease-extension/new-lease/enter_titles-0');
        break;

      case 'lease-extension':
        res.redirect('/startpage-testing/lease-extension/lease-extension/enter_titles-0');
        break;

      case 'FormA':
        res.redirect('/startpage-testing/lease-extension/JP1/enter_title');
        break;

    }

  })

  router.post('/startpage-testing/MMP/application-type', function (req, res) {
    // Get the answer from session data
    // The name between the quotes is the same as the 'name' attribute on the input elements
    // However in JavaScript we can't use hyphens in variable names

    const ApplicationType = req.session.data['Application-type']

    switch (ApplicationType) {

      case 'register-updates':
        res.redirect('/startpage-testing/MMP/register-updates/enter_titles-0');
        break;

      case 'transfer-of-part':
        res.redirect('/startpage-testing/MMP/transfer-part/enter_titles-0');
        break;

      case 'new-lease':
        res.redirect('/startpage-testing/MMP/new-lease/enter_titles-0');
        break;

      case 'lease-extension':
        res.redirect('/startpage-testing/MMP/lease-extension/enter_titles-0');
        break;

      case 'FormA':
        res.redirect('/startpage-testing/MMP/JP1/enter_title');
        break;

    }

  })

  // branching from titles
    router.post('/startpage-testing/MMP/transfer-part/TP-transactions', function (req, res) {

      let transactionMMP = req.session.data['TransactionMMP']

      if (transactionMMP === 'new lease') {
        res.redirect('*');
      } else {
        res.redirect('/startpage-testing/MMP/transfer-part/add-applicants');
      }
    })
