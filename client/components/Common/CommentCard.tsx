import React from "react";
import { Star } from "lucide-react";

interface CommentCardProps {
  name: string;
  role: string;
  image: string;
  comment: string;
}

const CommentCard: React.FC<CommentCardProps> = ({ name, role, image, comment }) => {
  return (
    <div className="border rounded-xl p-6 shadow-md max-w-lg text-white">
      <div className="flex items-center mb-4">
        <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          <p className="text-sm">{role}</p>
        </div>
      </div>
      <div className="flex mb-3 text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} fill="currentColor" stroke="none" />
        ))}
      </div>
      <p className="">{comment}</p>
    </div>
  );
};

export default CommentCard;
