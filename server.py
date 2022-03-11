
from flask import Flask,request,jsonify,render_template,json
import joblib
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

__model = None


def load_model():
    loaded_model = joblib.load("ai.model")
    return loaded_model

def predict(args):
    result = __model.predict([args])
    return result



@app.route('/')
def home():
   return render_template('home.html')

@app.route('/predict', methods = ["GET"])
def query_example():
    
    args = request.args
    beds = args.get("beds")
    baths = args.get("baths")
    sqft = args.get("sqft")
    yr_built = args.get("yr_built")
    basement = args.get("basement")
    txyear = args.get("txyear")
    insurance = args.get("insurance")
    list_args = [beds,baths,sqft,yr_built,basement,txyear,insurance]
    return jsonify({"price" : predict(list_args)[0]})



if __name__ == "__main__":
   __model = load_model()
   print("Starting Server")
   app.run()
   print("Server Started...")