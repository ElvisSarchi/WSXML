/* eslint-disable no-undef */
const soap = require("soap");
var parseString = require("xml2js").parseString;
require("dotenv").config();
var url = process.env.WSSRI;
function parserXMLtoString(xml) {
  //return promise
  return new Promise((resolve, reject) => {
    parseString(xml, function (err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}
export async function searchXML(claveAccesoComprobante) {
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
            const estado =
              result.RespuestaAutorizacionComprobante.autorizaciones
                .autorizacion.estado;
            const numeroAutorizacion =
              result.RespuestaAutorizacionComprobante.autorizaciones
                .autorizacion.numeroAutorizacion;
            const fechaAutorizacion =
              result.RespuestaAutorizacionComprobante.autorizaciones
                .autorizacion.fechaAutorizacion;
            const ambiente =
              result.RespuestaAutorizacionComprobante.autorizaciones
                .autorizacion.ambiente;
            const comprobante =
              result.RespuestaAutorizacionComprobante.autorizaciones
                .autorizacion.comprobante;
            const mensajes =
              result.RespuestaAutorizacionComprobante.autorizaciones
                .autorizacion.mensajes;
            const comprobanteJson = await parserXMLtoString(comprobante);
            resolve({
              estado,
              numeroAutorizacion,
              fechaAutorizacion,
              ambiente,
              comprobante: comprobanteJson,
              mensajes,
            });
          }
        });
      }
    });
  });
}