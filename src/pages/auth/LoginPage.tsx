
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff } from 'lucide-react';
import LoadingSpinner from '../../components/common/LoadingSpinner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ userNameOrEmail: email, password });
      navigate('/dashboard');
    } catch (error) {
      setError('Email ou mot de passe incorrect');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="mobile-container flex items-center justify-center">
        <LoadingSpinner message="Connexion en cours..." />
      </div>
    );
  }

  return (
    <div className="mobile-container">
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          {/* Logo or Brand */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-white rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-lg"></div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Bienvenue</h1>
            <p className="text-white/80">Connectez-vous à votre compte</p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-3xl p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email ou nom d'utilisateur
                </Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="mt-1 h-12 rounded-xl"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Mot de passe
                </Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Votre mot de passe"
                    className="h-12 rounded-xl pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium"
                disabled={isLoading}
              >
                Se connecter
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link 
                to="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Pas encore de compte ?{' '}
                <Link 
                  to="/register" 
                  className="text-primary font-medium hover:underline"
                >
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>

          {/* OTP Login Option */}
          <div className="mt-4 text-center">
            <Link 
              to="/login-otp" 
              className="text-white/80 text-sm hover:text-white transition-colors"
            >
              Se connecter avec un code SMS
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
