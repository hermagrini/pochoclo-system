#  coding: utf-8 --
from api.lib import bottle
from api.lib.bottle import *
from api import tipo,asientos,rubro
# Si vamos a tener por separado los handlers, aca no deberiamos importar modelos :P
# from api.models import *

app = bottle.Bottle({'mode': 'development'})
response.content_type = 'application/json'

@app.route('/', method='GET')
def index():
    return static_file('client/index.html', root='./')

tipo.initRoutes(app)
rubro.initRoutes(app)
asientos.initRoutes(app)