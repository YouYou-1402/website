import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <h1 className="text-9xl font-serif font-bold text-vintage-lightbrown/50">
            404
          </h1>
          <h2 className="text-3xl font-serif font-bold text-vintage-brown mb-4">
            Page Not Found
          </h2>
          <p className="text-vintage-sepia leading-relaxed">
            The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="space-y-4">
          <Button 
            onClick={() => window.history.back()}
            variant="outline"
            className="w-full"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          
          <Link to="/" className="block">
            <Button className="w-full">
              <HomeIcon className="w-4 h-4 mr-2" />
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
