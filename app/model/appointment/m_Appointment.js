Ext.define('FisDerm.model.appointment.m_Appointment', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idStaff', type: 'int'},
        {name: 'idPerson', type: 'int'},
        {name: 'idTypeAppointment', type: 'int'},
        {name: 'dateAppointment', type: 'date', formatDate: 'd/m/Y H:i'},
        {name: 'timeAppointment', type: 'date', formatDate: 'H:i'},
        {name: 'cost', type: 'float'},
        {name: 'discount', type: 'float'},
        {name: 'disable', type: 'int'}
    ]
});