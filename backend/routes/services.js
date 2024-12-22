const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Lấy danh sách dịch vụ
router.get('/', (req, res) => {
    const query = 'SELECT * FROM services';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách dịch vụ:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.json(results);
        }
    });
});

// Lấy chi tiết dịch vụ từ bảng services_detail theo serviceId
router.get('/details/:serviceId', (req, res) => {
    const { serviceId } = req.params;
    const query = 'SELECT * FROM services_detail WHERE serviceId = ? ORDER BY stepOrder ASC';
    db.query(query, [serviceId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy chi tiết dịch vụ:', err.message);
            res.status(500).send('Lỗi server');
        } else if (results.length === 0) {
            res.status(404).send('Không tìm thấy chi tiết dịch vụ');
        } else {
            res.json(results);
        }
    });
});

// Thêm dịch vụ mới
router.post('/', (req, res) => {
    const { serviceName, description, price, serviceImage } = req.body;
    const query = 'INSERT INTO services (serviceName, description, price, serviceImage) VALUES (?, ?, ?, ?)';
    db.query(query, [serviceName, description, price, serviceImage], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm dịch vụ:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.status(201).send('Thêm dịch vụ thành công');
        }
    });
});

// Sửa dịch vụ
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { serviceName, description, price, serviceImage } = req.body;
    const query = 'UPDATE services SET serviceName = ?, description = ?, price = ?, serviceImage = ? WHERE serviceId = ?';
    db.query(query, [serviceName, description, price, serviceImage, id], (err, results) => {
        if (err) {
            console.error('Lỗi khi sửa dịch vụ:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.send('Cập nhật dịch vụ thành công');
        }
    });
});

// Xóa dịch vụ
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM services WHERE serviceId = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa dịch vụ:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.send('Xóa dịch vụ thành công');
        }
    });
});

module.exports = router;
