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


Reference.prototype.get_generarPdf = function (req, res, next) {
    var self = this;
       var params = [{
        name: 'referencia',
        value: req.query.referencia,
        type: self.model.types.STRING
    }]
    console.log('estamos aqui en Selecciona un contrato');

    phantom.create().then(function (ph) {
        ph.createPage().then(function (page) {
            page.viewportSize = {
                width: 500,
                height: 400
            };
            console.log('creo pdf')
            page.open("http://localhost:4430/api/reference/company?referencia=" + req.query.referencia).then(function (status) {
                page.render('Reporte_90.pdf').then(function () {
                    console.log(status,'estatus');
                    console.log('Page Rendered');
                    console.log(req.query.referencia,'pdf');
                    page.close();
                    ph.exit();
                    console.log('Page Rendered2');
                    setTimeout(function () {
                        console.log(req.query.referencia,'pdf2');
                        res.sendFile("Reporte_90.pdf", {
                            root: path.join(__dirname, '../../../')
                        });
                        console.log(req.query.referencia,'entro al sendfile');
                        console.log('Page Rendered3');
                    }, 1)
                console.log('Page termina semi');
                });
                console.log('Page termina');
            });
        });
    });
};

Reference.prototype.get_facturasAll = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_facturasEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_EMPRESAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



Reference.prototype.get_facturasSuc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_SUCURSALES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};




Reference.prototype.get_facturasDepto = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT},
    {name: 'idDepartamentos',value: req.query.idDepartamentos,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_DEPARTAMENTOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};





Reference.prototype.get_pedidosAll = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_pedidosEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS_EMPRESA_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



Reference.prototype.get_pedidosSuc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS_SUCURSAL_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Reference.prototype.get_pedidosDepto = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT},
    {name: 'idDepartamentos',value: req.query.idDepartamentos,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS_DEPARTAMENTO_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};




Reference.prototype.get_cotizacionAll = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Reference.prototype.get_cotizacionAllIdDoc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento ,type: self.model.types.STRING}];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_IDDOC__SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_facturaAllIdDoc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento ,type: self.model.types.STRING}];

    this.model.query('SEL_TOTAL_FACTURAS_TODOS_IDDOC_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};

Reference.prototype.get_pedidoAllIdDoc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idDocumento',value: req.query.idDocumento ,type: self.model.types.STRING}];

    this.model.query('SEL_TOTAL_PEDIDOS_TODOS__IDDOCSP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Reference.prototype.get_cotizacionEmp = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
          {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT}    
    ];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_EMPRESAS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



Reference.prototype.get_cotizacionSuc = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_SUCURSALES_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Reference.prototype.get_cotizacionDepto = function (req, res, next) {

    var self = this;

    var params = [{name: 'idCliente',value: req.query.idCliente,type: self.model.types.INT},
    {name: 'idEmpresas',value: req.query.idEmpresas,type: self.model.types.INT},
    {name: 'idSucursales',value: req.query.idSucursales,type: self.model.types.INT},
    {name: 'idDepartamentos',value: req.query.idDepartamentos,type: self.model.types.INT}];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_DEPARTAMENTOS_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};


Reference.prototype.get_clientByName = function (req, res, next) {
    //Con req.query se obtienen los parametros de la url
    //Ejemplo: ?p1=a&p2=b
    //Retorna {p1:'a',p2:'b'}
    //Objeto que envía los parámetros
    //var params = [];
    //Referencia a la clase para callback
    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{
        name: 'varBusqueda',
        value: req.query.clientName,
        type: self.model.types.STRING
    }];

    this.model.query('SEL_CLIENTE_SP', params, function (error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
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
    console.log(req.query.referencia,'funcion company')

    this.model.query('SEL_EMPRESA_SP', params, function (error, result) {
        //self.view.expositor( 
        res.render('referencia.html',{referencia:req.query.referencia} );//,{
            console.log(req.query.referencia,'funcion company asignacion')
            self.view.expositor({ error: error,
            result: result
        });
        console.log('Termina')
    });
    console.log('Termina todo')
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
           name: 'idEmpresa',
           value: req.query.idEmpresa,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idSucursal',
           value: req.query.idSucursal,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idDepartamento',
           value: req.query.idDepartamento,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idTipoDocumento',
           value: req.query.idTipoDocumento,
           type: self.model.types.STRING
       });
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
       params.push({
           name: 'idCliente',
           value: req.query.idCliente,
           type: self.model.types.STRING
       });
       params.push({
           name: 'idAlma',
           value: req.query.idAlma,
           type: self.model.types.STRING
       });

       getReferenceFromWS(this.conf.parameters.WSReference,req.query.idEmpresa, req.query.idSucursal, req.query.idDepartamento,req.query.idTipoDocumento, req.query.serie, req.query.folio, req.query.idCliente,req.query.idAlma,
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








/*
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
};*/

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





/*
Reference.prototype.get_cotizacion = function(req, res, next) {

    var self = this;
    //asignación de valores mediante parámetros del request
    var params = [{ name: 'idCliente', value: req.query.idCliente, type: self.model.types.INT }];

    this.model.query('SEL_TOTAL_COTIZACIONES_TODAS_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
};



*/







function getReferenceFromWS(url, idEmpresa, idSucursal,idDepartamento, idTipoDocumento, serie, folio, idCliente,idAlma, cb) {
   request.get(url + "?idEmpresa=" + idEmpresa + "&idSucursal=" + idSucursal + "&idDepartamento=" + idDepartamento + "&idTipoDocumento=" + idTipoDocumento + "&serie=" + serie + "&folio="+ folio +"&idCliente=" + idCliente +"&idAlma="+ idAlma, function (error, response, body) {
       if (!error && response.statusCode == 200) {
           body = JSON.parse(body);
           console.log(body)
           cb(null, body);
       } else {
           cb(error)
       }
   })
};








/*
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
*/

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
