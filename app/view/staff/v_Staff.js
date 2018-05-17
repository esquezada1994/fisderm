Ext.define('FisDerm.view.staff.v_Staff', {
    extend: 'Ext.panel.Panel',
    xtype: 'staff',
    controller: 'c_Staff',
    height: HEIGT_VIEWS,
    layout: 'border',
    requires: [
        'Ext.layout.container.Border',
        'FisDerm.view.staff.c_Staff'
    ],
    id: 'moduleStaff',
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
                title: APP_TEXT.STAFF_MODULE.TITLE_FORM,
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
                                fieldLabel: APP_TEXT.FIELDS.ROLE,
                                emptyText: APP_TEXT.FIELDS.ROLE,
                                name: 'idRoles',
                                xtype: 'tagfield',
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                allowOnlyWhitespace: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                growMax: 30,
                                store: Ext.create('FisDerm.store.get.s_Roles'),
                                minChars: 0,
                                listeners: {
                                    beforeselect: 'onActionTagRole',
                                    beforedeselect: 'onActionTagRole'
                                }
                            },
                            {
                                fieldLabel: APP_TEXT.FIELDS.PERSON,
                                emptyText: APP_TEXT.FIELDS.PERSON,
                                name: 'idPerson',
                                xtype: 'combobox',
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                store: Ext.create('FisDerm.store.get.s_Person'),
                                minChars: 0,
                                listeners: {
                                    beforequery: function (queryEvent, eOpts) {
                                        queryEvent.combo.store.proxy.extraParams = {required: true};
                                    }
                                }
                            }, {
                                fieldLabel: APP_TEXT.FIELDS.DEPARTMENT,
                                emptyText: APP_TEXT.FIELDS.DEPARTMENT,
                                name: 'idDepartment',
                                xtype: 'combobox',
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                store: Ext.create('FisDerm.store.get.s_Department'),
                                minChars: 0
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        fieldLabel: APP_TEXT.FIELDS.USER,
                                        emptyText: APP_TEXT.FIELDS.USER,
                                        name: 'user',
                                        minLength: '3',
                                        maxLength: '50',
                                        maskRe: new RegExp("^[a-zA-Z1-9_]+$"),
                                        listeners: {
                                            change: function (thisObj, e, eOpts) {
                                                thisObj.setValue(e.toLowerCase());
                                            }
                                        }
                                    }, {
                                        margin: '0 0 0 5',
                                        fieldLabel: APP_TEXT.FIELDS.PASS,
                                        emptyText: APP_TEXT.FIELDS.PASS,
                                        inputType: 'password',
                                        name: 'pass',
                                        minLength: '6'
                                    }
                                ]
                            },
                            {
                                margin: 0,
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: APP_TEXT.FIELDS.TYPE_SALARY,
                                        name: 'idTypeSalary',
                                        emptyText: APP_TEXT.FIELDS.TYPE_SALARY,
                                        displayField: 'text',
                                        valueField: 'id',
                                        filterPickList: true,
                                        queryParam: 'param',
                                        queryMode: 'remote',
                                        minChars: 0,
                                        store: Ext.create('FisDerm.store.get.s_Salary_Type')
                                    }, {
                                        xtype: 'numberfield',
                                        allowDecimal: true,
                                        margin: '0 0 0 5',
                                        fieldLabel: APP_TEXT.FIELDS.SALARY,
                                        name: 'salary',
                                        emptyText: APP_TEXT.FIELDS.SALARY,
                                        maxValue: 10000,
                                        minValue: 0
                                    }
                                ]
                            },
                            {
                                fieldLabel: APP_TEXT.FIELDS.SCHEDULE,
                                emptyText: APP_TEXT.FIELDS.SCHEDULE,
                                name: 'idSchedules',
                                xtype: 'tagfield',
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                allowOnlyWhitespace: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                growMax: 50,
                                store: Ext.create('FisDerm.store.get.s_Schedules'),
                                minChars: 0,
                                listeners: {
                                    beforeselect: 'onActionTagSchedules',
                                    beforedeselect: 'onActionTagSchedules'
                                }
                            }, {
                                xtype: 'togglebutton',
                                fieldLabel: APP_TEXT.FIELDS.ENABLED,
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
                title: APP_TEXT.STAFF_MODULE.TITLE_GRID,
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

                        xtype: 'grid',
                        name: 'gridRead',
                        requires: [
                            'Ext.toolbar.Paging',
                            'Ext.ux.ProgressBarPager'
                        ],
                        frame: true,
                        store: 'store_staff',
                        plugins: 'gridfilters',
                        tbar: [
                            {
                                flex: 3,
                                xtype: 'textfield',
                                name: 'filterSearch',
                                emptyText: APP_TEXT.STAFF_MODULE.SEARCH_FIELD,
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
                                    Ext.getStore('store_staff').reload();
                                }
                            }
                        ],
                        columns: [
                            {
                                text: APP_TEXT.FIELDS.PERSON,
                                tooltip: APP_TEXT.FIELDS.PERSON,
                                dataIndex: 'names',
                                filter: true,
                                sortable: true,
                                flex: 2,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.USER,
                                tooltip: APP_TEXT.FIELDS.USER,
                                dataIndex: 'user',
                                filter: true,
                                sortable: true,
                                flex: 1,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.ROLE,
                                tooltip: APP_TEXT.FIELDS.ROLE,
                                dataIndex: 'roles',
                                filter: true,
                                sortable: true,
                                flex: 2,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.DEPARTMENT,
                                tooltip: APP_TEXT.FIELDS.DEPARTMENT,
                                dataIndex: 'department',
                                filter: true,
                                sortable: true,
                                flex: 1,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.STATE,
                                tooltip: APP_TEXT.FIELDS.STATE,
                                dataIndex: 'disable',
                                filter: true,
                                sortable: true,
                                width: 40,
                                renderer: formatDisablePoint
                            }],
                        bbar: {
                            xtype: 'pagingtoolbar',
                            displayInfo: true,
                            plugins: 'ux-progressbarpager',
                            emptyMsg: APP_TEXT.GENERAL.PAGING_EMPTY,
                            displayMsg: APP_TEXT.GENERAL.PAGING_VIEW,
                            beforePageText: APP_TEXT.GENERAL.PAGING_BEFORE,
                            afterPageText: APP_TEXT.GENERAL.PAGING_AFTER,
                            firstText: APP_TEXT.GENERAL.PAGING_FIRST,
                            prevText: APP_TEXT.GENERAL.PAGING_PREV,
                            nextText: APP_TEXT.GENERAL.PAGING_NEXT,
                            lastText: APP_TEXT.GENERAL.PAGING_LAST,
                            refreshText: APP_TEXT.GENERAL.PAGING_REFRESH,
                            listeners: {
                                afterrender: function () {
                                    this.child('#refresh').hide();
                                }
                            }
                        },
                        viewConfig: {
                            emptyText: APP_TEXT.GENERAL.EMPTY_GRID,
                            enableTextSelection: true,
                            deferEmptyText: false
                        },
                        listeners: {
                            select: 'onSelectGrid',
                            deselect: 'onDeselectGrid',
                        }
                    }
                ]
            }
        ];
        this.callParent(arguments);
    }
});
