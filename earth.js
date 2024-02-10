const {Scene, EarthLayer, LineLayer} = require("@antv/l7") ;
const {Earth} =  require("@antv/l7") ;


function  createEarthScene() {
    const scene = new Scene({
        id: 'map',
        map: new Earth({})
    });

    scene.setBgColor('#333');

    const earthLayer = new EarthLayer()
        .source('https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*3-3NSpqRqUoAAAAAAAAAAAAAARQnAQ',
            {parser: {type: 'image'}}
        )
        .color('#FFFFFF')
        .shape('fill')
        .style({
            globalOptions: {
                ambientRatio: 0.6,
                diffusionRatio: 0.4,
                specularRatio: 0.1
            }
        })
        .animate(true);

    scene.on('loaded', () => {
        scene.addLayer(earthLayer);
    });
}

module.exports = { createEarthScene };