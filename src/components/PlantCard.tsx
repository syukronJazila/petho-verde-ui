import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface PlantCardProps {
  id: number;
  name: string;
  latinName: string;
  image: string;
  badge?: string;
  benefit: string;
  rating?: number;
}

const PlantCard = ({ id, name, latinName, image, badge, benefit, rating = 4.5 }: PlantCardProps) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden shadow-green hover:shadow-green-md transition-smooth group">
      <div className="relative overflow-hidden h-48">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
        />
        {badge && (
          <span className="absolute top-2 right-2 bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full font-medium">
            {badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-card-foreground mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground italic mb-2">{latinName}</p>
        
        {rating && (
          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating) 
                    ? 'fill-secondary text-secondary' 
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">{rating}</span>
          </div>
        )}
        
        <p className="text-sm text-card-foreground/80 mb-4 line-clamp-2">{benefit}</p>
        
        <Link 
          to={`/plants/detail/${id}`}
          className="inline-block w-full text-center px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-smooth font-medium"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
};

export default PlantCard;
