USE employee_trackerdb;

INSERT INTO manager (id, mgr_name) values ('1', 'Jonny Manager1');
INSERT INTO manager (id, mgr_name) values ('2', 'Billy Manager2');
INSERT INTO manager (id, mgr_name) values ('3', 'Luke Manager3');
INSERT INTO manager (id, mgr_name) values ('4', 'Andrea Manager4');

INSERT INTO employees (id, first_name, last_name, role_id, manager_id) values ('1', 'Tony', 'Stark', '1', '1');
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) values ('2', 'Charlie', 'Stark', '2', '2');
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) values ('3', 'John', 'Doe', '3', '3');
INSERT INTO employees (id, first_name, last_name, role_id, manager_id) values ('4', 'Clark', 'Kent', '4', '4');

INSERT INTO department (id, name) values ('1', 'Dev');
INSERT INTO department (id, name) values ('5', 'Sanitation');

INSERT INTO role (id, title, salary, department_id) values ('1', 'Manager', '50000', '1');
INSERT INTO role (id, title, salary, department_id) values ('2', 'Front End', '40000', '1');
INSERT INTO role (id, title, salary, department_id) values ('3', 'Back End', '40000', '1');
INSERT INTO role (id, title, salary, department_id) values ('4', 'Testing', '30000', '1');
INSERT INTO role (id, title, salary, department_id) values ('5', 'Janitorial', '20000', '2');