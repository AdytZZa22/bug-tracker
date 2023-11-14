import { ObserverInterface } from "@/interfaces/observer.interface";
import { Project } from "@prisma/client";

export default class ProjectObserver implements ObserverInterface<Project>
{
   async created(project: Project) {
       console.log(project)
   }
   async updated(model: Project) {

   }

   deleted(model: Project) {

   }
}