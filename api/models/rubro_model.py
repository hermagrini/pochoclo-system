from google.appengine.ext import ndb
from google.appengine.ext.ndb.key import Key
from api.lib.custom_handler import improve
from api.lib.bottle import json_dumps

class Rubro(ndb.Model):
    idTipo = ndb.StringProperty(required=True)
    nombre = ndb.StringProperty(required=True)

    @classmethod
    def get_all_json(self):
        return json_dumps([improve(tipo.to_dict(), tipo.key.id()) for tipo in Rubro.query()])

    @classmethod
    def get_id_json(self, id_query):
        rubro = Rubro.get_by_id(id_query)
        return json_dumps(improve(rubro.to_dict(),identificador=rubro.key.id()))

    @classmethod
    def put_rubro(self, id_query, nombre,idTipo):
        return Rubro(
            id = id_query,
            nombre = nombre,
            idTipo = idTipo
        ).put()

    @classmethod
    def remove_rubro(self, id_query):
        return Key("Rubro", id_query).delete()