Ext.define('FisDerm.model.staff.m_Staff', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idPerson', type: 'int'},
        'names',
        {name: 'idDepartment', type: 'int'},
        'department',
        {name: 'idTypeSalary', type: 'int'},
        {name: 'salary', type: 'float'},
        'user',
        'pass',
        'idRoles',
        'idSchedules',
        'arrayRoles',
        'arraySchedules',
        {name: 'disable', type: 'int'}
    ]
});