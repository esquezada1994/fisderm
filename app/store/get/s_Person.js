Ext.define('FisDerm.store.get.s_Person', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'php/Get/getPerson.php',
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    fields: [
        {name: 'id', type: 'int'},
        'text',
        'fBorn',
        'cedula',
        'imagen'
    ]
});