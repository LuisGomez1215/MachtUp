// services/authService.ts
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

// Interfaz para datos de usuario
export interface UserData {
  uid: string;
  name: string;
  email: string;
  age: number;
  phone: string;
  createdAt: Date;
  matches: any[];
}

// Interfaz para datos de registro
export interface RegisterData {
  name: string;
  age: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Registrar nuevo usuario
export const registerUser = async (data: RegisterData): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    // Validaciones
    if (!data.name || data.name.trim().length < 3) {
      return { success: false, message: 'El nombre debe tener al menos 3 caracteres' };
    }

    if (!data.age || parseInt(data.age) < 13 || parseInt(data.age) > 100) {
      return { success: false, message: 'Debes tener entre 13 y 100 años' };
    }

    if (!data.email || !data.email.includes('@')) {
      return { success: false, message: 'Email inválido' };
    }

    if (!data.phone || data.phone.trim().length < 8) {
      return { success: false, message: 'Número de teléfono inválido' };
    }

    if (!data.password || data.password.length < 6) {
      return { success: false, message: 'La contraseña debe tener al menos 6 caracteres' };
    }

    if (data.password !== data.confirmPassword) {
      return { success: false, message: 'Las contraseñas no coinciden' };
    }

    // Crear usuario en Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    // Guardar datos adicionales en Firestore
    const userData: UserData = {
      uid: userCredential.user.uid,
      name: data.name.trim(),
      email: data.email.toLowerCase(),
      age: parseInt(data.age),
      phone: data.phone.trim(),
      createdAt: new Date(),
      matches: []
    };

    await setDoc(doc(db, 'users', userCredential.user.uid), userData);

    return { 
      success: true, 
      message: 'Usuario registrado exitosamente',
      user: userCredential.user
    };

  } catch (error: any) {
    console.error('Error en registro:', error);
    
    // Manejo de errores de Firebase
    if (error.code === 'auth/email-already-in-use') {
      return { success: false, message: 'Este email ya está registrado' };
    }
    if (error.code === 'auth/invalid-email') {
      return { success: false, message: 'Email inválido' };
    }
    if (error.code === 'auth/weak-password') {
      return { success: false, message: 'La contraseña es muy débil' };
    }

    return { success: false, message: 'Error al registrar usuario: ' + error.message };
  }
};

// Login de usuario
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> => {
  try {
    // Validaciones
    if (!email || !email.includes('@')) {
      return { success: false, message: 'Email inválido' };
    }

    if (!password || password.length < 6) {
      return { success: false, message: 'Contraseña inválida' };
    }

    // Iniciar sesión
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    return { 
      success: true, 
      message: 'Inicio de sesión exitoso',
      user: userCredential.user
    };

  } catch (error: any) {
    console.error('Error en login:', error);

    // Manejo de errores de Firebase
    if (error.code === 'auth/user-not-found') {
      return { success: false, message: 'Usuario no encontrado' };
    }
    if (error.code === 'auth/wrong-password') {
      return { success: false, message: 'Contraseña incorrecta' };
    }
    if (error.code === 'auth/invalid-email') {
      return { success: false, message: 'Email inválido' };
    }
    if (error.code === 'auth/user-disabled') {
      return { success: false, message: 'Esta cuenta ha sido deshabilitada' };
    }

    return { success: false, message: 'Error al iniciar sesión: ' + error.message };
  }
};

// Cerca del final de services/authService.ts
export const logoutUser = async (): Promise<{ success: boolean; message: string }> => {
  try {
    console.log('🔓 Ejecutando signOut de Firebase...');
    await signOut(auth);
    console.log('✅ signOut exitoso');
    return { success: true, message: 'Sesión cerrada exitosamente' };
  } catch (error: any) {
    console.error('❌ Error en logout:', error);
    return { success: false, message: 'Error al cerrar sesión: ' + error.message };
  }
};

// Obtener datos del usuario actual
export const getCurrentUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error) {
    console.error('Error obteniendo datos del usuario:', error);
    return null;
  }
};