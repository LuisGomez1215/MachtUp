import * as Location from 'expo-location';

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// Solicitar permisos de ubicación
export const requestLocationPermission = async (): Promise<boolean> => {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permission:', error);
    return false;
  }
};

// Obtener ubicación actual
export const getCurrentLocation = async (): Promise<Coordinates | null> => {
  try {
    const hasPermission = await requestLocationPermission();
    
    if (!hasPermission) {
      throw new Error('Permiso de ubicación denegado');
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Balanced,
    });

    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
  } catch (error) {
    console.error('Error getting location:', error);
    return null;
  }
};

// Calcular distancia entre dos puntos (Fórmula de Haversine)
export const calculateDistance = (
  coord1: Coordinates,
  coord2: Coordinates
): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = toRad(coord2.latitude - coord1.latitude);
  const dLon = toRad(coord2.longitude - coord1.longitude);
  
  const lat1 = toRad(coord1.latitude);
  const lat2 = toRad(coord2.latitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Redondear a 1 decimal
};

const toRad = (degrees: number): number => {
  return degrees * (Math.PI / 180);
};

// Verificar si una coordenada está dentro de un radio
export const isWithinRadius = (
  userLocation: Coordinates,
  targetLocation: Coordinates,
  radiusKm: number
): boolean => {
  const distance = calculateDistance(userLocation, targetLocation);
  return distance <= radiusKm;
};