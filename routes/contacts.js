const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contact = require('../models/Contact');

//  @route      GET api/contacts
//  @desc       get user contacts
//  @access     Private
const serverError = (err, res) => {
  console.error(err.message);
  res.status(500).json({ msg: 'Server Error' });
};
router.get('/', auth, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({
      date: -1
    });
    res.json(contacts);
  } catch (error) {
    serverError(error);
  }
});

//  @route      POST api/contacts
//  @desc       add new contact
//  @access     Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;
    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        type,
        user: req.user.id
      });
      const contact = await newContact.save();
      res.json(contact);
    } catch (error) {
      serverError(error);
    }
  }
);

//  @route      PUT api/contacts
//  @desc       update contact
//  @access     Private
router.put(
  '/:id',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const { name, email, phone, type } = req.body;
    const contactFields = {};
    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
    try {
      let contact = await Contact.findById(req.params.id);
      if (!contact) return res.status(404).json({ msg: 'Contact not found' });

      if (contact.user.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'Not authorized' });
      }
      contact = await Contact.findByIdAndUpdate(
        req.params.id,
        { $set: contactFields },
        { new: true }
      );
      res.json(contact);
    } catch (error) {
      serverError(error, res);
    }
  }
);

//  @route      DEL api/contacts
//  @desc       delete contact
//  @access     Private
router.delete('/:id', auth, async (req, res) => {
  let contact = await Contact.findById(req.params.id);
  if (contact.user.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'Not authorized' });
  }
  try {
    await Contact.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Contact removed' });
  } catch (error) {
    serverError(error, res);
  }
});

module.exports = router;
