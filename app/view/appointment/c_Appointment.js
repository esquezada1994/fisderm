var moduleAppointment, selectRoles = new Array(), selectSchedules = new Array();
Ext.define('FisDerm.view.appointment.c_Appointment', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.c_Appointment',
    onView: function (module) {
        validateAccess(module);
        moduleAppointment = Ext.getCmp('moduleAppointment');
        Ext.getStore('store_appointment').load();
    },
    onSearch: function (btn, e) {
        if (btn.xtype === 'button' || e.event.keyCode === 13) {
            var filterSearch = moduleAppointment.down('[name=filterSearch]').getValue();
            var comboRole = moduleAppointment.down('[name=idComboRole]').getValue();
            Ext.getStore('store_appointment').load({
                params: {
                    filter: filterSearch,
                    roles: comboRole
                },
                callback: function (records) {
                    if (records.length <= 0) {
                        Ext.getStore('store_appointment').removeAll();
                    }
                }
            });
        }

    },
    onCleanSearch: function () {
        moduleAppointment.down('[name=filterSearch]').reset();
        moduleAppointment.down('[name=idComboRole]').reset();
        Ext.getStore('store_appointment').load();
    },
    onSelectGrid: function (thisObj, selected, eOpts) {
        if (selected) {
            var formCRUD = moduleAppointment.down('[name=formCRUD]');
            formCRUD.down('[name=btnCreate]').disable();
            formCRUD.down('[name=btnUpdate]').enable();
            var roles = formCRUD.down('[name=idRoles]');
            roles.getStore().load({
                params: {
                    required: selected.data.idRoles
                },
                callback: function (records) {
                    if (records.length > 0) {
                        roles.setValue(selected.data.idRoles);
                        var idRoles = selected.data.idRoles.toString().split(',');
                        for (var i in idRoles) {
                            selectRoles.push({id: parseInt(idRoles[i]), new : false, disable: false});
                        }
                    }
                }
            });
            var person = formCRUD.down('[name=idPerson]');
            if (!inStore(person.getStore(), selected.data.idPerson, 'id')) {
                person.getStore().load({
                    params: {
                        param: selected.data.idPerson
                    },
                    callback: function (records) {
                        if (records.length > 0) {
                            person.setValue(selected.data.idPerson);
                        }
                    }
                });
            }
            var department = formCRUD.down('[name=idDepartment]');
            if (!inStore(department.getStore(), selected.data.idDepartment, 'id')) {
                department.getStore().load({
                    params: {
                        param: selected.data.idDepartment
                    },
                    callback: function (records) {
                        if (records.length > 0) {
                            department.setValue(selected.data.idDepartment);
                        }
                    }
                });
            }
            var salary = formCRUD.down('[name=idTypeSalary]');
            if (!inStore(person.getStore(), selected.data.idTypeSalary, 'id')) {
                salary.getStore().load({
                    params: {
                        param: selected.data.idTypeSalary
                    },
                    callback: function (records) {
                        if (records.length > 0) {
                            salary.setValue(selected.data.idTypeSalary);
                        }
                    }
                });
            }
            var schedule = formCRUD.down('[name=idSchedules]');
            schedule.getStore().load({
                params: {
                    required: selected.data.idSchedules
                },
                callback: function (records) {
                    if (records.length > 0) {
                        schedule.setValue(selected.data.idSchedules);
                        var idSchedules = selected.data.idSchedules.toString().split(',');
                        for (var i in idSchedules) {
                            selectSchedules.push({id: parseInt(idSchedules[i]), new : false, disable: false});
                        }
                    }
                }
            });
            formCRUD.loadRecord(selected);
        }
    },
    onDeselectGrid: function () {
        var formCRUD = moduleAppointment.down('[name=formCRUD]');
        formCRUD.down('[name=btnCreate]').enable();
        formCRUD.down('[name=btnUpdate]').disable();
        formCRUD.reset();
    },
    onCreate: function () {
        var form = moduleAppointment.down('[name=formCRUD]');
        if (form.isValid()) {
            var record = form.getValues();
            Ext.getStore('store_appointment').insert(0, record);
            Ext.getStore('store_appointment').sync();
        } else {
            showMessage(APP_TEXT.FIELDS.INVALID_FORM, 2);
        }
    },
    onUpdate: function () {
        var form = moduleAppointment.down('[name=formCRUD]');
        if (form.isValid()) {
            form.updateRecord(form.activeRecord);
            Ext.getStore('store_appointment').sync();
        } else {
            showMessage(APP_TEXT.FIELDS.INVALID_FORM, 2);
        }
    }
});

function cleanModuleAppointment() {
    var gridRead = moduleAppointment.down('[name=gridRead]');
    var selected = gridRead.getSelection();
    gridRead.getView().deselect(selected);
    return selected;
}