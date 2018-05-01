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
        render: 'onView'
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
                                minChars: 0
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
                                minChars: 0
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
                                        fieldLabel: APP_TEXT.FIELDS.DATE_APPOINTMENT,
                                        emptyText: APP_TEXT.FIELDS.DATE_APPOINTMENT,
                                        maskRe: /[0-9./-]/,
                                        name: 'dateAppointment',
                                        maxLength: '10',
                                        minLength: '10',
                                        xtype: 'datefield',
                                        value: new Date(),
                                        format: 'd/m/Y',
                                        submitFormat: 'Y-m-d',
                                        submitValue: true
                                    }, {
                                        fieldLabel: APP_TEXT.FIELDS.TIME_APPOINTMENT,
                                        emptyText: APP_TEXT.FIELDS.TIME_APPOINTMENT,
                                        xtype: 'timefield',
                                        allowDecimal: true,
                                        margin: '5 0 0 5',
                                        name: 'timeAppointment',
                                        maxValue: '22:00',
                                        minValue: '07:00'
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
                                        fieldLabel: APP_TEXT.FIELDS.DISCOUNT,
                                        emptyText: APP_TEXT.FIELDS.DISCOUNT,
                                        xtype: 'numberfield',
                                        allowDecimal: true,
                                        margin: '5 0 0 5',
                                        name: 'discount',
                                        maxValue: 10000,
                                        minValue: 0
                                    }
                                ]
                            }, {
                                xtype: 'togglebutton',
                                fieldLabel: 'Habilitado',
                                name: 'disable',
                                value: 0,
                                labelWidth: 60
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
                                    cleanModuleStaff();
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
                title: APP_TEXT.APPOINTMENT_MODULE.TITLE_GRID,
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
                        html: '<div id="calendar"></div>'
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
