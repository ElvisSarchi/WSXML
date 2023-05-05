/* eslint-disable no-undef */
const soap = require("soap");
var parseString = require("xml2js").parseString;
require("dotenv").config();
var url = process.env.WSSRI;
function parserXMLtoString(xml) {
  //return promise
  try {
    if (xml)
      return new Promise((resolve, reject) => {
        parseString(xml, function (err, result) {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
  } catch (err) {
    console.log(err);
  }
}
export async function searchXML(claveAccesoComprobante) {
  try {
    return new Promise((resolve, reject) => {
      var args = {
        claveAccesoComprobante: claveAccesoComprobante,
      };
      soap.createClient(url, function (err, client) {
        if (err) {
          reject(err);
        } else {
          client.autorizacionComprobante(args, async function (err, result) {
            if (err) {
              reject(err);
            } else {
              if (
                result.RespuestaAutorizacionComprobante.numeroComprobantes !=
                `0`
              ) {
                const estado =
                  result.RespuestaAutorizacionComprobante?.autorizaciones
                    ?.autorizacion?.estado;
                const numeroAutorizacion =
                  result.RespuestaAutorizacionComprobante?.autorizaciones
                    ?.autorizacion?.numeroAutorizacion;
                const fechaAutorizacion =
                  result.RespuestaAutorizacionComprobante?.autorizaciones
                    ?.autorizacion?.fechaAutorizacion;
                const ambiente =
                  result.RespuestaAutorizacionComprobante?.autorizaciones
                    ?.autorizacion?.ambiente;
                const comprobante =
                  result.RespuestaAutorizacionComprobante.autorizaciones
                    ?.autorizacion?.comprobante;
                const mensajes =
                  result.RespuestaAutorizacionComprobante.autorizaciones
                    ?.autorizacion?.mensajes;
                const comprobanteJson = await parserXMLtoString(comprobante);
                resolve({
                  estado,
                  numeroAutorizacion,
                  fechaAutorizacion,
                  ambiente,
                  comprobante: comprobanteJson,
                  mensajes,
                });
              } else {
                resolve(result);
              }
            }
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
    return Promise.reject;
  }
}
export async function searchXMLWithoutFormatting(claveAccesoComprobante) {
  try {
    return new Promise((resolve, reject) => {
      var args = {
        claveAccesoComprobante: claveAccesoComprobante,
      };
      soap.createClient(url, function (err, client) {
        if (err) {
          reject(err);
        } else {
          client.autorizacionComprobante(args, async function (err, result) {
            if (err) {
              reject(err);
            } else {
              if (
                result.RespuestaAutorizacionComprobante.numeroComprobantes !=
                `0`
              ) {
                const estado =
                  result.RespuestaAutorizacionComprobante?.autorizaciones
                    ?.autorizacion?.estado;
                const numeroAutorizacion =
                  result.RespuestaAutorizacionComprobante?.autorizaciones
                    ?.autorizacion?.numeroAutorizacion;
                const fechaAutorizacion =
                  result.RespuestaAutorizacionComprobante?.autorizaciones
                    ?.autorizacion?.fechaAutorizacion;
                const ambiente =
                  result.RespuestaAutorizacionComprobante?.autorizaciones
                    ?.autorizacion?.ambiente;
                const comprobante =
                  result.RespuestaAutorizacionComprobante.autorizaciones
                    ?.autorizacion?.comprobante;
                const mensajes =
                  result.RespuestaAutorizacionComprobante.autorizaciones
                    ?.autorizacion?.mensajes;
                resolve({
                  estado,
                  numeroAutorizacion,
                  fechaAutorizacion,
                  ambiente,
                  comprobante,
                  mensajes,
                });
              } else {
                resolve(result);
              }
            }
          });
        }
      });
    });
  } catch (err) {
    console.error(err);
    return Promise.reject;
  }
}
