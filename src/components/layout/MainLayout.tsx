import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import { useState } from 'react'
import { Header } from './Header'
import { DocumentsPanel } from '../documents/DocumentsPanel'

export const MainLayout = () => {

  const [documentsOpen, setDocumentsOpen] = useState(false)

  const toggleDocuments = () => {
    setDocumentsOpen(!documentsOpen)
  }

  return (
    <Box>

      <Header onDocumentsClick={toggleDocuments} />

      <DocumentsPanel open={documentsOpen} />

      <Outlet />

    </Box>
  )
}