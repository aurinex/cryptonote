import { Box, Select, MenuItem, IconButton, Typography } from "@mui/material";
import { useState, useEffect, useRef } from "react";
import AlignHorizontalLeftIcon from "@mui/icons-material/AlignHorizontalLeft";
import AlignHorizontalCenterIcon from "@mui/icons-material/AlignHorizontalCenter";
import AlignHorizontalRightIcon from "@mui/icons-material/AlignHorizontalRight";
import Divider from "@mui/material/Divider";

import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";

import FormatTextdirectionLToRIcon from "@mui/icons-material/FormatTextdirectionLToR";
import FormatTextdirectionRToLIcon from "@mui/icons-material/FormatTextdirectionRToL";
import FormatColorTextIcon from "@mui/icons-material/FormatColorText";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill";

import { useTheme } from "@mui/material/styles";

const ToolbarGroup = ({ children }: any) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      px: "8px",
    }}
  >
    {children}
  </Box>
);

export const EditorToolbar = ({
  onSave,
  onSign,
  onExport,
  saveStatus,
  documentStatus,
}: any) => {
  const theme = useTheme();

  const [currentFont, setCurrentFont] = useState("Montserrat");
  const [currentSize, setCurrentSize] = useState(16);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
  const [alignCenter, setAlignCenter] = useState(false);
  const [alignRight, setAlignRight] = useState(false);

  const [textColor, setTextColor] = useState(theme.palette.background.first);
  const [bgColor, setBgColor] = useState("#ffff00");
  const textColorRef = useRef<HTMLInputElement>(null);
  const bgColorRef = useRef<HTMLInputElement>(null);

  const updateToolbarState = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    let node: any = selection.anchorNode;
    if (!node) return;

    if (node.nodeType === 3) {
      node = node.parentElement;
    }

    if (!node) return;

    const computed = window.getComputedStyle(node);

    let fontFamily = computed.fontFamily.split(",")[0].replace(/"/g, "");

    if (fontFamily === "TimesNewRoman") fontFamily = "Times New Roman";
    if (fontFamily === "SegoeUI") fontFamily = "Segoe UI";

    const allowedSizes = [
      ...Array.from({ length: 13 }, (_, i) => i + 8),
      ...Array.from({ length: 10 }, (_, i) => (i + 3) * 8),
    ];

    const fontSize = parseInt(computed.fontSize);

    const closestSize = allowedSizes.reduce((prev, curr) =>
      Math.abs(curr - fontSize) < Math.abs(prev - fontSize) ? curr : prev,
    );

    setCurrentFont(fontFamily);
    setCurrentSize(closestSize);

    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsUnderline(document.queryCommandState("underline"));

    setAlignLeft(document.queryCommandState("justifyLeft"));
    setAlignCenter(document.queryCommandState("justifyCenter"));
    setAlignRight(document.queryCommandState("justifyRight"));
  };

  useEffect(() => {
    const handler = () => {
      updateToolbarState();
    };

    document.addEventListener("selectionchange", handler);

    return () => {
      document.removeEventListener("selectionchange", handler);
    };
  }, []);

  const format = (command: string) => {
    document.execCommand(command);
  };

  const changeFontSize = (size: number) => {
    document.execCommand("fontSize", false, "7");

    const fonts = document.getElementsByTagName("font");

    for (let i = 0; i < fonts.length; i++) {
      if (fonts[i].size === "7") {
        fonts[i].removeAttribute("size");
        fonts[i].style.fontSize = size + "px";
      }
    }

    setCurrentSize(size);
  };

  const changeFont = (font: string) => {
    document.execCommand("fontName", false, font);
  };

  const isFontAvailable = (fontName: string): boolean => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    // Проверяем, что context не равен null
    if (!context) return false;

    const text = "abcdefghijklmnopqrstuvwxyz0123456789";

    context.font = `72px ${fontName}, monospace`;
    const width = context.measureText(text).width;

    context.font = "72px monospace";
    const monospaceWidth = context.measureText(text).width;

    return width !== monospaceWidth;
  };

  // Явно указываем тип string[] для useState
  const [availableFonts, setAvailableFonts] = useState<string[]>([]);

  useEffect(() => {
    const windowsFonts = [
      "Arial",
      "Verdana",
      "Tahoma",
      "Times New Roman",
      "Georgia",
      "Courier New",
      "Comic Sans MS",
      "Impact",
      "Trebuchet MS",
      "Arial Black",
      "Palatino Linotype",
      "Garamond",
      "Calibri",
      "Cambria",
      "Candara",
      "Consolas",
      "Constantia",
      "Corbel",
      "Franklin Gothic",
      "Gabriola",
      "Segoe UI",
      "Lucida Console",
    ];

    const available = windowsFonts.filter((font) => isFontAvailable(font));
    setAvailableFonts(available);
  }, []);

  const unorderedList = () => {
    document.execCommand("insertUnorderedList");
  };

  const orderedList = () => {
    document.execCommand("insertOrderedList");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: 115,
        background: theme.palette.background.fiveth,
        display: "flex",
        alignItems: "center",
        px: "16px",
        gap: "12px",
      }}
    >
      {/* GROUP 1 — FONT */}

      <ToolbarGroup>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Select
            value={currentFont}
            onChange={(e) => changeFont(e.target.value)}
            sx={{ height: 36, width: 180 }}
          >
            <MenuItem value="Montserrat">Montserrat</MenuItem>
            <MenuItem value="Arial">Arial</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>

            <Divider sx={{ my: 1 }} />

            {availableFonts
              .filter(
                (font) =>
                  !["Montserrat", "Arial", "Times New Roman"].includes(font),
              )
              .map((font) => (
                <MenuItem key={font} value={font} sx={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
          </Select>

          <Select
            value={currentSize}
            onChange={(e) => changeFontSize(Number(e.target.value))}
            sx={{ height: 36, width: 65 }}
          >
            {[
              ...Array.from({ length: 13 }, (_, i) => i + 8),
              ...Array.from({ length: 10 }, (_, i) => (i + 3) * 8),
            ].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
              </MenuItem>
            ))}
          </Select>

          <IconButton
            onClick={onExport}
            sx={{
              width: "37px",
              height: "37px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <PictureAsPdfIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: "8px" }}>
          <IconButton
            onClick={() => format("bold")}
            sx={{
              background: isBold
                ? theme.palette.background.second
                : "transparent",
              width: "44px",
              height: "44px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <b>Ж</b>
          </IconButton>

          <IconButton
            onClick={() => format("italic")}
            sx={{
              background: isItalic
                ? theme.palette.background.second
                : "transparent",
              width: "44px",
              height: "44px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <i>К</i>
          </IconButton>

          <IconButton
            onClick={() => format("underline")}
            sx={{
              background: isUnderline
                ? theme.palette.background.second
                : "transparent",
              width: "44px",
              height: "44px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <u>Ч</u>
          </IconButton>

          <Divider orientation="vertical" flexItem />

          <ToolbarGroup>
            <Box sx={{ display: "flex", gap: "8px" }}>
              <IconButton
                onClick={() => format("indent")}
                sx={{
                  width: "44px",
                  height: "44px",
                  borderRadius: 4,
                  color: theme.palette.background.first,
                  transition: "all 0.3s ease",
                  ":hover": {
                    background: "transparent",
                    color: theme.palette.background.hovered,
                  },
                }}
              >
                <FormatTextdirectionLToRIcon />
              </IconButton>

              <IconButton
                onClick={() => format("outdent")}
                sx={{
                  width: "44px",
                  height: "44px",
                  borderRadius: 4,
                  color: theme.palette.background.first,
                  transition: "all 0.3s ease",
                  ":hover": {
                    background: "transparent",
                    color: theme.palette.background.hovered,
                  },
                }}
              >
                <FormatTextdirectionRToLIcon />
              </IconButton>
            </Box>
          </ToolbarGroup>
        </Box>
      </ToolbarGroup>

      <Divider orientation="vertical" flexItem />

      {/* GROUP 2 — LISTS */}

      <ToolbarGroup>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <IconButton
            onClick={() => format("insertUnorderedList")}
            sx={{
              width: "44px",
              height: "44px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <FormatListBulletedIcon />
          </IconButton>

          <IconButton
            onClick={() => format("insertOrderedList")}
            sx={{
              width: "44px",
              height: "44px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <FormatListNumberedIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", gap: "8px" }}>
          <IconButton
            onClick={() => format("justifyLeft")}
            sx={{
              background: alignLeft
                ? theme.palette.background.second
                : "transparent",
              width: "44px",
              height: "44px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <AlignHorizontalLeftIcon />
          </IconButton>

          <IconButton
            onClick={() => format("justifyCenter")}
            sx={{
              background: alignCenter
                ? theme.palette.background.second
                : "transparent",
              width: "44px",
              height: "44px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <AlignHorizontalCenterIcon />
          </IconButton>

          <IconButton
            onClick={() => format("justifyRight")}
            sx={{
              background: alignRight
                ? theme.palette.background.second
                : "transparent",
              width: "44px",
              height: "44px",
              borderRadius: 4,
              color: theme.palette.background.first,
              transition: "all 0.3s ease",
              ":hover": {
                background: "transparent",
                color: theme.palette.background.hovered,
              },
            }}
          >
            <AlignHorizontalRightIcon />
          </IconButton>
        </Box>
      </ToolbarGroup>

      <Divider orientation="vertical" flexItem />

      {/* GROUP 4 — COLORS */}

      <ToolbarGroup>
        {/* TEXT COLOR */}

        <Box sx={{ position: "relative" }}>
          <input
            ref={textColorRef}
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
              document.execCommand("foreColor", false, e.target.value);
            }}
            style={{
              position: "absolute",
              opacity: 0,
              width: 0,
              height: 0,
            }}
          />

          <IconButton
            onClick={() => textColorRef.current?.click()}
            sx={{
              width: "44px",
              height: "44px",
              borderRadius: 2,
              position: "relative",
              color: theme.palette.background.first,
              "&:hover": { background: "transparent" },
            }}
          >
            <FormatColorTextIcon />

            {/* COLOR BAR */}

            <Box
              sx={{
                position: "absolute",
                bottom: 10,
                width: 20,
                height: 4,
                background: textColor,
              }}
            />
          </IconButton>
        </Box>

        {/* BG COLOR */}

        <Box sx={{ position: "relative" }}>
          <input
            ref={bgColorRef}
            type="color"
            value={bgColor}
            onChange={(e) => {
              setBgColor(e.target.value);
              document.execCommand("hiliteColor", false, e.target.value);
            }}
            style={{
              position: "absolute",
              opacity: 0,
              width: 0,
              height: 0,
            }}
          />

          <IconButton
            onClick={() => bgColorRef.current?.click()}
            sx={{
              width: "44px",
              height: "44px",
              borderRadius: 2,
              position: "relative",
              color: theme.palette.background.first,
              "&:hover": { background: "transparent" },
            }}
          >
            <FormatColorFillIcon />

            {/* COLOR BAR */}

            <Box
              sx={{
                position: "absolute",
                bottom: 10,
                width: 20,
                height: 4,
                background: bgColor,
              }}
            />
          </IconButton>
        </Box>
      </ToolbarGroup>

      <Divider orientation="vertical" flexItem />

      {/* GROUP 5 — SAVE */}

      <ToolbarGroup>
        <Box
          sx={{
            gap: "4px",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          <Typography
            onClick={onSave}
            sx={{
              cursor: "pointer",
              color: theme.palette.background.first,
              bgcolor: theme.palette.background.second,
              textAlign: "center",
              px: "12px",
              py: "4px",
              borderRadius: "16px",
              transition: "all 0.5s ease",
              ":hover": {
                background: theme.palette.background.hovered,
                color: theme.palette.background.inversion,
              },
            }}
          >
            Сохранить
          </Typography>

          <Typography
            onClick={onSign}
            sx={{
              cursor: "pointer",
              color: theme.palette.background.first,
              bgcolor: theme.palette.background.second,
              textAlign: "center",
              px: "12px",
              py: "4px",
              borderRadius: "16px",
              transition: "all 0.5s ease",
              ":hover": {
                background: theme.palette.background.hovered,
                color: theme.palette.background.inversion,
              },
            }}
          >
            Подписать
          </Typography>

          <Typography
            sx={{
              fontSize: 14,
              color: "#888",
            }}
          >
            {saveStatus}
          </Typography>
        </Box>
      </ToolbarGroup>
    </Box>
  );
};
