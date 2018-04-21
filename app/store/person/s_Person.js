Ext.define('FisDerm.store.person.s_Person', {
    extend: 'Ext.data.Store',
    model: 'FisDerm.model.person.m_Person',
    storeId: 'store_person',
    pageSize: 2,
    remoteSort: true,
    proxy: {
        type: 'ajax',
        enablePaging: true,
        api: {
            read: 'php/Person/read.php',
            create: 'php/Person/create.php',
            update: 'php/Person/update.php',
            destroy: 'php/Person/delete.php'
        },
        reader: {
            type: 'json',
            rootProperty: 'data',
            successProperty: 'success'
        }
    },
    onCreateRecords: function (records, operation, success) {
        if (!success) {
            Ext.getStore('store_person').remove(records);
            showMessage(APP_TEXT.GENERAL.FAIL_CREATE, 2);
        } else {
            showMessage(APP_TEXT.GENERAL.OK_CREATE, 1);
        }
    },
    onUpdateRecords: function (records, operation, success) {
        if (!success) {
            Ext.getStore('store_person').rejectChanges()
            showMessage(APP_TEXT.GENERAL.FAIL_UPDATE, 2);
        } else {
            showMessage(APP_TEXT.GENERAL.OK_UPDATE, 1);
        }
    },
    listeners: {
        write: function (store, operation, eOpts) {
            if ((operation.getRequest().getInitialConfig(['action']) === 'create') ||
                    (operation.getRequest().getInitialConfig(['action']) === 'update')) {
                cleanModulePerson();
            }
        },
        beforeload: function () {
            var gridRead = modulePerson.down('[name=gridRead]');
            gridRead.getView().deselect(gridRead.getSelection());
        }
    }
});

