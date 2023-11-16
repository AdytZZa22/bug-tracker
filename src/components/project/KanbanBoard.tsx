"use client"
import {
    closestCenter,
    closestCorners,
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {arrayMove, SortableContext, sortableKeyboardCoordinates} from "@dnd-kit/sortable";
import {BoardColumn, Bug} from "@prisma/client";
import KanbanColumn from "@/components/project/KanbanColumn";
import {ClientCreateBugSchema} from "@/modules/project/bug.schema";
import React, {useEffect, useMemo, useState} from "react";
import {IBug, IMember} from "@/types";
import {createPortal} from "react-dom";
import BugSection from "@/components/project/BugSection";

interface ExtendedBoardColumn extends BoardColumn {}
interface Props {
    defaultCols: ExtendedBoardColumn[];
    defaultBugs: Bug[]
    handleDeleteColumn: (columnId: number) => Promise<void>;
    handleEditColumn: (columnId: number, name: string) => Promise<void>
    handleCreateBug: (data: ClientCreateBugSchema, columnId: number) => Promise<void>
    members: IMember[]
    handleUpdateColumnOrder: (columns: BoardColumn[]) => Promise<void>
    handleUpdateBugsOrder: (bugs: Bug[]) => Promise<void>
}

export default function KanbanBoard({defaultCols, defaultBugs, members, handleEditColumn, handleUpdateColumnOrder, handleDeleteColumn, handleCreateBug, handleUpdateBugsOrder}: Props) {

    const [columns, setColumns] = useState<ExtendedBoardColumn[]>([]);
    const [bugs, setBugs] = useState<Bug[]>([]);


    const [activeColumn, setActiveColumn] = useState<ExtendedBoardColumn | null>(null);
    const [activeBug, setActiveBug] = useState<Bug | null>(null);



    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    )
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);


    useEffect(() => {
        setColumns(defaultCols)
    }, [defaultCols]);

    useEffect(() => {
        setBugs(defaultBugs)
    }, [defaultBugs]);

    useEffect(() => {
        if(columns) {
            handleUpdateColumnOrder(columns).then()
        }
    }, [columns, handleUpdateColumnOrder]);

    useEffect(() => {
        if(bugs) {
            handleUpdateBugsOrder(bugs).then()
        }
    }, [bugs, handleUpdateBugsOrder]);
    function onDragStart(event: DragStartEvent) {
        console.log(event.active.data.current)

        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Bug") {
            console.log(event.active.data.current.bug)
            setActiveBug(event.active.data.current.bug);
            return;
        }

    }
    async function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null);
        setActiveBug(null)

        const { active, over } = event;

        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveAColumn = active.data.current?.type === "Column";
        if (!isActiveAColumn) return;

        setColumns((columns) => {
            const activeColumnIndex = columns.findIndex((col) => col.id === activeId);

            const overColumnIndex = columns.findIndex((col) => col.id === overId);

            return arrayMove(columns, activeColumnIndex, overColumnIndex)
        });


    }
    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;

        if (!over) return;
        if (active.id === over.id) return;

        const activeId = parseInt(active.id.toString().replace('bug-', ''), 10);
        const overId = parseInt(over.id.toString().replace('bug-', ''), 10);

        const isActiveBug = active.data.current?.type === "Bug";
        const isOverABug = over.data.current?.type === "Bug";

        if (!isActiveBug) return;

        if (isActiveBug && isOverABug) {
            setBugs(bug => {
                const activeIndex = bug.findIndex((b) => b.id === activeId);
                const overIndex = bug.findIndex((b) => b.id === overId);

                if (bugs[activeIndex].column_id != bugs[overIndex].column_id) {
                    // Fix introduced after video recording
                    bugs[activeIndex].column_id = bugs[overIndex].column_id;
                    return arrayMove(bugs, activeIndex, overIndex - 1);
                }

                return arrayMove(bugs, activeIndex, overIndex);
            })
        }

        const isOverAColumn = over.data.current?.type === "Column";

        if (isActiveBug && isOverAColumn) {
            setBugs((bug) => {
                const activeIndex = bug.findIndex((b) => b.id === activeId);
                bugs[activeIndex].column_id = overId;
                return arrayMove(bugs, activeIndex, activeIndex);
            });
        }
    }

    return (

            <DndContext
                id={"board"}
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={onDragEnd}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
            >
                <div className="m-auto flex gap-4">
                    <div className="flex gap-4">
                        <SortableContext items={columnsId}>
                            {columns.map(column => (
                                <KanbanColumn
                                    key={column.id}
                                    members={members}
                                    column={column}
                                    bugs={bugs.filter(bug => bug.column_id === column.id)}
                                    deleteColumn={handleDeleteColumn}
                                    editColumnName={handleEditColumn}
                                    createBug={handleCreateBug} />
                            ))}
                        </SortableContext>
                    </div>
                </div>

                {typeof window === "object" && createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <KanbanColumn
                                key={activeColumn.id}
                                members={members}
                                bugs={bugs.filter(bug => bug.column_id === activeColumn.id)}
                                column={activeColumn}
                                deleteColumn={handleDeleteColumn}
                                editColumnName={handleEditColumn}
                                createBug={handleCreateBug} />
                        )}
                        {activeBug && (
                            <BugSection bug={activeBug as IBug} />
                        )}
                    </DragOverlay>,
                    document.body
                )}
            </DndContext>
    )
}