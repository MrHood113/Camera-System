CREATE TABLE cameras (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255),
    ip_address VARCHAR(100) UNIQUE,
    location VARCHAR(255),
    active BOOLEAN
);