registrationModule.controller('referenceController', function ($scope, alertFactory, referenceRepository, $rootScope) {
    $scope.message = 'Buscando...';
    $scope.message2 = 'Cargando PDF......';
    $scope.fechaHoy = new Date();
    //this is the first method executed in the view
    $scope.init = function () {
        $scope.idUsuario = 16;
        $scope.getCompany.show = false;
        $scope.selectTypeDoc.show = false;
        $scope.getEmpleado();
        $scope.getCompanyByUser();
    };

    $scope.selectIdCliente = function (idCliente) {
            $scope.idClientes = idCliente;
            console.log($scope.idCliente);
        }
        // Función para mosrtrar las empresas
    $scope.getCompany = function () {
        referenceRepository.getCompany().then(function (result) {
            if (result.data.length > 0) {
                $scope.empresas = result.data;
            } else {}
        });
    };

    // Función para selecciobnar el idEmpresa y nombre 
    $scope.seletionCompany = function (idEmpresa, nombreEmpresa) {
        $scope.getCompany.show = true;
        $scope.selectTypeDoc.show = false;
        $scope.idEmpresa = idEmpresa;
        console.log($scope.idEmpresa)
        console.log($scope.idClientes);
        $scope.nombreEmpresa = nombreEmpresa;
        
        $scope.idSucursal = null;
        $scope.nombreSucursal = null;
        $scope.departamentos = null;
        $scope.nombreDepartamento = null;
        $scope.getBranchOfficeByIdUser();
        $scope.getBills();
    };


    // Función para selecciobnar el idSucursal y nombre 
    $scope.seletionBranchoOffice = function (idSucursal, nombreSucursal) {
        $scope.idSucursal = idSucursal;
        $scope.nombreSucursal = nombreSucursal;
        $scope.getDepartmentByIdUser();
    };

    $scope.selectDepartment = function (idDepartamento, nombreDepartamento) {
        $scope.idDepartamento = idDepartamento;
        $scope.nombreDepartamento = nombreDepartamento;
    };

    //Función para mostrar las sucursales por empresa
    $scope.getBranchOfficeByIdCompany = function () {
        referenceRepository.getBranchOfficeByIdCompany($scope.idEmpresa).then(function (result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;
            } else {}
        });
    };

    //Función para mostrar los departamentos por sucursl
    $scope.getDepartmentById = function () {
        referenceRepository.getDepartmentById($scope.idSucursal).then(function (result) {
            if (result.data.length > 0) {
                $scope.departamentos = result.data;
            } else {}
        });
    };

    $scope.selectTypeDoc = function (idDocumento, nombreDocumento) {
        $scope.selectTypeDoc.show = true;
        $scope.idDocumento = idDocumento;
        $scope.nombreDocumento = nombreDocumento;
        $scope.cleanInputs();
    };

    $scope.cleanInputs = function () {
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

    $scope.selectBank = function (idBanco) {
        $scope.idBanco = idBanco;
        console.log($scope.idBanco);
    };

    $scope.getCompanyByUser = function () {
        $scope.promise = referenceRepository.getCompanyByUser($scope.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                $scope.empresas = result.data;
            } else {}
        });
    };

    $scope.getBranchOfficeByIdUser = function () {
        referenceRepository.getBranchOfficeByIdUser($scope.idUsuario, $scope.idEmpresa).then(function (result) {
            if (result.data.length > 0) {
                $scope.sucursales = result.data;
            } else {}
        });
    };

    $scope.getDepartmentByIdUser = function () {
        referenceRepository.getDepartmentByIdUser($scope.idUsuario, $scope.idSucursal).then(function (result) {
            if (result.data.length > 0) {
                $scope.departamentos = result.data;
            } else {}
        });
    };

    $scope.generateReference = function (facturaSerie, facturaFolio, departamento) {
        $scope.referencia = "";
        $scope.facturaSerie = facturaSerie;
        $scope.facturaFolio = facturaFolio;
        $scope.departamentoss = departamento;
        referenceRepository.getReferenceWS($scope.facturaSerie, $scope.facturaFolio).then(function (result) {
            if (result.data.length > 0) {
                console.log($scope.referencia);
                $scope.referencia = result.data;
            } else {}
        });
    }

    $scope.getReferenceWS = function () {

    }

    //Genera el pdf
    $scope.generarPdf = function () {
        $scope.promise = referenceRepository.generarPdf().then(function (response) {
            $scope.url = response.config.url;
            window.open($scope.url, "ventana1", "width=700,height=500,scrollbars=NO");
            $scope.selectBank();
            alertFactory.success('Se genero el pdf');
        });
    };

    $scope.getEmpleado = function () {
        referenceRepository.getEmpleado($scope.idUsuario).then(function (result) {
            if (result.data.length > 0) {
                $rootScope.empleado = result.data;
            } else {
                alertFactory.info("Datos Incorrectos");
            }
        }, function (error) {
            alertFactory.error("Datos no correctos");
        });
    };

    $scope.getBills = function () {
        $('#facturasReferencia').DataTable().destroy();
        $scope.promise = referenceRepository.getBills($scope.idClientes, $scope.idEmpresa).then(function (result) {
            if (result.data.length > 0) {
                $scope.facturas = result.data;
                setTimeout(function () {
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

    $('#payInvoceModal').on('show.bs.modal', function (e) {
        $scope.invoce = InvoceFactory.getInvoce();
        $scope.$apply($scope.invoce)
        console.log($scope.invoce)
    })

    $('#payInvoceModal').on('hide.bs.modal', function (e) {
        $scope.payMethod = ""
        $scope.pendingInvoceModalForm.$setPristine();
        $('.lineaCaptura').remove();
        $scope.content = true;
    })

    $scope.selectedBank = function (bank) {
        $scope.selectedOptionBank = bank;
    }
    $scope.removeModal = function () {
        $('#payInvoceModal').modal('hide')

    }
    
    
   /* 
    $scope.changeCompany = function(company) {
    if (company.emp_idempresa != 0) {
        console.log(company.emp_idempresa)
      $scope.branchSelectVisible = true;
        $scope.idEmpresa = company.emp_idempresa;
         $scope.getBranchOfficeByIdUser();
      $scope.branchListTemp = $scope.branchList.filter(function(d) {
        if (company.idEmpresa === d.idEmpresa || d.idSucursal === 0) return true
      })
      $scope.branch = $scope.branchListTemp[0];
      filterApply()
    } else {
      filterApply()
      $scope.branchSelectVisible = false;
      $scope.branch = null;
    }
  }*/

    
});
