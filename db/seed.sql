USE tracker_db;

INSERT INTO department(name) 
VALUES  ('Finance'), 
        ('Customer Service'),
        ('HR'),
        ('Marketing')
        ;

INSERT INTO role(title, salary, department_id)
VALUES  ('Head of Finance', 50000.00, 1),
        ('Finance Worker', 30000.00, 1),
        ('Head of CS', 50000.00, 2),
        ('CS Worker', 30000.00, 2),
        ('Head of HR', 50000.00, 3),
        ('HR Worker', 30000.00, 3),
        ('Head of Marketing', 50000.00, 4),
        ('Marketing Worker', 30000.00, 4)
        ;


INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, NULL),
        ('Jane', 'Doe', 3, NULL),
        ('Jamie', 'Doe', 5, NULL),
        ('James', 'Doe', 7, NULL),
        ('Sierra', 'Mist', 2, 1),
        ('Hannah', 'Montana', 2, 1),
        ('Sandra', 'Montana', 4, 2),
        ('Julian', 'Solo', 4, 2),
        ('Han', 'Solo', 6, 3),
        ('Chew', 'Baca', 6, 3),
        ('Leia', 'Star', 8, 4),
        ('Luke', 'Star', 8, 4)
        ;

