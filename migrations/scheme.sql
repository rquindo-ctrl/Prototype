
-- Customizations:
-- 1. The 'id' column is set as the primary key and uses AUTO_INCREMENT for unique user identification.
-- 2. 'username' is unique and required for each user.
-- 3. 'role' defaults to 'user' but can be customized for different access levels.
-- 4. 'refresh_token' allows storage of JWT refresh tokens for session management.
-- 5. 'created_at' automatically records the timestamp of user creation.
-- Note: Removed duplicate AUTO_INCREMENT from 'id' column.

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    refresh_token VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE positions (
    position_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    position_code VARCHAR(100) NOT NULL,
    position_name VARCHAR(300) NOT NULL,
    id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES users (id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


    
