import { createContext, useContext, useRef } from "react"

const EditorContext = createContext<any>(null)

export const EditorProvider = ({ children }: any) => {
  const editorRef = useRef<HTMLDivElement | null>(null)

  const getContent = () => {
    const root = editorRef.current
    if (!root) return ""
    const pages = root.querySelectorAll<HTMLDivElement>("[data-editor-page]")
    if (pages.length) {
      return Array.from(pages).map((p) => p.innerHTML).join("")
    }
    return root.innerHTML
  }

  return (
    <EditorContext.Provider value={{ editorRef, getContent }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)