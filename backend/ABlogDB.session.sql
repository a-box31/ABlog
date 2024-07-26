CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

-- @block
INSERT INTO users (username, password, email)
VALUES 
    ('admin', 'admin', 'test@gmail.com'),
    ('thomasgeorge', 'papa', 'abinthomas123@yahoo.co.in'),
    ('manjumolthomas', 'mummy', 'manjumolthomas16@gmail.com'),
    ('anjuthomas', 'chechi', 'anjut55555@gmail.com');


-- @block
SELECT * FROM users;



-- @block
DELETE FROM users 
WHERE 
    (email = 'thomaa2031@gmail.com' && password = 'Copper123')
    OR (username = 'abox');


-- @block
DELETE FROM users WHERE id = 5;


-- @block
DELETE FROM users;
DROP TABLE users;