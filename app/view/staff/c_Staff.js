var moduleStaff, selectRoles = new Array(), selectSchedules = new Array();
Ext.define('FisDerm.view.staff.c_Staff', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.c_Staff',
    onView: function (module) {
        validateAccess(module);
        moduleStaff = Ext.getCmp('moduleStaff');
        Ext.getStore('store_staff').load();
    },
    onSearch: function (btn, e) {
        if (btn.xtype === 'button' || e.event.keyCode === 13) {
            var filterSearch = moduleStaff.down('[name=filterSearch]').getValue();
            var comboRole = moduleStaff.down('[name=idComboRole]').getValue();
            Ext.getStore('store_staff').load({
                params: {
                    filter: filterSearch,
                    roles: comboRole
                },
                callback: function (records) {
                    if (records.length <= 0) {
                        Ext.getStore('store_staff').removeAll();
                    }
                }
            });
        }

    },
    onCleanSearch: function () {
        moduleStaff.down('[name=filterSearch]').reset();
        moduleStaff.down('[name=idComboRole]').reset();
        Ext.getStore('store_staff').load();
    },
    onSelectGrid: function (thisObj, selected, eOpts) {
        if (selected) {
            var formCRUD = moduleStaff.down('[name=formCRUD]');
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
        var formCRUD = moduleStaff.down('[name=formCRUD]');
        formCRUD.down('[name=btnCreate]').enable();
        formCRUD.down('[name=btnUpdate]').disable();
        formCRUD.reset();
    },
    onActionTagRole: function (obj, record, action) {
        var exist = inArray(selectRoles, record.data.id, 'id');
        if (exist) {
            exist.disable = !exist.disable;
        } else {
            selectRoles.push({id: record.data.id, new : true, disable: false});
        }
    },
    onActionTagSchedules: function (obj, record, action) {
        var exist = inArray(selectSchedules, record.data.id, 'id');
        if (exist) {
            exist.disable = !exist.disable;
        } else {
            selectSchedules.push({id: record.data.id, new : true, disable: false});
        }
    },
    onCreate: function () {
        var form = moduleStaff.down('[name=formCRUD]');
        if (form.isValid()) {
            var record = form.getValues();
            record.pass = hex_md5(record.pass);
            record.arrayRoles = JSON.stringify(selectRoles);
            record.arraySchedules = JSON.stringify(selectSchedules);
            Ext.getStore('store_staff').insert(0, record);
            Ext.getStore('store_staff').sync();
        } else {
            showMessage(APP_TEXT.FIELDS.INVALID_FORM, 2);
        }
    },
    onUpdate: function () {
        var form = moduleStaff.down('[name=formCRUD]');
        var grid = moduleStaff.down('[name=gridRead]');
        if (form.isValid()) {
            form.updateRecord(form.activeRecord);
            grid.selection.set('arrayRoles', JSON.stringify(selectRoles));
            grid.selection.set('arraySchedules', JSON.stringify(selectSchedules));
            if (Ext.getStore('store_staff').getUpdatedRecords()[0].modified.pass) {
                grid.selection.set('pass', hex_md5(grid.selection.get('pass')));
            }
            Ext.getStore('store_staff').sync();
        } else {
            showMessage(APP_TEXT.FIELDS.INVALID_FORM, 2);
        }
    }
});

function cleanModuleStaff() {
    var gridRead = moduleStaff.down('[name=gridRead]');
    var selected = gridRead.getSelection();
    gridRead.getView().deselect(selected);
    return selected;
}