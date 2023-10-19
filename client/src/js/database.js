import { openDB } from 'idb'

const DATABASE_NAME = 'jate'
const OBJECT_STORE_NAME = 'jate'

const initdb = async () => {
  return openDB(DATABASE_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(OBJECT_STORE_NAME)) {
        db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'id', autoIncrement: true })
        console.log(`Database ${DATABASE_NAME} created`)
      } else {
        console.log(`Database ${DATABASE_NAME} already exists`)
      }
    },
  })
}

// Add content to database
export const putDb = async (content) => {
  const db = await initdb()
  const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite')
  const store = tx.objectStore(OBJECT_STORE_NAME)
  await store.put({ content })
  return tx.done
}  

// Retrieve content from database
export const getDb = async () => {
  const db = await initdb()
  const tx = db.transaction(OBJECT_STORE_NAME, 'readonly')
  const store = tx.objectStore(OBJECT_STORE_NAME)
  return store.getAll()
}

initdb()
