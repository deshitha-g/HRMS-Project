-- View for display employee data
CREATE VIEW emp_view AS
SELECT
	t1.Employee_ID,
    t1.First_name,
    t1.Last_name,
    t1.Job_Title,
    t2.dept_name,
    t3.pay_grade
FROM
    employee_data AS t1
LEFT JOIN
    department AS t2 ON t1.Dept_ID = t2.Dept_ID
LEFT JOIN
	pay_grade AS t3 ON t1.Pay_Grade_ID = t3.Pay_Grade_ID;


-- View for check password
CREATE VIEW password_check AS
SELECT Employee_ID, User_ID, Password, Job_Title 
FROM employee_account JOIN employee_data 
USING (Employee_ID);


create view leave_req_dept as
select Leave_Req_ID,Employee_ID,Start_Date,No_of_Days,Type,Status,Dept_ID 
from employee_data join leave_request
using (Employee_ID);


create view leave_req_dept_2 as
select Leave_Req_ID,Employee_ID,Start_Date,No_of_Days,Type,Status,Dept_Name
from leave_req_dept join department
using (Dept_ID);


CREATE VIEW leave_count_gender AS
SELECT Employee_ID,Gender, Annual, Casual, No_Pay, Maternity_Leave
FROM Employee_data JOIN leave_limit
USING (Pay_Grade_ID);


-- View for display employee leave count
CREATE VIEW leave_count AS
SELECT Employee_ID, Annual, Casual, No_Pay, Maternity_Leave
FROM Employee_data JOIN leave_limit
USING (Pay_Grade_ID);


-- View for get employee details to the view and edit employee pages
CREATE VIEW Employee_Details AS
SELECT 
    e.Employee_ID, e.First_Name, e.Last_Name, e.Gender, e.Marital_Status, e.Birthday, e.Email, e.Job_Title,
    d.Dependent_ID, d.First_Name AS dFirst_Name, d.Last_Name AS dLast_Name, d.Age, d.Gender AS dGender, d.Relation,
    a.User_ID,
    p.Pay_Grade,
    b.Branch_Name,
    s.Status AS Employment_Status,
    dept.Dept_Name

FROM Employee_Data e
LEFT JOIN Dependent_Information d ON e.Dependent_ID = d.Dependent_ID
JOIN Employee_Account a ON e.Employee_ID = a.Employee_ID
JOIN Pay_Grade p ON e.Pay_Grade_ID = p.Pay_Grade_ID
JOIN Branch b ON e.Branch_ID = b.Branch_ID
JOIN Employment_Status s ON e.Employment_Status = s.Status_ID
JOIN Department dept ON e.Dept_ID = dept.Dept_ID;



create view supervisor_leave_accept as
select Leave_Req_ID,Employee_ID,Supervisor_ID,Start_Date,No_of_Days,Type,Status
from leave_request join supervisor where leave_request.Employee_ID = supervisor.Subordinate_ID;


-- View for display employee salaries
CREATE VIEW EmployeeSalaries AS
SELECT
    E.Employee_ID,
    E.First_Name,
    E.Last_Name,
    E.Job_Title,
    PG.Pay_Grade,
    PG.Basic_Salary
FROM
    Employee_Data E
INNER JOIN
    Pay_Grade PG ON E.Pay_Grade_ID = PG.Pay_Grade_ID;



-- Create a view to get all employee data for HR Managers
CREATE VIEW HRManagerEmployeeData AS
SELECT
    Employee_ID,First_Name,Last_Name,Gender,Marital_Status,Birthday,Email,Employment_Status,Job_Title,Pay_Grade_ID,Branch_ID,Dept_ID,Dependent_ID
FROM Employee_Data
WHERE Job_Title = 'HR Manager';

-- Create a view to get all employee data for Software Engineers
CREATE VIEW SoftwareEngineerEmployeeData AS
SELECT
    Employee_ID,First_Name,Last_Name,Gender,Marital_Status,Birthday,Email,Employment_Status,Job_Title,Pay_Grade_ID,Branch_ID,Dept_ID,Dependent_ID
FROM Employee_Data
WHERE Job_Title = 'Software Engineer';
-- Create a view to get all employee data for Accountants
CREATE VIEW AccountantEmployeeData AS
SELECT
    Employee_ID,First_Name,Last_Name,Gender,Marital_Status,Birthday,Email,Employment_Status,Job_Title,Pay_Grade_ID,Branch_ID,Dept_ID,Dependent_ID
FROM Employee_Data
WHERE Job_Title = 'Accountant';
-- Create a view to get all employee data for QA_Engineers
CREATE VIEW QA_EngineerEmployeeData AS
SELECT
    Employee_ID,First_Name,Last_Name,Gender,Marital_Status,Birthday,Email,Employment_Status,Job_Title,Pay_Grade_ID,Branch_ID,Dept_ID,Dependent_ID
FROM Employee_Data
WHERE Job_Title = 'QA Engineer';

