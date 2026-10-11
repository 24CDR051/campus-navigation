import React from "react";
import { 
  GraduationCap, 
  FlaskConical, 
  BookOpen, 
  Utensils, 
  Presentation, 
  Trophy, 
  HeartHandshake, 
  Building2, 
  Home, 
  Navigation,
  Grid
} from "lucide-react";
import { CATEGORIES } from "../data/campusData";

const ICON_MAP = {
  Grid,
  GraduationCap,
  FlaskConical,
  BookOpen,
  Utensils,
  Presentation,
  Trophy,
  HeartHandshake,
  Building2,
  Home,
  Navigation
};

export default function CategoryGrid({ onSelectCategory, selectedCategoryId }) {
  // Exclude 'all' for the quick category cards grid to showcase distinct facility categories
  const displayCategories = CATEGORIES.filter((cat) => cat.id !== "all");

  return (
    <div className="category-grid" role="region" aria-label="Facility Categories">
      {displayCategories.map((category) => {
        const IconComponent = ICON_MAP[category.icon] || Grid;
        const isSelected = selectedCategoryId === category.id;

        return (
          <div
            key={category.id}
            className={`category-card ${isSelected ? "selected" : ""}`}
            onClick={() => onSelectCategory(category.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === "Enter" && onSelectCategory(category.id)}
            aria-label={`View ${category.name}`}
          >
            <div 
              className="category-icon-box"
              style={{ backgroundColor: category.color }}
            >
              <IconComponent size={22} strokeWidth={2.2} />
            </div>
            <h4 className="category-name">{category.name}</h4>
            <span className="category-count">{category.count} campus locations</span>
          </div>
        );
      })}
    </div>
  );
}
