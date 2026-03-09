import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";

import { Typography } from "@mui/material";

export const HistoryTimeline = ({ history }: any) => {
  if (!history?.length) return null;

  const getColor = (action: any) => {
    if (action === "signed") return "success";
    if (action === "changed") return "warning";
    if (action === "created") return "grey";
    return "warning";
  };

  return (
    <Timeline sx={{ margin: 0 }}>
      {[...history].reverse().map((item: any) => (
        <TimelineItem key={item.date}>
          <TimelineOppositeContent>
            {new Date(item.date).toLocaleString()}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot color={getColor(item.action)} />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Typography sx={{ fontSize: 14 }}>
              {/* {new Date(item.date).toLocaleString()} — */}
              {item.action === "created" && " Документ создан"}
              {item.action === "edited" && " Документ изменён"}
              {item.action === "signed" && " Документ подписан владельцем"}
              {item.action === "edited_after_sign" &&
                " Документ изменён после подписи"}
            </Typography>
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
