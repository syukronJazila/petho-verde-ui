import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const CultivationCard = ({ guide }) => {
  return (
    <Link
      to={`/cultivation/detail/${guide.id}`}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group"
    >
     <div className="relative h-48 bg-gray-100 flex justify-center items-center overflow-hidden">
        <img
          src={guide.image}
          alt={guide.judul}
          className="w-full h-auto max-h-56 object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold mb-2 text-[#18221B] group-hover:text-secondary transition">
          {guide.judul}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <Calendar className="h-4 w-4" />
          {guide.waktu_tanam}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {guide.kutipan}
        </p>
      </div>
    </Link>
  );
};

export default CultivationCard;
