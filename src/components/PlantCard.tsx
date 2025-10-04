import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface PlantCardProps {
  id: number;
  nama: string;
  namaLatin: string;
  image: string;
  manfaat: string;
}

const PlantCard = ({ id, nama, namaLatin, image, manfaat }: PlantCardProps) => {
  return (
    <div
      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 
                 hover:shadow-xl hover:-translate-y-2 transform cursor-pointer group"
    >
      <div className="overflow-hidden">
        <img
          src={image}
          alt={nama}
          className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-[#18221B] mb-1">{nama}</h3>
        <p className="text-sm text-gray-500 italic mb-2">{namaLatin}</p>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{manfaat}</p>

        <Link
          to={`/plants/detail/${id}`}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground 
                     font-medium text-sm transition-all duration-300 hover:bg-secondary/90 shadow-sm hover:shadow-md"
        >
          Lihat Detail
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;
