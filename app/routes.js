const express = require('express')
const router = express.Router()
const path = require('path')

// Add your routes here - above the module.exports line
router.use('/node_modules', express.static('node_modules'))

// post(route, callback(request, response) {
//     response.render(template, data);
// });

// 
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


module.exports = router
