Ext.define('FisDerm.store.get.s_Occupations', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'php/Get/getOccupations.php',
        method: 'GET',
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text'},
        {name: 'occupation'},
        {name: 'abbreviation'},
        {name: 'disable', type: 'bool'}
    ]
});