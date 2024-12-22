const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Lấy danh sách thanh toán
router.get('/', (req, res) => {
    const query = `
        SELECT p.paymentId, p.paymentDate, p.amount, p.paymentMethod, p.paymentStatus, s.serviceName 
        FROM payments p
        INNER JOIN appointments a ON p.appointmentId = a.appointmentId
        INNER JOIN services s ON a.serviceId = s.serviceId`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách thanh toán:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.json(results);
        }
    });
});

// Thêm thanh toán mới
router.post('/', (req, res) => {
    const { appointmentId, amount, paymentMethod, paymentStatus } = req.body;
    const query = `INSERT INTO payments (appointmentId, amount, paymentMethod, paymentStatus) 
                   VALUES (?, ?, ?, ?)`;
    db.query(query, [appointmentId, amount, paymentMethod, paymentStatus], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm thanh toán:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.status(201).send('Thêm thanh toán thành công');
        }
    });
});

module.exports = router;
