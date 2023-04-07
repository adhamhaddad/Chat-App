CREATE TYPE user_status AS ENUM('online', 'away', 'do_not_disturb', 'offline');
CREATE TABLE IF NOT EXISTS information (
    id SERIAL PRIMARY KEY,
    about TEXT,
    status user_status,
    "role" VARCHAR(100),
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
);