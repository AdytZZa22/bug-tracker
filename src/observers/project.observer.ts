import { ObserverInterface } from "@/interfaces/observer.interface";
import { Project } from "@prisma/client";

export default class ProjectObserver implements ObserverInterface<Project>
{
   async created(project: Project) {
       
   }
   async updated(model: Project) {

   }

   deleted(model: Project) {

   }
}