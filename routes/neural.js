var express = require('express');
var synaptic = require('synaptic');
var router = express.Router();

var Neuron = synaptic.Neuron,
        Layer = synaptic.Layer,
        Network = synaptic.Network,
        Trainer = synaptic.Trainer,
        Architect = synaptic.Architect;

var inputLayer = new Layer(2);
var hiddenLayer = new Layer(3);
var outputLayer = new Layer(1);

inputLayer.project(hiddenLayer);
hiddenLayer.project(outputLayer);

var myNetwork = new Network({
    input: inputLayer,
    hidden: [hiddenLayer],
    output: outputLayer
});

/* GET home page. */
router.get('/', function (req, res, next) {
    // train the network - learn XOR
    console.log('Iniciando meu treinamento :) \n\n\n');
    var learningRate = .3;
    for (var i = 0; i < 20000; i++) {        
        // 0,0 => 0
        myNetwork.activate([0, 0]);
        myNetwork.propagate(learningRate, [0]);
        // 0,1 => 1
        myNetwork.activate([0, 1]);
        myNetwork.propagate(learningRate, [1]);
        // 1,0 => 1
        myNetwork.activate([1, 0]);
        myNetwork.propagate(learningRate, [1]);
        // 1,1 => 0
        myNetwork.activate([1, 1]);
        myNetwork.propagate(learningRate, [0]);
    }
    console.log('\n\n Rede Treinada \n\n');
    console.log(myNetwork.activate([0,0]));   
    res.send('Treinamento Concluido!');
});

module.exports = router;