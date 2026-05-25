// ============================================================
// js/app.js — Main Application Logic (Full-Stack Version)
// ============================================================
// Adapted from the original script.js to use the REST API
// instead of LocalStorage. All snippets are now stored in
// MongoDB and synced via the Express backend.

// Helpers ---------------------------------------------------------------
function qs(sel){ return document.querySelector(sel) }
function qsa(sel){ return Array.from(document.querySelectorAll(sel)) }

// Map the app's language names to Prism.js class identifiers
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

// DOM elements
const form           = qs('#snippet-form')
const titleInput     = qs('#title')
const codeInput      = qs('#code')
const tagsInput      = qs('#tags')
const languageSelect = qs('#language')
const snippetsEl     = qs('#snippets')
const searchInput    = qs('#search')
const saveBtn        = qs('#save-btn')
const cancelEditBtn  = qs('#cancel-edit')
const formTitle      = qs('#form-title')

// App state
let snippets       = []       // All snippets from the API
let editingId      = null     // The _id of the snippet being edited
let activeFilter   = ''       // Active language filter
let activeTagFilter = ''      // Active tag filter
let currentSort    = 'newest' // Current sort order

// ---- Highlight helper: wraps matching text in <mark> tags ----
function highlightText(text, query){
  if(!query) return document.createTextNode(text)
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp('(' + escaped + ')', 'gi')
  const frag = document.createDocumentFragment()
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

// ---- Sort helper ----
function sortSnippets(list){
  const copy = [...list]
  switch(currentSort){
    case 'newest':  return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    case 'oldest':  return copy.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    case 'alpha':   return copy.sort((a, b) => a.title.localeCompare(b.title))
    default:        return copy
  }
}

// ---- Load snippets from API ----
async function loadSnippets(){
  try {
    const data = await api.get('/api/snippets')
    snippets = data.snippets || []
  } catch(err) {
    console.error('Failed to load snippets:', err.message)
    snippets = []
  }
}

// ---- Render snippets (filtered, sorted, highlighted) ----
function renderSnippets(query = ''){
  const q = query.trim().toLowerCase()
  snippetsEl.innerHTML = ''

  let filtered = snippets.filter(s => {
    if(activeFilter && (s.language || '').toLowerCase() !== activeFilter.toLowerCase()) return false
    if(activeTagFilter && !(s.tags || []).some(t => t.toLowerCase() === activeTagFilter.toLowerCase())) return false
    if(!q) return true
    const inTitle = s.title.toLowerCase().includes(q)
    const inTags  = (s.tags || []).some(t => t.toLowerCase().includes(q))
    const inLang  = (s.language || '').toLowerCase().includes(q)
    const inCode  = s.code.toLowerCase().includes(q)
    return inTitle || inTags || inLang || inCode
  })

  filtered = sortSnippets(filtered)

  if(filtered.length === 0){
    snippetsEl.innerHTML = '<p style="color:var(--text3);padding:12px 0">No snippets found.</p>'
    return
  }

  filtered.forEach(s => snippetsEl.appendChild(createCard(s, q)))
}

// ---- Create a snippet card element ----
function createCard(s, q){
  const card = document.createElement('article')
  card.className = 'snippet-card'

  const top = document.createElement('div')
  top.className = 'snippet-top'

  const meta = document.createElement('div')
  meta.className = 'meta'

  const h = document.createElement('strong')
  h.appendChild(highlightText(s.title, q))
  meta.appendChild(h)

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
      setTimeout(() => copyBtn.textContent = 'Copy', 1200)
    }catch(e){
      alert('Copy failed: ' + (e && e.message ? e.message : e))
    }
  })

  const editBtn = document.createElement('button')
  editBtn.className = 'btn-edit'
  editBtn.textContent = 'Edit'
  editBtn.addEventListener('click', () => startEdit(s._id))

  const delBtn = document.createElement('button')
  delBtn.className = 'btn-delete'
  delBtn.textContent = 'Delete'
  delBtn.addEventListener('click', () => deleteSnippet(s._id))

  actions.append(copyBtn, editBtn, delBtn)
  top.append(meta, actions)

  // Prism.js code block
  const codeBlock = document.createElement('pre')
  const codeEl = document.createElement('code')
  codeEl.className = 'language-' + getLangClass(s.language)
  codeEl.textContent = s.code
  codeBlock.appendChild(codeEl)
  if(window.Prism) Prism.highlightElement(codeEl)

  const tagsWrap = document.createElement('div')
  tagsWrap.className = 'tags'
  ;(s.tags || []).forEach(t => {
    const span = document.createElement('span')
    span.className = 'tag'
    span.appendChild(highlightText(t.trim(), q))
    tagsWrap.appendChild(span)
  })

  card.append(top, codeBlock, tagsWrap)
  return card
}

// ---- Add / Update snippet via API ----
async function addSnippetFromForm(e){
  e && e.preventDefault()
  const title    = titleInput.value.trim()
  const code     = codeInput.value
  const tags     = tagsInput.value.split(',').map(t => t.trim()).filter(Boolean)
  const language = languageSelect.value

  if(!title || !code) return alert('Please provide a title and code.')

  try {
    if(editingId){
      // Update existing snippet via API
      await api.put('/api/snippets/' + editingId, { title, code, tags, language })
      editingId = null
      saveBtn.textContent = 'Save Snippet'
      cancelEditBtn.classList.add('hidden')
      formTitle.textContent = 'Add Snippet'
    } else {
      // Create new snippet via API
      await api.post('/api/snippets', { title, code, tags, language })
    }

    // Reload all snippets from the server and re-render
    await loadSnippets()
    buildFilterBar()
    buildTagFilterBar()
    renderSnippets(searchInput.value)
    updateStats()
    form.reset()
  } catch(err) {
    alert('Error: ' + err.message)
  }
}

// ---- Delete snippet via API ----
async function deleteSnippet(id){
  if(!confirm('Delete this snippet?')) return

  try {
    await api.del('/api/snippets/' + id)
    await loadSnippets()
    buildFilterBar()
    buildTagFilterBar()
    renderSnippets(searchInput.value)
    updateStats()
  } catch(err) {
    alert('Error: ' + err.message)
  }
}

// ---- Start editing snippet ----
function startEdit(id){
  const s = snippets.find(x => x._id === id)
  if(!s) return
  editingId = id
  titleInput.value = s.title
  codeInput.value = s.code
  tagsInput.value = (s.tags || []).join(', ')
  languageSelect.value = s.language || ''
  saveBtn.textContent = 'Update Snippet'
  cancelEditBtn.classList.remove('hidden')
  formTitle.textContent = 'Edit Snippet'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function cancelEdit(){
  editingId = null
  form.reset()
  saveBtn.textContent = 'Save Snippet'
  cancelEditBtn.classList.add('hidden')
  formTitle.textContent = 'Add Snippet'
}

// ---- Export snippets as JSON file ----
function exportJSON(){
  const dataStr = JSON.stringify(snippets, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'snippets.json'
  a.click(); URL.revokeObjectURL(url)
}

// ---- Import JSON file and upload each snippet to API ----
async function importJSON(file){
  if(!file) return
  const reader = new FileReader()
  reader.onload = async (e) => {
    try {
      const parsed = JSON.parse(e.target.result)
      if(!Array.isArray(parsed)) throw new Error('Expected array of snippets')

      // Upload each snippet to the API
      let imported = 0
      for(const p of parsed){
        const snippet = {
          title: p.title || 'Untitled',
          code: p.code || '',
          tags: Array.isArray(p.tags) ? p.tags : [],
          language: p.language || ''
        }
        if(snippet.code){
          await api.post('/api/snippets', snippet)
          imported++
        }
      }

      await loadSnippets()
      buildFilterBar()
      buildTagFilterBar()
      renderSnippets(searchInput.value)
      updateStats()
      alert(`Import complete: ${imported} snippet(s) added.`)
    } catch(err) {
      alert('Import failed: ' + err.message)
    }
  }
  reader.readAsText(file)
}

// ---- Theme toggle ----
function toggleTheme(){ document.body.classList.toggle('light') }

// ---- Logout ----
function logout(){
  localStorage.removeItem('sv_token')
  localStorage.removeItem('sv_user')
  window.location.href = '/login.html'
}

// ---- Update stats in sidebar ----
function updateStats(){
  const totalEl = qs('#stat-total')
  const tagsEl  = qs('#stat-tags')
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

// ---- Load and display user info in sidebar ----
function loadUserInfo(){
  const userEl = qs('#user-greeting')
  const avatarEl = qs('#user-avatar')
  try {
    const user = JSON.parse(localStorage.getItem('sv_user'))
    if(user && userEl) userEl.textContent = user.username || user.email
    if(user && avatarEl) avatarEl.textContent = (user.username || 'U')[0].toUpperCase()
  } catch(e) { /* ignore */ }
}

// ---- Sidebar toggle for mobile ----
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
  document.addEventListener('click', (e) => {
    if(sidebar && sidebar.classList.contains('open') &&
       !sidebar.contains(e.target) && e.target !== openBtn && !openBtn.contains(e.target)){
      sidebar.classList.remove('open')
    }
  })
}

// ---- Language filter bar ----
function buildFilterBar(){
  const bar = qs('#lang-filter-bar')
  if(!bar) return
  const langs = new Set()
  snippets.forEach(s => { if(s.language) langs.add(s.language) })
  const sorted = [...langs].sort((a, b) => a.localeCompare(b))

  bar.innerHTML = ''
  const allBtn = document.createElement('button')
  allBtn.className = 'lang-filter-btn' + (activeFilter === '' ? ' active' : '')
  allBtn.setAttribute('data-lang', '')
  allBtn.textContent = 'All'
  allBtn.addEventListener('click', () => setActiveFilter(''))
  bar.appendChild(allBtn)

  sorted.forEach(lang => {
    const btn = document.createElement('button')
    btn.className = 'lang-filter-btn' + (activeFilter.toLowerCase() === lang.toLowerCase() ? ' active' : '')
    btn.setAttribute('data-lang', lang.toLowerCase())
    btn.textContent = lang
    btn.addEventListener('click', () => setActiveFilter(lang))
    bar.appendChild(btn)
  })
}

function setActiveFilter(lang){
  activeFilter = lang
  buildFilterBar()
  renderSnippets(searchInput.value)
}

// ---- Tag filter bar ----
function buildTagFilterBar(){
  const bar = qs('#tag-filter-bar')
  if(!bar) return

  const tagMap = new Map()
  snippets.forEach(s => (s.tags || []).forEach(t => {
    const trimmed = t.trim()
    if(trimmed && !tagMap.has(trimmed.toLowerCase())){
      tagMap.set(trimmed.toLowerCase(), trimmed)
    }
  }))
  const sorted = [...tagMap.values()].sort((a, b) => a.localeCompare(b))

  bar.innerHTML = ''
  if(sorted.length === 0) return

  const allBtn = document.createElement('button')
  allBtn.className = 'tag-filter-btn' + (activeTagFilter === '' ? ' active' : '')
  allBtn.textContent = 'All Tags'
  allBtn.addEventListener('click', () => setActiveTagFilter(''))
  bar.appendChild(allBtn)

  sorted.forEach(tag => {
    const btn = document.createElement('button')
    btn.className = 'tag-filter-btn' + (activeTagFilter.toLowerCase() === tag.toLowerCase() ? ' active' : '')
    btn.textContent = tag
    btn.addEventListener('click', () => setActiveTagFilter(tag))
    bar.appendChild(btn)
  })
}

function setActiveTagFilter(tag){
  activeTagFilter = tag
  buildTagFilterBar()
  renderSnippets(searchInput.value)
}

// ---- Wire up events ----
form.addEventListener('submit', addSnippetFromForm)
cancelEditBtn.addEventListener('click', cancelEdit)
searchInput.addEventListener('input', e => renderSnippets(e.target.value))
qs('#export-json').addEventListener('click', exportJSON)
qs('#toggle-theme').addEventListener('click', toggleTheme)
qs('#import-json').addEventListener('change', e => importJSON(e.target.files[0]))

// Logout button
const logoutBtn = qs('#logout-btn')
if(logoutBtn) logoutBtn.addEventListener('click', logout)

// Sort dropdown
const sortSelect = qs('#sort-select')
if(sortSelect){
  sortSelect.addEventListener('change', e => {
    currentSort = e.target.value
    renderSnippets(searchInput.value)
  })
}

// ---- Initialize app on page load ----
document.addEventListener('DOMContentLoaded', async () => {
  // Auth check: redirect to login if no token
  if(!localStorage.getItem('sv_token')){
    window.location.href = '/login.html'
    return
  }

  // Load user info into sidebar
  loadUserInfo()

  // Fetch snippets from the API and render everything
  await loadSnippets()
  buildFilterBar()
  buildTagFilterBar()
  renderSnippets()
  updateStats()
  setupSidebar()
})
