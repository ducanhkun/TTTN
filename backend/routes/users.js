const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Lấy danh sách người dùng
router.get('/', (req, res) => {
    const query = `SELECT * FROM users`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách người dùng:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.json(results);
        }
    });
});

// Đăng nhập người dùng
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email và mật khẩu không được để trống' });
    }

    const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Lỗi khi đăng nhập:', err.message);
            return res.status(500).json({ message: 'Lỗi server' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng' });
        }

        const user = results[0];
        res.status(200).json({
            message: 'Đăng nhập thành công',
            user: {
                userId: user.userId,
                email: user.email,
                fullName: user.fullName,
                roleId: user.roleId,
            },
        });
    });
});

// Thêm người dùng mới
router.post('/', (req, res) => {
    const { email, password, fullName, roleId } = req.body;
    const query = `
        INSERT INTO users (email, password, fullName, roleId)
        VALUES (?, ?, ?, ?)
    `;
    db.query(query, [email, password, fullName, roleId], (err, results) => {
        if (err) {
            console.error('Lỗi khi thêm người dùng:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.status(201).send('Thêm người dùng thành công');
        }
    });
});

// Sửa thông tin người dùng
router.put('/:userId', (req, res) => {
    const { userId } = req.params;
    const { email, fullName, roleId } = req.body;
    const query = `
        UPDATE users
        SET email = ?, fullName = ?, roleId = ?, updatedAt = NOW()
        WHERE userId = ?
    `;
    db.query(query, [email, fullName, roleId, userId], (err, results) => {
        if (err) {
            console.error('Lỗi khi sửa thông tin người dùng:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.send('Cập nhật thông tin người dùng thành công');
        }
    });
});

// Xóa người dùng
router.delete('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `DELETE FROM users WHERE userId = ?`;
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa người dùng:', err.message);
            res.status(500).send('Lỗi server');
        } else {
            res.send('Xóa người dùng thành công');
        }
    });
});

module.exports = router;
