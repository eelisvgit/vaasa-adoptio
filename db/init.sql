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

INSERT INTO animals (name, type, age, breed, description, image_url, status)
VALUES
('Misu', 'kissa', 3, 'Eurooppalainen lyhytkarva', 'Kiltti sisäkissa', '', 'available'),
('Rekku', 'koira', 5, 'Labradorinnoutaja', 'Energiaa täynnä', '', 'available'),
('Pörrö', 'kissa', 2, 'Maine coon', 'Iso ja lempeä', '', 'available');
