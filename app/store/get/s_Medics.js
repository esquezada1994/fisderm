Ext.define('FisDerm.store.get.s_Medics', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'php/Get/getMedics.php',
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    fields: [
        {name: 'id', type: 'int'},
        'text',
        {name: 'salary', type: 'int'},
        {name: 'typeSalary', type: 'int'}
    ]
});