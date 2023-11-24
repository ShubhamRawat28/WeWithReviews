const svm = require('svm-light');  
const fs = require('fs');

function saveModel(model, savePath) {
    fs.writeFileSync(savePath, JSON.stringify(model));
    console.log(`Model saved to ${savePath}`);
}

function loadAndPredict(inputData, modelPath) {
    const model = JSON.parse(fs.readFileSync(modelPath, 'utf-8'));
    const predictions = model.predict(inputData);
    return predictions;
}

if (require.main === module) {
    // Example usage for training and saving the model
    const svmModel = svm.trainSync([...]);  // Replace [...] with your training data
    const savePath = './ml/svm_model.json';
    saveModel(svmModel, savePath);

    // Example usage for loading and making predictions
    const loadedModelPath = './ml/svm_model.json';
    const inputData = [...]; 
    const result = loadAndPredict(inputData, loadedModelPath);
    console.log(result);
}

module.exports = {
    saveModel,
    loadAndPredict,
};
