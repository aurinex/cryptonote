import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserDocuments } from "../../services/documentService";
import { DocumentCard } from "./DocumentCard";
import { useNavigate } from "react-router-dom";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import { UploadDialog } from "../upload/UploadDialog";

import { useUser } from "../../utils/UserContext";

import { useTheme } from "@mui/material/styles";

export const DocumentsPanel = ({ open }: any) => {
  const theme = useTheme();

  const user = useUser();
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [uploadOpen, setUploadOpen] = useState(false);

  const loadDocuments = async () => {
    if (!user) return;
    const docs = await getUserDocuments(user._id);
    setDocuments(docs);
  };

  useEffect(() => {
    if (!user) return;
    loadDocuments();
  }, [user]);

  useEffect(() => {
    const update = () => loadDocuments();

    window.addEventListener("documentsUpdated", update);

    return () => {
      window.removeEventListener("documentsUpdated", update);
    };
  }, [user]);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: open ? 115 : 0,
          overflow: "hidden",
          transition: "height 0.5s ease",
          background: theme.palette.background.fourth,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "30px",
            px: "24px",
          }}
        >
          {documents.map((doc: any) => (
            <DocumentCard
              key={doc._id}
              id={doc._id}
              title={doc.title}
              status={doc.status}
            />
          ))}
        </Box>

        {/* Upload Button */}

        <Box sx={{ pr: "24px" }}>
          <IconButton
            onClick={() => setUploadOpen(true)}
            sx={{
              width: 48,
              height: 48,
              background: theme.palette.background.second,
              color: theme.palette.background.first,
              "&:hover": {
                background: theme.palette.background.seventh,
              },
            }}
          >
            <CloudUploadIcon />
          </IconButton>
        </Box>
      </Box>

      <UploadDialog open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </>
  );
};
