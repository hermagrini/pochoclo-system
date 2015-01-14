#  coding: utf-8 --
from api.lib import bottle
from api.lib.bottle import *
from api.models.tipo_model import Tipo
from json import dumps

def initRoutes(app=None):
    if not app:
        app = bottle.default_app()

    @app.route('/tipo/traerListaTipos', method='POST')  #testeado y andando!
    def getPostList():
        return Tipo.get_all_json()#[post.to_dict() for post in Post.query()]

    @app.route('/tipo/traerTipo', method='POST')      #testeado y andando!
    def getPost():
        return Tipo.get_id_json(request.json["id"])

    @app.route('/put/tipo', method='POST')          #testeado y andando!
    def putTipo():
        Tipo.put_tipo(
            id_query = request.json["id"],
            nombre = request.json["nombre"]
        )
        return "Tipo agregado exitosamente!"

    @app.route('/edit/tipo', method='POST')          #testeado y andando (PD: CHAN por ahora es igual a put post)!
    def editTipo():
        Tipo.put_tipo(
            id_query = request.json["id"],
            nombre = request.json["nombre"]
        )
        return "Tipo editado exitosamente!"

    @app.route('/remove/tipo', method='POST')
    def removeTipo():                               #testeado y andando (PD: el metodo era delete, no remove)!
        Tipo.remove_tipo(request.json["id"])
        return "Tipo eliminado exitosamente!"