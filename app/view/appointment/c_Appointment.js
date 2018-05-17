var moduleAppointment, selectRoles = new Array(), selectSchedules = new Array();
Ext.define('FisDerm.view.appointment.c_Appointment', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.c_Appointment',
    onView: function (module) {
        validateAccess(module);
        moduleAppointment = Ext.getCmp('moduleAppointment');
        Ext.getStore('store_appointment').on('load', function(store, records){
            console.log('llega');
            setDataCalendar(records);
        });
        Ext.getStore('store_appointment').load();
        $('#calAppointment').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay,listMonth'
            },
            eventConstraint: {
                start: moment().format('YYYY-MM-DD'),
                end: moment().add(3, 'M').format('YYYY-MM-DD')
            },
            defaultDate: moment().format('YYYY-MM-DD'),
            locale: lang,
            buttonIcons: true, // show the prev/next text
            weekNumbers: true,
            navLinks: true, // can click day/week names to navigate views
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            eventRender: function (eventObj, $el) {

            },
            eventClick: function (calEvent, jsEvent, view) {

            },
            eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
            },
            eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
            }
        });
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
    oSelectTypeAppointment: function (combo, record) {
        var time = Ext.Date.format(new Date('2018-05-05 ' + record.get('timeAppointment')), 'H:i');
        moduleAppointment.down('[name=timeDuration]').setValue(time);
        moduleAppointment.down('[name=cost]').setValue(record.get('cost'));
    },
    oSelectStaff: function (combo, record) {
        if (record.get('typeSalary') === 3) {
            if (record.get('salary') > 0) {
                moduleAppointment.down('[name=cost]').setValue(record.get('salary'));
            }
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
function setDataCalendar(records) {
    $('#calAppointment').fullCalendar('removeEventSources');
    var events = [];
    for (var i in records) {
        events.push(records[i].data);
    }
    $('#calAppointment').fullCalendar('addEventSource', events);
}

function cleanModuleAppointment() {
    moduleAppointment.down('[name=formCRUD]').reset();
}