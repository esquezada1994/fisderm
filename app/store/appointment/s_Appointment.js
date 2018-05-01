Ext.define('FisDerm.store.appointment.s_Appointment', {
    extend: 'Ext.data.Store',
    model: 'FisDerm.model.appointment.m_Appointment',
    storeId: 'store_appointment',
    pageSize: 2,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        enablePaging: true,
        api: {
            read: 'php/Appointment/read.php',
            create: 'php/Appointment/create.php',
            update: 'php/Appointment/update.php'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        }
    },
    onCreateRecords: function (records, operation, success) {
        if (!success) {
            Ext.getStore('store_appointment').remove(records);
            showMessage(APP_TEXT.GENERAL.FAIL_CREATE, 2);
        } else {
            cleanModuleAppointment();
            Ext.getStore('store_appointment').load();
            showMessage(APP_TEXT.GENERAL.OK_CREATE, 1);
        }
    },
    onUpdateRecords: function (records, operation, success) {
        if (!success) {
            Ext.getStore('store_appointment').rejectChanges()
            showMessage(APP_TEXT.GENERAL.FAIL_UPDATE, 2);
        } else {
            showMessage(APP_TEXT.GENERAL.OK_UPDATE, 1);
        }
    },
    listeners: {
        beforeload: function () {
        }
    }
});

