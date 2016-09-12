registrationModule.controller('referenceController', function ($scope, alertFactory, referenceRepository) {
    //this is the first method executed in the view
    $scope.init = function () {
        $scope.getCompany.show = false;
        $scope.selectTypeDoc.show = false;
       $scope.getCompany();
    };
    
    // Función para mosrtrar las empresas
    $scope.getCompany = function(){
        referenceRepository.getCompany().then(function (result) {
             if (result.data.length > 0) {
                $scope.empresas = result.data;
             }else{
             }  
        });    
    };
    
    // Función para selecciobnar el idEmpresa y nombre 
    $scope.seletionCompany = function(idEmpresa,nombreEmpresa){
        $scope.getCompany.show = true;
        $scope.selectTypeDoc.show= false;
        $scope.idEmpresa = idEmpresa;
        $scope.nombreEmpresa = nombreEmpresa;
        $scope.idSucursal = null;
        $scope.nombreSucursal = null;
        $scope.departamentos = null;
        $scope.nombreDepartamento = null;
        $scope.getBranchOfficeByIdCompany(); 
    };
    

    // Función para selecciobnar el idSucursal y nombre 
    $scope.seletionBranchoOffice = function(idSucursal, nombreSucursal){
        $scope.idSucursal = idSucursal;
        $scope.nombreSucursal = nombreSucursal;
        $scope.getDepartmentById();
    };
    
    $scope.selectDepartment = function(idDepartamento, nombreDepartamento){
        $scope.idDepartamento = idDepartamento;
        $scope.nombreDepartamento = nombreDepartamento;
    };
    
    //Función para mostrar las sucursales por empresa
    $scope.getBranchOfficeByIdCompany = function(){
        referenceRepository.getBranchOfficeByIdCompany($scope.idEmpresa).then(function (result) {
             if (result.data.length > 0) {
                $scope.sucursales = result.data;
             }else{
             }  
        });    
    };
    
    //Función para mostrar los departamentos por sucursl
    $scope.getDepartmentById = function(){
        referenceRepository.getDepartmentById($scope.idSucursal).then(function (result) {
             if (result.data.length > 0) {
                $scope.departamentos = result.data;
             }else{
             }  
        });    
    };
    
    $scope.selectTypeDoc = function(idDocumento, nombreDocumento){
        $scope.selectTypeDoc.show= true;
        $scope.idDocumento = idDocumento;
        $scope.nombreDocumento = nombreDocumento;
        $scope.cleanInputs();
    };
    
    $scope.cleanInputs = function(){
        //$scope.nombreDocumento = null;
        $scope.facturaSerie = null;
        $scope.facturaFolio = null;
        $scope.cotizacionFolio = null;
        $scope.pedidoFolio = null;
        
    };
    
    $scope.tipoDocumentos = [{idDocumento: 1,
                             nombreDocumento: 'Factura'},
                            {idDocumento: 2,
                             nombreDocumento: 'Cotización'},
                            {idDocumento: 3,
                             nombreDocumento: 'Pedido'}]
});