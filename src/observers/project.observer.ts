import { ObserverInterface } from "@/interfaces/observer.interface";
import { Project } from "@prisma/client";
import prisma from "@/lib/prisma";

export default class ProjectObserver implements ObserverInterface<Project>
{
   async created(project: Project) {
       await prisma.boardColumn.createMany({
          data: [
             {
                name: "Backlog",
                project_id: project.id,
                order: 1
             },
             {
                name: "To do",
                project_id: project.id,
                order: 2
             },
             {
                name: "Done",
                project_id: project.id,
                order: 3
             }
          ]
       })

      await prisma.projectMembership.create({
         data: {
            project_id: project.id,
            role: "OWNER",
            user_id: project.owner_id
         }
      })
   }
   async updated(model: Project) {

   }

   deleted(model: Project) {

   }
}