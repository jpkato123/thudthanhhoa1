

export const YoutubeVideo = (props) => {
    const {width,height,youtubeLink} = props
  return (
    <div className="p-5 flex flex-col mx-auto max-w-3xl">
      <iframe
        width={width}
        height={height}
        src={youtubeLink}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
}
