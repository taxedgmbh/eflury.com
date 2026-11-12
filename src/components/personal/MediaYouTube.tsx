import { ArrowUpRight, Play } from 'lucide-react';
import { getLatestVideos, YT_HANDLE_URL, type YtVideo } from '@/lib/youtube';
import { BrandWord } from './BrandWord';
import { fmtShort } from './data';
import { SocialIcon } from './SocialIcon';
import { YouTubePlayer } from './YouTubePlayer';

const thumb = (id: string, q = 'hqdefault') => `https://i.ytimg.com/vi/${id}/${q}.jpg`;

function Card({ v, lead }: { v: YtVideo; lead?: boolean }) {
  return (
    <figure className={`yt-card${lead ? ' yt-card-lead' : ''}`}>
      <YouTubePlayer
        id={v.id}
        title={v.title}
        src={thumb(v.id, lead ? 'maxresdefault' : 'hqdefault')}
        fallback={lead ? thumb(v.id) : undefined}
        width={lead ? 1280 : 480}
        height={lead ? 720 : 360}
        size={lead ? 34 : 22}
      />
      <figcaption>
        <span className="yt-date">{fmtShort.format(v.published)}</span>
        <span className="yt-title">{v.title}</span>
      </figcaption>
    </figure>
  );
}

export async function MediaYouTube() {
  const videos = await getLatestVideos(3);
  const [lead, ...rest] = videos;
  const subscribe = `${YT_HANDLE_URL}?sub_confirmation=1`;

  return (
    <section id="media" className="yt">
      <div className="yt-wrap">
        <BrandWord word="FOCUS" img="city" />
        <div className="yt-head">
          <div>
            <p className="yt-eyebrow">
              <SocialIcon name="YouTube" size={16} /> Video
            </p>
            <h2>On YouTube.</h2>
            <p className="yt-lead">New videos appear here automatically.</p>
          </div>
          <div className="yt-actions">
            <a href={subscribe} target="_blank" rel="noopener me" className="yt-btn yt-btn-fill">
              Subscribe
            </a>
            <a href={YT_HANDLE_URL} target="_blank" rel="noopener me" className="yt-btn yt-btn-line">
              Open channel <ArrowUpRight size={15} aria-hidden />
            </a>
          </div>
        </div>

        {lead ? (
          <>
            <div className={`yt-grid${rest.length ? '' : ' yt-grid-single'}`}>
              <Card v={lead} lead />
              {rest.length > 0 ? (
                <div className="yt-side">
                  {rest.map((v) => (
                    <Card key={v.id} v={v} />
                  ))}
                </div>
              ) : null}
            </div>
            <p className="yt-note">
              <span className="yt-rule" aria-hidden />
              The video only loads from YouTube when you click play.
            </p>
          </>
        ) : (
          <a href={subscribe} target="_blank" rel="noopener me" className="yt-empty">
            <span className="yt-empty-play">
              <Play size={30} aria-hidden />
            </span>
            <span className="yt-empty-title">The channel is launching soon.</span>
            <span className="yt-empty-text">Subscribe so you do not miss the first video.</span>
          </a>
        )}
      </div>
    </section>
  );
}
