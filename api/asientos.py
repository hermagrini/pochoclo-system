#  coding: utf-8 --
from api.lib import bottle
from api.lib.bottle import *
from api.models.movimiento_model import Cuenta, Movimiento, Asiento

def initRoutes(app=None):
    if not app:
        app = bottle.default_app()

    @app.route('/cuenta/traerListaCuentas', method='POST')
    def getCuentaList():
        return Cuenta.get_all_json()

    @app.route('/cuenta/traerCuenta', method='POST')
    def getCuenta():
        return Cuenta.get_id_json(request.json["id"])

    @app.route('/put/cuenta', method='POST')
    def putCuenta():
        Cuenta.put_cuenta(
            id_query = request.json["id"],
            idRubro = request.json["idRubro"],
            nombre = request.json["nombre"]
        )
        return "Cuenta agregado exitosamente!"

    @app.route('/edit/cuenta', method='POST')
    def editCuenta():
        Cuenta.put_cuenta(
            id_query = request.json["id"],
            idRubro = request.json["idRubro"],
            nombre = request.json["nombre"]
        )
        return "Cuenta editado exitosamente!"

    @app.route('/remove/cuenta', method='POST')
    def removeCuenta():
        Cuenta.remove_cuenta(request.json["id"])
        return "Cuenta eliminado exitosamente!"

    @app.route('/asiento/traerListaAsientos', method='POST')
    def getAsientoList():
        return Asiento.get_all_json()

    @app.route('/asiento/traerAsiento', method='POST')
    def getAsiento():
        return Asiento.get_id_json(request.json["id"])

    @app.route('/put/asiento', method='POST')
    def putAsiento():
        asiento = Asiento.put_asiento()
        movimientos = request.json['movimientos']
        for movimiento in movimientos:
            cuenta = Cuenta.get_by_id(movimiento['id'])
            Movimiento.put_movimiento_asiento(
                id_query = asiento.id(),
                tipo = movimiento['tipo'],
                monto = movimiento['monto'],
                cuenta = cuenta.nombre
            )
            Movimiento.put_movimiento_cuenta(
                id_query = movimiento['id'],
                tipo = movimiento['tipo'],
                monto = movimiento['monto'],
            )
        return "Asiento guardado exitosamente"