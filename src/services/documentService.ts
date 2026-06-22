import { API_BASE } from "./api";

export const createDocument = async (data: any) => {
  const res = await fetch(`${API_BASE}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getDocuments = async () => {
  const res = await fetch(`${API_BASE}/documents`);
  return res.json();
};

export const getDocument = async (id: string) => {
  const res = await fetch(`${API_BASE}/documents/${id}`);
  return res.json();
};

export const saveDocument = async (content: string, author: string) => {
  const res = await fetch(`${API_BASE}/documents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Новый документ",
      content: content,
      author: author,
    }),
  });

  return res.json();
};

export const updateDocument = async (id: string, data: any) => {
  const res = await fetch(`${API_BASE}/documents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const signDocument = async (id: string) => {
  const res = await fetch(`${API_BASE}/documents/${id}/sign`, {
    method: "POST",
  });

  return res.json();
};

export const getDocumentByHash = async (hash: string) => {
  const res = await fetch(`${API_BASE}/documents/hash/${hash}`);

  return res.json();
};

export const updateDocumentTitle = async (
  id: string,
  title: string,
  author_id: string,
) => {
  const res = await fetch(`${API_BASE}/documents/${id}/title`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: title, author_id: author_id }),
  });

  return res.json();
};

export const uploadDocument = async (
  file: File,
  author_id: string,
  author: string,
) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("author_id", author_id);
  formData.append("author", author);

  const res = await fetch(`${API_BASE}/documents/upload`, {
    method: "POST",
    body: formData,
  });

  return res.json();
};

export const getUserDocuments = async (userId: string) => {
  const res = await fetch(`${API_BASE}/documents/user/${userId}`);

  return res.json();
};

export const deleteDocument = async (id: string) => {
  const res = await fetch(`${API_BASE}/documents/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }

  return res.json();
};