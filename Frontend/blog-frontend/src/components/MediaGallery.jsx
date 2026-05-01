import React from 'react';
import { FileIcon } from 'lucide-react';

export default function MediaGallery({ urls }) {
    if (!urls || urls.length === 0) return null;

    return (
        <div className="gallery-grid">
            {urls.map((url, index) => {
                const isImage = url.match(/\.(jpeg|jpg|png|gif)$/i);
                const isVideo = url.match(/\.(mp4|webm|ogg)$/i);

                if (isImage) {
                    return <img key={index} src={url} alt={`Gallery item ${index + 1}`} />;
                }

                if (isVideo) {
                    return <video key={index} src={url} controls />;
                }

                return (
                    <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="attachment-link">
                        <FileIcon />
                        <span>View Attachment</span>
                    </a>
                );
            })}
        </div>
    );
}
