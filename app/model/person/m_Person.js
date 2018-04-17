Ext.define('FisDerm.model.person.m_Person', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idOccupation', type: 'int'},
        'ocuppation',
        {name: 'idCity', type: 'int'},
        'city',
        'firstName',
        'lastName',
        'names',
        'ci',
        {name: 'idSex', type: 'int'},
        'fBorn',
        'address',
        'image',
        'email',
        {name: 'idTypeBlood', type: 'int'},
        'phones',
        {name: 'disable', type: 'bool'},
        {name: 'idCreate', type: 'int'},
        {name: 'fCreate', type: 'date'},
        {name: 'idUpdate', type: 'int'},
        {name: 'fUpdate', type: 'date'},
        {name: 'idDelete', type: 'int'},
        {name: 'fDelete', type: 'date'}
    ]
});