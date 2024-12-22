const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Đăng nhập
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT customerId FROM customers WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Lỗi khi đăng nhập:', err.message);
            res.status(500).send('Lỗi server');
        } else if (results.length === 0) {
            res.status(401).send('Email hoặc mật khẩu không đúng');
        } else {
            res.json({ customerId: results[0].customerId });
        }
    });
});

module.exports = router;
