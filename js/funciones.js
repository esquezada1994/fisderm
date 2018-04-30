function checkStore(item, store, param) {
    if (storeEmpty(store)) {
        store.load({
            params: param
        });
    } else {
        if (!inStore(store, item, 'id')) {
            store.removeAll();
            store.load({
                params: param
            });
        }
    }
}

function storeEmpty(store) {
    var val = store.data.items.length;
    if (val === 0) {
        return true;
    } else {
        return false;
    }
}

function inStore(store, item, label) {
    var exist = store.findRecord(label, item);
    if (exist !== null) {
        return exist;
    } else {
        return false;
    }
}

function validateAccess(panel) {
    var moduloActual = Ext.getStore('store_menu').findRecord('viewType', panel.xtype).getData();
    var permisos = moduloActual.permisos;
    var formsPanel = panel.query('form');
    for (var i in formsPanel) {
        var btnCreate = formsPanel[i].down('[name=btnCreate]');
        var btnUpdate = formsPanel[i].down('[name=btnUpdate]');
        if (btnCreate && btnUpdate) {
            if (!permisos.create && !permisos.update) {
                formsPanel[i].getForm().getFields().each(function (field) {
                    field.setReadOnly(true);
                });
            }
        }
        if (btnCreate) {
            if (!permisos.create) {
                btnCreate.hide();
            } else {
                btnCreate.enable();
            }
        }
        if (btnUpdate) {
            if (!permisos.update) {
                btnUpdate.hide();
            }
        }
    }
}

function showTipConten(value, metaData, record, rowIdx, colIdx, store) {
    if (value && value !== '') {
        metaData.tdAttr = 'data-qtip="' + value + '"';
        value = (value !== '') ? value : '<span style="color:red">s/n</span>';
        return value;
    }
    return "<center><span style='color:red;'>s/n</span></center>";
}

function formatColor(color) {
    var estado = '';
    (color !== '') ? estado = '<span style="color:' + color + ';font-size:20px;" title="Validado">&#8226;</span>' : estado = '';
    return estado;
}

function showMessage(text) {
    Ext.toast({
        html: text,
        closable: true,
        align: 't',
        slideInDuration: 400,
        minWidth: 400
    });
}

function formatDisablePoint(value) {
    var html = '';
    html = (value) ? '<span style="color:red;font-size:20px;" title="Deshabilitado">&#8226;</span>' : '<span style="color:green;font-size:20px;" title="Habilitado">&#8226;</span>';
    return '<center>' + html + '</center>';
}

function formatDisableText(value) {
    var html = '';
    html = (value) ? '<span style="color:red;" title="Deshabilitado">Deshabilitado</span>' : '<span style="color:green;" title="Habilitado">Habilitado</span>';
    return '<center>' + html + '</center>';
}
function formatPhoneType(value) {
    var store = Ext.create('FisDerm.store.get.s_Phone_Type');
    var record = inStore(store, value, 'id');
    if (record) {
        return record.data.text;
    }
    return value;
}
function inArray(array, item, label) {
    var exist = false;
    array.forEach(function (record) {
        if (record[label] === item) {
            exist = record;
            return true;
        }
    });
    return exist;
}