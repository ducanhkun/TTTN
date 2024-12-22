const express = require('express');
const db = require('../db/connection'); // Database connection
const router = express.Router();

// Lấy tất cả chi tiết dịch vụ
router.get('/', (req, res) => {
    const query = `
        SELECT * 
        FROM services_detail
        ORDER BY serviceId, stepOrder ASC`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách chi tiết dịch vụ:', err.message);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Không có chi tiết dịch vụ nào.' });
        } else {
            res.status(200).json({ success: true, data: results });
        }
    });
});

// Lấy danh sách chi tiết dịch vụ theo serviceId
router.get('/:serviceId', (req, res) => {
    const { serviceId } = req.params;
    const query = `
        SELECT * 
        FROM services_detail 
        WHERE serviceId = ? 
        ORDER BY stepOrder ASC`;
    db.query(query, [serviceId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy chi tiết dịch vụ:', err.message);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        } else if (results.length === 0) {
            res.status(404).json({ message: `Không tìm thấy chi tiết dịch vụ cho serviceId: ${serviceId}` });
        } else {
            res.status(200).json({ success: true, data: results });
        }
    });
});

// Thêm chi tiết dịch vụ
router.post('/', (req, res) => {
    const { serviceId, stepOrder, stepDescription, stepImage } = req.body;

    if (!serviceId || !stepOrder || !stepDescription) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra các trường dữ liệu.' });
    }

    const query = `
        INSERT INTO services_detail (serviceId, stepOrder, stepDescription, stepImage)
        VALUES (?, ?, ?, ?)`;
    db.query(query, [serviceId, stepOrder, stepDescription, stepImage || null], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm chi tiết dịch vụ:', err.message);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        } else {
            res.status(201).json({ success: true, message: 'Thêm chi tiết dịch vụ thành công', detailId: results.insertId });
        }
    });
});

// Sửa chi tiết dịch vụ
router.put('/:detailId', (req, res) => {
    const { detailId } = req.params;
    const { serviceId, stepOrder, stepDescription, stepImage } = req.body;

    if (!serviceId || !stepOrder || !stepDescription) {
        return res.status(400).json({ message: 'Dữ liệu đầu vào không hợp lệ. Vui lòng kiểm tra các trường dữ liệu.' });
    }

    const query = `
        UPDATE services_detail 
        SET serviceId = ?, stepOrder = ?, stepDescription = ?, stepImage = ?
        WHERE detailId = ?`;
    db.query(query, [serviceId, stepOrder, stepDescription, stepImage || null, detailId], (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật chi tiết dịch vụ:', err.message);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Không tìm thấy chi tiết dịch vụ cần cập nhật.' });
        } else {
            res.status(200).json({ success: true, message: 'Cập nhật chi tiết dịch vụ thành công' });
        }
    });
});

// Xóa chi tiết dịch vụ
router.delete('/:detailId', (req, res) => {
    const { detailId } = req.params;

    const query = `
        DELETE FROM services_detail 
        WHERE detailId = ?`;
    db.query(query, [detailId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa chi tiết dịch vụ:', err.message);
            res.status(500).json({ message: 'Lỗi server', error: err.message });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Không tìm thấy chi tiết dịch vụ cần xóa.' });
        } else {
            res.status(200).json({ success: true, message: 'Xóa chi tiết dịch vụ thành công' });
        }
    });
});

module.exports = router;
