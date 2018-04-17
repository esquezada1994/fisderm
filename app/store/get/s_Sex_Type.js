Ext.define('FisDerm.store.get.s_Sex_Type', {
    extend: 'Ext.data.ArrayStore',
    data: [
        [1, 'Masculino'],
        [2, 'Femenino']
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text'}
    ]
});