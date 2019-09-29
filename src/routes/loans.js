const express = require('express');
const router = express.Router();

// Models
const Loan = require('../models/Loan');

// Helpers
const { isAuthenticated } = require('../helpers/auth');

// New Note
router.get('/loans/add', isAuthenticated, (req, res) => {
  res.render('partials/new-loans');
});

router.post('/loans/new-loans', isAuthenticated, async (req, res) => {
  const { loan, description } = req.body;
  const errors = [];
  if (!loan) {
    errors.push({text: 'Por favor digita el valor'});
  }
  if (!description) {
    errors.push({text: 'Por favor escribe porque quieres el prestamo'});
  }
  if (errors.length > 0) {
    res.render('partials/new-loans', {
      errors,
      loan,
      description
    });
  } else {
    const newLoan = new Loan({loan, description});
    newLoan.user = req.user.id;
    await newLoan.save();
    req.flash('success_msg', 'Prestamo agregado con éxito');
    res.redirect('/loans');
  }
});

// Get All Notes
router.get('/loans', isAuthenticated, async (req, res) => {
  const loans = await Loan.find({user: req.user.id}).sort({date: 'desc'});
  res.render('partials/all-loans', { loans });
});

// Edit Notes
router.get('/loans/edit/:id', isAuthenticated, async (req, res) => {
  const loan = await Loan.findById(req.params.id);
  if(loan.user != req.user.id) {
    req.flash('error_msg', 'No estas autorizado');
    return res.redirect('/loans');
  } 
  res.render('partials/edit-loan', { loan });
});

router.put('/loans/edit-loan/:id', isAuthenticated, async (req, res) => {
  const { loan, description } = req.body;
  await Loan.findByIdAndUpdate(req.params.id, {loan, description});
  req.flash('success_msg', 'Prestamo actualizado con écito');
  res.redirect('/loans');
});

// Delete Notes
router.delete('/loans/delete/:id', isAuthenticated, async (req, res) => {
  await Loan.findByIdAndDelete(req.params.id);
  req.flash('success_msg', 'Prestamo borrado satisfactoriamente');
  res.redirect('/loans');
});

module.exports = router;