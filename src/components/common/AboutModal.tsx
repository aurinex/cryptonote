import {
  Dialog,
  DialogContent,
  Typography,
  Box
} from '@mui/material'

export const AboutModal = ({ open, onClose }: any) => {

  return (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        BackdropProps={{
            sx: {
            backgroundColor: 'rgba(0,0,0,0.55)'
            }
        }}
    >

      <DialogContent sx={{ p: 5 }}>

        <Typography variant="h5" fontWeight={700} mb={4}>
          Основные возможности:
        </Typography>

        <Box mb={3}>
          <Typography fontWeight={600}>
            Редактор документов
          </Typography>
          <Typography color="text.secondary">
            Создание и форматирование документов A4
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography fontWeight={600}>
            Электронная подпись
          </Typography>
          <Typography color="text.secondary">
            Проверка ЭЦП на основе RSA
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography fontWeight={600}>
            Проверка целостности
          </Typography>
          <Typography color="text.secondary">
            Определение изменений в подписанных документах
          </Typography>
        </Box>

        <Box mb={3}>
          <Typography fontWeight={600}>
            Экспорт в PDF
          </Typography>
          <Typography color="text.secondary">
            Сохранение документа с подписью
          </Typography>
        </Box>

        <Typography mt={4} color="text.secondary">
          Версия: 1.0.0 | React + FastAPI
        </Typography>

      </DialogContent>

    </Dialog>
  )
}