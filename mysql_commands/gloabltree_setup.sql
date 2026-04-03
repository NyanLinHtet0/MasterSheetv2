INSERT INTO global_tree (id, name, parent_id) VALUES
(1, 'Revenue', NULL),
(2, 'Expense', NULL),
(3, 'Sales', 1),
(4, 'Services', 1),
(5, 'Salaries', 2),
(6, 'Transport', 2),
(7, 'Utilities', 2),
(8, 'Maintenance', 2),
(9, 'General Exp', 2);


INSERT INTO assets (name, type) VALUES
('Car (insight)', 'Vehicle'),
('Car (B)', 'Vehicle'),
('Car (Chevrolet)', 'Vehicle'),
('Myeik House', 'House'),
('Yangon House', 'House');