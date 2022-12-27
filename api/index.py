# from http.server import BaseHTTPRequestHandler

# class handler(BaseHTTPRequestHandler):

#     def do_GET(self):
#         self.send_response(200)
#         self.send_header('Content-type','text/plain')
#         self.end_headers()
#         self.wfile.write('Hello, world!'.encode('utf-8'))
#         return

from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods = ['GET'])
def index():
    if(request.method == 'GET'):
        return jsonify({
            status: 200
            message: 'Hello World'
        })
