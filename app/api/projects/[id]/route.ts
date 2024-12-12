import { NextRequest, NextResponse } from 'next/server'
import { getProjectById, Project } from '@/lib/mockDatabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    const project = getProjectById(id)

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Ensure lastSaved is a number
    const projectWithCorrectLastSaved = {
      ...project,
      lastSaved: typeof project.lastSaved === 'number' ? project.lastSaved : Date.now()
    }

    return NextResponse.json(projectWithCorrectLastSaved)
  } catch (error) {
    console.error('Error fetching project:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id

  try {
    const updatedProject: Project = await request.json()

    // Ensure lastSaved is a number
    updatedProject.lastSaved = typeof updatedProject.lastSaved === 'number' ? updatedProject.lastSaved : Date.now()

    // In a real application, you would update the project in your database here
    // For now, we'll just log the updated project
    console.log('Updating project:', id, updatedProject)

    // Simulate a successful update
    return NextResponse.json({ message: 'Project updated successfully', project: updatedProject })
  } catch (error) {
    console.error('Error updating project:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

