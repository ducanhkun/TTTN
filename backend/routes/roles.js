const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Lấy danh sách các vai trò
router.get('/', (req, res) => {
    const query = `SELECT * FROM roles`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách vai trò:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.json(results);
        }
    });
});

// Thêm vai trò mới
router.post('/', (req, res) => {
    const { roleName } = req.body;
    const query = `
        INSERT INTO roles (roleName)
        VALUES (?)
    `;
    db.query(query, [roleName], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm vai trò:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.status(201).send('Thêm vai trò thành công');
        }
    });
});

// Sửa vai trò
router.put('/:roleId', (req, res) => {
    const { roleId } = req.params;
    const { roleName } = req.body;
    const query = `
        UPDATE roles
        SET roleName = ?, updatedAt = NOW()
        WHERE roleId = ?
    `;
    db.query(query, [roleName, roleId], (err, results) => {
        if (err) {
            console.error('Lỗi khi sửa vai trò:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.send('Cập nhật vai trò thành công');
        }
    });
});

// Xóa vai trò
router.delete('/:roleId', (req, res) => {
    const { roleId } = req.params;
    const query = `DELETE FROM roles WHERE roleId = ?`;
    db.query(query, [roleId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa vai trò:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.send('Xóa vai trò thành công');
        }
    });
});

module.exports = router;
