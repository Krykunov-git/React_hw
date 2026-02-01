function VideoComponent() {
  return (
    <div>

      <iframe
        src="https://www.youtube.com/embed/s7oqxTzYAFg"
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ inset: 0, width: '900px', height: '500px', border: 0 }}
      />
    </div>
  )
}

export default VideoComponent;

