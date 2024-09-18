import "../css/404.css";

function Page_404() {
  return (
    <div id="page_not_found">
      <h1>How did we get here?</h1>
      <p>This page doesn't exist, so have some cool songs instead</p>
      <div id="songs">
        <iframe
          id="ytplayer"
          width="500"
          height="500"
          src="https://www.youtube.com/embed/ihE2_fvT1f4?autoplay=0&origin=http://example.com"
        ></iframe>
        <iframe
          id="ytplayer"
          width="500"
          height="500"
          src="https://www.youtube.com/embed/AG01bN8l1Tc?autoplay=0&origin=http://example.com"
        ></iframe>
        <iframe
          id="ytplayer"
          width="500"
          height="500"
          src="https://www.youtube.com/embed/dJUZv-5xny0?autoplay=0&origin=https://discord.com"
        ></iframe>
      </div>
    </div>
  );
}

export default Page_404;
