var referenceURL = global_settings.urlCORS + 'api/reference/';


registrationModule.factory('referenceRepository', function ($http) {
    return {
        getCompany: function () {
            return $http({
                url: referenceURL + 'company/',
                method: "GET"
            });
        },
        getBranchOfficeByIdCompany: function (idEmpresa) {
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
        getDepartmentById: function (idSucursal) {
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
        getCompanyByUser: function (idUsuario) {
            return $http({
                url: referenceURL + 'companyByUser/',
                method: "GET",
                params: {
                    idUsuario: idUsuario
                },
            });
        },
        getBranchOfficeByIdUser: function (idUsuario, idEmpresa) {
            return $http({
                url: referenceURL + 'branchOfficeByIdUser/',
                method: "GET",
                params: {
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa
                },
            });
        },
        getDepartmentByIdUser: function (idUsuario, idSucursal) {
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
        generarPdf: function () {
                return $http({
                    url: referenceURL + 'generarPdf/',
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            }, //Fin de genera pdf 
        
        getReferenceWS: function (serie, folio) {
            return $http({
                url: referenceURL + 'referenceWS/',
                method: "GET",
                params: {
                    serie: serie,
                    folio: folio
                },
            });
    },
        getEmpleado: function(idEmpleado) {
            return $http({
                url: referenceURL + 'getEmpleado/',
                method: "GET",
                 params: {idEmpleado: idEmpleado},
                headers: {
                'Content-Type': 'application/json'
                }
            });
        } 
    };

});