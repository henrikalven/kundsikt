import { NextRequest, NextResponse } from 'next/server'
import { getAllProjects, Project } from '@/lib/mockDatabase'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query') || ''
  const page = parseInt(searchParams.get('page') || '1', 10)
  const limit = parseInt(searchParams.get('limit') || '10', 10)
  const phase = searchParams.get('phase') || 'all'
  const sortKey = searchParams.get('sortKey') || 'name'
  const sortOrder = searchParams.get('sortOrder') || 'asc'

  let filteredProjects = getAllProjects().filter(project => 
    project.name.toLowerCase().includes(query.toLowerCase()) &&
    (phase === 'all' || project.phase.name.toLowerCase() === phase.toLowerCase())
  )

  filteredProjects.sort((a, b) => {
    if (sortKey === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    } else if (sortKey === 'phase') {
      return sortOrder === 'asc' ? a.phase.name.localeCompare(b.phase.name) : b.phase.name.localeCompare(a.phase.name)
    } else if (sortKey === 'progress') {
      return sortOrder === 'asc' ? a.progress - b.progress : b.progress - a.progress
    } else if (sortKey === 'lastEdited') {
      return sortOrder === 'asc' ? a.lastEdited.localeCompare(b.lastEdited) : b.lastEdited.localeCompare(a.lastEdited)
    } else if (sortKey === 'lastSaved') {
      return sortOrder === 'asc' ? a.lastSaved - b.lastSaved : b.lastSaved - a.lastSaved
    }
    return 0
  })

  const totalItems = filteredProjects.length
  const totalPages = Math.ceil(totalItems / limit)
  const paginatedProjects = filteredProjects.slice((page - 1) * limit, page * limit)

  return NextResponse.json({
    projects: paginatedProjects,
    totalItems,
    totalPages,
    currentPage: page,
  })
}

