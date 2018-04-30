Ext.define('FisDerm.store.staff.s_Staff', {
    extend: 'Ext.data.Store',
    model: 'FisDerm.model.staff.m_Staff',
    storeId: 'store_staff',
    pageSize: 2,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        enablePaging: true,
        api: {
            read: 'php/Staff/read.php',
            create: 'php/Staff/create.php',
            update: 'php/Staff/update.php'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        }
    },
    onCreateRecords: function (records, operation, success) {
        if (!success) {
            Ext.getStore('store_staff').remove(records);
            showMessage(APP_TEXT.GENERAL.FAIL_CREATE, 2);
        } else {
            cleanModuleStaff();
            Ext.getStore('store_staff').load();
            showMessage(APP_TEXT.GENERAL.OK_CREATE, 1);
        }
    },
    onUpdateRecords: function (records, operation, success) {
        if (!success) {
            Ext.getStore('store_staff').rejectChanges()
            showMessage(APP_TEXT.GENERAL.FAIL_UPDATE, 2);
        } else {
            showMessage(APP_TEXT.GENERAL.OK_UPDATE, 1);
        }
    },
    listeners: {
        beforeload: function () {
            var gridRead = moduleStaff.down('[name=gridRead]');
            gridRead.getView().deselect(gridRead.getSelection());
        }
    }
});

