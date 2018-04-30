Ext.define('FisDerm.view.person.v_Person', {
    extend: 'Ext.panel.Panel',
    xtype: 'person',
    controller: 'c_Person',
    height: HEIGT_VIEWS,
    layout: 'border',
    requires: [
        'Ext.layout.container.Border',
        'FisDerm.view.person.c_Person'
    ],
    id: 'modulePerson',
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
                title: APP_TEXT.PERSON_MODULE.TITLE_FORM,
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
                            margin: '3 0 5 0',
                            defaults: {
                                defaultType: 'textfield',
                                flex: 1,
                                labelWidth: 63,
                                labelAlign: 'top',
                                allowBlank: false,
                                allowOnlyWhitespace: false,
                                blankText: APP_TEXT.GENERAL.FIELD_REQUIRED,
                                afterLabelTextTpl: APP_TEXT.GENERAL.REQUIRED_ASTERISK,
                                defaults: {
                                    flex: 1,
                                    labelWidth: 63,
                                    labelAlign: 'top',
                                    allowBlank: false,
                                    allowOnlyWhitespace: false,
                                    blankText: APP_TEXT.GENERAL.FIELD_REQUIRED,
                                    afterLabelTextTpl: APP_TEXT.GENERAL.REQUIRED_ASTERISK
                                }
                            }
                        },
                        flex: 1,
                        xtype: 'panel',
                        layout: 'vbox',
                        border: 0,
                        items: [
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'container',
                                        layout: 'vbox',
                                        width: '100%',
                                        items: [
                                            {
                                                fieldLabel: APP_TEXT.FIELDS.FIRST_NAME,
                                                name: 'firstName',
                                                emptyText: APP_TEXT.FIELDS.FIRST_NAME,
                                                maxLength: '125',
                                                minLength: '4'
                                            }, {
                                                fieldLabel: APP_TEXT.FIELDS.LAST_NAME,
                                                name: 'lastName',
                                                emptyText: APP_TEXT.FIELDS.LAST_NAME,
                                                maxLength: '125',
                                                minLength: '4'
                                            }
                                        ]
                                    },
                                    {
                                        xtype: 'form',
                                        style: 'text-align:center;',
                                        name: 'formUpload',
                                        border: 0,
                                        height: 90,
                                        items: [
                                            {
                                                xtype: 'image', src: URL_IMG_SISTEMA + 'user.png', name: 'imagePerson', height: 85, width: 85, style: 'text-align:center; border-radius: 50%; border: solid; border-color: #5ecac2;background-size: auto 100%;background-position: center;', listeners: {render: function (me) {
                                                        me.el.on({error: function (e, t, eOmpts) {
                                                                me.setSrc(URL_IMG_SISTEMA + 'user.png');
                                                            }});
                                                    }}
                                            },
                                            {
                                                style: 'position: fixed; top: 67px; z-index:100;',
                                                xtype: 'filefield',
                                                allowOnlyWhitespace: true,
                                                buttonOnly: true,
                                                iconCls: 'x-fa fa-camera',
                                                name: 'image',
                                                msgTarget: 'side',
                                                allowBlank: true,
                                                width: '100%',
                                                anchor: '100%',
                                                buttonConfig: {
                                                    text: '',
                                                    iconCls: 'x-fa fa-camera'
                                                },
                                                listeners: {
                                                    afterrender: function (cmp) {
                                                        cmp.fileInputEl.set({
                                                            accept: '.png, .jpg, .jpeg'
                                                        });
                                                    },
                                                    change: function (evt, fileName) {
                                                        var extension = fileName.split('.').pop();
                                                        if (extension.toLowerCase() === 'png' || extension.toLowerCase() === 'jpg' || extension.toLowerCase() === 'jpeg') {
                                                            changeImage = true;
                                                            var formPersona = modulePerson.down('[name=formCRUD]');
                                                            var fieldImage = formPersona.down('[name=imagePerson]');
                                                            if (evt.fileInputEl.dom.files && evt.fileInputEl.dom.files) {
                                                                var reader = new FileReader();
                                                                reader.onload = function (e) {
                                                                    fieldImage.setSrc(e.target.result);
                                                                };
                                                                reader.readAsDataURL(evt.fileInputEl.dom.files[0]);
                                                            }
                                                        } else {
                                                            showMessage(APP_TEXT.GENERAL.INVALID_IMAGE, 2);
                                                        }
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        fieldLabel: APP_TEXT.FIELDS.CI,
                                        name: 'ci',
                                        emptyText: APP_TEXT.FIELDS.CI,
                                        maskRe: /[0-9.]/,
                                        maxLength: '10',
                                        minLength: '10'
                                    }, {
                                        xtype: 'combobox',
                                        margin: '0 0 0 5',
                                        fieldLabel: APP_TEXT.FIELDS.SEX,
                                        name: 'idSex',
                                        emptyText: APP_TEXT.FIELDS.SEX,
                                        displayField: 'text',
                                        valueField: 'id',
                                        filterPickList: true,
                                        queryMode: 'local',
                                        store: Ext.create('FisDerm.store.get.s_Sex_Type'),
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        fieldLabel: APP_TEXT.FIELDS.BORN,
                                        maskRe: /[0-9./-]/,
                                        name: 'fBorn',
                                        maxLength: '10',
                                        minLength: '10',
                                        xtype: 'datefield',
                                        value: new Date(),
                                        format: 'd/m/Y',
                                        submitFormat: 'Y-m-d',
                                        submitValue: true
                                    }, {
                                        margin: '0 0 0 5',
                                        vtype: 'email',
                                        fieldLabel: APP_TEXT.FIELDS.EMAIL,
                                        name: 'email',
                                        emptyText: APP_TEXT.FIELDS.EMAIL,
                                        maxLength: '125'
                                    }
                                ]
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'combobox',
                                        fieldLabel: APP_TEXT.FIELDS.TYPE_BLOOD,
                                        name: 'idTypeBlood',
                                        emptyText: APP_TEXT.FIELDS.TYPE_BLOOD,
                                        displayField: 'text',
                                        valueField: 'id',
                                        filterPickList: true,
                                        queryMode: 'local',
                                        store: Ext.create('FisDerm.store.get.s_Blood_Type')
                                    }, {
                                        margin: '0 0 0 5',
                                        xtype: 'combobox',
                                        fieldLabel: APP_TEXT.FIELDS.OCCUPATION,
                                        name: 'idOccupation',
                                        emptyText: APP_TEXT.FIELDS.OCCUPATION,
                                        displayField: 'text',
                                        valueField: 'id',
                                        filterPickList: true,
                                        queryParam: 'param',
                                        queryMode: 'remote',
                                        minChars: 0,
                                        store: Ext.create('FisDerm.store.get.s_Occupations')
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
                                        fieldLabel: APP_TEXT.FIELDS.CITY,
                                        name: 'idCity',
                                        emptyText: APP_TEXT.FIELDS.CITY,
                                        displayField: 'text',
                                        valueField: 'id',
                                        filterPickList: true,
                                        queryParam: 'param',
                                        queryMode: 'remote',
                                        minChars: 0,
                                        store: Ext.create('FisDerm.store.get.s_Cities')
                                    }, {
                                        margin: '0 0 0 5',
                                        fieldLabel: APP_TEXT.FIELDS.ADDRESS,
                                        name: 'address',
                                        emptyText: APP_TEXT.FIELDS.ADDRESS,
                                        maxLength: '250',
                                        minLength: '3'
                                    }
                                ]
                            }, {
                                xtype: 'togglebutton',
                                fieldLabel: 'Habilitado',
                                name: 'disable',
                                value: 0,
                                labelWidth: 60
                            },
                            {
                                margin: 0,
                                height: 100,
                                xtype: 'grid',
                                title: APP_TEXT.PERSON_MODULE.TITLE_GRID_PHONES,
                                name: 'gridPhones',
                                store: Ext.create('FisDerm.store.get.s_Phones'),
                                autoScroll: true,
                                bufferedRenderer: false,
                                border: 0,
                                bodyStyle: 'border: 1px !important; border-style: solid;',
                                requires: [
                                    'Ext.selection.CellModel'
                                ],
                                plugins: {
                                    ptype: 'cellediting',
                                    clicksToEdit: 1
                                },
                                tools: [{
                                        cls: 'btnToolPanel',
                                        tooltip: APP_TEXT.BUTTONS.ADD_PHONE,
                                        iconCls: 'x-fa fa-plus-circle',
                                        handler: 'onAddPhone'
                                    }],
                                columns: [
                                    {flex: 1, dataIndex: 'number', sortable: true,
                                        editor: {
                                            blankText: APP_TEXT.GENERAL.FIELD_REQUIRED,
                                            allowBlank: false,
                                            maxLength: '15',
                                            minLength: '0'
                                        }},
                                    {flex: 1, dataIndex: 'idType', sortable: true, renderer: formatPhoneType,
                                        editor: {
                                            blankText: APP_TEXT.GENERAL.FIELD_REQUIRED,
                                            allowBlank: false,
                                            xtype: 'combobox',
                                            displayField: 'text',
                                            valueField: 'id',
                                            filterPickList: true,
                                            queryMode: 'local',
                                            store: Ext.create('FisDerm.store.get.s_Phone_Type'),
                                            minChars: 0
                                        }},
                                    {flex: 1, dataIndex: 'disable', sortable: true, renderer: formatDisableText},
                                    {
                                        menuDisabled: true,
                                        sortable: false,
                                        xtype: 'actioncolumn',
                                        minWidth: 30,
                                        flex: 1,
                                        items: [{
                                                getClass: function (v, meta, rec) {
                                                    if (rec.data.desactivado) {
                                                        return 'gridAuxCheck x-fa fa-check';
                                                    } else {
                                                        return 'gridAuxDelete x-fa fa-times';
                                                    }
                                                },
                                                handler: function (grid, rowIndex, colIndex) {
                                                    var rec = grid.getStore().getAt(rowIndex);
                                                    if (rec.data.new) {
                                                        grid.getStore().remove(rec);
                                                    } else {
                                                        if (rec.data.disable) {
                                                            rec.set('disable', false);
                                                        } else {
                                                            rec.set('disable', true);
                                                        }
                                                    }
                                                }
                                            }]
                                    }
                                ],
                                split: true,
                                region: 'north',
                                viewConfig: {
                                    emptyText: APP_TEXT.PERSON_MODULE.EMPTY_GRID_PHONES,
                                    enableTextSelection: true,
                                    deferEmptyText: false,
                                    getRowClass: function (record) {
                                        if (record.data.new) {
                                            return 'newRowGrid';
                                        }
                                    }
                                },
                                listeners: {
                                    rowdblclick: function (grid, record) {
                                        if (!record.data.nuevo) {
                                            showAuditoria(grid, record, 'gridAux');
                                        }
                                    },
                                    cancelEdit: function (rowEditing, context) {
                                        rowEdit = rowEditing;
                                        if (rowEditing.context.value === "" && context.record.data.new) {
                                            rowEditing.context.store.remove(context.record);
                                        }
                                    }
                                }
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
                                    cleanModulePerson();
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
                title: APP_TEXT.PERSON_MODULE.TITLE_GRID,
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
                        store: 'store_person',
                        plugins: 'gridfilters',
                        tbar: [
                            {
                                flex: 3,
                                xtype: 'textfield',
                                name: 'filterSearch',
                                emptyText: APP_TEXT.PERSON_MODULE.SEARCH_FIELD,
                                listeners: {
                                    specialkey: 'onSearch'
                                }
                            },
                            {
                                flex: 1,
                                xtype: 'combobox',
                                name: 'idComboCity',
                                emptyText: APP_TEXT.FIELDS.CITY,
                                displayField: 'text',
                                valueField: 'id',
                                filterPickList: true,
                                queryParam: 'param',
                                queryMode: 'remote',
                                minChars: 0,
                                store: Ext.create('FisDerm.store.get.s_Cities'),
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
                                    Ext.getStore('store_person').reload();
                                }
                            }
                        ],
                        columns: [
                            {
                                text: APP_TEXT.FIELDS.CITY,
                                tooltip: APP_TEXT.FIELDS.CITY,
                                dataIndex: 'city',
                                filter: true,
                                sortable: true,
                                flex: 1,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.OCCUPATION,
                                tooltip: APP_TEXT.FIELDS.OCCUPATION,
                                dataIndex: 'ocuppation',
                                filter: true,
                                sortable: true,
                                flex: 1,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.PERSON,
                                tooltip: APP_TEXT.FIELDS.PERSON,
                                dataIndex: 'names',
                                filter: true,
                                sortable: true,
                                flex: 2,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.CI,
                                tooltip: APP_TEXT.FIELDS.CI,
                                dataIndex: 'ci',
                                filter: true,
                                sortable: true,
                                width: 75,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.AGE,
                                tooltip: APP_TEXT.FIELDS.AGE,
                                dataIndex: 'fBorn',
                                filter: true,
                                sortable: true,
                                width: 55,
                                renderer: function (date, metaData) {
                                    var nacimiento = moment(date);
                                    var now = moment();
                                    var age = now.diff(nacimiento, "years") + ' años';
                                    metaData.tdAttr = 'data-qtip=\"' + age + '\"';
                                    return age;
                                }
                            }, {
                                text: APP_TEXT.FIELDS.PHONES,
                                tooltip: APP_TEXT.FIELDS.PHONES,
                                dataIndex: 'phones',
                                filter: true,
                                sortable: true,
                                flex: 1,
                                renderer: showTipConten
                            }, {
                                text: APP_TEXT.FIELDS.EMAIL,
                                tooltip: APP_TEXT.FIELDS.EMAIL,
                                dataIndex: 'email',
                                filter: true,
                                sortable: true,
                                flex: 2,
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
