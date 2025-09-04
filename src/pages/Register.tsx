import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield, User, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateBlockchainId = () => {
    return `TSS-${Math.random().toString(36).substr(2, 9).toUpperCase()}-${Date.now().toString().slice(-6)}`;
  };

  const handleRegister = async () => {
    if (!idType || !idNumber || !password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);
    
    // Simulate registration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const blockchainId = generateBlockchainId();
    
    // Store user data in localStorage (in real app, this would be blockchain/backend)
    localStorage.setItem('touristSafetyUser', JSON.stringify({
      blockchainId,
      idType,
      idNumber,
      password,
      registeredAt: new Date().toISOString()
    }));

    setLoading(false);
    
    toast({
      title: "Registration Successful!",
      description: `Your Digital ID: ${blockchainId}. Please save this for login.`,
      duration: 10000,
    });

    setTimeout(() => {
      navigate('/login');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-glow mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-card mb-2">Tourist Safety</h1>
          <p className="text-card/80">Register for Digital ID Protection</p>
        </div>

        <Card className="shadow-soft border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Create Account</CardTitle>
            <CardDescription>
              Generate your secure blockchain-based Digital ID
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="idType">Identity Document Type</Label>
              <Select value={idType} onValueChange={setIdType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select ID type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aadhaar">Aadhaar Card</SelectItem>
                  <SelectItem value="passport">Passport</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="idNumber">
                {idType === "aadhaar" ? "Aadhaar" : "Passport"} Number
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="idNumber"
                  type="text"
                  placeholder={idType === "aadhaar" ? "XXXX XXXX XXXX" : "Passport Number"}
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Secure Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button 
              onClick={handleRegister} 
              className="w-full" 
              variant="primary"
              disabled={loading}
            >
              {loading ? "Generating Digital ID..." : "Register"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => navigate('/login')}
                  className="text-primary hover:underline font-medium"
                >
                  Login here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;