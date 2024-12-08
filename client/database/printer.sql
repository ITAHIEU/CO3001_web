-- Tạo bảng Users
create database CNPM

Use CNPM

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role ENUM('student', 'SPSO'),
    balance INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng Printers
CREATE TABLE Printers (
    printer_id INT AUTO_INCREMENT PRIMARY KEY,
    brand VARCHAR(50),
    model VARCHAR(50),
    description TEXT,
    campus_name VARCHAR(100),
    building_name VARCHAR(100),
    room_number VARCHAR(10),
    status ENUM('enabled', 'disabled') DEFAULT 'enabled',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng Print_Jobs
CREATE TABLE Print_Jobs (
    job_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    printer_id INT,
    file_name VARCHAR(100),
    start_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    page_count_a4 INT,
    page_count_a3 INT,
    sides ENUM('one-sided', 'double-sided'),
    copies INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (printer_id) REFERENCES Printers(printer_id)
);

-- Tạo bảng Configurations
CREATE TABLE Configurations (
    config_id INT AUTO_INCREMENT PRIMARY KEY,
    default_page_balance INT DEFAULT 200,
    default_page_date DATE,
    permitted_file_types VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tạo bảng Payments
CREATE TABLE Payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount_paid DECIMAL(10, 2),
    pages_bought INT,
    payment_method VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Tạo bảng Reports
CREATE TABLE Reports (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    report_type ENUM('monthly', 'yearly'),
    start_date DATE,
    end_date DATE,
    total_pages_a4 INT,
    total_pages_a3 INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Thêm dữ liệu vào bảng Users
INSERT INTO Users (name, email, role, balance)
VALUES
('Nguyen Minh', 'minh.nguyen@hcmut.edu.vn', 'student', 500),
('Tran Thi Lan', 'lan.tran@hcmut.edu.vn', 'student', 300),
('SPSO1', 'spos1@hcmut.edu.vn', 'SPSO', 0),
('Le Van A', 'a.le@hcmut.edu.vn', 'student', 100),
('Pham Thi B', 'b.pham@hcmut.edu.vn', 'student', 50),
('Nguyen Hoang', 'hoang.nguyen@hcmut.edu.vn', 'student', 400),
('Tran Anh Tuan', 'tuan.tran@hcmut.edu.vn', 'student', 200),
('Le Thi C', 'c.le@hcmut.edu.vn', 'student', 250),
('SPSO2', 'spos2@hcmut.edu.vn', 'SPSO', 0);

-- Thêm dữ liệu vào bảng Printers
INSERT INTO Printers (brand, model, description, campus_name, building_name, room_number, status)
VALUES
('HP', 'LaserJet Pro', 'Máy in laser chất lượng cao', 'Campus A', 'Building 1', 'Room 101', 'enabled'),
('Canon', 'PIXMA', 'Máy in phun màu', 'Campus B', 'Building 2', 'Room 202', 'enabled'),
('Epson', 'WorkForce', 'Máy in tốc độ cao', 'Campus A', 'Building 3', 'Room 303', 'disabled'),
('Brother', 'DCP-L2540DW', 'Máy in đa chức năng', 'Campus B', 'Building 4', 'Room 404', 'enabled'),
('Samsung', 'ProXpress', 'Máy in laser tiết kiệm năng lượng', 'Campus C', 'Building 5', 'Room 505', 'enabled');


-- Thêm dữ liệu vào bảng Print_Jobs
INSERT INTO Print_Jobs (user_id, printer_id, file_name, start_time, end_time, page_count_a4, page_count_a3, sides, copies)
VALUES
(1, 1, 'Document1.pdf', '2024-12-01 08:00:00', '2024-12-01 08:10:00', 10, 0, 'one-sided', 1),
(2, 2, 'Document2.docx', '2024-12-02 10:00:00', '2024-12-02 10:15:00', 5, 1, 'double-sided', 2),
(3, 1, 'Report2024.pdf', '2024-12-03 14:00:00', '2024-12-03 14:20:00', 20, 0, 'one-sided', 1),
(4, 3, 'Poster.jpg', '2024-12-04 09:00:00', '2024-12-04 09:30:00', 0, 10, 'one-sided', 3),
(5, 4, 'Thesis.docx', '2024-12-05 15:00:00', '2024-12-05 15:45:00', 30, 0, 'double-sided', 1),
(6, 5, 'Slides.pptx', '2024-12-06 16:00:00', '2024-12-06 16:25:00', 15, 0, 'one-sided', 2);


-- Thêm dữ liệu vào bảng Configurations
INSERT INTO Configurations (default_page_balance, default_page_date, permitted_file_types)
VALUES
(200, '2024-09-01', 'PDF, DOCX, JPG'),
(150, '2024-06-01', 'PDF, DOCX'),
(300, '2024-01-01', 'PDF, DOCX, PPTX, JPG');


-- Thêm dữ liệu vào bảng Payments
INSERT INTO Payments (user_id, amount_paid, pages_bought, payment_method)
VALUES
(1, 50.00, 100, 'BKPay'),
(2, 30.00, 50, 'BKPay'),
(3, 100.00, 200, 'BKPay'),
(4, 75.00, 150, 'Bank Transfer'),
(5, 20.00, 40, 'BKPay'),
(6, 45.00, 90, 'Bank Transfer'),
(7, 60.00, 120, 'Credit Card');


-- Thêm dữ liệu vào bảng Reports
INSERT INTO Reports (report_type, start_date, end_date, total_pages_a4, total_pages_a3)
VALUES
('monthly', '2024-12-01', '2024-12-31', 200, 10),
('monthly', '2024-11-01', '2024-11-30', 180, 15),
('yearly', '2024-01-01', '2024-12-31', 5000, 200),
('monthly', '2024-10-01', '2024-10-31', 150, 20),
('yearly', '2023-01-01', '2023-12-31', 4500, 150);

SELECT * FROM Users;
SELECT * FROM Printers;
SELECT * FROM Print_Jobs;
SELECT * FROM Configurations;
SELECT * FROM Payments;
SELECT * FROM Reports;

