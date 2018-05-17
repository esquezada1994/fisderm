Ext.define('FisDerm.view.appointment.v_Appointment', {
    extend: 'Ext.panel.Panel',
    xtype: 'appointment',
    controller: 'c_Appointment',
    height: HEIGT_VIEWS,
    layout: 'border',
    requires: [
        'Ext.layout.container.Border',
        'FisDerm.view.appointment.c_Appointment'
    ],
    id: 'moduleAppointment',
    bodyBorder: false,
    defaults: {
        margin: 3
    },
    listeners: {
        render: 'onView',
        afterrender: function () {
            setTimeout(function () {
                $('#calAppointment').fullCalendar('render');
            }, 300);
        }
    },
    initComponent: function () {
        this.items = [
            {
                flex: 1,
                xtype: 'form',
                name: 'formCRUD',
                plugins: 'responsive',
                title: APP_TEXT.APPOINTMENT_MODULE.TITLE_FORM,
                bodyPadding: 10,
                region: 'west',
                layout: 'fit',
                autoScroll: true,
                responsiveConfig: {
                    wide: {
                        region: 'west',
                        collapsible: true
                    },
                    'width < 900': {
                        region: 'center',
                        collapsible: false
                    }
                },
                items: [
                    {
                        defaults: {
                            width: '100%',
                            defaultType: 'textfield',
                            margin: '5 0 5 0',
                            labelAlign: 'top',
                            allowBlank: false,
                            allowOnlyWhitespace: false,
                            blankText: APP_TEXT.GENERAL.FIELD_REQUIRED,
                            afterLabelTextTpl: APP_TEXT.GENERAL.REQUIRED_ASTERISK,
                            defaults: {
                                flex: 1,
                                margin: '5 0 5 0',
                                labelAlign: 'top',
                                allowBlank: false,
                                allowOnlyWhitespace: false,
                                blankText: APP_TEXT.GENERAL.FIELD_REQUIRED,
                                afterLabelTextTpl: APP_TEXT.GENERAL.REQUIRED_ASTERISK
                            }
                        },
                        flex: 1,
                        xtype: 'panel',
                        layout: 'vbox',
                        border: 0,
                        items: [
                            {
                                fieldLabel: APP_TEXT.FIELDS.TYPE_APPOINTMENT,
                                emptyText: APP_TEXT.FIELDS.TYPE_APPOINTMENT,
                                name: 'idTypeAppointment',
                                xtype: 'combobox',
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                store: Ext.create('FisDerm.store.get.s_Appointment_Type'),
                                minChars: 0,
                                listeners: {
                                    select: 'oSelectTypeAppointment'
                                }
                            }, {
                                fieldLabel: APP_TEXT.APPOINTMENT_MODULE.LABEL_MEDIC_PHYSICIAN,
                                emptyText: APP_TEXT.APPOINTMENT_MODULE.LABEL_MEDIC_PHYSICIAN,
                                name: 'idStaff',
                                xtype: 'combobox',
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                store: Ext.create('FisDerm.store.get.s_Medics'),
                                minChars: 0,
                                listeners: {
                                    select: 'oSelectStaff'
                                }
                            }, {
                                fieldLabel: APP_TEXT.FIELDS.PATIENT,
                                emptyText: APP_TEXT.FIELDS.PATIENT,
                                name: 'idPerson',
                                xtype: 'combobox',
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                store: Ext.create('FisDerm.store.get.s_Person'),
                                minChars: 0
                            },
                            {
                                margin: 0,
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        fieldLabel: APP_TEXT.FIELDS.APPOINTMENT_DATE,
                                        emptyText: APP_TEXT.FIELDS.APPOINTMENT_DATE,
                                        maskRe: /[0-9./-]/,
                                        name: 'dateAppointment',
                                        maxLength: '10',
                                        minLength: '10',
                                        xtype: 'datefield',
                                        value: new Date(),
                                        format: 'd/m/Y',
                                        submitFormat: 'Y-m-d',
                                        submitValue: true
                                    },
                                    {
                                        fieldLabel: APP_TEXT.FIELDS.APPOINTMENT_TIME,
                                        emptyText: APP_TEXT.FIELDS.APPOINTMENT_TIME,
                                        allowOnlyWhitespace: true,
                                        xtype: 'timefield',
                                        allowDecimal: true,
                                        margin: '5 0 0 5',
                                        name: 'timeAppointment',
                                        maxValue: '22:00',
                                        minValue: '07:00',
                                        format: 'H:i',
                                        submitFormat: 'H:i:s',
                                        increment: 30
                                    }, {
                                        fieldLabel: APP_TEXT.FIELDS.APPOINTMENT_DURATION,
                                        emptyText: APP_TEXT.FIELDS.APPOINTMENT_DURATION,
                                        allowOnlyWhitespace: true,
                                        xtype: 'timefield',
                                        allowDecimal: true,
                                        margin: '5 0 0 5',
                                        name: 'timeDuration',
                                        increment: 30,
                                        format: 'H:i',
                                        submitFormat: 'H:i:s',
                                        maxValue: '03:00',
                                        minValue: '00:10'
                                    }
                                ]
                            },
                            {
                                margin: 0,
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        fieldLabel: APP_TEXT.FIELDS.COST,
                                        emptyText: APP_TEXT.FIELDS.COST,
                                        xtype: 'numberfield',
                                        allowDecimal: true,
                                        name: 'cost',
                                        maxValue: 10000,
                                        minValue: 0
                                    }, {
                                        disabled: true,
                                        fieldLabel: APP_TEXT.FIELDS.DISCOUNT,
                                        emptyText: APP_TEXT.FIELDS.DISCOUNT,
                                        xtype: 'numberfield',
                                        allowDecimal: true,
                                        margin: '5 0 0 5',
                                        name: 'discount',
                                        value: 0,
                                        maxValue: 10000,
                                        minValue: 0
                                    }
                                ]
                            },
                            {
                                xtype: 'textarea',
                                fieldLabel: APP_TEXT.FIELDS.DESCRIPTION,
                                emptyText: APP_TEXT.FIELDS.DESCRIPTION,
                                allowOnlyWhitespace: true,
                                afterLabelTextTpl: '',
                                name: 'description',
                                allowBlank: true,
                                maxLength: '250'
                            }, {
                                margin: 0,
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'togglebutton',
                                        fieldLabel: APP_TEXT.FIELDS.ENABLED,
                                        name: 'disable',
                                        value: 0,
                                        labelWidth: 60,
                                        afterLabelTextTpl: ''
                                    }, {
                                        hidden: true,
                                        xtype: 'togglebutton',
                                        fieldLabel: APP_TEXT.FIELDS.DISCOUNT,
                                        name: 'enableDiscount',
                                        value: 0,
                                        labelWidth: 60,
                                        afterLabelTextTpl: ''
                                    }
                                ]
                            }
                        ],
                        buttons: [
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-paint-brush',
                                cls: 'btnFormSubmit',
                                tooltip: APP_TEXT.BUTTONS.CLEAN,
                                text: APP_TEXT.BUTTONS.CLEAN,
                                iconAlign: 'top',
                                handler: function () {
                                    cleanModuleAppointment();
                                }
                            },
                            '->',
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-pencil-square-o',
                                cls: 'btnFormSubmit',
                                tooltip: APP_TEXT.BUTTONS.UPDATE,
                                text: APP_TEXT.BUTTONS.UPDATE,
                                iconAlign: 'top',
                                disabled: true,
                                name: 'btnUpdate',
                                handler: 'onUpdate'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-floppy-o',
                                cls: 'btnFormSubmit',
                                tooltip: APP_TEXT.BUTTONS.CREATE,
                                text: APP_TEXT.BUTTONS.CREATE,
                                iconAlign: 'top',
                                name: 'btnCreate',
                                handler: 'onCreate'
                            }
                        ]
                    }
                ]
            },
            {
                flex: 2,
                title: APP_TEXT.APPOINTMENT_MODULE.TITLE_CALENDAR,
                plugins: 'responsive',
                region: 'center',
                layout: 'fit',
                border: 0,
                bodyBorder: 0,
                bodyPadding: 3,
                responsiveConfig: {
                    wide: {
                        region: 'center',
                        collapsible: false
                    },
                    'width < 900': {
                        region: 'south',
                        collapsible: true,
                        collapseDirection: 'bottom'
                    }
                },
                items: [
                    {
                        xtype: 'panel',
                        bodyPadding: 5,
                        tbar: [
                            {
                                flex: 3,
                                xtype: 'textfield',
                                name: 'filterSearch',
                                emptyText: APP_TEXT.APPOINTMENT_MODULE.SEARCH_FIELD,
                                listeners: {
                                    specialkey: 'onSearch'
                                }
                            },
                            {
                                flex: 1,
                                xtype: 'combobox',
                                name: 'idComboRole',
                                emptyText: APP_TEXT.FIELDS.ROLE,
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                minChars: 0,
                                store: Ext.create('FisDerm.store.get.s_Roles'),
                                listeners: {
                                    specialkey: 'onSearch'
                                }
                            },
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-search',
                                cls: 'btnFormSubmit',
                                tooltip: APP_TEXT.BUTTONS.SEARCH,
                                iconAlign: 'top',
                                handler: 'onSearch'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-eraser',
                                cls: 'btnFormSubmit',
                                tooltip: APP_TEXT.BUTTONS.CLEAN,
                                iconAlign: 'top',
                                handler: 'onCleanSearch'
                            },
                            {
                                xtype: 'button',
                                iconCls: 'x-fa fa-refresh',
                                cls: 'btnFormSubmit',
                                tooltip: APP_TEXT.BUTTONS.RELOAD,
                                iconAlign: 'top',
                                handler: function () {
                                    Ext.getStore('store_appointment').reload();
                                }
                            }
                        ],
                        html: '<div id="calAppointment"></div>'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
