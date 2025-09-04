import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  MapPin, 
  AlertTriangle, 
  Watch, 
  Route,
  Phone,
  Bell,
  User,
  LogOut,
  Wifi,
  WifiOff,
  Navigation
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [location, setLocation] = useState<string>("Fetching location...");
  const [iotConnected, setIotConnected] = useState(false);
  const [inSafeZone, setInSafeZone] = useState(true);
  const [emergencyConfirm, setEmergencyConfirm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('currentUser');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));

    // Simulate location tracking
    setTimeout(() => {
      setLocation("Tourist District, New Delhi");
    }, 2000);

    // Simulate geofencing alerts
    const interval = setInterval(() => {
      const random = Math.random();
      if (random < 0.3) {
        setInSafeZone(false);
        toast({
          variant: "destructive",
          title: "Geofencing Alert",
          description: "You have left the designated safe zone. Stay alert!",
        });
      } else {
        setInSafeZone(true);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [navigate, toast]);

  const handleEmergencyPanic = () => {
    if (!emergencyConfirm) {
      setEmergencyConfirm(true);
      setTimeout(() => setEmergencyConfirm(false), 5000);
      return;
    }

    toast({
      title: "Emergency Alert Sent!",
      description: "Your location has been shared with emergency services and your emergency contacts.",
      variant: "destructive",
    });
    
    setEmergencyConfirm(false);
  };

  const connectIoTDevice = () => {
    setIotConnected(!iotConnected);
    toast({
      title: iotConnected ? "Device Disconnected" : "Device Connected",
      description: iotConnected ? "Smart band disconnected" : "Smart band connected successfully",
    });
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  if (!user) return null;

  const tripStops = [
    "India Gate",
    "Red Fort", 
    "Qutub Minar",
    "Lotus Temple",
    "Humayun's Tomb"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-primary-foreground p-4 shadow-soft">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8" />
            <div>
              <h1 className="text-xl font-bold">Tourist Safety</h1>
              <p className="text-sm opacity-90">Digital ID: {user.blockchainId}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={logout} className="text-primary-foreground hover:bg-white/20">
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <Card className="bg-gradient-secondary text-secondary-foreground border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Welcome Back, Traveler
            </CardTitle>
            <CardDescription className="text-secondary-foreground/80">
              Your safety is our priority. Stay connected and explore safely.
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Geofencing Status */}
          <Card className={`border-2 ${inSafeZone ? 'border-success bg-success/5' : 'border-warning bg-warning/5'}`}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Zone Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant={inSafeZone ? "default" : "destructive"} className="mb-2">
                {inSafeZone ? "Safe Zone" : "Outside Safe Zone"}
              </Badge>
              <p className="text-sm text-muted-foreground">{location}</p>
            </CardContent>
          </Card>

          {/* IoT Device Status */}
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Watch className="w-4 h-4" />
                Smart Device
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Badge variant={iotConnected ? "default" : "outline"}>
                  {iotConnected ? (
                    <><Wifi className="w-3 h-3 mr-1" /> Connected</>
                  ) : (
                    <><WifiOff className="w-3 h-3 mr-1" /> Disconnected</>
                  )}
                </Badge>
                <Button size="sm" variant="outline" onClick={connectIoTDevice}>
                  {iotConnected ? "Disconnect" : "Connect"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Real-time Tracking */}
          <Card className="border-2 border-accent/20">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Navigation className="w-4 h-4" />
                Live Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Badge variant="default" className="mb-2">
                Active
              </Badge>
              <p className="text-xs text-muted-foreground">Location shared with emergency contacts</p>
            </CardContent>
          </Card>
        </div>

        {/* Emergency Panic Button */}
        <Card className="border-2 border-emergency bg-emergency/5">
          <CardHeader>
            <CardTitle className="text-center text-emergency flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              Emergency Assistance
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              {emergencyConfirm 
                ? "Press again to confirm emergency alert" 
                : "Press if you need immediate help"
              }
            </p>
            <Button 
              variant="emergency" 
              size="lg" 
              className={`w-full ${emergencyConfirm ? 'animate-bounce-gentle' : ''}`}
              onClick={handleEmergencyPanic}
            >
              <Phone className="w-5 h-5 mr-2" />
              {emergencyConfirm ? "CONFIRM EMERGENCY" : "PANIC BUTTON"}
            </Button>
            {emergencyConfirm && (
              <p className="text-xs text-muted-foreground">
                This will alert emergency services and your contacts
              </p>
            )}
          </CardContent>
        </Card>

        {/* Trip Roadmap */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Route className="w-5 h-5" />
              Your Trip Itinerary
            </CardTitle>
            <CardDescription>
              Planned destinations for your visit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tripStops.map((stop, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === 0 ? 'bg-primary text-primary-foreground' : 
                    index === 1 ? 'bg-secondary text-secondary-foreground' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{stop}</p>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 ? "Current destination" : 
                       index === 1 ? "Next destination" : "Upcoming"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-success/10 border border-success/20">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Entered safe zone at India Gate</p>
                  <p className="text-xs text-muted-foreground">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Smart band connected successfully</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;