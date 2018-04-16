const express = require('express');
const synaptic = require('synaptic');
const router = express.Router();

const {Neuron, Layer, Network, Trainer, Architect} = synaptic;

const inputLayer = new Layer(2);
const hiddenLayer = new Layer(3);
const outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

const myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

function activateAndPropagate(learningRate, input, target){
    myNetwork.activate(input);
    myNetwork.propagate(learningRate, target);
}

/* GET home page. */
router.get('/', (req, res) => {
    // train the network - learn XOR
    console.log('Iniciando meu treinamento :) \n\n\n');
    let learningRate = .3;
    for (let i = 0; i < 20000; i++) {
        // 0,0 => 0
        activateAndPropagate(learningRate,[0, 0],[0]);
        // 0,1 => 1
        activateAndPropagate(learningRate,[0, 1],[1]);
        // 1,0 => 1
        activateAndPropagate(learningRate,[1, 0],[1]);
        // 1,1 => 0
        activateAndPropagate(learningRate,[1, 1],[0]);
    }
    console.log('\n\n Rede Treinada \n\n');
    console.log(myNetwork.activate([0,0]));   
    res.send('Treinamento Concluido!');
});

module.exports = router;