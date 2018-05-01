/* global Ext */
Ext.application({
    name: 'FisDerm',
    appFolder: 'app',
    requires: [
        'FisDerm.view.main.v_Main',
        'FisDerm.view.main.c_Main',
        'FisDerm.view.main.MainContainerWrap',
        'FisDerm.view.main.MainModel'
    ],
    stores: [
        's_Menu',
        'person.s_Person',
        'staff.s_Staff',
        'appointment.s_Appointment'
    ],
    mainView: 'FisDerm.view.main.v_Main',
    launch: function () {
//        console.log('launch');
    }
});