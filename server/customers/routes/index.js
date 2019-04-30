var express = require('express');
var customerSchema = require('../model/customer');

var router = express.Router();


router.get('/:id', (req, res) => {
    var id = req.params.id;
    customerSchema.findById(id, (err, customers) => {
        res.ok(customers);
    });
});

router.get('/', (req, res) => {
    var page = req.query.page || 0;
    var limit = req.query.limit || 50;
    var skip = page * limit;
    customerSchema.find((err, customers) => {
        res.ok(customers);
    }).limit(limit).skip(skip);
});



router.post('/', (req, res) => {
    var customer = new customerSchema(req.body);
    customer.save((err, result) => {
        res.ok(result);
    });
});


router.put('/', (req, res) => {
    var body = req.body;
    customerSchema.findByIdAndUpdate(body._id, body, { new: true }, (err, customer) => {
        res.ok(customer);
    });
});

router.delete('/:id', (req, res) => {
    var id = req.params.id;
    customerSchema.findByIdAndDelete(id, (err, reuslt) => {
        res.ok(reuslt);
    });
});


module.exports = router;
