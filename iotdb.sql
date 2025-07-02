-- 1. Tạo database
CREATE DATABASE IF NOT EXISTS iotdb;
USE iotdb;

-- 2. Tạo bảng users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    first_name VARCHAR(45),
    last_name VARCHAR(45),
    phone INT,
    avatar varchar(500),
    role enum('ADMIN', 'CUSTOMER') not null,
    created_at DATETIME
);

-- 3. Tạo bảng products
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_name VARCHAR(100) NOT NULL,
    category VARCHAR(50),
    expiry_date DATE NOT NULL,
    detected_at DATETIME NOT NULL,
    unit VARCHAR(20),
    quantity FLOAT,
    notes TEXT,
    is_motified TINYINT DEFAULT 0,
    status VARCHAR(45),
    image_url TEXT,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);

-- 4. Tạo bảng env_records (ghi nhận nhiệt độ, độ ẩm)
CREATE TABLE env_records (
    record_id INT AUTO_INCREMENT PRIMARY KEY,
    temperature FLOAT,
    humidity FLOAT,
    timestamp DATETIME
);

-- 5. Tạo bảng env_suggestions (gợi ý môi trường bảo quản)
CREATE TABLE env_suggestions (
    suggestion_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    humidity_range VARCHAR(45),
    temperature_range VARCHAR(45),
    suggest_place VARCHAR(45),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- 6. Tạo bảng al_predictions (dự đoán bất thường môi trường)
CREATE TABLE al_predictions (
    al_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    detected_at DATETIME,
    note VARCHAR(200),
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE SET NULL
);

-- 7. Tạo bảng notifications (tin nhắn nhắc nhở hạn sử dụng)
CREATE TABLE notifications (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    reminder_date DATETIME,
    content VARCHAR(100),
    is_read TINYINT DEFAULT 0,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

-- 8. Tạo bảng product_history (lịch sử thao tác sản phẩm)
CREATE TABLE product_history (
    histoey_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    action VARCHAR(20) NOT NULL,
    time DATETIME,
    note VARCHAR(45),
    user_id INT,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL
);
