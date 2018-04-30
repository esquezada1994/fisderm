Ext.define('FisDerm.store.get.s_Salary_Type', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'php/Get/getSalaryType.php',
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    fields: [
        {name: 'id', type: 'int'},
        'text'
    ]
});