type Props = {
  src?: string;
};

export const VideoPlayer = ({ src }: Props) => {
  return <video src={src} />;
};
