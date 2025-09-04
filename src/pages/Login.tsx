import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Key, Lock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [blockchainId, setBlockchainId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!blockchainId || !password) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please enter both Blockchain ID and password.",
      });
      return;
    }

    setLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Check stored user data
    const userData = localStorage.getItem('touristSafetyUser');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.blockchainId === blockchainId && user.password === password) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        toast({
          title: "Welcome Back!",
          description: "Login successful. Redirecting to dashboard...",
        });
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      } else {
        toast({
          variant: "destructive",
          title: "Invalid Credentials",
          description: "Please check your Blockchain ID and password.",
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Account Not Found",
        description: "Please register first to create your Digital ID.",
      });
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-card rounded-full flex items-center justify-center shadow-glow mb-4">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-card mb-2">Tourist Safety</h1>
          <p className="text-card/80">Secure Access to Your Digital ID</p>
        </div>

        <Card className="shadow-soft border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Welcome Back</CardTitle>
            <CardDescription>
              Login with your blockchain Digital ID
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="blockchainId">Blockchain ID</Label>
              <div className="relative">
                <Key className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="blockchainId"
                  type="text"
                  placeholder="TSS-XXXXXXXXX-XXXXXX"
                  value={blockchainId}
                  onChange={(e) => setBlockchainId(e.target.value)}
                  className="pl-10 font-mono"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Your unique ID generated during registration
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Button 
              onClick={handleLogin} 
              className="w-full" 
              variant="primary"
              disabled={loading}
            >
              {loading ? "Authenticating..." : "Login"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate('/register')}
                  className="text-primary hover:underline font-medium"
                >
                  Register here
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;