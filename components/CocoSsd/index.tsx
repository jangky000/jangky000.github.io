/* eslint-disable no-param-reassign */
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { emotionTheme } from '@theme/emotionTheme';
import { ReactElement, useEffect, useRef } from 'react';
import { CocoSsdWrapper, Dimensions } from './style';

async function initVideoStream(video: HTMLVideoElement | null) {
  if (!video) return;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  video.srcObject = stream;
}

function drawObjectDetectionRects(
  context: CanvasRenderingContext2D,
  predictions: cocoSsd.DetectedObject[],
) {
  for (let i = 0; i < predictions.length; i += 1) {
    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = emotionTheme.colors.green;
    context.rect(...predictions[i].bbox);
    context.stroke();
    context.font = '24px Arial';
    context.fillStyle = emotionTheme.colors.green;
    context.fillText(
      `${predictions[i].class} ${Number(predictions[i].score) * 100}%`,
      predictions[i].bbox[0],
      predictions[i].bbox[1],
    );
  }
}

function CocoSsd(): ReactElement {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const run = async () => {
    const model = await cocoSsd.load();
    const context = canvasRef.current?.getContext('2d');

    initVideoStream(videoRef.current);

    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (context && video && canvas) {
      canvas.width = video.width;
      canvas.height = video.width;

      const predict = async () => {
        context.drawImage(video, 0, 0, video.width, video.height);
        const predictions = await model.detect(canvas);
        drawObjectDetectionRects(context, predictions);
        requestAnimationFrame(predict);
      };

      predict();
    }
  };

  useEffect(() => {
    // TODO: event listener 등록
    run();
  }, [run]);

  return (
    <CocoSsdWrapper>
      <video
        autoPlay
        playsInline
        muted
        ref={videoRef}
        width={Dimensions.width}
        height={Dimensions.height}
      />
      <canvas
        ref={canvasRef}
        style={{ position: 'absolute', top: 0, left: 0 }}
      />
    </CocoSsdWrapper>
  );
}

export default CocoSsd;
