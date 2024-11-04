import React, { useEffect, useRef } from 'react';
import { useUserStore } from '../store/userStore';
import { Navigate } from 'react-router-dom';

export const UserDashboard: React.FC = () => {
  const currentUser = useUserStore((state) => state.currentUser);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (currentUser && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.src = 'https://i.ibb.co/3mh6YcJ/1.png';
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx?.drawImage(img, 0, 0);
        
        if (ctx) {
          ctx.font = '20px Arial';
          ctx.fillStyle = 'black';
          ctx.fillText(currentUser.name, 200, 150);
          ctx.fillText(currentUser.email, 200, 200);
          ctx.fillText(currentUser.dateOfJoining, 200, 250);
        }
      };
    }
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center space-x-8">
              <div className="flex-shrink-0">
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src={currentUser.profilePicture}
                  alt="Profile"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{currentUser.name}</h2>
                <p className="text-gray-600">{currentUser.designation}</p>
                <p className="text-gray-600">{currentUser.email}</p>
                <p className="text-gray-600">Joined: {currentUser.dateOfJoining}</p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Aadhar Card</h3>
                <img
                  src={currentUser.aadharCard}
                  alt="Aadhar Card"
                  className="mt-2 max-w-full h-auto"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">College ID</h3>
                <img
                  src={currentUser.collegeId}
                  alt="College ID"
                  className="mt-2 max-w-full h-auto"
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">My Offer Letter</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <canvas ref={canvasRef} className="w-full h-auto" />
                </div>
                <div>
                  <img src="https://i.ibb.co/Y0wbvJT/2.png" alt="Offer Letter 2" className="w-full h-auto" />
                </div>
                <div>
                  <img src="https://i.ibb.co/k2qFNCB/3.png" alt="Offer Letter 3" className="w-full h-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;