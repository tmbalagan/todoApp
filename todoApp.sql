CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    created_date DATE NOT NULL,
    name VARCHAR(15),
    FOREIGN KEY (name)
        REFERENCES users (name)
);
CREATE TABLE IF NOT EXISTS users (
  name varchar(15) NOT NULL,
  password varchar(10) NOT NULL,
  created_at datetime,
  PRIMARY KEY (name)
)