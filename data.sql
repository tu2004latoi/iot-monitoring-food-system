-- Thêm dữ liệu vào bảng users
INSERT INTO users (username, email, password, first_name, last_name, phone, avatar, role, created_at) VALUES
('admin', 'admin@gmail.com', '$2a$10$Okh2cGnAQ1jAGnUnxhEqluSm.FhhJn6JMMe7hOdGZjz2iaUjcdOMG', 'Admin', 'System', 123456789, 'https://res.cloudinary.com/druxxfmia/image/upload/v1751448454/f9l6og6hmofqfcqllvoj.png', 'ADMIN', NOW()),
('user1', 'user1@gamil.com', '$2a$10$Okh2cGnAQ1jAGnUnxhEqluSm.FhhJn6JMMe7hOdGZjz2iaUjcdOMG', 'User', 'One', 987654321, 'https://res.cloudinary.com/druxxfmia/image/upload/v1751448454/f9l6og6hmofqfcqllvoj.png', 'CUSTOMER', NOW());

-- Thêm dữ liệu vào bảng categories
INSERT INTO categories (category_name, description) VALUES
('Thực phẩm', 'Các sản phẩm thực phẩm'),
('Đồ uống', 'Các loại nước uống');

-- Thêm dữ liệu cho bảng units
INSERT INTO units (unit_name, description)
VALUES
('Kg', 'Kilogram - đơn vị đo khối lượng'),
('L', 'Lít - đơn vị đo thể tích'),
('Cái', 'Đơn vị đếm');

-- Thêm dữ liệu vào bảng products
INSERT INTO products (user_id, product_name, category_id, expiry_date, detected_at, unit_id, quantity, notes, status, image, is_active) VALUES
(2, 'Sữa tươi Vinamilk', 2, '2025-12-31', NOW(), 2, 5, 'Bảo quản lạnh', 'notExpired', 'https://res.cloudinary.com/druxxfmia/image/upload/v1751448454/f9l6og6hmofqfcqllvoj.png', true),
(2, 'Bánh Oreo', 1, '2025-10-01', NOW(), 3, 10, 'Để nơi khô ráo', 'notExpired', 'https://res.cloudinary.com/druxxfmia/image/upload/v1751448454/f9l6og6hmofqfcqllvoj.png', true);

