import json
from urllib import response
from flask import Flask, request, jsonify, render_template
import artifacts.util as util

app = Flask(__name__)

@app.route('/')

def home(): 
    return render_template('app.html')

@app.route('/location')

def location():
    response = jsonify({
      'location': util.get_location()
    })
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@app.route('/predict', methods= ['POST'])

def predict():
    # bath, balcony, total_sqft_cal,room, Area,  location):
    bath           = float(request.form['Bath'])
    balcony        = float(request.form['Bal'])
    total_sqft_cal = float(request.form['sqft'])
    room           = float(request.form['uiBHK'])
    Area           = request.form['Area']
    location       = request.form['location']

    response = jsonify({
        'price': util.price_pred(bath, balcony, total_sqft_cal, room, Area, location)
    })
    print(response)
    return response


if __name__ == '__main__':
    print("Start Python Flask")
    app.run()