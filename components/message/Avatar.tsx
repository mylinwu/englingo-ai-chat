import React from 'react';

interface AvatarProps {
  isUser: boolean;
}

const AI_AVATAR_URL = 'https://api.dicebear.com/7.x/bottts/svg?seed=EngLingo';

/**
 * 头像组件 - WeUI 风格方形圆角头像
 */
const Avatar: React.FC<AvatarProps> = ({ isUser }) => {
  return (
    <div className="flex-shrink-0 w-10 h-10 rounded-[4px] overflow-hidden shadow-sm">
      {isUser ? (
        <div className="w-full h-full bg-indigo-500 flex items-center justify-center text-white font-bold text-sm">
          ME
        </div>
      ) : (
        <div className="w-full h-full bg-white flex items-center justify-center">
          <img src={AI_AVATAR_URL} alt="AI" className="w-8 h-8" />
        </div>
      )}
    </div>
  );
};

export default Avatar;
