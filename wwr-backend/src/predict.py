import joblib
import sys
import json

from sklearn import svm  

def save_model(model, save_path):
    joblib.dump(model, save_path)

def load_and_predict(input_data, model_path):
    model = joblib.load(model_path)
    predictions = model.predict(input_data).tolist()

    return predictions

if __name__ == "__main__":
    svm_model_to_save = svm.SVC()  
    save_path = './ml/svm_model.joblib'
    save_model(svm_model_to_save, save_path)

    loaded_model_path = './ml/svm_model.joblib'
    input_data = json.loads(sys.argv[1])
    result = load_and_predict(input_data, loaded_model_path)
    print(json.dumps(result))
