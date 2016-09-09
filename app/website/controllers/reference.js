var ReferenceView = require('../views/reference'),
    ReferenceModel = require('../models/dataAccess'),
    moment = require('moment');

var Reference = function (conf) {
    this.conf = conf || {};

    this.view = new ReferenceView();
    this.model = new ReferenceModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    };
};

Reference.prototype.get_company = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [];
    this.model.query('SEL_EMPRESA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_branchOfficeByIdCompany= function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];
    this.model.query('SEL_SUCURSAL_ID_EMPRESA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_departmentById = function(req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idSucursal', value: req.query.idSucursal, type: self.model.types.INT }];
    this.model.query('SEL_DEPARTAMENTO_ID_SUCURSAL_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



module.exports = Reference;