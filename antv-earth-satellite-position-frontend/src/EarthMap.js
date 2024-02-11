import React, { useEffect } from 'react';
import { Scene, EarthLayer } from '@antv/l7';
import {Earth} from "@antv/l7";

function EarthMap() {
    useEffect(() => {
        // Create a new L7 Scene
        const scene = new Scene({
            id: 'map',
            map: new Earth({})
        });

        // Add layers to the scene
        const earthLayer = new EarthLayer()
            .source('https://gw.alipayobjects.com/mdn/rms_23a451/afts/img/A*3-3NSpqRqUoAAAAAAAAAAAAAARQnAQ', {
                parser: {
                    type: 'image',
                },
            })
            .shape('fill')
            .animate(true);

        // Add the EarthMap layer to the scene
        scene.addLayer(earthLayer);

        // Optionally, you can set up event listeners or perform other actions here

        // Clean up when the component is unmounted
        return () => {
            scene.destroy();
        };
    }, []); // Empty dependency array ensures the effect runs only once

    return (
        <div id="map" style={{ width: '100%', height: '500px' }}>
            {/* Container for the L7 Scene */}
        </div>
    );
}

export default EarthMap;