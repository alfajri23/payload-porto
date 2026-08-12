'use client'

import React, { useState, useMemo } from 'react'
import {
  Search,
  Download,
  Calendar,
  Copy,
  Check,
  FileText,
  User,
  Inbox,
  Filter,
  CheckCircle2,
  ListFilter,
  Sparkles,
} from 'lucide-react'

interface FormFieldDefinition {
  name: string
  label?: string
  blockType?: string
}

interface FormType {
  id: string | number
  title: string
  fields?: FormFieldDefinition[]
}

interface SubmissionDataItem {
  field: string
  value: any
}

interface FormSubmissionType {
  id: string | number
  form: string | number | FormType
  submissionData: SubmissionDataItem[]
  createdAt: string
  updatedAt?: string
}

interface SubmissionsDashboardProps {
  forms: FormType[]
  submissions: FormSubmissionType[]
}

export default function SubmissionsDashboard({ forms, submissions }: SubmissionsDashboardProps) {
  const [selectedFormId, setSelectedFormId] = useState<string | number | 'all'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | number | null>(null)
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Map forms by ID for quick lookup
  const formMap = useMemo(() => {
    const map = new Map<string | number, FormType>()
    forms.forEach((f) => map.set(f.id, f))
    return map
  }, [forms])

  // Count submissions per form
  const submissionCounts = useMemo(() => {
    const counts = new Map<string | number, number>()
    submissions.forEach((sub) => {
      const fId = typeof sub.form === 'object' && sub.form !== null ? sub.form.id : sub.form
      if (fId) {
        counts.set(fId, (counts.get(fId) || 0) + 1)
      }
    })
    return counts
  }, [submissions])

  // Filter submissions based on selected Form and Search Query
  const filteredSubmissions = useMemo(() => {
    return submissions.filter((sub) => {
      const fId = typeof sub.form === 'object' && sub.form !== null ? sub.form.id : sub.form
      // Form Filter
      if (selectedFormId !== 'all' && fId !== selectedFormId) {
        return false
      }
      // Search Filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase()
        const matchesData = sub.submissionData.some((item) => {
          const valStr = Array.isArray(item.value) ? item.value.join(' ') : String(item.value || '')
          return item.field.toLowerCase().includes(query) || valStr.toLowerCase().includes(query)
        })
        const formObj = typeof sub.form === 'object' ? sub.form : formMap.get(sub.form)
        const formTitleMatch = formObj?.title.toLowerCase().includes(query)
        return matchesData || formTitleMatch
      }
      return true
    })
  }, [submissions, selectedFormId, searchQuery, formMap])

  // Active submission item
  const activeSubmission = useMemo(() => {
    if (!selectedSubmissionId && filteredSubmissions.length > 0) {
      return filteredSubmissions[0]
    }
    return filteredSubmissions.find((s) => s.id === selectedSubmissionId) || filteredSubmissions[0] || null
  }, [selectedSubmissionId, filteredSubmissions])

  // Get active form object
  const activeFormObj = useMemo(() => {
    if (!activeSubmission) return null
    return typeof activeSubmission.form === 'object'
      ? activeSubmission.form
      : formMap.get(activeSubmission.form)
  }, [activeSubmission, formMap])

  // Helper to format field labels nicely
  const getFieldLabel = (fieldKey: string, formObj?: FormType | null) => {
    if (formObj && formObj.fields) {
      const found = formObj.fields.find((f) => f.name === fieldKey)
      if (found?.label) return found.label
    }
    // Fallback: convert snake_case or camelCase to Capitalized Words
    return fieldKey
      .replace(/([A-Z])/g, ' $1')
      .replace(/_/g, ' ')
      .replace(/^\w/, (c) => c.toUpperCase())
  }

  // Copy helper
  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(key)
    setTimeout(() => setCopiedField(null), 2000)
  }

  // CSV Export Handler
  const handleExportCSV = () => {
    const dataToExport = selectedFormId === 'all' ? submissions : filteredSubmissions
    if (dataToExport.length === 0) return

    // Gather all unique field headers
    const fieldHeaders = new Set<string>()
    dataToExport.forEach((sub) => {
      sub.submissionData.forEach((item) => fieldHeaders.add(item.field))
    })

    const headers = ['Submission ID', 'Form Title', 'Created At', ...Array.from(fieldHeaders)]

    const rows = dataToExport.map((sub) => {
      const fObj = typeof sub.form === 'object' ? sub.form : formMap.get(sub.form)
      const formTitle = fObj?.title || 'Unknown Form'
      const dateStr = new Date(sub.createdAt).toLocaleString('id-ID')

      const rowValues = Array.from(fieldHeaders).map((header) => {
        const item = sub.submissionData.find((d) => d.field === header)
        if (!item) return ''
        const val = Array.isArray(item.value) ? item.value.join('; ') : String(item.value ?? '')
        // Escape quotes for CSV
        return `"${val.replace(/"/g, '""')}"`
      })

      return [`"${sub.id}"`, `"${formTitle}"`, `"${dateStr}"`, ...rowValues].join(',')
    })

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    const selectedFormTitle =
      selectedFormId === 'all'
        ? 'all_submissions'
        : (formMap.get(selectedFormId)?.title || 'submissions').replace(/\s+/g, '_').toLowerCase()
    link.setAttribute('download', `${selectedFormTitle}_${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Calculate statistics
  const todayCount = useMemo(() => {
    const today = new Date().toISOString().slice(0, 10)
    return submissions.filter((s) => s.createdAt.slice(0, 10) === today).length
  }, [submissions])

  return (
    <div className="w-full space-y-6 text-foreground">
      {/* Top Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-background border border-border shadow-sm">
        <div>
          <div className="flex items-center gap-2 text-primary text-sm font-semibold mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Event Management Dashboard</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Form Submissions Viewer</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Pantau dan analisa seluruh data pendaftaran event secara terstruktur & mudah dibaca.
          </p>
        </div>

        {/* Stats Badges */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="bg-card border border-border px-4 py-2.5 rounded-xl shadow-xs text-center min-w-[110px]">
            <span className="text-xs text-muted-foreground font-medium block">Total Form</span>
            <span className="text-xl font-bold text-foreground">{forms.length}</span>
          </div>
          <div className="bg-card border border-border px-4 py-2.5 rounded-xl shadow-xs text-center min-w-[110px]">
            <span className="text-xs text-muted-foreground font-medium block">Total Submissions</span>
            <span className="text-xl font-bold text-primary">{submissions.length}</span>
          </div>
          <div className="bg-card border border-border px-4 py-2.5 rounded-xl shadow-xs text-center min-w-[110px]">
            <span className="text-xs text-muted-foreground font-medium block">Hari Ini</span>
            <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">+{todayCount}</span>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Form Tabs, Search, & Export */}
      <div className="flex flex-col gap-4 bg-card p-5 rounded-2xl border border-border shadow-xs">
        {/* Form Selector ("Form Dari Mana") */}
        <div>
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <ListFilter className="w-3.5 h-3.5" />
            <span>Filter Event / Form:</span>
          </label>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setSelectedFormId('all')
                setSelectedSubmissionId(null)
              }}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                selectedFormId === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20'
                  : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              <span>Semua Form</span>
              <span className="bg-background/20 px-2 py-0.5 rounded-full text-xs font-semibold">
                {submissions.length}
              </span>
            </button>

            {forms.map((form) => {
              const count = submissionCounts.get(form.id) || 0
              const isSelected = selectedFormId === form.id
              return (
                <button
                  key={form.id}
                  onClick={() => {
                    setSelectedFormId(form.id)
                    setSelectedSubmissionId(null)
                  }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20'
                      : 'bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5 opacity-70" />
                  <span>{form.title}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      isSelected ? 'bg-background/20 text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Search Bar & Export CSV */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari nama, email, atau nilai jawaban..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-input bg-background text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <button
            onClick={handleExportCSV}
            disabled={filteredSubmissions.length === 0}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-medium text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV ({filteredSubmissions.length})</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout: Left List & Right Grid Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Submissions List (4 Cols) */}
        <div className="lg:col-span-4 bg-card border border-border rounded-2xl p-4 flex flex-col h-[650px] shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-border mb-3 px-1">
            <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
              <User className="w-4 h-4 text-primary" />
              <span>Daftar Pendaftar</span>
            </h2>
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2.5 py-1 rounded-full">
              {filteredSubmissions.length} data
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
            {filteredSubmissions.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                <Inbox className="w-10 h-10 mb-2 opacity-40 stroke-1" />
                <p className="text-sm font-medium">Tidak ada submission ditemukan</p>
                <p className="text-xs text-muted-foreground/80 mt-1">
                  Coba ubah kata kunci pencarian atau filter form.
                </p>
              </div>
            ) : (
              filteredSubmissions.map((sub) => {
                const isActive = activeSubmission?.id === sub.id
                const formObj = typeof sub.form === 'object' ? sub.form : formMap.get(sub.form)

                // Try to extract name or primary display value
                const nameItem = sub.submissionData.find(
                  (d) =>
                    d.field.toLowerCase().includes('name') ||
                    d.field.toLowerCase().includes('nama') ||
                    d.field.toLowerCase().includes('email'),
                )
                const primaryText = nameItem ? String(nameItem.value) : `Pendaftar #${String(sub.id).slice(0, 6)}`
                const secondaryText = sub.submissionData.find((d) => d !== nameItem)?.value

                return (
                  <div
                    key={sub.id}
                    onClick={() => setSelectedSubmissionId(sub.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer relative ${
                      isActive
                        ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/30'
                        : 'border-border/60 hover:border-border bg-background hover:bg-muted/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                      <span className="font-semibold text-primary/80 truncate max-w-[150px]">
                        {formObj?.title || 'Form'}
                      </span>
                      <span className="flex items-center gap-1 text-[11px]">
                        <Calendar className="w-3 h-3 opacity-70" />
                        {new Date(sub.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-foreground truncate">{primaryText}</h4>

                    {secondaryText && (
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {Array.isArray(secondaryText) ? secondaryText.join(', ') : String(secondaryText)}
                      </p>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Right Column: Grid Detail View (8 Cols) */}
        <div className="lg:col-span-8 bg-card border border-border rounded-2xl p-6 flex flex-col h-[650px] shadow-xs">
          {activeSubmission ? (
            <div className="flex flex-col h-full overflow-hidden">
              {/* Header Submission */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-primary/15 text-primary text-xs font-semibold px-2.5 py-0.5 rounded-md">
                      {activeFormObj?.title || 'Event Form'}
                    </span>
                    <span className="text-xs text-muted-foreground">ID: #{activeSubmission.id}</span>
                  </div>
                  <h2 className="text-xl font-bold mt-1 text-foreground">
                    Detail Data Pendaftaran
                  </h2>
                </div>

                <div className="text-xs text-muted-foreground flex items-center gap-1.5 bg-muted/60 px-3 py-1.5 rounded-lg w-fit">
                  <Calendar className="w-3.5 h-3.5 text-primary" />
                  <span>
                    Diterima:{' '}
                    {new Date(activeSubmission.createdAt).toLocaleString('id-ID', {
                      dateStyle: 'full',
                      timeStyle: 'short',
                    })}
                  </span>
                </div>
              </div>

              {/* Submission Answers Grid */}
              <div className="flex-1 overflow-y-auto py-5 pr-1 custom-scrollbar">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {activeSubmission.submissionData.map((item, idx) => {
                    const label = getFieldLabel(item.field, activeFormObj)
                    const valString = Array.isArray(item.value)
                      ? item.value.join(', ')
                      : String(item.value ?? '-')
                    const isCopied = copiedField === item.field

                    return (
                      <div
                        key={idx}
                        className="group relative p-4 rounded-xl border border-border/70 bg-gradient-to-br from-background to-muted/20 hover:border-primary/50 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">
                            {label}
                          </span>
                          <button
                            onClick={() => handleCopy(valString, item.field)}
                            title="Copy text"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-foreground p-1 rounded-md hover:bg-muted"
                          >
                            {isCopied ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                        <div className="text-sm font-semibold text-foreground break-words select-all">
                          {valString || <span className="italic text-muted-foreground/60">Tidak diisi</span>}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Footer info */}
              <div className="pt-3 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Total {activeSubmission.submissionData.length} Pertanyaan Terjawab
                </span>
                <span>Payload CMS Event Submissions</span>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-muted-foreground">
              <FileText className="w-12 h-12 mb-3 opacity-30 stroke-1" />
              <h3 className="font-bold text-base text-foreground">Tidak Ada Data Dipilih</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-sm">
                Pilih salah satu pendaftar di daftar sebelah kiri untuk melihat rincian jawaban form secara lengkap.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
