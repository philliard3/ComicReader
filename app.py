from flask import Flask, render_template, send_file, request, session, json, redirect, url_for, Response
from flask_cors import CORS
import pymongo
import bson

client = pymongo.MongoClient()
pagedb = client.testcomic.pages

app = Flask(__name__)
app.secret_key = "change this string"
cors = CORS(app, resources={r"/*": {"origins": "*"}})

@app.route("/")
@app.route("/home")
@app.route("/index")
def homepage():
    return(render_template("index.html"))

@app.route("/read")
def read():
    return(render_template("read.html"))

@app.route("/read/<page>")
def read_page():
    return(render_template("read.html"))

@app.route("/get_image")
def get_image():
    return(send_file("images/maus-p12.jpg", mimetype='image/jpg'))

@app.route("/get_valid_pages")
def get_valid_pages():
    return json.jsonify({
          'name': '1',
          'src': 'http://127.0.0.1:5000/get_image',
          'prev': None,
          'next': '2',
          'frame_src': 'http://127.0.0.1:5000/get_frames'
        },
        {
            'name': '2',
            'src': 'http://3.bp.blogspot.com/-X6P3fZkcEeE/ULMPe0lfp3I/AAAAAAAAAMw/UiGSPiY7oNM/s1600/vol2pg37.jpg',
            'prev': '1',
            'next': None,
            'frame_src': 'http://127.0.0.1:5000/get_frames'
        }
    )

@app.route("/get_frames")
def get_frames():
    return json.jsonify([
        {
            "shape": "rectangle",
            "refferent":{
                "x": 0,
                "y": 0,
                "width": 50,
                "height": 50
            },
            "result": {
                "x": 50,
                "y": 50,
                "width": 150,
                "height": 150,
                "mask": False,
                "maskColor": None
            }
        },{
            "shape": "rectangle",
            "refferent":{
                "x": 50,
                "y": 0,
                "width": 50,
                "height": 50
            },
            "result": {
                "x": 30,
                "y": 50,
                "width": 150,
                "height": 150,
                "mask": False,
                "maskColor": None
            }
        }
    ])


if __name__ == '__main__':
    app.run(debug=True)