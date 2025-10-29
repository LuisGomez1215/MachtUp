import {
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    onSnapshot,
    query,
    setDoc,
    updateDoc,
    where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Coordinates, calculateDistance } from './locationService';

export interface Player {
  id: string;
  nombre: string;
  telefono: string;
  joinedAt: number;
  location?: Coordinates;
}

export interface Lobby {
  id: string;
  deporte: string;
  modalidad: string;
  icon: string;
  jugadores: Player[];
  maxJugadores: number;
  estado: 'esperando' | 'completo';
  createdAt: number;
  searchRadius?: number;
}

// Buscar o crear lobby con ubicación
export const findOrCreateLobby = async (
  deporte: string,
  modalidad: string,
  icon: string,
  player: Player,
  userLocation: Coordinates
): Promise<Lobby> => {
  // Validación de parámetros
  if (!modalidad || typeof modalidad !== 'string') {
    throw new Error('Modalidad inválida');
  }

  // Extraer número de jugadores de forma segura
  const modalidadParts = modalidad.split('v');
  if (modalidadParts.length < 2 || !modalidadParts[0]) {
    throw new Error('Formato de modalidad inválido. Debe ser "XvX"');
  }

  const maxJugadores = parseInt(modalidadParts[0]) * 2;

  if (isNaN(maxJugadores) || maxJugadores <= 0) {
    throw new Error('Número de jugadores inválido');
  }

  // Buscar lobbies disponibles cerca del usuario (empezar con 5km)
  const nearbyLobby = await findNearbyLobby(
    deporte,
    modalidad,
    userLocation,
    5
  );

  if (nearbyLobby) {
    // Unirse a lobby existente
    const updatedPlayers = [...nearbyLobby.jugadores, player];
    
    await updateDoc(doc(db, 'lobbies', nearbyLobby.id), {
      jugadores: updatedPlayers,
    });

    // Verificar si se completó el lobby
    if (updatedPlayers.length >= maxJugadores) {
      await updateDoc(doc(db, 'lobbies', nearbyLobby.id), {
        estado: 'completo',
      });
    }

    return {
      ...nearbyLobby,
      jugadores: updatedPlayers,
      estado: updatedPlayers.length >= maxJugadores ? 'completo' : 'esperando',
    };
  }

  // Crear nuevo lobby
  const lobbyId = `${deporte}-${modalidad}-${Date.now()}`;
  const newLobby: Lobby = {
    id: lobbyId,
    deporte,
    modalidad,
    icon,
    jugadores: [player],
    maxJugadores,
    estado: 'esperando',
    createdAt: Date.now(),
    searchRadius: 5,
  };

  await setDoc(doc(db, 'lobbies', lobbyId), newLobby);
  return newLobby;
};

// Buscar lobbies cercanos
export const findNearbyLobby = async (
  deporte: string,
  modalidad: string,
  userLocation: Coordinates,
  radiusKm: number
): Promise<Lobby | null> => {
  try {
    const q = query(
      collection(db, 'lobbies'),
      where('deporte', '==', deporte),
      where('modalidad', '==', modalidad),
      where('estado', '==', 'esperando')
    );

    const snapshot = await getDocs(q);
    
    for (const docSnap of snapshot.docs) {
      const lobby = docSnap.data() as Lobby;
      
      // Verificar si el primer jugador está dentro del radio
      if (lobby.jugadores.length > 0 && lobby.jugadores[0].location) {
        const distance = calculateDistance(
          userLocation,
          lobby.jugadores[0].location
        );
        
        console.log(`📏 Distancia a lobby ${lobby.id}: ${distance}km (Radio: ${radiusKm}km)`);
        
        if (distance <= radiusKm) {
          console.log(`✅ Lobby encontrado dentro del radio!`);
          return { ...lobby, id: docSnap.id };
        }
      }
    }

    console.log(`❌ No se encontraron lobbies dentro de ${radiusKm}km`);
    return null;
  } catch (error) {
    console.error('Error finding nearby lobby:', error);
    return null;
  }
};

// Obtener lobby por ID
export const getLobby = async (lobbyId: string): Promise<Lobby | null> => {
  try {
    const docRef = doc(db, 'lobbies', lobbyId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Lobby;
    }
    return null;
  } catch (error) {
    console.error('Error getting lobby:', error);
    return null;
  }
};

// Salir del lobby
export const leaveLobby = async (
  lobbyId: string,
  playerId: string
): Promise<void> => {
  try {
    const lobby = await getLobby(lobbyId);
    if (!lobby) return;

    const updatedPlayers = lobby.jugadores.filter((p) => p.id !== playerId);

    if (updatedPlayers.length === 0) {
      // Si no quedan jugadores, eliminar el lobby
      await deleteDoc(doc(db, 'lobbies', lobbyId));
      console.log(`🗑️ Lobby ${lobbyId} eliminado - sin jugadores`);
    } else {
      // Actualizar lista de jugadores
      await updateDoc(doc(db, 'lobbies', lobbyId), {
        jugadores: updatedPlayers,
        estado: 'esperando', // Volver a estado esperando si alguien sale
      });
      console.log(`👋 Jugador ${playerId} salió del lobby ${lobbyId}`);
    }
  } catch (error) {
    console.error('Error leaving lobby:', error);
  }
};

// Escuchar cambios en el lobby en tiempo real
export const subscribeLobby = (
  lobbyId: string,
  callback: (lobby: Lobby | null) => void
) => {
  const docRef = doc(db, 'lobbies', lobbyId);
  
  return onSnapshot(
    docRef,
    (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() } as Lobby);
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error('Error en subscription del lobby:', error);
      callback(null);
    }
  );
};

// Expandir búsqueda a un radio mayor
export const expandSearchRadius = async (
  deporte: string,
  modalidad: string,
  userLocation: Coordinates,
  newRadiusKm: number
): Promise<Lobby | null> => {
  console.log(`🔍 Expandiendo búsqueda a ${newRadiusKm}km...`);
  return await findNearbyLobby(deporte, modalidad, userLocation, newRadiusKm);
};

// Limpiar lobbies antiguos (opcional - para mantenimiento)
export const cleanupOldLobbies = async (maxAgeMinutes: number = 30) => {
  try {
    const cutoffTime = Date.now() - maxAgeMinutes * 60 * 1000;
    
    const q = query(
      collection(db, 'lobbies'),
      where('createdAt', '<', cutoffTime)
    );

    const snapshot = await getDocs(q);
    
    const deletePromises = snapshot.docs.map((doc) => 
      deleteDoc(doc.ref)
    );
    
    await Promise.all(deletePromises);
    
    console.log(`🧹 ${snapshot.docs.length} lobbies antiguos eliminados`);
  } catch (error) {
    console.error('Error cleaning up old lobbies:', error);
  }
};