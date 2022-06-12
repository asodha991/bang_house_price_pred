import imp
import pickle
import json
from pyexpat import model
import numpy as np


__location = None
__data_columns = None
__model = None 


def price_pred(bath, balcony, total_sqft_cal,room, Area,  location):
    load_artifact()
    try:
        loc_index = __data_columns.index(location.lower())
    except:
        loc_index = -1
    x= np.zeros(len(__data_columns))
    x[0] = bath
    x[1] = balcony
    x[2] = total_sqft_cal
    x[3] = room
    if Area == 'Built_up__Area':
        x[4] = 1
    if Area == 'Plot__Area':
        x[4] = 1
    if Area == 'Super_built_up__Area':
        x[4] = 1
    if loc_index >= 0:
        x[loc_index] = 1
    
    out = round(__model.predict([x])[0],2)
    print(out)
    return out


def get_location():
    load_artifact()
    # print(__location)
    return __location

def load_artifact():
    print("Loading Artifacts-- Start")
    global __data_columns
    global __location
    with open('artifacts\Columns.json', 'r') as f:
        __data_columns = json.load(f)['data_columns']
        __location   = __data_columns[7:]

    global __model
    with open('artifacts\Price_pred_model.pickle', 'rb') as f:
        __model = pickle.load(f)

    print("Loading Artifacts-- Completed")

if __name__ == ("__main__"):
    load_artifact()
    get_location()
    print(price_pred(5.0, 2.0,1630, 5 ,'Super_built_up__Area','1st Block Jayanagar'))