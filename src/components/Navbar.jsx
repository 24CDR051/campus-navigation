import React from "react";
import { 
  Compass, 
  Map, 
  Search, 
  Route, 
  Bookmark, 
  Home, 
  PhoneCall,
  ShieldAlert
} from "lucide-react";

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  savedCount = 0, 
  onOpenEmergency 
}) {
  const tabs = [
    { id: "home", label: "Home", icon: Home },
    { id: "map", label: "Campus Map", icon: Map },
    { id: "search", label: "Search & Directory", icon: Search },
    { id: "route", label: "Route Planner", icon: Route },
    { 
      id: "favorites", 
      label: "Saved Places", 
      icon: Bookmark, 
      count: savedCount 
    }
  ];

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand Identity */}
        <div 
          className="brand-wrapper" 
          onClick={() => setActiveTab("home")} 
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setActiveTab("home")}
          title="Return to Campus Navigator Home"
        >
          <div className="brand-logo-icon">
            <Compass size={24} strokeWidth={2.2} />
          </div>
          <div className="brand-text">
            <span className="brand-title">Campus Navigator</span>
            <span className="brand-subtitle">Apex University</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="nav-tabs" aria-label="Main Navigation">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                className={`nav-tab-btn ${isActive ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} />
                <span>{tab.label}</span>
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="badge-counter">{tab.count}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Action: Emergency & Quick Help */}
        <div className="nav-actions">
          <button 
            className="emergency-btn"
            onClick={onOpenEmergency}
            title="Campus Safety & Emergency Contacts"
            aria-label="Campus Emergency Contacts"
          >
            <ShieldAlert size={16} />
            <span>Emergency SOS</span>
          </button>
        </div>
      </div>
    </header>
  );
}
