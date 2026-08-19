import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, setDoc, collection, onSnapshot, deleteDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'

// ── Generic localStorage fallback ─────────────────────────────
function ls(k, fb) { try { const v=localStorage.getItem(k); return v?JSON.parse(v):fb } catch { return fb } }
function lsSave(k,v) { try { localStorage.setItem(k,JSON.stringify(v)) } catch {} }

// ── Schedule ──────────────────────────────────────────────────
export function useSchedule(userId, weekKey) {
  const [cells, setCells] = useState({})
  const timer = useRef({})

  useEffect(() => {
    if (!userId || !weekKey) { setCells(ls(`crm_cells_${weekKey}`,{})); return }
    const ref = doc(db, 'users', userId, 'weeks', weekKey)
    return onSnapshot(ref, snap => {
      if (snap.exists()) setCells(snap.data().cells || {})
      else setCells({})
    })
  }, [userId, weekKey])

  const save = useCallback((day, colId, value) => {
    const key = `${day}__${colId}`
    clearTimeout(timer.current[key])
    timer.current[key] = setTimeout(async () => {
      // Always save locally first
      const cur = ls(`crm_cells_${weekKey}`,{})
      const updated = {...cur, [key]: value}
      lsSave(`crm_cells_${weekKey}`, updated)
      setCells(updated)
      // Sync to Firebase if logged in
      if (userId) {
        const ref = doc(db, 'users', userId, 'weeks', weekKey)
        await setDoc(ref, { cells: { [key]: value }, updatedAt: serverTimestamp() }, { merge: true })
      }
    }, 600)
  }, [userId, weekKey])

  return { cells, save }
}

// ── Habits ────────────────────────────────────────────────────
export function useHabits(userId, weekKey) {
  const [habits,    setHabits]    = useState({})
  const [habitList, setHabitList] = useState([])

  useEffect(() => {
    if (!userId || !weekKey) {
      setHabits(ls('crm_habits',{}))
      setHabitList(ls('crm_habitList',[]))
      return
    }
    const ref = doc(db, 'users', userId, 'habits', weekKey)
    return onSnapshot(ref, snap => {
      if (snap.exists()) {
        const d = snap.data()
        setHabits(d.checks || {})
        setHabitList(d.list || [])
      }
    })
  }, [userId, weekKey])

  const toggleHabit = useCallback(async (name, day) => {
    const key = `${name}__${day}`
    const cur = habits[key] || ''
    const next = cur===''?'done':cur==='done'?'partial':cur==='partial'?'miss':''
    const updated = {...habits,[key]:next}
    setHabits(updated)
    lsSave('crm_habits', updated)
    if (userId) {
      const ref = doc(db, 'users', userId, 'habits', weekKey)
      await setDoc(ref, {checks:updated,list:habitList,updatedAt:serverTimestamp()},{merge:true})
    }
  }, [userId, weekKey, habits, habitList])

  const addHabit = useCallback(async (name) => {
    if (!name.trim()) return
    const updated = [...habitList, name.trim()]
    setHabitList(updated); lsSave('crm_habitList', updated)
    if (userId) {
      const ref = doc(db, 'users', userId, 'habits', weekKey)
      await setDoc(ref, {list:updated,updatedAt:serverTimestamp()},{merge:true})
    }
  }, [userId, weekKey, habitList])

  const removeHabit = useCallback(async (name) => {
    const updated = habitList.filter(h=>h!==name)
    const newChecks = Object.fromEntries(Object.entries(habits).filter(([k])=>!k.startsWith(name+'__')))
    setHabitList(updated); setHabits(newChecks)
    lsSave('crm_habitList',updated); lsSave('crm_habits',newChecks)
    if (userId) {
      const ref = doc(db, 'users', userId, 'habits', weekKey)
      await setDoc(ref, {list:updated,checks:newChecks,updatedAt:serverTimestamp()},{merge:true})
    }
  }, [userId, weekKey, habitList, habits])

  const renameHabit = useCallback(async (oldName, newName) => {
    if (!newName.trim()||oldName===newName) return
    const updated = habitList.map(h=>h===oldName?newName.trim():h)
    const newChecks = {}
    Object.entries(habits).forEach(([k,v])=>{
      newChecks[k.startsWith(oldName+'__')?newName.trim()+'__'+k.slice(oldName.length+2):k]=v
    })
    setHabitList(updated); setHabits(newChecks)
    lsSave('crm_habitList',updated); lsSave('crm_habits',newChecks)
    if (userId) {
      const ref = doc(db, 'users', userId, 'habits', weekKey)
      await setDoc(ref, {list:updated,checks:newChecks,updatedAt:serverTimestamp()},{merge:true})
    }
  }, [userId, weekKey, habitList, habits])

  return { habits, habitList, toggleHabit, addHabit, removeHabit, renameHabit }
}

// ── Generic collection hook ───────────────────────────────────
export function useCollection(userId, collectionName, lsKey) {
  const [items, setItems] = useState(() => ls(lsKey, []))

  useEffect(() => {
    if (!userId) { setItems(ls(lsKey,[])); return }
    const ref = collection(db, 'users', userId, collectionName)
    return onSnapshot(ref, snap => {
      const data = snap.docs.map(d=>({id:d.id,...d.data()}))
      data.sort((a,b)=>new Date(b.date||b.createdAt||0)-new Date(a.date||a.createdAt||0))
      setItems(data)
      lsSave(lsKey, data)
    })
  }, [userId, collectionName, lsKey])

  const add = useCallback(async (item) => {
    const id = `${collectionName}_${Date.now()}`
    const newItem = {...item, id, createdAt: new Date().toISOString()}
    const updated = [newItem, ...items]
    setItems(updated); lsSave(lsKey, updated)
    if (userId) {
      const ref = doc(db, 'users', userId, collectionName, id)
      await setDoc(ref, {...item, createdAt: serverTimestamp()})
    }
  }, [userId, collectionName, lsKey, items])

  const update = useCallback(async (id, updates) => {
    const updated = items.map(i=>i.id===id?{...i,...updates}:i)
    setItems(updated); lsSave(lsKey, updated)
    if (userId) {
      const ref = doc(db, 'users', userId, collectionName, id)
      await setDoc(ref, updates, {merge:true})
    }
  }, [userId, collectionName, lsKey, items])

  const remove = useCallback(async (id) => {
    const updated = items.filter(i=>i.id!==id)
    setItems(updated); lsSave(lsKey, updated)
    if (userId) await deleteDoc(doc(db,'users',userId,collectionName,id))
  }, [userId, collectionName, lsKey, items])

  return { items, add, update, remove, setItems }
}

// ── Settings / Rules / Daily data ─────────────────────────────
export function useDocument(userId, collectionName, docId, lsKey, defaultVal={}) {
  const [data, setData] = useState(() => ls(lsKey, defaultVal))

  useEffect(() => {
    if (!userId) { setData(ls(lsKey, defaultVal)); return }
    const ref = doc(db, 'users', userId, collectionName, docId)
    return onSnapshot(ref, snap => {
      if (snap.exists()) { setData(snap.data()); lsSave(lsKey, snap.data()) }
    })
  }, [userId, collectionName, docId])

  const save = useCallback(async (updates) => {
    const updated = {...data, ...updates}
    setData(updated); lsSave(lsKey, updated)
    if (userId) {
      const ref = doc(db, 'users', userId, collectionName, docId)
      await setDoc(ref, updates, {merge:true})
    }
  }, [userId, collectionName, docId, data])

  return { data, save }
}
