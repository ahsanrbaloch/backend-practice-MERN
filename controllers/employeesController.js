const  data={
    employees : require('../model/employees.json'),
    setEmployees: function(data) {this.employees=data}
};

const getAllEmployees=(req,res)=>{
    res.json(data.employees);
}

const createNewEmployee=(req,res)=>{
    const newEmployee={
        id: data.employees[data.employees.length -1].id +1 || 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if (!newEmployee.firstname || !newEmployee.lastname){
        return res.status(404).json({'message': 'First and last names are required.'});
    }
    data.setEmployees([...data.employees,newEmployee]);
    res.status(201).json(data.employees);

}

const updateEmployee=(req,res)=>{
    const employee=data.employees.find(emp => emp.id===parseInt(req.body.id));
    if(!employee){
        return res.status(404).json({'message': 'No such id exists'});
    }
    if(req.body.firstname)
    {
        employee.firstname=req.body.firstname;
        employee.lastname=req.body.lastname;
    }
    const filteredEmployees=data.employees.filter(employee => employee.id!==req.body.id);
    const unsortedEmployees=[...filteredEmployees, employee];
    res.json(unsortedEmployees.sort((a,b)=> {
        return a-b;
    }));
    res.json(data.employees);

} 

const deleteEmployee=(req,res)=>{
    const employee=data.employees.find(emp=>emp.id===req.body.id);
    if(!employee)
    {
        return res.status(404).json({'message': 'No such id exists'});
    }
    const filteredEmployees=data.employees.filter(employee => employee.id!==req.body.id);
    data.setEmployees([...filteredEmployees]);
    res.json(data.employees);
}

const getEmployee=(req,res)=>{
    const employee=data.employees.find(emp=>emp.id===req.body.id);
    if(!employee)
    {
        return res.status(404).json({'message': 'No such id exists'});
    }
    res.json(employee);
}

module.exports={
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}