// contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { getCurrentUserData, UserData, logoutUser } from '../services/authService';
import { useRouter, useSegments } from 'expo-router';

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  refreshUserData: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  refreshUserData: async () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  const loadUserData = async (currentUser: User) => {
    try {
      console.log('🔄 Cargando datos del usuario:', currentUser.uid);
      const data = await getCurrentUserData(currentUser.uid);
      console.log('✅ Datos cargados:', data);
      setUserData(data);
    } catch (error) {
      console.error('❌ Error cargando datos del usuario:', error);
      setUserData(null);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await loadUserData(user);
    }
  };

  const logout = async () => {
    try {
      console.log('🔓 Iniciando logout desde contexto...');
      const result = await logoutUser();
      
      if (result.success) {
        console.log('✅ Logout exitoso, limpiando estado...');
        // El estado se limpiará automáticamente por onAuthStateChanged
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('❌ Error en logout:', error);
      throw error;
    }
  };

  // Listener de autenticación
  useEffect(() => {
    console.log('🚀 Iniciando listener de autenticación...');
    
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('👤 Estado de autenticación cambió:', currentUser?.email || 'Sin usuario');
      setUser(currentUser);
      
      if (currentUser) {
        await loadUserData(currentUser);
      } else {
        console.log('🧹 Limpiando userData porque no hay usuario');
        setUserData(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Protección de rutas automática
  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === 'auth';
    const inTabsGroup = segments[0] === '(tabs)';
    const inMainGroup = segments[0] === 'main';

    console.log('🛣️ Segmentos actuales:', segments);
    console.log('👤 Usuario:', user?.email || 'null');

    if (!user && !inAuthGroup) {
      // Usuario no autenticado intentando acceder a rutas protegidas
      console.log('🚫 Redirigiendo a login - no autenticado');
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // Usuario autenticado en pantallas de auth
      console.log('✅ Redirigiendo a home - ya autenticado');
      router.replace('/(tabs)/home');
    }
  }, [user, segments, loading]);

  return (
    <AuthContext.Provider value={{ user, userData, loading, refreshUserData, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de AuthProvider');
  }
  return context;
};