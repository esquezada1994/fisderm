Ext.define('FisDerm.store.get.s_Phone_Type', {
    extend: 'Ext.data.ArrayStore',
    data: [
        [1, 'Fijo'],
        [2, 'Celular']
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text'}
    ]
});