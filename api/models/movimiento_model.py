from google.appengine.ext import ndb
from google.appengine.ext.ndb.key import Key
from api.lib.custom_handler import improve
from api.lib.date_handler import date_handler
from api.lib.bottle import json_dumps


class Movimiento(ndb.Model):
    tipo = ndb.StringProperty()
    monto = ndb.IntegerProperty()
    date = ndb.DateTimeProperty(auto_now_add=True)
    cuenta = ndb.StringProperty()

    @classmethod
    def put_movimiento_cuenta(self, id_query, tipo, monto):
        cuenta = Cuenta.get_by_id(id_query)
        cuenta.movimientos.append(Movimiento(tipo=tipo, monto=monto))
        return cuenta.put()
    @classmethod
    def put_movimiento_asiento(self,id_query,tipo,monto,cuenta):
        asiento = Asiento.get_by_id(id_query)
        asiento.movimientos.append(Movimiento(tipo=tipo, monto=monto,cuenta=cuenta))
        return asiento.put()


class Asiento(ndb.Model):
    movimientos = ndb.StructuredProperty(Movimiento,repeated=True)
    date = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def get_all_json(self):
        return json_dumps([improve(asiento.to_dict(), asiento.key.id()) for asiento in Asiento.query()], default=date_handler)

    @classmethod
    def get_id_json(self, id_query):
        asiento = Asiento.get_by_id(id_query)
        return json_dumps(improve(asiento.to_dict(),identificador=asiento.key.id()), default=date_handler)

    @classmethod
    def put_asiento(self):
        return Asiento().put()


class Cuenta(ndb.Model):
    idRubro = ndb.StringProperty(required=True)
    nombre = ndb.StringProperty(required=True)
    movimientos = ndb.StructuredProperty(Movimiento,repeated=True)

    @classmethod
    def get_all_json(self):
        return json_dumps([improve(cuenta.to_dict(), cuenta.key.id()) for cuenta in Cuenta.query()], default=date_handler)

    @classmethod
    def get_id_json(self, id_query):
        cuenta = Cuenta.get_by_id(id_query)
        return json_dumps(improve(cuenta.to_dict(),identificador=cuenta.key.id()), default=date_handler)

    @classmethod
    def put_cuenta(self, id_query, nombre,idRubro):
        return Cuenta(
            id = id_query,
            idRubro = idRubro,
            nombre = nombre
        ).put()

    @classmethod
    def remove_cuenta(self, id_query):
        return Key("Cuenta", id_query).delete()