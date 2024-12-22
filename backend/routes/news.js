const express = require('express');
const db = require('../db/connection');
const router = express.Router();

// Lấy danh sách tất cả bài viết
router.get('/', (req, res) => {
    const query = `
        SELECT 
            newsId,
            title,
            content,
            image,
            createdAt,
            updatedAt 
        FROM news
        ORDER BY createdAt DESC
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy danh sách bài viết:', err.message);
            return res.status(500).json({ error: 'Lỗi server khi lấy danh sách bài viết' });
        }
        res.json(results);
    });
});

// Lấy chi tiết một bài viết theo ID
router.get('/:newsId', (req, res) => {
    const { newsId } = req.params;
    const query = 'SELECT * FROM news WHERE newsId = ?';
    db.query(query, [newsId], (err, results) => {
        if (err) {
            console.error('Lỗi khi lấy bài viết:', err.message);
            return res.status(500).json({ error: 'Lỗi server khi lấy bài viết' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Không tìm thấy bài viết' });
        }
        res.json(results[0]);
    });
});

// Thêm bài viết mới
router.post('/', (req, res) => {
    const { title, content, image } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Tiêu đề và nội dung là bắt buộc' });
    }
    const query = 'INSERT INTO news (title, content, image) VALUES (?, ?, ?)';
    db.query(query, [title, content, image || null], (err, result) => {
        if (err) {
            console.error('Lỗi khi thêm bài viết:', err.message);
            return res.status(500).json({ error: 'Lỗi server khi thêm bài viết' });
        }
        res.status(201).json({ message: 'Thêm bài viết thành công', newsId: result.insertId });
    });
});

// Cập nhật bài viết
router.put('/:newsId', (req, res) => {
    const { newsId } = req.params;
    const { title, content, image } = req.body;
    if (!title || !content) {
        return res.status(400).json({ error: 'Tiêu đề và nội dung là bắt buộc' });
    }
    const query = 'UPDATE news SET title = ?, content = ?, image = ?, updatedAt = NOW() WHERE newsId = ?';
    db.query(query, [title, content, image || null, newsId], (err, results) => {
        if (err) {
            console.error('Lỗi khi cập nhật bài viết:', err.message);
            return res.status(500).json({ error: 'Lỗi server khi cập nhật bài viết' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy bài viết' });
        }
        res.json({ message: 'Cập nhật bài viết thành công' });
    });
});

// Xóa bài viết
router.delete('/:newsId', (req, res) => {
    const { newsId } = req.params;
    const query = 'DELETE FROM news WHERE newsId = ?';
    db.query(query, [newsId], (err, results) => {
        if (err) {
            console.error('Lỗi khi xóa bài viết:', err.message);
            return res.status(500).json({ error: 'Lỗi server khi xóa bài viết' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: 'Không tìm thấy bài viết' });
        }
        res.json({ message: 'Xóa bài viết thành công' });
    });
});

module.exports = router;
