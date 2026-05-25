// Code Snippet Manager - script.js
// Beginner-friendly, well-commented JavaScript using LocalStorage

const STORAGE_KEY = 'snippets.v1'

// Helpers ---------------------------------------------------------------
function qs(sel){ return document.querySelector(sel) }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)) }

// Map the app's language names to Prism.js class identifiers
// Prism uses specific short names like 'cpp' for C++, 'markup' for HTML, etc.
function getLangClass(language){
  const map = {
    'javascript': 'javascript',
    'python':     'python',
    'java':       'java',
    'c':          'c',
    'c++':        'cpp',
    'html/css':   'markup',
    'css':        'css',
    'sql':        'sql',
    'shell':      'bash',
    'other':      'plaintext'
  }
  return map[(language || '').toLowerCase()] || 'plaintext'
}

// Load snippets array from localStorage (returns array)
function loadSnippets(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  }catch(e){ console.error('Failed to parse snippets', e); return [] }
}

// Save snippets array to localStorage
function saveSnippets(list){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

// Create unique id (simple)
function uid(){ return Date.now().toString(36) + Math.random().toString(36).slice(2,7) }

// DOM elements
const form = qs('#snippet-form')
const titleInput = qs('#title')
const codeInput = qs('#code')
const tagsInput = qs('#tags')
const languageSelect = qs('#language')
const snippetsEl = qs('#snippets')
const searchInput = qs('#search')
const saveBtn = qs('#save-btn')
const cancelEditBtn = qs('#cancel-edit')
const formTitle = qs('#form-title')

let snippets = loadSnippets()
let editingId = null
// Currently active language filter (empty string = "All")
let activeFilter = ''
// Currently active tag filter (empty string = "All Tags")
let activeTagFilter = ''
// Current sort order: 'newest', 'oldest', or 'alpha'
let currentSort = 'newest'

// ---- Highlight helper: wraps matching text in <mark> tags ----
// Safely escapes regex special characters in the query string
function highlightText(text, query){
  if(!query) return document.createTextNode(text)
  // Escape special regex characters so the search is literal
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp('(' + escaped + ')', 'gi')
  const frag = document.createDocumentFragment()
  // Split text by match — odd parts are the matches
  text.split(regex).forEach(part => {
    if(part.toLowerCase() === query.toLowerCase()){
      const mark = document.createElement('mark')
      mark.textContent = part
      frag.appendChild(mark)
    } else {
      frag.appendChild(document.createTextNode(part))
    }
  })
  return frag
}

// ---- Sort helper: order the filtered list ----
function sortSnippets(list){
  const copy = [...list]   // Don't mutate the original
  switch(currentSort){
    case 'newest':  return copy.sort((a, b) => (b.created || 0) - (a.created || 0))
    case 'oldest':  return copy.sort((a, b) => (a.created || 0) - (b.created || 0))
    case 'alpha':   return copy.sort((a, b) => a.title.localeCompare(b.title))
    default:        return copy
  }
}

// Render snippets to the page, filtered by search, language, tag, and sorted
function renderSnippets(query = ''){
  const q = query.trim().toLowerCase()
  snippetsEl.innerHTML = ''

  let filtered = snippets.filter(s => {
    // Language filter — if set, only show matching language
    if(activeFilter && (s.language || '').toLowerCase() !== activeFilter.toLowerCase()) return false
    // Tag filter — if set, only show snippets that have this tag
    if(activeTagFilter && !(s.tags || []).some(t => t.toLowerCase() === activeTagFilter.toLowerCase())) return false
    // Search filter — matches title, tags, language, OR code content
    if(!q) return true
    const inTitle = s.title.toLowerCase().includes(q)
    const inTags  = (s.tags || []).some(t => t.toLowerCase().includes(q))
    const inLang  = (s.language || '').toLowerCase().includes(q)
    const inCode  = s.code.toLowerCase().includes(q)
    return inTitle || inTags || inLang || inCode
  })

  // Apply current sort order
  filtered = sortSnippets(filtered)

  if(filtered.length === 0){
    snippetsEl.innerHTML = '<p style="color:var(--text3);padding:12px 0">No snippets found.</p>'
    return
  }

  // Pass the search query so cards can highlight matching terms
  filtered.forEach(s => snippetsEl.appendChild(createCard(s, q)))
}

// Create a snippet card element with actions
// 'q' is the current search query (used for highlighting)
function createCard(s, q){
  const card = document.createElement('article')
  card.className = 'snippet-card'

  const top = document.createElement('div')
  top.className = 'snippet-top'

  const meta = document.createElement('div')
  meta.className = 'meta'

  // Highlight matching text in the title
  const h = document.createElement('strong')
  h.appendChild(highlightText(s.title, q))
  meta.appendChild(h)

  // Show a colored language badge if language is set
  if(s.language){
    const lang = document.createElement('span')
    lang.className = 'lang-badge'
    lang.setAttribute('data-lang', s.language.toLowerCase())
    lang.textContent = s.language
    meta.appendChild(lang)
  }

  const actions = document.createElement('div')
  actions.className = 'card-actions'

  const copyBtn = document.createElement('button')
  copyBtn.className = 'btn-copy'
  copyBtn.textContent = 'Copy'
  copyBtn.title = 'Copy code to clipboard'
  copyBtn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(s.code)
      copyBtn.textContent = 'Copied!'
      setTimeout(()=> copyBtn.textContent = 'Copy',1200)
    }catch(e){
      alert('Copy failed: ' + (e && e.message ? e.message : e))
    }
  })

  const editBtn = document.createElement('button')
  editBtn.className = 'btn-edit'
  editBtn.textContent = 'Edit'
  editBtn.addEventListener('click', () => startEdit(s.id))

  const delBtn = document.createElement('button')
  delBtn.className = 'btn-delete'
  delBtn.textContent = 'Delete'
  delBtn.addEventListener('click', ()=> deleteSnippet(s.id))

  actions.append(copyBtn, editBtn, delBtn)

  top.append(meta, actions)

  // Build a Prism.js-compatible code block: <pre><code class="language-xxx">
  const codeBlock = document.createElement('pre')
  const codeEl = document.createElement('code')
  // Set the Prism language class so it knows how to highlight
  codeEl.className = 'language-' + getLangClass(s.language)
  // Use textContent (not innerHTML) to safely insert raw code
  codeEl.textContent = s.code
  codeBlock.appendChild(codeEl)
  // Apply syntax highlighting to this specific element
  if(window.Prism) Prism.highlightElement(codeEl)

  const tagsWrap = document.createElement('div')
  tagsWrap.className = 'tags'
  // Highlight matching text in each tag
  (s.tags || []).forEach(t => {
    const span = document.createElement('span')
    span.className = 'tag'
    span.appendChild(highlightText(t.trim(), q))
    tagsWrap.appendChild(span)
  })

  card.append(top, codeBlock, tagsWrap)
  return card
}

// Add new snippet from form values
function addSnippetFromForm(e){
  e && e.preventDefault()
  const title = titleInput.value.trim()
  const code = codeInput.value
  const tags = tagsInput.value.split(',').map(t=>t.trim()).filter(Boolean)
  const language = languageSelect.value

  if(!title || !code) return alert('Please provide a title and code.')

  if(editingId){
    // Update existing
    snippets = snippets.map(s => s.id === editingId ? {...s, title, code, tags, language} : s)
    editingId = null
    saveBtn.textContent = 'Save Snippet'
    cancelEditBtn.classList.add('hidden')
    formTitle.textContent = 'Add Snippet'
  } else {
    const s = { id: uid(), title, code, tags, language, created: Date.now() }
    snippets.unshift(s)
  }

  saveSnippets(snippets)
  buildFilterBar()
  buildTagFilterBar()
  renderSnippets(searchInput.value)
  updateStats()
  form.reset()
}

// Delete snippet
function deleteSnippet(id){
  if(!confirm('Delete this snippet?')) return
  snippets = snippets.filter(s => s.id !== id)
  saveSnippets(snippets)
  buildFilterBar()
  buildTagFilterBar()
  renderSnippets(searchInput.value)
  updateStats()
}

// Start editing snippet: populate form
function startEdit(id){
  const s = snippets.find(x=>x.id===id)
  if(!s) return
  editingId = id
  titleInput.value = s.title
  codeInput.value = s.code
  tagsInput.value = (s.tags || []).join(', ')
  languageSelect.value = s.language || ''
  saveBtn.textContent = 'Update Snippet'
  cancelEditBtn.classList.remove('hidden')
  formTitle.textContent = 'Edit Snippet'
  window.scrollTo({top:0,behavior:'smooth'})
}

function cancelEdit(){
  editingId = null
  form.reset()
  saveBtn.textContent = 'Save Snippet'
  cancelEditBtn.classList.add('hidden')
  formTitle.textContent = 'Add Snippet'
}

// Export snippets to JSON file
function exportJSON(){
  const dataStr = JSON.stringify(snippets, null, 2)
  const blob = new Blob([dataStr], {type: 'application/json'})
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'snippets.json'
  a.click(); URL.revokeObjectURL(url)
}

// Import JSON file and merge
function importJSON(file){
  if(!file) return
  const reader = new FileReader()
  reader.onload = e => {
    try{
      const parsed = JSON.parse(e.target.result)
      if(!Array.isArray(parsed)) throw new Error('Expected array of snippets')
      // Normalize ids for imported items if missing
      const normalized = parsed.map(p => ({
        id: p.id || uid(),
        title: p.title || 'Untitled',
        code: p.code || '',
        tags: Array.isArray(p.tags) ? p.tags : (p.tags ? String(p.tags).split(',').map(t=>t.trim()).filter(Boolean) : []),
        language: p.language || '',
        created: p.created || Date.now()
      }))
      // Merge (prepend) but avoid duplicate ids
      const existingIds = new Set(snippets.map(s=>s.id))
      normalized.forEach(n => { if(!existingIds.has(n.id)) snippets.unshift(n) })
      saveSnippets(snippets)
      buildFilterBar()
      buildTagFilterBar()
      renderSnippets(searchInput.value)
      updateStats()
      alert('Import complete')
    }catch(err){ alert('Import failed: ' + err.message) }
  }
  reader.readAsText(file)
}

// Theme toggle (simple)
function toggleTheme(){ document.body.classList.toggle('light') }

// Update stats in sidebar
function updateStats(){
  const totalEl = qs('#stat-total')
  const tagsEl = qs('#stat-tags')
  const langsEl = qs('#stat-langs')
  const countEl = qs('#snippet-count')

  if(totalEl) totalEl.textContent = snippets.length
  if(countEl) countEl.textContent = snippets.length

  if(tagsEl){
    const allTags = new Set()
    snippets.forEach(s => (s.tags || []).forEach(t => allTags.add(t.toLowerCase().trim())))
    tagsEl.textContent = allTags.size
  }
  if(langsEl){
    const allLangs = new Set()
    snippets.forEach(s => { if(s.language) allLangs.add(s.language) })
    langsEl.textContent = allLangs.size
  }
}

// Sidebar toggle for mobile
function setupSidebar(){
  const sidebar = qs('#sidebar')
  const openBtn = qs('#sidebar-open')
  const closeBtn = qs('#sidebar-close')
  if(openBtn && sidebar){
    openBtn.addEventListener('click', () => sidebar.classList.add('open'))
  }
  if(closeBtn && sidebar){
    closeBtn.addEventListener('click', () => sidebar.classList.remove('open'))
  }
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if(sidebar && sidebar.classList.contains('open') &&
       !sidebar.contains(e.target) && e.target !== openBtn && !openBtn.contains(e.target)){
      sidebar.classList.remove('open')
    }
  })
}

// Build language filter buttons from the languages used in saved snippets
function buildFilterBar(){
  const bar = qs('#lang-filter-bar')
  if(!bar) return
  // Collect unique languages from snippets
  const langs = new Set()
  snippets.forEach(s => { if(s.language) langs.add(s.language) })
  // Sort alphabetically
  const sorted = [...langs].sort((a, b) => a.localeCompare(b))

  // Clear and rebuild — always start with "All"
  bar.innerHTML = ''
  const allBtn = document.createElement('button')
  allBtn.className = 'lang-filter-btn' + (activeFilter === '' ? ' active' : '')
  allBtn.setAttribute('data-lang', '')
  allBtn.textContent = 'All'
  allBtn.addEventListener('click', () => setActiveFilter(''))
  bar.appendChild(allBtn)

  // One button per language
  sorted.forEach(lang => {
    const btn = document.createElement('button')
    btn.className = 'lang-filter-btn' + (activeFilter.toLowerCase() === lang.toLowerCase() ? ' active' : '')
    btn.setAttribute('data-lang', lang.toLowerCase())
    btn.textContent = lang
    btn.addEventListener('click', () => setActiveFilter(lang))
    bar.appendChild(btn)
  })
}

// Set the active language filter and re-render
function setActiveFilter(lang){
  activeFilter = lang
  buildFilterBar()           // Refresh active state on buttons
  renderSnippets(searchInput.value)
}

// ---- Tag Filter Bar ----
// Dynamically build tag filter buttons from all tags used in saved snippets
function buildTagFilterBar(){
  const bar = qs('#tag-filter-bar')
  if(!bar) return

  // Collect unique tags (trimmed, preserving case for display)
  const tagMap = new Map()   // lowercase → display form
  snippets.forEach(s => (s.tags || []).forEach(t => {
    const trimmed = t.trim()
    if(trimmed && !tagMap.has(trimmed.toLowerCase())){
      tagMap.set(trimmed.toLowerCase(), trimmed)
    }
  }))
  const sorted = [...tagMap.values()].sort((a, b) => a.localeCompare(b))

  bar.innerHTML = ''
  // Don't show the bar at all if there are no tags
  if(sorted.length === 0) return

  // "All Tags" button
  const allBtn = document.createElement('button')
  allBtn.className = 'tag-filter-btn' + (activeTagFilter === '' ? ' active' : '')
  allBtn.textContent = 'All Tags'
  allBtn.addEventListener('click', () => setActiveTagFilter(''))
  bar.appendChild(allBtn)

  // One button per tag
  sorted.forEach(tag => {
    const btn = document.createElement('button')
    btn.className = 'tag-filter-btn' + (activeTagFilter.toLowerCase() === tag.toLowerCase() ? ' active' : '')
    btn.textContent = tag
    btn.addEventListener('click', () => setActiveTagFilter(tag))
    bar.appendChild(btn)
  })
}

// Set the active tag filter and re-render
function setActiveTagFilter(tag){
  activeTagFilter = tag
  buildTagFilterBar()       // Refresh active state on buttons
  renderSnippets(searchInput.value)
}

// Wire up events -------------------------------------------------------
form.addEventListener('submit', addSnippetFromForm)
cancelEditBtn.addEventListener('click', cancelEdit)
searchInput.addEventListener('input', e => renderSnippets(e.target.value))
qs('#export-json').addEventListener('click', exportJSON)
qs('#toggle-theme').addEventListener('click', toggleTheme)
qs('#import-json').addEventListener('change', e => importJSON(e.target.files[0]))

// Sort dropdown — re-render when the user changes the sort order
const sortSelect = qs('#sort-select')
if(sortSelect){
  sortSelect.addEventListener('change', e => {
    currentSort = e.target.value
    renderSnippets(searchInput.value)
  })
}

// Initial render on load
document.addEventListener('DOMContentLoaded', () => {
  snippets = loadSnippets()
  buildFilterBar()
  buildTagFilterBar()
  renderSnippets()
  updateStats()
  setupSidebar()
})

// End of script.js

