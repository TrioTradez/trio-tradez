
import React, { useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, BookOpen } from 'lucide-react';
import { mockVideos } from '../data/mockData';
import { Button } from '../components/ui/button';

export const VideoPlayer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const video = mockVideos.find(v => v.id === id);
  
  if (!video) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Video not found</h2>
        <Button onClick={() => navigate('/library')}>
          Back to Library
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Button>

      {/* Video Player */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="aspect-video bg-black">
          <video
            ref={videoRef}
            controls
            className="w-full h-full"
            poster={video.thumbnail}
          >
            <source src={video.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-3">{video.title}</h1>
          <p className="text-muted-foreground mb-4">{video.description}</p>
          
          <div className="flex items-center gap-4">
            <span className="text-sm bg-muted px-3 py-1 rounded-full">
              Duration: {video.duration}
            </span>
            
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            
            <Button variant="outline" size="sm">
              <BookOpen className="w-4 h-4 mr-2" />
              Transcript
            </Button>
          </div>
        </div>
      </div>

      {/* Video Transcript */}
      {video.transcript && (
        <div className="glass-card rounded-xl p-6">
          <h2 className="text-xl font-bold mb-4">Transcript</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground">
              {video.transcript || "Transcript will be available here for premium members."}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
