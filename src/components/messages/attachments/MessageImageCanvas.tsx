import { useEffect, useRef } from "react";

type Props = {
  file: File;
};

const MessageImageCanvas = ({ file }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const image = new Image();
    image.src = URL.createObjectURL(file);

    image.onload = (e) => {
      const { current: canvas } = canvasRef;

      if (!canvas) return;
      const context = canvas.getContext("2d");

      const ratio = Math.max(
        canvas.width / image.width,
        canvas.height / image.height
      );
      const newWidth = image.width * ratio;
      const newHeight = image.height * ratio;
      const offsetX = (canvas.width - newWidth) / 2;
      const offsetY = (canvas.height - newHeight) / 2;
      context?.drawImage(image, offsetX, offsetY, newWidth, newHeight);
    };
  }, [file]);

  return (
    <canvas
      ref={canvasRef}
      width={200}
      height={150}
      style={{
        width: "200px",
        height: "150px",
      }}
    ></canvas>
  );
};

export default MessageImageCanvas;
