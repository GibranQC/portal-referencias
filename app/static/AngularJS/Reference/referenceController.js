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
        $scope.idUsuario = 16;
        $scope.getCompany.show = false;
        $scope.selectTypeDoc.show = false;
        $scope.getEmpleado();
        $scope.getCompanyByUser();

        $scope.setTablePaging('prueba');
        $scope.searchType = "ID cliente";


    };


    $scope.lstClient = [];

    $scope.getClient = function(clientName) {

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


    $scope.lstFactura = [];

    $scope.getFacturasAll = function(clientId) {
        $scope.lstFactura = '';
        $('#tblFactura').DataTable().destroy();
        $('#loadModal').modal('show');


        referenceRepository.getFacturasAll(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstFactura = result.data;
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');
                }, 1000);

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
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);

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
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);

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
                setTimeout(function() {
                    $scope.setTablePaging('tblFactura');
                    $("#tblFactura_filter").removeClass("dataTables_info").addClass("hide-div");

                    $('#loadModal').modal('hide');
                }, 1000);

            } else { $('#loadModal').modal('hide'); }
        });

    };





    $scope.lstPedido = [];

    $scope.getPedidosAll = function(clientId) {
        $scope.lstPedido = '';
        $('#tblPedido').DataTable().destroy();

        referenceRepository.getPedidosAll(clientId).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstPedido = result.data;

                setTimeout(function() {
                    $scope.setTablePaging('tblPedido');
                    $("#tblPedido_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');

                }, 1000);

            } else {}
        });

    };









    $scope.lstCotizacion = [];

    $scope.getCotizacionAll = function(idCliente) {

        $scope.lstCotizacion = '';
        $('#tblReference').DataTable().destroy();

        referenceRepository.getCotizacionAll(idCliente).then(function(result) {

            if (result.data.length > 0) {
                $scope.lstCotizacion = result.data;

                setTimeout(function() {
                    $scope.setTablePaging('tblReference');
                    $("#tblReference_filter").removeClass("dataTables_info").addClass("hide-div");
                    $('#loadModal').modal('hide');

                }, 1000);

            } else {}
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

        $scope.getCompany.show = true;
        //$scope.selectTypeDoc.show = false;
        $scope.idEmpresa = idEmpresa;
        $scope.nombreEmpresa = nombreEmpresa;
        $scope.idSucursal = null;
        $scope.nombreSucursal = null;
        $scope.departamentos = null;
        $scope.nombreDepartamento = null;
        $scope.getBranchOfficeByIdUser();
        //$scope.getBills();


    };


    // Función para selecciobnar el idSucursal y nombre 
    $scope.seletionBranchoOffice = function(idSucursal, nombreSucursal) {

        $scope.storeParams.idCliente = $scope.currentIDClient;
        $scope.storeParams.idEmpresas = $scope.idEmpresa;
        $scope.storeParams.idSucursales = idSucursal;
        $scope.getFacturasSuc($scope.storeParams);



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

    $scope.generateReference = function(obj) {
        $scope.cotizacionDetalle = obj;
                wsData.idEmpresa = obj.idEmpresa;
                wsData.idSucursal = obj.idSucursal;
                wsData.idDepartamento = obj.idDepartamento;
                wsData.idTipoDocumento = obj.tipoDocumento; //hardcore
                wsData.serie = obj.serie;
                wsData.folio = obj.idDocumento;
                wsData.idCliente = obj.idCliente;
                wsData.idAlma = obj.estatus;

    }

    $scope.getReferenceWS = function() {

    }

    //Genera el pdf
    $scope.generarPdf = function() {
       $scope.referencia = "";
       referenceRepository.getReferenceWS(wsData).then(function(result) {
           if (result.data.length > 0) {
               console.log($scope.referencia);
               $scope.referencia = result.data;

               referenceRepository.generarPdf($scope.referencia).then(function(response) {
                 if (response.data.length > 0) {
                    $scope.content = false;
                  $scope.url = response.config.url;
                   window.open($scope.url+"?referencia="+$scope.referencia, "ventana1", "width=700,height=500,scrollbars=NO");
                   $scope.selectBank();
         alertFactory.success('Se genero el pdf');
               }
               });
           } else {}
       });
   };

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
        } else {
            $scope.searchType = "Nombre Cliente";
            $scope.searchTypeID = 2;
        }

        $scope.txtSearchClient = "";
    }



    $scope.searchDocs = function(obj) {
        $scope.showPanel = false;
        $scope.currentIDClient = obj.idCliente;
        $scope.getCotizacionAll(obj.idCliente);
        $scope.getFacturasAll(obj.idCliente);
        $scope.getPedidosAll(obj.idCliente);

    }





    $scope.searchClients = function() {


        if ($scope.searchTypeID == 1) {
            $scope.showPanel = false;
            $scope.currentIDClient = $scope.txtSearchClient;
            $scope.getCotizacionAll($scope.txtSearchClient);
            $scope.getFacturasAll($scope.txtSearchClient);
            $scope.getPedidosAll($scope.txtSearchClient);

        } else {
            $scope.getClient($scope.txtSearchClient);
            $scope.showPanel = true;
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
                extend: 'copy'
            }, {
                extend: 'csv'
            }, {
                extend: 'excel',
                title: 'ExampleFile'
            }, {
                extend: 'pdf',
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
