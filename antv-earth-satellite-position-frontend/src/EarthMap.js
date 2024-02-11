import React, { useEffect } from 'react';
import { Scene, EarthLayer } from '@antv/l7';
import {Earth} from "@antv/l7";

function EarthMap() {
    useEffect(() => {
        const scene = new Scene({
            id: 'map',
            map: new Earth({})
        });

        scene.setBgColor('#000');

        const earthLayer = new EarthLayer()
            .source('https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*3-3NSpqRqUoAAAAAAAAAAAAAARQnAQ', {
                parser: {
                    type: 'image',
                },
            })
            .shape('fill')
            .animate(true);

        scene.addLayer(earthLayer);

        return () => {
            scene.destroy();
        };
    }, []);

    return (
        <div id="map" style={{ width: '100%', height: '100vh' }}>
            {}
        </div>
    );
}

export default EarthMap;