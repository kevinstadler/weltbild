import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/WebGLTile';

import DataTile from 'ol/source/DataTile';
import XYZ from 'ol/source/XYZ';

import EventType from 'ol/events/EventType.js';
import {createCanvasContext2D} from 'ol/dom.js';
import {listenImage} from 'ol/Image.js';

const size = 256;
const canvas = document.createElement('canvas');
canvas.width = size;
canvas.height = size;

const context = canvas.getContext('2d');

const loadTile = (z, x, y) => {
  return new Promise((resolve, reject) => {
    // TODO return data (uint8array or dataview)
    const img = new Image();
    img.crossOrigin = "Anonymous";
    const foo = (e) => {
      context.drawImage(e.target, size/2, size/2);
      const data = context.getImageData(0, 0, size, size).data;
      resolve(data);
    }
    listenImage(img, foo, console.log);
    //img.addEventListener("load", imageReceived, false)
    img.src = `https://api.mapbox.com/v4/mapbox.satellite/${z}/${x}/${y}.jpg?access_token=pk.eyJ1Ijoia2V2aW5zdGFkbGVyIiwiYSI6ImNsM2EzYXNvMzAxcnkzY3J3bjZ6ankxYm4ifQ.T93bS1D_bNjxS_T-RI5DUw`;
  });
};

// implement Tile with getImage()

// canvas.getImageData().data
// img.src = `data:image/png;base64,${toBase64( selected[0].image2.data)}`

const map = new Map({
  controls: [],
  target: 'map',
  layers: [
    new TileLayer({
      source: new DataTile({
        loader: loadTile,
        // url: 'https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.jpg?access_token=pk.eyJ1Ijoia2V2aW5zdGFkbGVyIiwiYSI6ImNsM2EzYXNvMzAxcnkzY3J3bjZ6ankxYm4ifQ.T93bS1D_bNjxS_T-RI5DUw',
        // tileLoadFunction: (tile, src) => {
        //   const img = tile.getImage();
        //   const canvas = createCanvasContext2D(256, 256);
        //   tile.setImage(canvas);
        //   tile.addEventListener(EventType.CHANGE, (e) => console.log(e));

        //   // listenImage(img, console.log, console.log);
        //   img.src = src;
        // }
      })
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
