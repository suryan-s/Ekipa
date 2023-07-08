-- Roles Table
CREATE TABLE IF NOT EXISTS Roles (
    role_id INTEGER PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL
);

INSERT INTO Roles (role_id, role_name)
SELECT 1, 'Manager'
WHERE NOT EXISTS (
    SELECT 1
    FROM Roles
    WHERE role_id = 1
);

INSERT INTO Roles (role_id, role_name)
SELECT 2, 'Team Lead'
WHERE NOT EXISTS (
    SELECT 1
    FROM Roles
    WHERE role_id = 2
);

INSERT INTO Roles (role_id, role_name)
SELECT 3, 'Member'
WHERE NOT EXISTS (
    SELECT 1
    FROM Roles
    WHERE role_id = 3
);


-- User Table
CREATE TABLE IF NOT EXISTS User (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,
    team_name VARCHAR(255),
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_name) REFERENCES Team(team_name),
    FOREIGN KEY (role_id) REFERENCES Roles(role_id)
);

-- Team Table
CREATE TABLE IF NOT EXISTS Team (
    team_id INTEGER PRIMARY KEY AUTOINCREMENT,
    team_name VARCHAR(255) NOT NULL,
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Task Table
CREATE TABLE IF NOT EXISTS Task (
    task_id INTEGER PRIMARY KEY AUTOINCREMENT,
    task_name VARCHAR(255) NOT NULL,
    description TEXT,
    assignee_id INT,
    team_id INT,
    due_date DATE,
    is_completed BOOLEAN DEFAULT false,
    task_priority INTEGER CHECK (task_priority >= 1 AND task_priority <= 5),
    points INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (assignee_id) REFERENCES User(user_id),
    FOREIGN KEY (team_id) REFERENCES Team(team_id)
);