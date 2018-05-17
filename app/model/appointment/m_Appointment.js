Ext.define('FisDerm.model.appointment.m_Appointment', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idStaff', type: 'int'},
        {name: 'idPerson', type: 'int'},
        {name: 'idTypeAppointment', type: 'int'},
        'dateAppointment',
        'timeAppointment',
        'timeDuration',
        {name: 'cost', type: 'float'},
        {name: 'discount', type: 'float'},
        {name: 'disable', type: 'int'},
        {name: 'enableDiscount', type: 'int'},
        'description'
    ]
});