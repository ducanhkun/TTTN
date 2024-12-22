const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Lấy danh sách khách hàng
router.get('/', async (req, res) => {
    try {
        const query = 'SELECT * FROM customers';
        db.query(query, (err, results) => {
            if (err) {
                console.error('Lỗi khi lấy danh sách khách hàng:', err.message);
                return res.status(500).json({ error: 'Lỗi server.' });
            }
            res.json(results);
        });
    } catch (error) {
        console.error('Lỗi không xác định:', error.message);
        res.status(500).json({ error: 'Lỗi server.' });
    }
});

// Đăng nhập khách hàng (dùng số điện thoại)
router.post('/login', async (req, res) => {
    const { phone, password } = req.body;

    if (!phone || !password) {
        return res.status(400).json({ error: 'Số điện thoại và mật khẩu là bắt buộc.' });
    }

    try {
        const query = 'SELECT customerId, fullName, password FROM customers WHERE phone = ? AND password = ?';
        db.query(query, [phone, password], (err, results) => {
            if (err) {
                console.error('Lỗi khi đăng nhập:', err.message);
                return res.status(500).json({ error: 'Lỗi server.' });
            }

            if (results.length === 0) {
                return res.status(401).json({ error: 'Số điện thoại hoặc mật khẩu không đúng.' });
            }

            const customer = results[0];
            res.json({
                customerId: customer.customerId,
                fullName: customer.fullName,
            });
        });
    } catch (error) {
        console.error('Lỗi không xác định:', error.message);
        res.status(500).json({ error: 'Lỗi server.' });
    }
});

// Đăng ký khách hàng mới
router.post('/', async (req, res) => {
    const { salutation, fullName, phone, email, password } = req.body;

    if (!salutation || !fullName || !phone || !email || !password) {
        return res.status(400).json({ error: 'Tất cả các trường là bắt buộc.' });
    }

    try {
        const query = 'INSERT INTO customers (salutation, fullName, phone, email, password) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [salutation, fullName, phone, email, password], (err, results) => {
            if (err) {
                console.error('Lỗi khi thêm khách hàng:', err.message);
                return res.status(500).json({ error: 'Lỗi server.' });
            }
            res.status(201).json({ message: 'Thêm khách hàng thành công.' });
        });
    } catch (error) {
        console.error('Lỗi không xác định:', error.message);
        res.status(500).json({ error: 'Lỗi server.' });
    }
});

// Sửa thông tin khách hàng
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { salutation, fullName, phone, email } = req.body;

    if (!salutation || !fullName || !phone || !email) {
        return res.status(400).json({ error: 'Tất cả các trường là bắt buộc.' });
    }

    try {
        const query = 'UPDATE customers SET salutation = ?, fullName = ?, phone = ?, email = ? WHERE customerId = ?';
        db.query(query, [salutation, fullName, phone, email, id], (err, results) => {
            if (err) {
                console.error('Lỗi khi cập nhật thông tin khách hàng:', err.message);
                return res.status(500).json({ error: 'Lỗi server.' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Khách hàng không tồn tại.' });
            }

            res.json({ message: 'Cập nhật thông tin khách hàng thành công.' });
        });
    } catch (error) {
        console.error('Lỗi không xác định:', error.message);
        res.status(500).json({ error: 'Lỗi server.' });
    }
});

// Xóa khách hàng
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const query = 'DELETE FROM customers WHERE customerId = ?';
        db.query(query, [id], (err, results) => {
            if (err) {
                console.error('Lỗi khi xóa khách hàng:', err.message);
                return res.status(500).json({ error: 'Lỗi server.' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Khách hàng không tồn tại.' });
            }

            res.json({ message: 'Xóa khách hàng thành công.' });
        });
    } catch (error) {
        console.error('Lỗi không xác định:', error.message);
        res.status(500).json({ error: 'Lỗi server.' });
    }
});

// Lấy lịch hẹn theo customerId
router.get('/:customerId/appointments', (req, res) => {
    const { customerId } = req.params;

    const query = `
        SELECT 
            a.*, 
            t.timeSlot, 
            s.serviceName, 
            s.price, 
            aps.statusName 
        FROM appointments a
        INNER JOIN time_slots t ON a.timeSlotId = t.timeSlotId
        INNER JOIN services s ON a.serviceId = s.serviceId
        INNER JOIN appointment_status aps ON a.statusId = aps.statusId
        WHERE a.customerId = ?
        ORDER BY a.scheduledDate DESC, t.timeSlot ASC`;

    db.query(query, [customerId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy lịch hẹn của khách hàng:', err.message);
            return res.status(500).send('Lỗi server.');
        }

        if (results.length === 0) {
            return res.status(404).send('Không tìm thấy lịch hẹn của khách hàng này.');
        }

        res.json(results);
    });
});

module.exports = router;
