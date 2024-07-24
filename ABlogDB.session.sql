CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(1)
);

-- @block
INSERT INTO users (username, password, email, gender)
VALUES 
    ('admin', 'admin', 'test@gmail.com', 'M'),
    ('thomasgeorge', 'papa', 'abinthomas123@yahoo.co.in', 'M'),
    ('manjumolthomas', 'mummy', 'manjumolthomas16@gmail.com', 'F'),
    ('anjuthomas', 'chechi', 'anjut55555@gmail.com', 'F');
    
-- @block
SELECT * FROM users;



-- @block

DELETE FROM users;