import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import { showcaseDetails } from '../data/showcaseDetails';
import './ShowcaseDetail.css';

const ShowcaseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/showcase');
    }
  };

  const item = showcaseDetails.find(i => i.id === Number(id));

  useEffect(() => {
    if (item) {
      document.title = item.title; // Update the page title for the current showcase item.
    } else {
      document.title = "Showcase"; // Fallback title for missing items.
    }
  }, [item]); // Re-run when the item changes.


  if (!item) return <div>Work not found</div>;

  return (
    <div className="detail-container">
      <Navbar />
      <div className="hero-image-container">
        <img
          src={item.coverImage}
          alt={item.title}
          className={`hero-image ${item.id === 14 ? 'hero-image' : ''}`}
        />
      </div>

      {/* Content container */}
      <div className="content-container">
        <div className="content-wrapper">
          {/* Fixed header content */}
          <h1 className="title1">{item.title}</h1>
          <div className="authors">{item.authors}</div>
          <div className="program">{item.program}</div>

          {/* Dynamic sections */}
          <Section
            title="Description"
            content={item.description}
          />

          {Object.entries(item.sections).map(([sectionTitle, content]) => (
            <Section
              key={sectionTitle}
              title={sectionTitle}
              content={content}
            />
          ))}
        </div>
        {/* Video section - add this before the image section */}
        {item.detailVideos && item.detailVideos.length > 0 && (
          <div className="detail-video-container">
            {item.detailVideos.map((video, index) => {
              // Check if the source is a Google Drive link
              const isGoogleDriveLink = video.src.includes('drive.google.com');

              return isGoogleDriveLink ? (
                <iframe
                  key={index}
                  src={video.src}
                  width={video.width}
                  className="detail-video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title={`Video ${index + 1}`}
                ></iframe>
              ) : (
                <video
                  key={index}
                  src={video.src}
                  controls
                  width={video.width}
                  className="detail-video"
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              );
            })}
          </div>
        )}

        {/* Detail images */}
        <div className="detail-image-container">
          {item.detailImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={`Detail ${index + 1}`}
              className={`detail-image ${item.id === 18 ? 'full-width' :
                item.id === 19 ? (index === 0 ? 'full-width' : 'half-width') :
                  (index < 2 ? 'full-width' : 'half-width')
                }`}
            />
          ))}
        </div>

        <button
          className="back-button"
          onClick={handleBack}
        >
          ← Back to Showcase
        </button>

      </div>
    </div>
  );
};

// Reusable section component for rich text content.
const Section: React.FC<{ title: string; content?: string }> = ({ title, content }) => {
  if (!content) return null;

  const replacements = [
    {
      placeholder: '__Mang__',
      linkText: 'Mang',
      url: 'https://nyuad.nyu.edu/en/academics/divisions/arts-and-humanities/faculty/michael-ang.html',
    },
    {
      placeholder: '__Moon__',
      linkText: 'Moon',
      url: 'https://shanghai.nyu.edu/academics/faculty/directory/jung-hyun-moon',
    },
    {
      placeholder: '__Leon__',
      linkText: 'Leon',
      url: 'https://leoneckert.com/',
    },
  ];

  // Create a regex to match any of the replacement placeholders
  const regex = new RegExp(`(${replacements.map(r => r.placeholder).join('|')})`, 'g');

  // Split the content by the placeholders while preserving the placeholders in the resulting array
  const parts = content.split(regex);

  // Map over parts and replace any placeholder match with corresponding link element.
  const renderedContent = parts.map((part, index) => {
    // Check if the current part matches any replacement placeholder
    const rep = replacements.find(r => r.placeholder === part);
    if (rep) {
      return (
        <a
          key={`link-${index}`}
          href={rep.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {rep.linkText}
        </a>
      );
    }
    // Otherwise, split by newlines and process each line for URLs
    return part.split('\n').map((line, idx, arr) => {
      // Helper function to render text with URL detection and special handling for video sections
      const renderTextWithLinks = (text: string) => {
        // Check if this is a video documentation section
        if (title === "Video Documentation") {
          // Handle Google Drive links
          if (text.includes('drive.google.com')) {
            const driveMatch = text.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
            if (driveMatch) {
              const fileId = driveMatch[1];
              const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;

              return (
                <div style={{ marginTop: '10px' }}>
                  <iframe
                    src={embedUrl}
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    title="Video Documentation"
                    className="detail-video"
                  ></iframe>
                </div>
              );
            }
          }

          // Handle Vimeo links
          if (text.includes('vimeo.com')) {
            const vimeoMatch = text.match(/vimeo\.com\/(\d+)/);
            if (vimeoMatch) {
              const videoId = vimeoMatch[1];
              const embedUrl = `https://player.vimeo.com/video/${videoId}`;

              return (
                <div style={{ marginTop: '10px' }}>
                  <iframe
                    src={embedUrl}
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                    title="Video Documentation"
                    className="detail-video"
                  ></iframe>
                </div>
              );
            }
          }

          // Handle YouTube links
          if (text.includes('youtube.com') || text.includes('youtu.be')) {
            let videoId = '';

            // Handle youtube.com/watch?v= format
            const youtubeMatch = text.match(/youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
            if (youtubeMatch) {
              videoId = youtubeMatch[1];
            }

            // Handle youtu.be/ format
            const youtubeShortMatch = text.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
            if (youtubeShortMatch) {
              videoId = youtubeShortMatch[1];
            }

            if (videoId) {
              const embedUrl = `https://www.youtube.com/embed/${videoId}`;

              return (
                <div style={{ marginTop: '10px' }}>
                  <iframe
                    src={embedUrl}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Video Documentation"
                    className="detail-video"
                  ></iframe>
                </div>
              );
            }
          }
        }

        // Regular URL detection for other content
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        const parts = text.split(urlRegex);

        return parts.map((part, partIdx) => {
          if (urlRegex.test(part)) {
            // This part is a URL
            return (
              <a
                key={`${index}-${idx}-url-${partIdx}`}
                href={part}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#007bff', textDecoration: 'underline' }}
              >
                {part}
              </a>
            );
          } else {
            // This part is regular text
            return part;
          }
        });
      };

      return (
        <React.Fragment key={`${index}-${idx}`}>
          {renderTextWithLinks(line)}
          {idx < arr.length - 1 && <br />}
        </React.Fragment>
      );
    });
  });

  return (
    <div className="section">
      {title !== "Description" && <h2 className="section-title">{title}</h2>}
      <div className="section-content">
        {renderedContent}
      </div>
    </div>
  );
};

export default ShowcaseDetail;