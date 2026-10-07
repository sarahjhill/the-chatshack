import { useState } from "react";
import { Play } from "lucide-react";

/**
 * Drop-in video block for "meet the founder" style content.
 *
 * To add the real video once you have it, just set VIDEO_URL below
 * (in AboutPage.tsx) to either:
 *   - a YouTube/Vimeo share link, e.g. "https://www.youtube.com/watch?v=XXXXXXXXXXX"
 *   - or a path to an uploaded video file, e.g. "/videos/founder.mp4"
 * Leave it as an empty string and this shows a tasteful "coming soon" card instead.
 */
export default function FounderVideo({
  videoUrl,
  poster,
}: {
  videoUrl: string;
  poster: string;
}) {
  const [playing, setPlaying] = useState(false);

  const youtubeMatch = videoUrl.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
  );
  const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);

  let embedSrc: string | null = null;
  if (youtubeMatch) embedSrc = `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
  else if (vimeoMatch) embedSrc = `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

  const hasVideo = videoUrl.trim().length > 0;

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg aspect-video bg-[#1a2e1a]">
      {playing && hasVideo ? (
        embedSrc ? (
          <iframe
            src={embedSrc}
            title="Meet our founder"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={videoUrl} className="w-full h-full object-cover" controls autoPlay />
        )
      ) : (
        <button
          type="button"
          onClick={() => hasVideo && setPlaying(true)}
          className="group relative w-full h-full block"
          aria-label={hasVideo ? "Play video: meet our founder" : "Video coming soon"}
        >
          <img src={poster} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Play className="w-7 h-7 text-[#1a7a4a] ml-1" fill="currentColor" />
            </div>
            <p className="text-white font-bold drop-shadow">
              {hasVideo ? "Watch: Meet our founder" : "Founder video coming soon"}
            </p>
          </div>
        </button>
      )}
    </div>
  );
}
