Ext.define('FisDerm.store.get.s_Phones', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'php/Get/getPhones.php',
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idPerson', type: 'int'},
        {name: 'idType', type: 'int'},
        {name: 'number'},
        {name: 'disable', type: 'bool'}
    ]
});