var referenceURL = global_settings.urlCORS + 'api/reference/';


registrationModule.factory('referenceRepository', function($http) {
    return {
        getCompany: function() {
            return $http({
                url: referenceURL + 'company/',
                method: "GET"
            });
        },
        getClientByName: function(clientName) {
            return $http({
                url: referenceURL + 'clientByName/',
                method: "GET",
                params: {
                    clientName: clientName
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getFacturasAll: function(idCliente) {
            return $http({
                url: referenceURL + 'facturasAll/',
                method: "GET",
                params: {
                    idCliente: idCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getFacturasEmp: function(variableobj) {
            
            return $http({
                url: referenceURL + 'facturasEmp/',
                method: "GET",
                params: {
                    idCliente: variableobj.idCliente,
                    idEmpresas: variableobj.idEmpresas
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getFacturasSuc: function(objValues) {
            return $http({
                url: referenceURL + 'facturasSuc/',
                method: "GET",
                params: {
                    idCliente: objValues.idCliente,
                    idEmpresas: objValues.idEmpresas,
                    idSucursales: objValues.idSucursales
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getFacturasDepto: function(objValues) {

            
            return $http({
                url: referenceURL + 'facturasDepto/',
                method: "GET",
                params: {
                    idCliente: objValues.idCliente,
                    idEmpresas: objValues.idEmpresas,
                    idSucursales: objValues.idSucursales,
                    idDepartamentos: objValues.idDepartamentos
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getPedidosAll: function(idCliente) {
            return $http({
                url: referenceURL + 'pedidosAll/',
                method: "GET",
                params: {
                    idCliente: idCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getPedidosEmp: function(cliente) {
            return $http({
                url: referenceURL + 'pedidosEmp/',
                method: "GET",
                params: {
                    idCliente: cliente.idCliente,
                    idEmpresas: cliente.idEmpresas
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getPedidosSuc: function(idCliente) {
            return $http({
                url: referenceURL + 'pedidosSuc/',
                method: "GET",
                params: {
                    idCliente: idCliente.idCliente,
                    idEmpresas: idCliente.idEmpresas,
                    idSucursales: idCliente.idSucursales
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getPedidosDepto: function(idCliente) {
            return $http({
                url: referenceURL + 'pedidosDepto/',
                method: "GET",
                params: {
                    idCliente: idCliente.idCliente,
                    idEmpresas: idCliente.idEmpresas,
                    idSucursales: idCliente.idSucursales,
                    idDepartamentos: idCliente.idDepartamentos
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },//get_cotizacionAllIdDoc get_facturaAllIdDoc get_pedidoAllIdDoc
         getCotizacionAllIdDoc: function(idDocumento) {
            return $http({
                url: referenceURL + 'cotizacionAllIdDoc/',
                method: "GET",
                params: {
                    idDocumento: idDocumento
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getFacturaAllIdDoc : function(idDocumento) {
            return $http({
                url: referenceURL + 'facturaAllIdDoc/',
                method: "GET",
                params: {
                    idDocumento: idDocumento
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getpedidoAllIdDoc : function(idDocumento) {
            return $http({
                url: referenceURL + 'pedidoAllIdDoc/',
                method: "GET",
                params: {
                    idDocumento: idDocumento
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCotizacionAll: function(idCliente) {
            return $http({
                url: referenceURL + 'cotizacionAll/',
                method: "GET",
                params: {
                    idCliente: idCliente
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCotizacionEmp: function(cliente) {
            return $http({
                url: referenceURL + 'cotizacionEmp/',
                method: "GET",
                params: {
                    idCliente: cliente.idCliente,
                    idEmpresas: cliente.idEmpresas
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCotizacionSuc: function(idCliente) {
            return $http({
                url: referenceURL + 'cotizacionSuc/',
                method: "GET",
                params: {
                    idCliente: idCliente.idCliente,
                    idEmpresas: idCliente.idEmpresas,
                    idSucursales: idCliente.idSucursales
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCotizacionDepto: function(idCliente) {
            return $http({
                url: referenceURL + 'cotizacionDepto/',
                method: "GET",
                params: {
                    idCliente: idCliente.idCliente,
                    idEmpresas: idCliente.idEmpresas,
                    idSucursales: idCliente.idSucursales,
                    idDepartamentos: idCliente.idDepartamentos
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getBranchOfficeByIdCompany: function(idEmpresa) {
            return $http({
                url: referenceURL + 'branchOfficeByIdCompany/',
                method: "GET",
                params: {
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getDepartmentById: function(idSucursal) {
            return $http({
                url: referenceURL + 'departmentById/',
                method: "GET",
                params: {
                    idSucursal: idSucursal
                },
                headers: {
                    'Content-Type': 'application/json'
                }

            });
        },
        getCompanyByUser: function(idUsuario) {
            return $http({
                url: referenceURL + 'companyByUser/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
            });
        },
        getBranchOfficeByIdUser: function(idUsuario, idEmpresa) {
            return $http({
                url: referenceURL + 'branchOfficeByIdUser/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa
                },
            });
        },
        getDepartmentByIdUser: function(idUsuario, idSucursal) {
            return $http({
                url: referenceURL + 'departmentByIdUser/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idSucursal: idSucursal
                },
            });
        },
        //Genera PDF
        generarPdf: function(referencia,nombreSucursal,nombreDepartamento,nombreCliente,saldo,idDocumento,nombreEmpresa) {
            return $http({
                url: referenceURL + 'generarPdf/',
                method: "GET",
                 params: {
                    referencia:referencia,
                    nombreSucursal:nombreSucursal,
                    nombreDepartamento:nombreDepartamento,
                    nombreCliente:nombreCliente,
                    saldo:saldo,
                    idDocumento:idDocumento,
                    nombreEmpresa:nombreEmpresa
                 },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }, //Fin de genera pdf 

        getReferenceWS: function(paramData) {
            console.log("respository:", paramData);
            return $http({
                url: referenceURL + 'referenceWS/',
                method: "GET",
                params: {

                    idEmpresa: paramData.idEmpresa,
                    idSucursal: paramData.idSucursal,
                    idDepartamento: paramData.idDepartamento,
                    idTipoDocumento: paramData.idTipoDocumento,
                    serie: paramData.serie,
                    folio: paramData.folio,
                    idCliente: paramData.idCliente,
                    idAlma: paramData.idAlma

                },
            });
        },
        getEmpleado: function(idEmpleado) {
            return $http({
                url: referenceURL + 'getEmpleado/',
                method: "GET",
                params: { idEmpleado: idEmpleado },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        },
        getBills: function(idCliente, idEmpresa) {
            return $http({
                url: referenceURL + 'bills/',
                method: "GET",
                params: {
                    idCliente: idCliente,
                    idEmpresa: idEmpresa
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    };

});
