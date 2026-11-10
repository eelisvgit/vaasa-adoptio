CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    type VARCHAR(20),
    age INTEGER,
    breed VARCHAR(100),
    description TEXT,
    image_url TEXT,
    status VARCHAR(20)
);

CREATE TABLE adoptions (
    id SERIAL PRIMARY KEY,
    animal_id INTEGER REFERENCES animals(id),
    applicant_name VARCHAR(100),
    applicant_email VARCHAR(100),
    message TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO animals (name, type, age, description, status)
VALUES
('milo', 'dog', 3, 'friendly', 'available'),
('luna', 'cat', 2, 'playful', 'available'),
('rex', 'dog', 5, 'calm', 'available');
