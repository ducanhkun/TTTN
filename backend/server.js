const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path'); // Module hỗ trợ xử lý đường dẫn
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Cấu hình Multer để lưu ảnh vào thư mục "uploads"
const upload = multer({ dest: 'uploads/' }); // Lưu file tạm thời trong thư mục "uploads"

// Endpoint upload hình ảnh
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        const file = req.file;

        // Đường dẫn URL cho file đã upload
        const fileUrl = `http://localhost:${process.env.PORT || 5000}/uploads/${file.filename}`;
        res.json({ url: fileUrl }); // Trả về URL để frontend sử dụng
    } catch (error) {
        console.error('Lỗi khi upload file:', error.message);
        res.status(500).send('Upload thất bại');
    }
});

// Serve static files trong thư mục "uploads"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const serviceRoutes = require('./routes/services');
const appointmentRoutes = require('./routes/appointments');
const customerRoutes = require('./routes/customers');
const paymentRoutes = require('./routes/payments');
const timeSlotRoutes = require('./routes/time_slots');
const authRoutes = require('./routes/auth');
const roleRoutes = require('./routes/roles'); // Route roles
const userRoutes = require('./routes/users'); // Route users
const serviceDetailRoutes = require('./routes/services_detail');
const newsRouter = require('./routes/news');
// Routes
app.use('/api/services', serviceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/time-slots', timeSlotRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes); // Thêm route roles
app.use('/api/users', userRoutes); // Thêm route users
app.use('/api/service-details', serviceDetailRoutes);
app.use('/api/news', newsRouter);
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});
