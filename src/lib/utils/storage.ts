// Utility function to check storage availability
const isStorageAvailable = (): boolean => {
  return typeof localStorage !== 'undefined' || typeof sessionStorage !== 'undefined'
}

const getFromLocalStorage = (key: string): string | null => {
  if (!isStorageAvailable()) {
    console.error('localStorage is not available')
    return null
  }
  return localStorage.getItem(key)
}

const addToLocalStorage = (key: string, value: string): void => {
  if (!isStorageAvailable()) {
    console.error('localStorage is not available')
    return
  }
  localStorage.setItem(key, value)
}

const addToSessionStorage = (key: string, value: string): void => {
  if (!isStorageAvailable()) {
    console.error('sessionStorage is not available')
    return
  }
  sessionStorage.setItem(key, value)
}

const removeFromLocalStorage = (key: string): void => {
  if (!isStorageAvailable()) {
    console.error('localStorage is not available')
    return
  }
  localStorage.removeItem(key)
}

const clearLocalStorage = (): void => {
  if (!isStorageAvailable()) {
    console.error('localStorage is not available')
    return
  }
  localStorage.clear()
}

export {
  addToLocalStorage,
  addToSessionStorage,
  clearLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
}
