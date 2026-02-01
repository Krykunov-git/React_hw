import { useEffect, useMemo, useState } from 'react'

function HwSwitcher() {
  // Edit these to control order manually (fallback to alphabetical for items not listed)
  const homeworkOrder = ['hw1', 'hw2', 'hw3']
  const componentOrderByHw = {
    // Example for hw1: order by file name (with .jsx)
    // hw1: ['VideoComponent.jsx', 'ImageComponent.jsx', 'ListsComponent.jsx'],
  }

  const homeworks = useMemo(() => {
    const modules = import.meta.glob('./hw*/**/*.jsx', { eager: true })
    const groups = {}

    for (const [path, mod] of Object.entries(modules)) {
      if (/index\.jsx$/.test(path)) continue
      const match = path.match(/\.\/(hw[^/]+)\//)
      const hwId = match ? match[1] : null
      if (!hwId) continue
      const Component = mod && mod.default
      if (!Component) continue
      if (!groups[hwId]) groups[hwId] = []
      const name = path.split('/').pop() || 'Component'
      groups[hwId].push({ name, Component })
    }

    const entries = Object.entries(groups).map(([id, comps]) => {
      const manual = componentOrderByHw[id] || []
      comps.sort((a, b) => {
        const ia = manual.indexOf(a.name)
        const ib = manual.indexOf(b.name)
        const ra = ia === -1 ? Number.MAX_SAFE_INTEGER : ia
        const rb = ib === -1 ? Number.MAX_SAFE_INTEGER : ib
        if (ra !== rb) return ra - rb
        return a.name.localeCompare(b.name, undefined, { numeric: true })
      })
      const ComponentGroup = () => (
        <>
          {comps.map(({ name, Component }) => (
            <Component key={name} />
          ))}
        </>
      )
      return { id, label: id.toUpperCase(), Component: ComponentGroup }
    })

    entries.sort((a, b) => {
      const ia = homeworkOrder.indexOf(a.id)
      const ib = homeworkOrder.indexOf(b.id)
      const ra = ia === -1 ? Number.MAX_SAFE_INTEGER : ia
      const rb = ib === -1 ? Number.MAX_SAFE_INTEGER : ib
      if (ra !== rb) return ra - rb
      return a.id.localeCompare(b.id, undefined, { numeric: true })
    })
    return entries
  }, [])

  const getInitialId = () => {
    if (typeof window === 'undefined') return homeworks[0].id
    const hash = window.location.hash || ''
    const match = hash.match(/hw=([^&]+)/)
    const fromHash = match && match[1]
    const exists = homeworks.some(h => h.id === fromHash)
    return exists ? fromHash : homeworks[0].id
  }

  const [selectedHwId, setSelectedHwId] = useState(getInitialId)

  useEffect(() => {
    const onHashChange = () => {
      const nextId = getInitialId()
      setSelectedHwId(nextId)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.hash = `hw=${selectedHwId}`
    window.history.replaceState(null, '', url.toString())
  }, [selectedHwId])

  const selected = homeworks.find(h => h.id === selectedHwId)

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center', margin: '16px 0' }}>
        <label htmlFor="hw-select">Select homework:</label>
        <select
          id="hw-select"
          value={selectedHwId}
          onChange={(e) => setSelectedHwId(e.target.value)}
        >
          {homeworks.map(hw => (
            <option key={hw.id} value={hw.id}>{hw.label}</option>
          ))}
        </select>
      </div>

      <div>
        {selected ? <selected.Component /> : <div>Not found</div>}
      </div>
    </div>
  )
}

export default HwSwitcher

