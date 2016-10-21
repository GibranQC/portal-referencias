registrationModule.controller('referenceController', function($scope, alertFactory, referenceRepository, $rootScope) {
    $scope.message = 'Buscando...';
    $scope.message2 = 'Cargando PDF......';
    $scope.fechaHoy = new Date();
    $scope.searchTypeID = 1;
    var wsData =[];
    $scope.currentIDClient = 0;

    $scope.isWaiting = false;

    $scope.panels = [
        { name: 'Factura', active: true, className: 'active' },
        { name: 'Pedidos', active: false, className: '' },
        { name: 'Cotizaciones', active: false, className: '' }
    ];


    $scope.storeParams = { idCliente: 0, idEmpresas: 0, idSucursales: 0, idDepartamentos: 0 };




    //this is the first method executed in the view
    $scope.init = function() {
        $scope.idUsuario = 15;
        $scope.getCompany.show = false;
        $scope.selectTypeDoc.show = false;
        $scope.getEmpleado();
        $scope.getCompanyByUser();
        $scope.Clientefiltro = true;
        $scope.sinsuc = false;
        $scope.setTablePaging('prueba');
        $scope.searchType = "ID cliente";
               /* if (!($('#lgnUser').val().indexOf('[') > -1)) {
                localStorageService.set('lgnUser', $('#lgnUser').val());
                $scope.getEmpleado();
                location.href = '/newUnits';
            } else {
                if (($('#lgnUser').val().indexOf('[') > -1) && !localStorageService.get('lgnUser')) {
                    if (getParameterByName('employee') != '') {
                        $rootScope.currentEmployee = getParameterByName('employee');
                        location.href = '/newUnits';
                    } else {
                        alert('Inicie sesión desde panel de aplicaciones o desde el login.');
                    }

                }
            }
        $rootScope.currentEmployee = localStorageService.get('lgnUser');*/


    };


    $scope.lstClient = [];

    $scope.getClient = function(clientName) {
        $scope.lstClient = [];
         $scope.lstPedido = [];
        $('#tblPedido').DataTable().destroy();
        $scope.lstFactura = [];
        $('#tblFactura').DataTable().destroy();
        $scope.lstCotizacion = [];
        $('#tblReference').DataTable().destroy();
        $scope.lstFacturaDoc = '';
        $('#tblFacturaDoc').DataTable().destroy();
        $scope.lstPedidoDoc = '';
        $('#tblPedidoDoc').DataTable().destroy();
        $scope.lstCotizaciondOC = '';
        $('#tblReferenceDoc').DataTable().destroy();
        $('#tblClient').DataTable().destroy();
        $('#loadModal').modal('show');
        
        referenceRepository.getClientByName(clientName).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstClient = result.data;


                setTimeout(function() {
                    $scope.setTablePaging('tblClient');
                    $("#tblClient_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);


            } else { $('#loadModal').modal('hide'); }
        });

    };
        

        $scope.getClientId = function(idBusqueda) {
        $scope.lstClient = [];
        $scope.lstPedido = [];
        $('#tblPedido').DataTable().destroy();
        $scope.lstFactura = [];
        $('#tblFactura').DataTable().destroy();
        $scope.lstCotizacion = [];
        $('#tblReference').DataTable().destroy();
        $scope.lstFacturaDoc = '';
        $('#tblFacturaDoc').DataTable().destroy();
        $scope.lstPedidoDoc = '';
        $('#tblPedidoDoc').DataTable().destroy();
        $scope.lstCotizaciondOC = '';
        $('#tblReferenceDoc').DataTable().destroy();
        $scope.mostrar = false;

        $('#tblClient').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getClientById(idBusqueda).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstClient = result.data;
                /*setTimeout(function() {
                    $scope.setTablePaging('tblClient');
                    $("#tblClient_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);*/
            } else { $('#loadModal').modal('hide'); }
        });

    };

   

    $scope.lstFactura = [];
    $scope.lstFacturaDoc = [];

    $scope.getFacturaAllIdDoc = function(clientId) {
        $scope.lstFacturaDoc = '';
        $('#tblFacturaDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getFacturaAllIdDoc(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.numDoc = result.data.length;
                $scope.lstFacturaDoc = result.data;
                setTimeout(function() {
                    $scope.setTablePaging('tblFacturaDoc');
                    $("#tblFacturaDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
            alertFactory.facturas('Se encontraron: '+$scope.numDoc+' Factutas');
            } else { $('#loadModal').modal('hide'); }
        });

    };


    $scope.getFacturasIdDocEmp = function(clientId) {
        $scope.lstFacturaDoc = '';
        $('#tblFacturaDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getFacturasIdDocEmp(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstFacturaDoc = result.data;
                $scope.numDocCot = result.data.length;
                
                setTimeout(function() {
                    $scope.setTablePaging('tblFacturaDoc');
                    $("#tblFacturaDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
            alertFactory.facturas('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else { $('#loadModal').modal('hide'); }
        });

    };
    $scope.getFacturasAll = function(clientId) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getFacturasAll(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                $scope.numDoc = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.facturas('Se encontraron: '+$scope.numDoc+' Factutas');
            } else { $('#loadModal').modal('hide'); }
        });

    };



    $scope.getFacturasEmp = function(obj) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');

        referenceRepository.getFacturasEmp(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                $scope.numDoc = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.facturas('Se encontraron: '+$scope.numDoc+' Factutas');
            } else { $('#loadModal').modal('hide'); }
        });

    };




    $scope.getFacturasSuc = function(obj) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getFacturasSuc(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                $scope.numDoc = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.facturas('Se encontraron: '+$scope.numDoc+' Factutas');
            } else { $('#loadModal').modal('hide'); }
        });

    };



    $scope.getFacturasDepto = function(obj) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getFacturasDepto(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                $scope.numDoc = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.facturas('Se encontraron: '+$scope.numDoc+' Factutas');
            } else { $('#loadModal').modal('hide'); }
        });

    };


    $scope.lstPedido = [];
    $scope.lstPedidoDoc = [];

    $scope.getpedidoAllIdDoc = function(clientId) {
        $scope.lstPedidoDoc = '';
        $('#tblPedidoDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getpedidoAllIdDoc(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedidoDoc = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedidoDoc');
                    $("#tblPedidoDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                
                }, 1000);
            alertFactory.pedidos('Se encontraron: '+$scope.numDocPe+' Pedidos');
            } else {}
        });

    };

    $scope.getPedidoIdDocEmp = function(clientId) {
        $scope.lstPedidoDoc = '';
        $('#tblPedidoDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getPedidoIdDocEmp(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedidoDoc = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedidoDoc');
                    $("#tblPedidoDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                
                }, 1000);
            alertFactory.pedidos('Se encontraron: '+$scope.numDocPe+' Pedidos');
            } else {}
        });

    };

    $scope.getPedidosAll = function(clientId) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();

        referenceRepository.getPedidosAll(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedido = result.data;
$scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');

                }, 1000);
alertFactory.pedidos('Se encontraron: '+$scope.numDocPe+' Pedidos');
            } else {}
        });

    };


 $scope.getPedidosEmp = function(obj) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();
        referenceRepository.getPedidosEmp(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedido = result.data;
                $scope.numDocPe = result.data.length;    
                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.pedidos('Se encontraron: '+$scope.numDocPe+' Pedidos');
            } else { $('#loadModal').modal('hide'); }
        });

    };

   $scope.getPedidosSuc = function(obj) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getPedidosSuc(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedido = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.pedidos('Se encontraron: '+$scope.numDocPe+' Pedidos');
            } else { $('#loadModal').modal('hide'); }
        });

    };


    $scope.getPedidosDepto = function(obj) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getPedidosDepto(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedido = result.data;
                $scope.numDocPe = result.data.length;
                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.pedidos('Se encontraron: '+$scope.numDocPe+' Pedidos');
            } else { $('#loadModal').modal('hide'); }
        });

    };

//  
    $scope.lstCotizacion = [];
    $scope.lstCotizaciondOC = [];

    $scope.getCotizacionAllIdDoc = function(idCliente) {

        $scope.lstCotizaciondOC = '';
        $('#tblReferenceDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getCotizacionAllIdDoc(idCliente).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstCotizaciondOC = result.data;
                $scope.numDocCot = result.data.length;
                
                setTimeout(function() {
                    $scope.setTablePaging('tblReferenceDoc');
                    $("#tblReferenceDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');

                }, 1000);
                alertFactory.cotizacion('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else {}
        });

    };

        $scope.getCotizacionIdDocEmp = function(idCliente) {

        $scope.lstCotizaciondOC = '';
        $('#tblReferenceDoc').DataTable().destroy();
        $('#loadModal').modal('show');
        referenceRepository.getCotizacionIdDocEmp(idCliente).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstCotizaciondOC = result.data;
                $scope.numDocCot = result.data.length;
                
                setTimeout(function() {
                    $scope.setTablePaging('tblReferenceDoc');
                    $("#tblReferenceDoc_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');

                }, 1000);
                alertFactory.cotizacion('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else {}
        });

    };

        $scope.getCotizacionAll = function(idCliente) {

        $scope.lstCotizacion = '';
        $('#tblReference').DataTable().destroy();

        referenceRepository.getCotizacionAll(idCliente).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstCotizacion = result.data;
                $scope.numDocCot = result.data.length;
                console.log($scope.numDocCot);
                
                setTimeout(function() {
                    $scope.setTablePaging('tblReference');
                    $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');

                }, 1000);
            alertFactory.cotizacion('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else {}
        });

    };

 $scope.getCotizacionEmp = function(obj) {
        $scope.lstCotizacion = '';
        $('#tblReference').DataTable().destroy();
        referenceRepository.getCotizacionEmp(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstCotizacion = result.data;
                $scope.numDocCot = result.data.length;
                
                setTimeout(function() {
                    $scope.setTablePaging('tblReference');
                    $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);
            alertFactory.cotizacion('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else { $('#loadModal').modal('hide'); }
        });

    };


       $scope.getCotizacionSuc = function(obj) {
        $scope.lstCotizacion = '';
        $('#tblReference').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getCotizacionSuc(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstCotizacion = result.data;
                $scope.numDocCot = result.data.length;
                
                setTimeout(function() {
                    $scope.setTablePaging('tblReference');
                    $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.cotizacion('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else { $('#loadModal').modal('hide'); }
        });

    };


    $scope.getCotizacionDepto = function(obj) {
        $scope.lstCotizacion = '';
        $('#tblReference').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getCotizacionDepto(obj).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstCotizacion = result.data;
                $scope.numDocCot = result.data.length;
                
                setTimeout(function() {
                    $scope.setTablePaging('tblReference');
                    $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);
alertFactory.warning('Se encontraron: '+$scope.numDocCot+' Cotizaciones');
            } else { $('#loadModal').modal('hide'); }
        });

    };
    // Función para mosrtrar las empresas
    $scope.getCompany = function() {
        referenceRepository.getCompany().then(function(result) {
            if (result.data.length > 0) {
                $scope.empresas = result.data;
            } else {}
        });
    };

    // Función para selecciobnar el idEmpresa y nombre 
    $scope.seletionCompany = function(idEmpresa, nombreEmpresa) {
        $scope.storeParams.idCliente = $scope.currentIDClient;
        $scope.storeParams.idEmpresas = idEmpresa;
        $scope.getFacturasEmp($scope.storeParams);
        $scope.getPedidosEmp($scope.storeParams);
        $scope.getCotizacionEmp($scope.storeParams);
        $scope.getCompany.show = true;
        $scope.idEmpresa = idEmpresa;
        $scope.nombreEmpresa = nombreEmpresa;
        $scope.idSucursal = null;
        $scope.nombreSucursal = null;
        $scope.departamentos = null;
        $scope.nombreDepartamento = null;
        $scope.getBranchOfficeByIdUser();
    };
    $scope.seletionCompanyDoc = function(idEmpresa, nombreEmpresa) {
            //$scope.lstFacturaDoc = [];
            // $scope.lstPedidoDoc = [];
            // $scope.lstCotizaciondOC =[];
            $scope.storeParams.idDocumento = $scope.currentIDDocumento;
            $scope.storeParams.idEmpresas = idEmpresa;
            $scope.getCompany.show = true;
            $scope.idEmpresa = idEmpresa;
            $scope.nombreEmpresa = nombreEmpresa;
            $scope.getFacturasIdDocEmp($scope.storeParams);
            $scope.getCotizacionIdDocEmp($scope.storeParams);
            $scope.getPedidoIdDocEmp($scope.storeParams);
            $scope.idSucursal = null;
            $scope.nombreSucursal = null;
            $scope.departamentos = null;
            $scope.nombreDepartamento = null;
            //$scope.getBranchOfficeByIdUser();
        };

    // Función para selecciobnar el idSucursal y nombre 
    $scope.seletionBranchoOffice = function(idSucursal, nombreSucursal) {
        $scope.storeParams.idCliente = $scope.currentIDClient;
        $scope.storeParams.idEmpresas = $scope.idEmpresa;
        $scope.storeParams.idSucursales = idSucursal;
        $scope.getFacturasSuc($scope.storeParams);
        $scope.getPedidosSuc($scope.storeParams);
        $scope.getCotizacionSuc($scope.storeParams);
        $scope.idSucursal = idSucursal;
        $scope.nombreSucursal = nombreSucursal;
        $scope.getDepartmentByIdUser();
    };

    $scope.selectDepartment = function(idDepartamento, nombreDepartamento) {

        $scope.storeParams.idCliente = $scope.currentIDClient;
        $scope.storeParams.idEmpresas = $scope.idEmpresa;
        $scope.storeParams.idSucursales = $scope.idSucursal;
        $scope.storeParams.idDepartamentos = idDepartamento;
        $scope.getFacturasDepto($scope.storeParams);
        $scope.getPedidosDepto($scope.storeParams);
        $scope.getCotizacionDepto($scope.storeParams);
        $scope.idDepartamento = idDepartamento;
        $scope.nombreDepartamento = nombreDepartamento;
    };

    //Función para mostrar las sucursales por empresa
    $scope.getBranchOfficeByIdCompany = function() {
        referenceRepository.getBranchOfficeByIdCompany($scope.idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;
            } else {}
        });
    };

    //Función para mostrar los departamentos por sucursl
    $scope.getDepartmentById = function() {
        referenceRepository.getDepartmentById($scope.idSucursal).then(function(result) {
            if (result.data.length > 0) {
                $scope.departamentos = result.data;
            } else {}
        });
    };

    $scope.selectTypeDoc = function(idDocumento, nombreDocumento) {
        $scope.selectTypeDoc.show = true;
        $scope.idDocumento = idDocumento;
        $scope.nombreDocumento = nombreDocumento;
        $scope.cleanInputs();
    };

    $scope.cleanInputs = function() {
        //$scope.nombreDocumento = null;
        $scope.facturaSerie = null;
        $scope.facturaFolio = null;
        $scope.cotizacionFolio = null;
        $scope.pedidoFolio = null;

    };

    $scope.tipoDocumentos = [{
        idDocumento: 1,
        nombreDocumento: 'Factura'
    }, {
        idDocumento: 2,
        nombreDocumento: 'Cotización'
    }, {
        idDocumento: 3,
        nombreDocumento: 'Pedido'
    }];

    $scope.selectBank = function(idBanco) {
        $scope.idBanco = idBanco;
    };

    $scope.getCompanyByUser = function() {
        $scope.promise = referenceRepository.getCompanyByUser($scope.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $scope.empresas = result.data;

            } else {}
        });
    };

    $scope.getBranchOfficeByIdUser = function() {
        referenceRepository.getBranchOfficeByIdUser($scope.idUsuario, $scope.idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;

            } else {}
        });
    };

    $scope.getDepartmentByIdUser = function() {
        referenceRepository.getDepartmentByIdUser($scope.idUsuario, $scope.idSucursal).then(function(result) {
            if (result.data.length > 0) {
                $scope.departamentos = result.data;
            } else {}
        });
    };

    $scope.cotizacionDetalle = [];

// Conversión de formatos de numeros
    $scope.currency =function (value, decimals, separators) {
    decimals = decimals >= 0 ? parseInt(decimals, 0) : 2;
    separators = separators || ['.', "'", ','];
    var number = (parseFloat(value) || 0).toFixed(decimals);
    if (number.length <= (4 + decimals))
        return number.replace('.', separators[separators.length - 1]);
    var parts = number.split(/[-.]/);
    value = parts[parts.length > 1 ? parts.length - 2 : 0];
    var result = value.substr(value.length - 3, 3) + (parts.length > 1 ?
        separators[separators.length - 1] + parts[parts.length - 1] : '');
    var start = value.length - 6;
    var idx = 0;
    while (start > -3) {
        result = (start > 0 ? value.substr(start, 3) : value.substr(0, 3 + start))
            + separators[idx] + result;
        idx = (++idx) % 2;
        start -= 3;
    }
    return (parts.length == 3 ? '-' : '') + result;
};
    $scope.generateReference = function(obj) {
        $scope.cotizacionDetalle = obj;
                wsData.nombreEmpresa = obj.nombreEmpresa;
                wsData.idEmpresa = obj.idEmpresa;
                wsData.idSucursal = obj.idSucursal;
                wsData.idDepartamento = obj.idDepartamento;
                wsData.idTipoDocumento = obj.tipoDocumento; //hardcore
                wsData.serie = obj.serie;
                wsData.folio = obj.idDocumento;
                wsData.idCliente = obj.idCliente;
                wsData.idAlma = obj.estatus;
                $scope.tipoDocumentos = obj.tipoDocumento;
                $scope.nombreDepartamento = obj.nombreDepartamento;  
                $scope.nombreSucursal = obj.nombreSucursal; 
                $scope.nombreCliente = obj.nombreCliente;
                $scope.saldo = obj.saldo;
                $scope.idDocumento =  obj.idDocumento;   
                $scope.nombreEmpresa = obj.nombreEmpresa;
                $scope.serie = obj.serie;  
                $scope.cambio = $scope.currency(obj.saldo,2, [',', "'", '.']);
                //console.log(wsData);


/*
                $scope.referencia = "";

                //$scope.departamentoss = departamento;
                referenceRepository.getReferenceWS(wsData).then(function(result) {
                    if (result.data.length > 0) {
                        console.log($scope.referencia);
                        $scope.referencia = result.data;
                    } else {}
                });
        
*/

    }

    $scope.getReferenceWS = function() {

    }

    //Genera el pdf
    $scope.generarPdf = function() {
       $scope.referencia = "";
       $('#pnlProgress').modal('show');
       referenceRepository.getReferenceWS(wsData).then(function(result) {
           if (result.data.length > 0) {
            console.log($scope.nombreEmpresa)
               $scope.referencia = result.data;
               console.log($scope.tipoDocumentos + 'TipoDocu')
               if($scope.tipoDocumentos == 1){
                $scope.folioSerie = $scope.serie + $scope.idDocumento;
                console.log($scope.folioSerie+'serie y folio tipo doc 1')
                referenceRepository.generarPdf($scope.referencia,$scope.nombreSucursal,$scope.nombreDepartamento,
                                                $scope.folioSerie,$scope.nombreCliente,$scope.cambio,$scope.nombreEmpresa
                                                ,$scope.serie).then(function(response) {
                 if (response.data.length > 0) {
                    $scope.content = false;
                  $scope.url = response.config.url;
                   window.open($scope.url+"?referencia="+$scope.referencia+
                    '&nombreSucursal='+$scope.nombreSucursal+
                    '&nombreDepartamento='+$scope.nombreDepartamento+
                    '&idDocumento='+$scope.folioSerie+
                    '&nombreCliente='+$scope.nombreCliente+
                    '&saldo='+$scope.cambio+
                    '&nombreEmpresa='+$scope.nombreEmpresa+
                    '&serie='+$scope.serie , "ventana1", "width=700,height=500,scrollbars=NO");
                   //$scope.selectBank();
         alertFactory.success('Se genero el pdf');
         $('#pnlProgress').modal('hide');
               }
               });

               }else{

               referenceRepository.generarPdf($scope.referencia,$scope.nombreSucursal,$scope.nombreDepartamento,
                                            $scope.idDocumento,$scope.nombreCliente,$scope.cambio,$scope.nombreEmpresa
                                            ,$scope.serie).then(function(response) {
                 if (response.data.length > 0) {
                    $scope.content = false;
                    console.log('serie y folio tipo doc 2,3,4,5');
                  $scope.url = response.config.url;
                   window.open($scope.url+"?referencia="+$scope.referencia+
                    '&nombreSucursal='+$scope.nombreSucursal+
                    '&nombreDepartamento='+$scope.nombreDepartamento+
                    '&idDocumento='+$scope.idDocumento+
                    '&nombreCliente='+$scope.nombreCliente+
                    '&saldo='+$scope.cambio+
                    '&nombreEmpresa='+$scope.nombreEmpresa+
                    '&serie='+$scope.serie , "ventana1", "width=700,height=500,scrollbars=NO");
                   //$scope.selectBank();
         alertFactory.success('Se genero el pdf');
         $('#pnlProgress').modal('hide');
               }
               });
            }
           } else {$('#pnlProgress').modal('hide');}
       });
   };
/*
        $scope.promise = referenceRepository.generarPdf($scope.referencia).then(function(response) {
            $scope.url = response.config.url;
            window.open($scope.url, "ventana1", "width=700,height=500,scrollbars=NO");
            $scope.selectBank();
            alertFactory.success('Se genero el pdf');
        });
    };*/

    $scope.getEmpleado = function() {
        referenceRepository.getEmpleado($scope.idUsuario).then(function(result) {
            if (result.data.length > 0) {
                $rootScope.empleado = result.data;
            } else {
                alertFactory.info("Datos Incorrectos");
            }
        }, function(error) {
            alertFactory.error("Datos no correctos");
        });
    };

    $scope.getBills = function() {
        $('#facturasReferencia').DataTable().destroy();
        $scope.promise = referenceRepository.getBills($scope.idClientes, $scope.idEmpresa).then(function(result) {
            if (result.data.length > 0) {
                $scope.facturas = result.data;
                setTimeout(function() {
                    $('#facturasReferencia').DataTable({
                        "responsive": true,
                        "language": {
                            "paginate": {
                                "previous": '<i class="demo-psi-arrow-left"></i>',
                                "next": '<i class="demo-psi-arrow-right"></i>'
                            }
                        }
                    });
                }, 100);
            } else {}
        });
    };

    $scope.content = true;
    $scope.selectedOptionBank;

    $('#payInvoceModal').on('show.bs.modal', function(e) {
        $scope.invoce = InvoceFactory.getInvoce();
        $scope.$apply($scope.invoce)
        console.log($scope.invoce)
    })

    $('#payInvoceModal').on('hide.bs.modal', function(e) {
        $scope.payMethod = ""
        $scope.pendingInvoceModalForm.$setPristine();
        $('.lineaCaptura').remove();
        $scope.content = true;
    })

    $scope.selectedBank = function(bank) {
        $scope.selectedOptionBank = bank;
    }
    $scope.removeModal = function() {
        $('#payInvoceModal').modal('hide')

    }



    $scope.setSearchType = function(val) {

      if (val == 1) {
          $scope.searchType = "ID cliente";
          $scope.searchTypeID = 1;
          $scope.nombreEmpresa = '';
      } else {
          if (val == 2) {
              $scope.searchType = "Nombre Cliente";
              $scope.searchTypeID = 2;
          } else {
              $scope.searchType = "ID  Documento";
              $scope.searchTypeID = 3;
          }
      }

      $scope.txtSearchClient = "";
  }



    $scope.searchDocs = function(obj) {
        $scope.lstPedido = [];
        $scope.lstFactura = [];
        $scope.lstCotizacion = [];
        $scope.showPanel = true;
        $scope.currentIDClient = obj.idCliente;
        $scope.getClientId($scope.currentIDClient);
        $scope.getCotizacionAll(obj.idCliente);
        $scope.getFacturasAll(obj.idCliente);
        $scope.getPedidosAll(obj.idCliente);

    }





    $scope.searchClients = function() {


        if ($scope.searchTypeID == 1) {
            $scope.showPanel = true;
            $scope.Clientefiltro = true;
            $scope.DocumentoFiltro = false;
            $scope.lstPedido = [];
            $scope.lstFactura = [];
            $scope.lstCotizacion = [];
            $scope.getClientId($scope.txtSearchClient);
            $scope.currentIDClient = $scope.txtSearchClient;
            $scope.getCotizacionAll($scope.txtSearchClient);
            $scope.getFacturasAll($scope.txtSearchClient);
            $scope.getPedidosAll($scope.txtSearchClient);
            $scope.nombreEmpresa = '';
            $scope.idEmpresa = null;
        } else {
            if($scope.searchTypeID == 2){
                $scope.Clientefiltro = true;
                $scope.DocumentoFiltro = false;
                $scope.mostrar = true;
                $scope.nombreEmpresa = '';
                $scope.idEmpresa = null;
                $scope.lstPedido = [];
                $scope.lstFactura = [];
                $scope.lstCotizacion = [];
                $scope.getClient($scope.txtSearchClient);
                $scope.showPanel = true;
        }else{
                $scope.nombreEmpresa = '';
                $scope.Clientefiltro = false;
                $scope.DocumentoFiltro = true;
                $scope.idEmpresa = null;
                $scope.lstPedido = [];
                $('#tblPedido').DataTable().destroy();
                $scope.lstFactura = [];
                $('#tblFactura').DataTable().destroy();
                $scope.lstCotizacion = [];
                $('#tblReference').DataTable().destroy();
                $scope.lstFacturaDoc = '';
                $('#tblFacturaDoc').DataTable().destroy();
                $scope.lstPedidoDoc = '';
                $('#tblPedidoDoc').DataTable().destroy();
                $scope.lstCotizaciondOC = '';
                $('#tblReferenceDoc').DataTable().destroy();
                $scope.currentIDDocumento = $scope.txtSearchClient;
                $scope.getFacturaAllIdDoc($scope.currentIDDocumento);
                $scope.getpedidoAllIdDoc($scope.currentIDDocumento);
                $scope.getCotizacionAllIdDoc($scope.currentIDDocumento);
                $scope.showPanel = false;
        }
        }
    }


    $scope.setActiveClass = function(currentTab) {

        for (var i = 0; i < $scope.panels.length; i++) {
            $scope.panels[i].active = false;
            $scope.panels[i].className = "";
        }
        currentTab.active = true;
        currentTab.className = "active";
    };





    $scope.setTablePaging = function(idTable) {
        $('#' + idTable).DataTable({
            dom: '<"html5buttons"B>lTfgitp',
            buttons: [{
                extend: 'excel',
                title: 'ExampleFile'
            }, {
                extend: 'print',
                customize: function(win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');
                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }]
        });

    };
});
