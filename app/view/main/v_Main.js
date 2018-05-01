Ext.define('FisDerm.view.main.v_Main', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.v_Main',
    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree',
        'FisDerm.view.main.c_Main',
        'FisDerm.view.main.MainContainerWrap',
        'FisDerm.view.main.MainModel',
        'FisDerm.view.main.ToggleComponent',
        'FisDerm.view.person.v_Person',
        'FisDerm.view.staff.v_Staff',
        'FisDerm.view.appointment.v_Appointment'
    ],
    controller: 'main',
    viewModel: 'main',
    cls: 'sencha-dash-viewport',
    itemId: 'v_Main',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        render: 'onMainViewRender',
        afterrender: 'onLoadModulos'
    },
    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            id: 'toolbarMain',
            style: {
                background: '#074975',
                color: 'white',
                border: '1px solid #36beb3'
            },
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
//                    html: '<div class="main-logo"><img src="' + IMG_LOGO + '" width="185"><div class="titulo">' + APP + '</div><!--<div class="subtitulo">' + TITULO_MAIN_APP + '</div>--></div>',
                    width: 150
                },
                '->',
                {
                    xtype: 'label',
//                    html: '<div class = "subtitulo">' + DIAS[FECHA_ACTUAL.getDay()] + ', ' + FECHA_ACTUAL.getDate() + ' de ' + MESES[FECHA_ACTUAL.getMonth()] + '&nbsp&nbsp&nbsp&nbsp&nbsp<span class="barra">|</span>&nbsp&nbsp&nbsp&nbsp&nbsp<span id="reloj" style="font-weight: bold;">00:00:00</span>&nbsp&nbsp&nbsp&nbsp&nbsp' + '</div>'
                },
                {
                    xtype: 'button',
                    id: 'btnAlarmas',
                    iconCls: 'x-fa fa-bell',
                    ui: 'header',
                    tooltip: 'Ver Alarmas',
                    badgeText: 0,
                    cls: 'gray-badge',
                    arrowVisible: false,
                    menu: [],
                    handler: function () {
                        verAlarmas();
                    },
                    hidden: true
                },
                {
                    xtype: 'container',
                    width: '1%'
                },
                {
                    xtype: 'image',
                    name: 'FOTO_PERFIL',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt: 'Imagen de Usuario',
//                    src: URL_IMG_SISTEMA + 'usuario.png',
                    listeners: {
                        render: function (me) {
                            me.el.on({
                                error: function (e, t, eOmpts) {
//                                    me.setSrc(URL_IMG_SISTEMA + 'usuario.png');
                                }
                            });
                        }
                    }
                },
                {
                    xtype: 'button',
                    name: 'NOMBRE_USUARIO',
                    text: 'ADMIN',
                    style: 'color:white!important;',
                    menu: [
//                        {text: 'Mi Perfil', iconCls: 'x-fa fa-user', style: {}},
//                        {text: 'Configuracion', iconCls: 'x-fa fa-cogs', handler: '', style: {}},
//                        {text: 'Ayuda', iconCls: 'x-fa fa-question-circle', handler: '', style: {}},
                        {text: 'Salir', iconCls: 'x-fa fa-sign-out', handler: 'onSalir', style: {}}]
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'store_menu',
                    width: WIDTH_NAVEGACION,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        itemClick: 'onClickMenu',
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
