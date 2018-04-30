Ext.define('FisDerm.store.get.s_Schedules', {
    extend: 'Ext.data.Store',
    proxy: {
        type: 'ajax',
        url: 'php/Get/getSchedules.php',
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