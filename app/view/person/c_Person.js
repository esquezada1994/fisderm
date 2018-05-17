var modulePerson, changeImage = false;
Ext.define('FisDerm.view.person.c_Person', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.c_Person',
    onView: function (module) {
        validateAccess(module);
        modulePerson = Ext.getCmp('modulePerson');
        Ext.getStore('store_person').load();
    },
    onSearch: function (btn, e) {
        if (btn.xtype === 'button' || e.event.keyCode === 13) {
            var filterSearch = modulePerson.down('[name=filterSearch]').getValue();
            var comboCity = modulePerson.down('[name=idComboCity]').getValue();
            Ext.getStore('store_person').load({
                params: {
                    filter: filterSearch,
                    city: comboCity
                },
                callback: function (records) {
                    if (records.length <= 0) {
                        Ext.getStore('store_person').removeAll();
                    }
                }
            });
        }

    },
    onCleanSearch: function () {
        modulePerson.down('[name=filterSearch]').reset();
        modulePerson.down('[name=idComboCity]').reset();
        Ext.getStore('store_person').load();
    },
    onSelectGrid: function (thisObj, selected, eOpts) {
        if (selected) {
            var formCRUD = modulePerson.down('[name=formCRUD]');
            formCRUD.down('[name=btnCreate]').disable();
            formCRUD.down('[name=btnUpdate]').enable();
            var occupation = formCRUD.down('[name=idOccupation]');
            if (!inStore(occupation.getStore(), selected.data.idOccupation, 'id')) {
                occupation.getStore().load({
                    params: {
                        param: selected.data.idOccupation
                    }
                });
            }
            var city = formCRUD.down('[name=idCity]');
            if (!inStore(city.getStore(), selected.data.idCity, 'id')) {
                city.getStore().load({
                    params: {
                        param: selected.data.idCity
                    }
                });
            }
            var storePhones = modulePerson.down('[name=gridPhones]').getStore();
            storePhones.load({
                params: {
                    idPersona: selected.data.id
                },
                callback: function (records) {
                    if (records.length === 0) {
                        storePhones.removeAll();
                    }
                }
            });
            formCRUD.loadRecord(selected);
        }
    },
    onDeselectGrid: function () {
        var formCRUD = modulePerson.down('[name=formCRUD]');
        formCRUD.down('[name=btnCreate]').enable();
        formCRUD.down('[name=btnUpdate]').disable();
        formCRUD.reset();
        var gridPhones = modulePerson.down('[name=gridPhones]');
        gridPhones.getStore().removeAll();
    },
    onAddPhone: function () {
        var gridPhones = modulePerson.down('[name=gridPhones]');
        var record = {
            idType: 1,
            number: '',
            disable: false,
            new : true
        };
        gridPhones.getStore().insert(0, record);
        gridPhones.editingPlugin.startEdit(gridPhones.getStore().data.items[0], 0);
    },
    onGetData: function () {
        var dataPhones = [];
        var storePhones = modulePerson.down('[name=gridPhones]').getStore();
        var dataCreate = storePhones.getData().items;
        var dataUpdate = storePhones.getUpdatedRecords();
        for (var i in dataCreate) {
            if (dataCreate[i].data.new) {
                dataPhones.push({
                    number: dataCreate[i].data.number,
                    idType: dataCreate[i].data.idType,
                    disable: dataCreate[i].data.disable,
                    new : true
                });
            }
        }
        for (var i in dataUpdate) {
            if (!dataUpdate[i].data.new) {
                dataPhones.push({
                    id: dataUpdate[i].data.id,
                    number: dataUpdate[i].data.number,
                    idType: dataUpdate[i].data.idType,
                    disable: dataUpdate[i].data.disable,
                    new : false
                });
            }
        }
        return {phones: JSON.stringify(dataPhones)};
    },
    onCreate: function () {
        var form = modulePerson.down('[name=formCRUD]');
        var data = this.onGetData();
        Ext.getStore('store_person').proxy.extraParams = data;
        if (form.isValid()) {
            if (changeImage) {
                var formUpload = modulePerson.down('[name=formUpload]');
                formUpload.submit({
                    url: 'php/upload.php?ruta=' + URL_IMG_PERSONAS + '&nombre=' + form.getValues().ci,
                    waitMsg: 'Subiendo imagen...',
                    success: function (fp, o) {
                        var record = form.getValues();
                        record.image = o.result.message;
                        Ext.getStore('store_person').insert(0, record);
                        Ext.getStore('store_person').sync();
                    },
                    failure: function (fp, o) {
                        form.down('[name=image]').setSrc(URL_IMG_SISTEMA + 'user.png');
                        showMessage(o.result.message, 2);
                    }
                });
            } else {
                Ext.getStore('store_person').insert(0, form.getValues());
                Ext.getStore('store_person').sync();
            }
        } else {
            showMessage(APP_TEXT.FIELDS.INVALID_FORM, 2);
        }
    },
    onUpdate: function () {
        var form = modulePerson.down('[name=formCRUD]');
        var data = this.onGetData();
        Ext.getStore('store_person').proxy.extraParams = data;
        if (form.isValid()) {
            if (changeImage) {
                var formUpload = modulePerson.down('[name=formUpload]');
                formUpload.submit({
                    url: 'php/upload.php?ruta=' + URL_IMG_PERSONAS + '&nombre=' + form.getValues().ci,
                    waitMsg: 'Subiendo imagen...',
                    success: function (fp, o) {
                        form.updateRecord(form.activeRecord);
                        Ext.getStore('store_person').sync();
                    },
                    failure: function (fp, o) {
                        form.down('[name=image]').setSrc(URL_IMG_SISTEMA + 'user.png');
                        showMessage(o.result.message, 2);
                    }
                });
            } else {
                form.updateRecord(form.activeRecord);
                Ext.getStore('store_person').sync();
            }
        } else {
            showMessage(APP_TEXT.FIELDS.INVALID_FORM, 2);
        }
    }
});

function cleanModulePerson() {
    modulePerson.down('[name=formCRUD]').reset();
    var gridRead = modulePerson.down('[name=gridRead]');
    var selected = gridRead.getSelection();
    gridRead.getView().deselect(selected);
    var gridPhones = modulePerson.down('[name=gridPhones]');
    gridPhones.getStore().removeAll();
    return selected;
}