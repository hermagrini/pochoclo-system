from google.appengine.ext import ndb
from google.appengine.ext.ndb.key import Key
from api.lib.custom_handler import improve
from api.lib.bottle import json_dumps

class Tipo(ndb.Model):
    nombre = ndb.StringProperty(required=True)

    @classmethod
    def get_all_json(self):
        return json_dumps([improve(tipo.to_dict(), tipo.key.id()) for tipo in Tipo.query()])

    @classmethod
    def get_id_json(self, id_query):
        tipo = Tipo.get_by_id(id_query)
        return json_dumps(improve(tipo.to_dict(),identificador=tipo.key.id()))

    @classmethod
    def put_tipo(self, id_query, nombre):
        return Tipo(
            id = id_query,
            nombre = nombre
        ).put()

    @classmethod
    def remove_tipo(self, id_query):
        return Key("Tipo", id_query).delete()