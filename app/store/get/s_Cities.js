Ext.define('FisDerm.store.get.s_Cities', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'php/Get/getCities.php',
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text'},
        {name: 'color'},
        {name: 'disable', type: 'bool'}
    ]
});