/* eslint-disable no-constant-condition */
/* eslint-disable no-await-in-loop */
import * as mobilenet from '@tensorflow-models/mobilenet';
import * as tf from '@tensorflow/tfjs';
import { ReactElement, useEffect, useRef } from 'react';

function Mobilenet(): ReactElement {
  const camera = useRef<HTMLVideoElement>(null);
  const figures = useRef<HTMLDivElement>(null);

  const run = async () => {
    const net = await mobilenet.load();

    const webcamElement = camera.current ?? undefined;
    const webcam = await tf.data.webcam(webcamElement, {
      resizeWidth: 220,
      resizeHeight: 227,
    });

    while (true) {
      const img = await webcam.capture();
      const result = await net.classify(img);

      if (figures.current) {
        figures.current.innerText = `prediction : ${result[0].className} \n probability: ${result[0].probability}`;
      }

      img.dispose();

      await tf.nextFrame();
    }
  };

  useEffect(() => {
    run();
  }, [run]);

  return (
    <>
      <div ref={figures} />
      <video autoPlay playsInline muted ref={camera} width="220" height="227" />
    </>
  );
}

export default Mobilenet;
