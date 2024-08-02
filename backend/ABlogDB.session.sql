CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    avatar VARCHAR(255) DEFAULT 'default.png',
    bio TEXT
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
SELECT * FROM users 
WHERE email = 'thomaa2031@gmail.com';


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


-- @block 
CREATE TABLE sessions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);


-- @block
INSERT INTO sessions (user_id, token)
VALUES 
    (1, '1234567890'),
    (2, '0987654321'),
    (3, '1234567891'),
    (4, '0987654320');



-- @block
SELECT * FROM sessions;

-- @block
DELETE FROM sessions;


-- @block
DROP TABLE sessions;


-- @block
SELECT * FROM users
JOIN sessions
ON users.id = sessions.user_id;
