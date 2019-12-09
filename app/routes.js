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

  let applicanttransferee = req.session.data['transferee-select']

  if (applicanttransferee === 'yes') {
    res.redirect('/transactions/transfer/transferee-list')
  } else {
    res.redirect('/transactions/transfer/add-transferee')
  }
})

module.exports = router
