import { createContext, useContext, useRef } from "react"

const EditorContext = createContext<any>(null)

export const EditorProvider = ({ children }: any) => {

  const editorRef = useRef<HTMLDivElement | null>(null)

  return (
    <EditorContext.Provider value={{ editorRef }}>
      {children}
    </EditorContext.Provider>
  )
}

export const useEditor = () => useContext(EditorContext)