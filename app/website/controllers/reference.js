var ReferenceView = require('../views/reference'),
    ReferenceModel = require('../models/dataAccess'),
    moment = require('moment');
var phantom = require('phantom');
var path = require('path');
var webPage = require('webpage');
var request = require('request');


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

//Genera la funcion GenerarPDF
/*Reference.prototype.get_generarPdf = function (req, res, next) {
    var self = this;

    console.log('estamos aqui en Selecciona un contrato');

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            page.viewportSize = {
                width: 480,
                height: 800
            };
            //page.open("http://google.com").then(function (status) {
            page.open("http://localhost:4400/api/reference/companyByUser?idUsuario=" + req.query.idUsuario).then(function (status) {
                page.render('Reporte_90.pdf').then(function () {
                    console.log('Page Rendered');
                    page.close();
                    ph.exit();
                    console.log('Page Rendered2');
                    setTimeout(function () {
                        res.sendFile("Reporte_90.pdf", {
                            root: path.join(__dirname, '../../../')
                        });
                        console.log('Page Rendered3');
                    }, 10)

                });
            });
        });
    });
};*/

Reference.prototype.get_generarPdf = function (req, res, next) {
    var self = this;

    console.log('estamos aqui en Selecciona un contrato');

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            page.viewportSize = {
                width: 500,
                height: 400
            };
            //page.open("http://google.com").then(function (status) {
            page.open("http://localhost:4400/api/reference/company?referencia=" + req.query.referencia).then(function (status) {
                page.render('Reporte_90.pdf').then(function () {
                    console.log('Page Rendered');
                    page.close();
                    ph.exit();
                    console.log('Page Rendered2');
                    setTimeout(function () {
                        res.sendFile("Reporte_90.pdf", {
                            root: path.join(__dirname, '../../../')
                        });
                        console.log('Page Rendered3');
                    }, 10)

                });
            });
        });
    });
};

Reference.prototype.get_company = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'referencia',
        value: req.query.referencia,
        type: self.model.types.STRING
    }]

    this.model.query('SEL_EMPRESA_SP', params, function (error, result) {
        //self.view.expositor( 
        res.render('referencia.html');//,{
            /*error: error,
            result: result
        });*/
        console.log(result)
    });
};

Reference.prototype.get_branchOfficeByIdCompany = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'idEmpresa',
        value: req.query.idEmpresa,
        type: self.model.types.INT
    }];

    this.model.query('SEL_SUCURSAL_ID_EMPRESA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_departmentById = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'idSucursal',
        value: req.query.idSucursal,
        type: self.model.types.INT
    }];

    this.model.query('SEL_DEPARTAMENTO_ID_SUCURSAL_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_companyByUser = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }];

    this.model.query('SEL_EMPRESA_BY_USUARIO_SP', params, function (error, result) {
        /*console.log(result);
        self.view.expositor( res.render('referencia.html'),{error: error,
            result: result}
            res.render('referencia.html', result);
            self.view.expositor(res, {
            error: error,
            result: result
              self.view.expositor( res.render('referencia.html'),{error: error,
            result: result 
                });
        )*/
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_branchOfficeByIdUser = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        },
        {
            name: 'idEmpresa',
            value: req.query.idEmpresa,
            type: self.model.types.INT
        }];

    this.model.query('SEL_SUCURSAL_BY_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_departmentByIdUser = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
            name: 'idUsuario',
            value: req.query.idUsuario,
            type: self.model.types.INT
        },
        {
            name: 'idSucursal',
            value: req.query.idSucursal,
            type: self.model.types.INT
        }];

    this.model.query('SEL_DEPARTAMENTO_BY_USUARIO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_docReference = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
            name: 'serie',
            value: req.query.serie,
            type: self.model.types.STRING
        },
        {
            name: 'folio',
            value: req.query.folio,
            type: self.model.types.STRING
        }];

    this.model.query('SEL_FACTURA_DATOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        }//,res.render('contrato.html', result[0]) 
                           );
    });
};


Reference.prototype.get_referenceWS = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback  
    var self = this;
    var params = []
    if (req.query.serie, req.query.folio) {
        params.push({
            name: 'serie',
            value: req.query.serie,
            type: self.model.types.STRING
        });
        params.push({
            name: 'folio',
            value: req.query.folio,
            type: self.model.types.STRING
        });

        getReferenceFromWS(this.conf.parameters.WSReference,4, 14, 24,1, req.query.serie, req.query.folio, 3,
            function (err, data) {
                self.model.query('SEL_FACTURA_DATOS_SP', params, function (error, result) {
                    self.view.expositor(res, {
                        err: err,
                        result:data.REFERENCIA
                        //resultreferencia = data.REFERENCIA
                    });
                    
                    if (err) {
                        console.log('Error 1')
                    } else {
                        console.log(result)
                        console.log("todo bien");
                    }
                });
            });

    } else {
        console.log('Error 2')
    }
};

Reference.prototype.get_getEmpleado = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idEmpleado', value: req.query.idEmpleado, type: self.model.types.INT }];

    this.model.query('SEL_EMPLEADO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_bills = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idCliente', value: req.query.idCliente, type: self.model.types.INT },
                 { name: 'idEmpresa', value: req.query.idEmpresa, type: self.model.types.INT }];

    this.model.query('SEL_CARTERA_DETALLE_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


function getReferenceFromWS(url, idEmpresa, idSucursal,idDepartamento, idTipoDocumento, serie, folio, idCliente, cb) {
    request.get(url + "?idEmpresa=" + idEmpresa + "&idSucursal=" + idSucursal + "&idDepartamento=" + idDepartamento + "&idTipoDocumento=" + idTipoDocumento + "&serie=" + serie + "&folio="+ folio +"&idCliente=" + idCliente, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            console.log(body)
            cb(null, body);
        } else {
            cb(error)
        }
    })
};


//http://192.168.20.9:1430/api/referencia/referencia?serie=AA&folio=14968&idSucursal=4
/*var fs = require('fs');
fs.readFile('./prueba.txt', 'utf8', function(err, data) {
    if( err ){
        console.log(err)
    }
    else{
        console.log(data);
    }
});*/

module.exports = Reference;
