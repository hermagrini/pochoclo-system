#  coding: utf-8 --
from api.lib import bottle
from api.lib.bottle import *
from api.models.rubro_model import Rubro
from json import dumps

def initRoutes(app=None):
    if not app:
        app = bottle.default_app()

    @app.route('/rubro/traerListaRubros', method='POST')  #testeado y andando!
    def getRubroList():
        return Rubro.get_all_json()#[post.to_dict() for post in Post.query()]

    @app.route('/rubro/traerRubro', method='POST')      #testeado y andando!
    def getRubro():
        return Rubro.get_id_json(request.json["id"])

    @app.route('/put/rubro', method='POST')          #testeado y andando!
    def putRubro():
        Rubro.put_rubro(
            id_query = request.json["id"],
            idTipo = request.json["idTipo"],
            nombre = request.json["nombre"]
        )
        return "Rubro agregado exitosamente!"

    @app.route('/edit/rubro', method='POST')          #testeado y andando (PD: CHAN por ahora es igual a put post)!
    def editRubro():
        Rubro.put_rubro(
            id_query = request.json["id"],
            idTipo = request.json["idTipo"],
            nombre = request.json["nombre"]
        )
        return "Rubro editado exitosamente!"

    @app.route('/remove/rubro', method='POST')
    def removeRubro():                               #testeado y andando (PD: el metodo era delete, no remove)!
        Rubro.remove_rubro(request.json["id"])
        return "Rubro eliminado exitosamente!"