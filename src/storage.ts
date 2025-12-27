import { AccessToken } from "./types";

const DB_NAME = "eve-pi-db";
const DB_VERSION = 1;
const STORE_NAME = "characters";

// Initialize IndexedDB
const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Save characters to IndexedDB
export const saveCharacters = async (
  characters: AccessToken[]
): Promise<AccessToken[]> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    store.put(characters, "characters");

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => {
        db.close();
        resolve(characters);
      };
      transaction.onerror = () => {
        db.close();
        reject(transaction.error);
      };
    });
  } catch (error) {
    console.error("Failed to save to IndexedDB:", error);
    // Fallback: save minimal data to localStorage
    try {
      const minimalCharacters = characters.map((c) => ({
        ...c,
        planets: [], // Strip planet data to reduce size
      }));
      localStorage.setItem("characters", JSON.stringify(minimalCharacters));
      console.warn("Saved minimal character data to localStorage fallback");
    } catch (storageError) {
      console.error("Failed to save to localStorage fallback:", storageError);
    }
    return characters;
  }
};

// Load characters from IndexedDB
export const loadCharacters = async (): Promise<AccessToken[]> => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get("characters");

    return new Promise((resolve, reject) => {
      request.onsuccess = () => {
        db.close();
        const characters = request.result as AccessToken[] | undefined;
        if (characters && characters.length > 0) {
          resolve(characters);
        } else {
          // Try localStorage migration
          resolve(migrateFromLocalStorage());
        }
      };
      request.onerror = () => {
        db.close();
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Failed to load from IndexedDB:", error);
    // Fallback to localStorage
    return migrateFromLocalStorage();
  }
};

// Migrate data from localStorage to IndexedDB
const migrateFromLocalStorage = (): AccessToken[] => {
  try {
    const localStorageCharacters = localStorage.getItem("characters");
    if (localStorageCharacters) {
      const characterArray: AccessToken[] = JSON.parse(localStorageCharacters);
      const filtered = characterArray.filter((c) => c.access_token && c.character);
      // Don't delete from localStorage yet - keep as backup
      return filtered;
    }
  } catch (error) {
    console.error("Failed to migrate from localStorage:", error);
  }
  return [];
};
