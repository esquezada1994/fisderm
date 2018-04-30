Ext.define('FisDerm.store.get.s_Department', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'php/Get/getDepartment.php',
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