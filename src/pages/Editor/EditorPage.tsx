import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useEditor } from "../../utils/EditorContext";
import { A4Editor } from "../../components/editor/A4Editor";

import { useNavigate } from "react-router-dom";

import {
  createDocument,
  updateDocument,
  getDocument,
  signDocument,
} from "../../services/documentService";

import { useUser } from "../../utils/UserContext";

type HistoryItem = {
  action: string;
  date: string;
};

export const EditorPage = () => {
  const navigate = useNavigate();
  const user = useUser();
  const { id } = useParams();
  const { editorRef } = useEditor();

  const [documentId, setDocumentId] = useState<string | null>(id ? id : null);

  const [saveStatus, setSaveStatus] = useState("Сохранено");

  const [documentStatus, setDocumentStatus] = useState<
    "signed" | "changed" | "unsigned"
  >("unsigned");

  const [documentHash, setDocumentHash] = useState<string | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>([]);

  const [title, setTitle] = useState("Новый документ");

  useEffect(() => {
    const loadDocument = async () => {
      if (!editorRef.current) return;
      if (!id) {
        // режим создания документа
        setDocumentId(null);
        editorRef.current.innerHTML = "";
        return;
      }
      const doc = await getDocument(id);
      setDocumentId(id);
      if (editorRef.current) {
        editorRef.current.innerHTML = doc.content;
      }
      setHistory(doc.history || []);
      setDocumentHash(doc.hash);
      setDocumentStatus(doc.status);
      setTitle(doc.title);
    };
    loadDocument();
  }, [id]);

  const handleSave = async () => {
    if (!editorRef.current) return;
    const content = editorRef.current.innerHTML;
    setSaveStatus("Сохранение...");
    if (documentId) {
      const doc = await updateDocument(documentId, {
        title,
        content,
        author: `${user.surname} ${user.name}`,
        author_id: user._id,
      });
      window.dispatchEvent(new Event("documentsUpdated"));
      setHistory(doc.history || []);
      setSaveStatus("Сохранено");
      console.log("updated", doc);
    } else {
      const doc = await createDocument({
        title: "Новый документ",
        content,
        author: `${user.surname} ${user.name}`,
        author_id: user._id,
      });
      window.dispatchEvent(new Event("documentsUpdated"));
      setSaveStatus("Сохранено");
      setDocumentId(doc._id);
      navigate(`/editor/${doc._id}`);
      console.log("created", doc);
    }
  };

  const handleSign = async () => {
    if (!documentId) return;

    const doc = await signDocument(documentId);
    window.dispatchEvent(new Event("documentsUpdated"));

    setDocumentHash(doc.hash);
    setHistory(doc.history || []);
    setDocumentStatus("signed");
    setSaveStatus("Подписан");
  };

  const getSignedDate = () => {
    const signedRecord = history
      .filter((h) => h.action.includes("подписан"))
      .pop();

    return signedRecord?.date;
  };

  return (
    <A4Editor
      onSave={handleSave}
      onSign={handleSign}
      saveStatus={saveStatus}
      documentStatus={documentStatus}
      history={history}
      documentHash={documentHash}
      signedAt={getSignedDate()}
      title={title}
      setTitle={setTitle}
    />
  );
};
