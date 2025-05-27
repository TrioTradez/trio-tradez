
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import { mockPDFs } from '../data/mockData';
import { Button } from '../components/ui/button';

export const PDFViewer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const pdf = mockPDFs.find(p => p.id === id);
  
  if (!pdf) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">PDF not found</h2>
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

      {/* PDF Header */}
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-3">{pdf.title}</h1>
            <p className="text-muted-foreground mb-4">{pdf.description}</p>
            <span className="text-sm bg-muted px-3 py-1 rounded-full">
              {pdf.pages} pages
            </span>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            
            <Button className="trading-gradient text-white">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* PDF Viewer Placeholder */}
      <div className="glass-card rounded-xl p-6">
        <div className="aspect-[3/4] bg-muted/30 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Eye className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">PDF Preview</h3>
            <p className="text-muted-foreground mb-4">
              This is where the PDF content would be displayed
            </p>
            <p className="text-sm text-muted-foreground">
              In a real app, you would integrate a PDF viewer library like react-pdf
            </p>
          </div>
        </div>
      </div>

      {/* PDF Info */}
      <div className="glass-card rounded-xl p-6">
        <h2 className="text-xl font-bold mb-4">Document Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-sm text-muted-foreground">Title</h4>
            <p>{pdf.title}</p>
          </div>
          <div>
            <h4 className="font-medium text-sm text-muted-foreground">Pages</h4>
            <p>{pdf.pages}</p>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-medium text-sm text-muted-foreground">Description</h4>
            <p>{pdf.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
