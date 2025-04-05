from flask import Flask, render_template, request
import joblib  # or pickle

app = Flask(__name__)

# Load your model (replace 'model.pkl' with your actual model file)
model = joblib.load("model.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        # Get input from form
        feature1 = float(request.form["feature1"])
        feature2 = float(request.form["feature2"])
        
        # Make prediction
        prediction = model.predict([[feature1, feature2]])
        
        return render_template("index.html", prediction_text=f"Prediction: {prediction[0]}")

if __name__ == "__main__":
    app.run(debug=True)
