var referenceURL = global_settings.urlCORS + 'api/reference/';


registrationModule.factory('referenceRepository', function ($http) {
    return {
        getCompany: function() {
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
        }
    }
    
});