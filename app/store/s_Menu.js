if (MODULOS.length <= 0)
    run(function (response) {
        if (response === 1)
            llenar_Store_Navegacion();
        else {
            showMessage(MENSAJE_ERROR, 2);
        }
    });
else
    llenar_Store_Navegacion();
function llenar_Store_Navegacion() {
    var itemMenu = {
        'id': 'menu',
        'iconCls': 'x-fa fa-bars',
        'viewType': '',
        'inicio': '',
        'text': 'Menú',
        'name': '',
        'PATH': '',
        'leaf': true,
        'selectable': false,
        'rowCls': 'menuPrincipal',
        'permisos': ''};
    MODULOS.unshift(itemMenu);
    Ext.define('FisDerm.store.s_Menu', {
        extend: 'Ext.data.TreeStore',
        storeId: 'store_menu',
        data: MODULOS,
        fields: [{name: 'text'}],
        root: {
            expanded: true
        }
    });
}

//Ext.define('FisDerm.store.s_Menu', {
//    extend: 'Ext.data.TreeStore',
//    alias: 's_Menu',
//    autoLoad: true,
//    proxy: {
//        type: 'ajax',
//        api: {
//            read: 'php/Login/getDataUser.php'
//        },
//        reader: {
//            type: 'json',
//            rootProperty: 'data',
//            successProperty: 'success'
//        }
//    },
//    listeners: {
//        load: function (thisObj, records, successful, eOpts) {
//            console.log(records);
//            Ext.getStore('s_Menu').insert(0, {
//                'id': 'menu',
//                'iconCls': 'x-fa fa-bars',
//                'viewType': '',
//                'inicio': '',
//                'text': 'Menú',
//                'name': '',
//                'PATH': '',
//                'leaf': true,
//                'selectable': false,
//                'rowCls': 'menuPrincipal',
//                'permisos': ''}
//            );
//        }
//    }
//});

//Ext.define('FisDerm.store.s_Menu', {
//    extend: 'Ext.data.TreeStore',
//    alias: 's_Menu',
//    root: {
//        expanded: true,
//        children: [
//            {
//                text: 'persona',
//                iconCls: 'x-fa fa-desktop',
//                rowCls: 'nav-tree-badge nav-tree-badge-new',
//                viewType: 'persona',
//                routeId: 'persona', // routeId defaults to viewType
//                leaf: false
//            }
//        ]
//    }
//});


