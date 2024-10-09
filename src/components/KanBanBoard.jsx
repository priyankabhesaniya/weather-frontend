import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  IconButton,
  Badge,
  Divider,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useParams } from "react-router-dom";
import { updateProject } from "../api/Project";
import { useSelector } from "react-redux";

const initialColumns = {
  Pending: {
    id: "Pending",
    title: "Pending",
    taskIds: [],
  },
  "In Progress": {
    id: "In Progress",
    title: "In Progress",
    taskIds: [],
  },
  Completed: {
    id: "Completed",
    title: "Completed",
    taskIds: [],
  },
};
const statusColors = {
  Pending: "#6c76881a",
  "In Progress": "#a324991c",
  Completed: "#3bb53724",
};

const KanBanBoard = ({
  tasks,
  setTasks,
  setNewColumnTitle,
  newColumnTitle,
  setFlag,
  flag,
}) => {
  const authSelector = useSelector(
    (state) => state.projectpulse.authUserReducer
  );
  console.log("🚀 ~ KanBanBoard ~ tasks:", tasks);
  const [columns, setColumns] = useState(initialColumns);
  const { id } = useParams();
  useEffect(() => {
    if (tasks && tasks.length > 0) {
      const newColumns = JSON.parse(JSON.stringify(initialColumns));
      tasks.forEach((task) => {
        if (newColumns[task.status]) {
          newColumns[task.status].taskIds.push(task.id);
        } else {
          // If the status doesn't exist, create a new column
          newColumns[task.status] = {
            id: task.status,
            title: task.status,
            taskIds: [task.id],
          };
        }
      });
      setColumns(newColumns);
    }
  }, [tasks]);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (type === "COLUMN") {
      const newColumnOrder = Object.keys(columns);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newColumns = {};
      newColumnOrder.forEach((columnId) => {
        newColumns[columnId] = columns[columnId];
      });

      setColumns(newColumns);
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.id]: newColumn,
      });
    } else {
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      setColumns({
        ...columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      });

      // Update task status
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === parseInt(draggableId)
            ? { ...task, status: destination.droppableId }
            : task
        )
      );
      const updatedTasks = tasks.map((task) =>
        task.id === parseInt(draggableId)
          ? { ...task, status: destination.droppableId }
          : task
      );
      console.log("🚀 ~ onDragEnd ~ updatedTasks:", updatedTasks);

      await updateProject(
        id,
        { task: updatedTasks },
        authSelector?.access_token
      );
    }
  };

  const addNewColumn = () => {
    if (newColumnTitle.trim() !== "") {
      setColumns((prevColumns) => ({
        ...prevColumns,
        [newColumnTitle]: {
          id: newColumnTitle,
          title: newColumnTitle,
          taskIds: [],
        },
      }));
      setNewColumnTitle("");
      setFlag(false);
    }
  };

  useEffect(() => {
    if (flag) {
      addNewColumn();
    }
  }, [flag]);

  return (
    <>
      <Box sx={{ p: 2 }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="COLUMN"
          >
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                sx={{ display: "flex", gap: 2, overflowX: "auto" }}
              >
                {Object.entries(columns).map(([columnId, column], index) => (
                  <Draggable
                    key={columnId}
                    draggableId={columnId}
                    index={index}
                  >
                    {(provided) => (
                      <Box ref={provided.innerRef} {...provided.draggableProps}>
                        <Card
                          sx={{
                            width: 300,
                            bgcolor: "grey.100",
                            borderRadius: "12px",
                            boxShadow: 3,
                          }}
                        >
                          <CardContent>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                mb: 2,
                              }}
                            >
                              <IconButton
                                size="small"
                                {...provided.dragHandleProps}
                              >
                                <DragIndicatorIcon />
                              </IconButton>
                              <Typography
                                variant="h6"
                                component="div"
                                sx={{ flexGrow: 1 }}
                              >
                                {column.title}
                              </Typography>
                              <Badge
                                color="primary"
                                badgeContent={column.taskIds.length}
                                sx={{ ml: "auto" }}
                              />
                            </Box>
                            <Droppable droppableId={columnId} type="TASK">
                              {(provided) => (
                                <Box
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  sx={{ minHeight: 200, p: 1 }}
                                >
                                  {column.taskIds.map((taskId, index) => {
                                    const task = tasks.find(
                                      (t) => t.id === taskId
                                    );
                                    if (!task) return null;
                                    return (
                                      <Draggable
                                        key={taskId}
                                        draggableId={taskId.toString()}
                                        index={index}
                                      >
                                        {(provided) => (
                                          <Card
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{
                                              mb: 2,
                                              p: 1,
                                              bgcolor:
                                                statusColors[task.status] ||
                                                "pink.300",
                                              borderRadius: "8px",
                                              boxShadow: 2,
                                            }}
                                          >
                                            <CardContent
                                              sx={{
                                                p: 1,
                                              
                                              }}
                                            >
                                              <Typography
                                                variant="h6"
                                                sx={{
                                                
                                                  fontWeight: "bold",
                                                  letterSpacing: "0.5px",
                                                  color: "#000", // White text for readability
                                                }}
                                              >
                                                {task.title}
                                              </Typography>
                                             
                                              <Typography
                                                variant="body1"
                                                sx={{
                                                  fontSize: "0.95rem",
                                                  color:"#000"
                                                }}
                                              >
                                                {task.description}
                                              </Typography>
                                              <hr/>
                                              {/* <Divider
                                                sx={{
                                                  my: 1,
                                                   color:"#000"
                                                }}
                                              />{" "} */}
                                              {/* Divider for separation */}
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                  color:"#000"
                                                }}
                                              >
                                                Assigned to:{" "}
                                                <strong>
                                                  {task.assigned_to.name}
                                                </strong>
                                              </Typography>
                                              <Typography
                                                variant="body2"
                                                sx={{
                                                   color:"#000",
                                                  mt: 1,
                                                }}
                                              >
                                                Deadline:{" "}
                                                <strong>
                                                  {task.deadline_date}
                                                </strong>
                                              </Typography>
                                            </CardContent>

                                            {/* <CardContent sx={{ p: 2 }}>
                                            <Typography variant="subtitle1">{task.title}</Typography>
                                            <Typography variant="body2">{task.description}</Typography>
                                            <Typography variant="caption" color="text.secondary">
                                              Assigned to: {task.assigned_to.name}
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary" display="block">
                                              Deadline: {task.deadline_date}
                                            </Typography>
                                          </CardContent> */}
                                          </Card>
                                        )}
                                      </Draggable>
                                    );
                                  })}
                                  {provided.placeholder}
                                </Box>
                              )}
                            </Droppable>
                          </CardContent>
                        </Card>
                      </Box>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>
      </Box>
    </>
  );
};

export default KanBanBoard;
