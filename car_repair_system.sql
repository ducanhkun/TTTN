-- Tạo bảng customers
CREATE TABLE customers (
    customerId INT AUTO_INCREMENT PRIMARY KEY,
    salutation VARCHAR(50),
    fullName VARCHAR(255) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng services
CREATE TABLE services (
    serviceId INT AUTO_INCREMENT PRIMARY KEY,
    serviceName VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    serviceImage VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Dữ liệu mẫu cho services
INSERT INTO services (serviceName, description, price, serviceImage) VALUES
('Bảo dưỡng định kỳ', 'Kiểm tra và bảo dưỡng định kỳ xe', 500000, 'https://example.com/images/maintenance.jpg'),
('Thay dầu động cơ', 'Thay dầu và lọc dầu động cơ', 300000, 'https://example.com/images/oil-change.jpg'),
('Sửa chữa động cơ', 'Kiểm tra và sửa chữa các vấn đề động cơ', 1500000, 'https://example.com/images/engine-repair.jpg');

-- Tạo bảng services_detail
CREATE TABLE services_detail (
    detailId INT AUTO_INCREMENT PRIMARY KEY,
    serviceId INT NOT NULL,
    stepOrder INT NOT NULL,
    stepDescription TEXT NOT NULL,
    stepImage VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (serviceId) REFERENCES services(serviceId)
);

-- Dữ liệu mẫu cho services_detail
INSERT INTO services_detail (serviceId, stepOrder, stepDescription, stepImage) VALUES
-- Bước cho dịch vụ "Bảo dưỡng định kỳ"
(1, 1, 'Kiểm tra hệ thống phanh', 'https://example.com/images/step1.jpg'),
(1, 2, 'Kiểm tra và thay dầu động cơ', 'https://example.com/images/step2.jpg'),
(1, 3, 'Kiểm tra lốp xe', 'https://example.com/images/step3.jpg'),
-- Bước cho dịch vụ "Thay dầu động cơ"
(2, 1, 'Tháo dầu cũ', 'https://example.com/images/oil-step1.jpg'),
(2, 2, 'Thay bộ lọc dầu', 'https://example.com/images/oil-step2.jpg'),
(2, 3, 'Đổ dầu mới', 'https://example.com/images/oil-step3.jpg'),
-- Bước cho dịch vụ "Sửa chữa động cơ"
(3, 1, 'Kiểm tra động cơ', 'https://example.com/images/engine-step1.jpg'),
(3, 2, 'Sửa chữa hoặc thay thế các linh kiện hư hỏng', 'https://example.com/images/engine-step2.jpg'),
(3, 3, 'Chạy thử nghiệm và kiểm tra cuối cùng', 'https://example.com/images/engine-step3.jpg');

-- Các bảng khác
CREATE TABLE appointment_status (
    statusId INT AUTO_INCREMENT PRIMARY KEY,
    statusName VARCHAR(50) NOT NULL
);

INSERT INTO appointment_status (statusName) VALUES
(N'Chờ Xác nhận'),
(N'Xác nhận'),
(N'Hoàn thành'),
(N'Hủy');

CREATE TABLE time_slots (
    timeSlotId INT AUTO_INCREMENT PRIMARY KEY,
    timeSlot TIME NOT NULL,
    isAvailable BOOLEAN DEFAULT TRUE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO time_slots (timeSlot, isAvailable) VALUES
('07:00', TRUE),
('07:30', TRUE),
('08:00', TRUE),
('08:30', TRUE),
('09:00', TRUE),
('09:30', TRUE),
('10:00', TRUE),
('10:30', TRUE),
('11:00', TRUE),
('11:30', TRUE),
('12:00', TRUE),
('12:30', TRUE),
('13:00', TRUE),
('13:30', TRUE),
('14:00', TRUE),
('14:30', TRUE),
('15:00', TRUE),
('15:30', TRUE),
('16:00', TRUE),
('16:30', TRUE),
('17:00', TRUE),
('17:30', TRUE),
('18:00', TRUE),
('18:30', TRUE),
('19:00', TRUE),
('19:30', TRUE),
('20:00', TRUE),
('20:30', TRUE),
('21:00', TRUE),
('21:30', TRUE),
('22:00', TRUE);

CREATE TABLE appointments (
    appointmentId INT AUTO_INCREMENT PRIMARY KEY,
    customerId INT NOT NULL,
    serviceId INT NOT NULL,
    timeSlotId INT NOT NULL,
    scheduledDate DATE NOT NULL,
    carModel VARCHAR(255) NOT NULL,
    carVersion VARCHAR(255),
    carPlateNumber VARCHAR(20) NOT NULL,
    manufactureYear INT,
    statusId INT DEFAULT 1,
    notes TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (customerId) REFERENCES customers(customerId),
    FOREIGN KEY (serviceId) REFERENCES services(serviceId),
    FOREIGN KEY (timeSlotId) REFERENCES time_slots(timeSlotId),
    FOREIGN KEY (statusId) REFERENCES appointment_status(statusId)
);

CREATE TABLE payments (
    paymentId INT AUTO_INCREMENT PRIMARY KEY,
    appointmentId INT NOT NULL,
    paymentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    amount DECIMAL(10, 2) NOT NULL,
    paymentMethod VARCHAR(50) NOT NULL,
    paymentStatus ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (appointmentId) REFERENCES appointments(appointmentId)
);

CREATE TABLE roles (
    roleId INT AUTO_INCREMENT PRIMARY KEY,
    roleName VARCHAR(50) NOT NULL
);

INSERT INTO roles (roleName) VALUES
('Admin'),
('Customer');

CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullName VARCHAR(255) NOT NULL,
    roleId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (roleId) REFERENCES roles(roleId)
);

INSERT INTO users (email, password, fullName, roleId) VALUES
('admin@example.com', 'hashedpassword1', 'Administrator', 1),
('customer1@example.com', 'hashedpassword2', 'Customer 1', 2),
('customer2@example.com', 'hashedpassword3', 'Customer 2', 2);
-- Tạo bảng news
CREATE TABLE news (
    newsId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image VARCHAR(255),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Thêm dữ liệu mẫu cho news
INSERT INTO news (title, content, image) VALUES
('Khuyến mãi bảo dưỡng mùa hè', 
 'Chương trình khuyến mãi bảo dưỡng định kỳ xe mùa hè. Giảm giá lên đến 20% cho tất cả các dịch vụ bảo dưỡng xe tại các đại lý Honda trên toàn quốc.', 
 'https://example.com/images/promotion.jpg'),
('Mẹo lái xe an toàn trong mùa mưa', 
 'Chia sẻ những mẹo lái xe an toàn trong điều kiện thời tiết mưa gió, giúp bạn bảo vệ bản thân và gia đình khi tham gia giao thông.', 
 'https://example.com/images/safety-tips.jpg'),
('Ra mắt dòng xe mới Honda CR-V 2024', 
 'Honda chính thức giới thiệu dòng xe CR-V 2024 với thiết kế mới và nhiều tính năng vượt trội. Hãy cùng khám phá ngay hôm nay!', 
 'https://example.com/images/new-car.jpg');
