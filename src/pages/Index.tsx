import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, Users, MapPin, Smartphone } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-card/10 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow mb-6">
            <Shield className="w-10 h-10 text-card" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-card mb-4">
            Tourist Safety
          </h1>
          <p className="text-xl md:text-2xl text-card/90 mb-8 max-w-2xl">
            Smart monitoring and incident response system powered by AI, Geo-Fencing, and Blockchain Digital ID
          </p>
        </div>

        <div className="space-y-4 mb-12">
          <Button 
            onClick={() => navigate('/register')} 
            variant="primary" 
            size="lg"
            className="w-64"
          >
            Get Started - Register
          </Button>
          <Button 
            onClick={() => navigate('/login')} 
            variant="secondary" 
            size="lg"
            className="w-64"
          >
            Already have an account? Login
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-card/10 backdrop-blur-sm rounded-lg p-6 border border-card/20">
            <MapPin className="w-8 h-8 text-card mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-card mb-2">Geo-Fencing</h3>
            <p className="text-card/80 text-sm">Real-time location monitoring with safe zone alerts</p>
          </div>
          <div className="bg-card/10 backdrop-blur-sm rounded-lg p-6 border border-card/20">
            <Shield className="w-8 h-8 text-card mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-card mb-2">Blockchain ID</h3>
            <p className="text-card/80 text-sm">Secure digital identity protection and verification</p>
          </div>
          <div className="bg-card/10 backdrop-blur-sm rounded-lg p-6 border border-card/20">
            <Smartphone className="w-8 h-8 text-card mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-card mb-2">Emergency Response</h3>
            <p className="text-card/80 text-sm">Instant alerts and emergency service connectivity</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
