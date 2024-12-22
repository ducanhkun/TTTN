const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Lấy khung giờ khả dụng theo serviceId
router.get('/:serviceId', (req, res) => {
    const { serviceId } = req.params;
    const query = 'SELECT * FROM time_slots WHERE serviceId = ? AND isAvailable = TRUE';
    db.query(query, [serviceId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy khung giờ:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.json(results);
        }
    });
});

// Lấy tất cả khung giờ (không lọc điều kiện)
router.get('/', (req, res) => {
    const query = 'SELECT * FROM time_slots';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy tất cả khung giờ:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.json(results);
        }
    });
});

module.exports = router;
