CREATE TABLE tasks (
    task_id INT AUTO_INCREMENT PRIMARY KEY,
    text VARCHAR(255) NOT NULL,
    created_date DATE NOT NULL,
    name VARCHAR(255),
    FOREIGN KEY (name)
        REFERENCES users (name)
);
CREATE TABLE IF NOT EXISTS users (
  name varchar(255) NOT NULL,
  password varchar(15) NOT NULL,
  created_at datetime,
  PRIMARY KEY (name)
) ENGINE=InnoDB;