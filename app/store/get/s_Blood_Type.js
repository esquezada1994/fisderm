Ext.define('FisDerm.store.get.s_Blood_Type', {
    extend: 'Ext.data.ArrayStore',
    data: [
        [1, 'O+'],
        [2, 'O-'],
        [3, 'A+'],
        [4, 'A-'],
        [5, 'B+'],
        [6, 'B-'],
        [7, 'AB+'],
        [8, 'AB-']
    ],
    fields: [
        {name: 'id', type: 'int'},
        {name: 'text'}
    ]
});