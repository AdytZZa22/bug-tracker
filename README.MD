# Aplicație Informatică - Bug Tracker

Acest document servește ca punct central de informare și ghid pentru utilizarea și înțelegerea aplicației.

## Instrucțiuni de Instalare

Pentru a instala și rula această aplicație Next.js pe sistemul dvs., urmați pașii de mai jos:

### Cerințe Preliminare

Asigurați-vă că aveți următoarele instalate pe mașina dvs.:
- Node.js (preferabil ultima versiune LTS)
- npm sau yarn (manager de pachete)
- Git (pentru clonarea repository-ului)

### Clonarea Repository-ului

1. Deschideți un terminal.
2. Navigați către directorul în care doriți să clonați aplicația.
3. Rulați comanda:
   ```sh
   git clone https://github.com/AdytZZa22/bug-tracker
   ```
   
### Instalarea dependentelor
1. Deschideti directorul bug-tracker si rulati
   ```sh
   npm install
   #or
   yarn install
   ```


### Configurarea Variabilelor de Mediu

Pentru a configura aplicația corect, trebuie să setați variabilele de mediu necesare. Începeți prin a crea un fișier `.env.local` în rădăcina proiectului dvs.

Exemplu de conținut pentru `.env.local` (bazat pe `.env.example`):
```
GITHUB_ID=your_github_id
GITHUB_SECRET=your_github_secret

GOOGLE_ID=your_google_id
GOOGLE_SECRET=your_google_secret
```

DATABASE_URL="postgresql://postgres@localhost:5432/bug_tracker"


Înlocuiți valorile `your_github_id`, `your_github_secret`, `your_google_id`, și `your_google_secret` cu credențialele reale obținute de la GitHub și Google. Aceste credențiale sunt necesare pentru autentificarea utilizatorilor prin GitHub și Google.

#### Crearea și Configurarea Bazei de Date

1. Asigurați-vă că aveți PostgreSQL instalat pe sistemul dvs.
2. Creați o bază de date nouă numită `bug_tracker`.
3. Asigurați-vă că utilizatorul `postgres` are acces la această bază de date.
4. În fișierul `.env.local`, setați `DATABASE_URL` la URL-ul bazei de date PostgreSQL. De exemplu:
   DATABASE_URL="postgresql://postgres@localhost:5432/bug_tracker"

Acest URL trebuie să corespundă cu setările de conexiune la baza de date PostgreSQL.

### Rularea Aplicației
1. Deschideti directorul bug-tracker in terminal si rulati
   ```sh
   npm run dev
   #or
   yarn dev
   ```
    Aplicația va fi disponibilă la adresa http://localhost:3000 în browserul dvs.
   
---

## Cuprins

### 1. Obiectivul Aplicației
- [1.1 Descrierea Firmei în care se Implementează Aplicația](#11-descrierea-firmei-în-care-se-implementează-aplicația)
- [1.2 Scopul Aplicației Propuse](#12-scopul-aplicației-propuse)

### 2. Analiza Sistemului Informatic
- [2.1 Schema Bazei De Date](#21-schema-bazei-de-date)
- [2.2 Descrierea Bazei de Date](#22-descrierea-bazei-de-date)

### 3. Descrierea codului sursa
- [3.1 Descrierea fisierelor](#31-descrierea-fisierelor)

---

## 1. Obiectivul Aplicației

Scopul aplicației de bug tracking este de a facilita gestionarea eficientă a erorilor și problemelor software într-un mediu de dezvoltare. Aplicația oferă o platformă centralizată pentru raportarea, urmărirea și rezolvarea bug-urilor, contribuind astfel la îmbunătățirea colaborării între dezvoltatori, accelerarea procesului de rezolvare a problemelor și asigurarea unui înalt nivel de calitate a produselor software. Prin organizarea și transparentizarea procesului de gestionare a bug-urilor, aplicația vizează îmbunătățirea productivității și eficienței echipei de dezvoltare.


### 1.1 Descrierea Firmei în care se Implementează Aplicația

Firma ce implementează această aplicație de bug tracking este o entitate activă în domeniul tehnologiei informației, având o experiență îndelungată în dezvoltarea de software și soluții IT. Aceasta pune un accent deosebit pe inovație și eficiență, angajându-se în furnizarea de soluții care răspund cerințelor complexe ale clienților săi. Firma se distinge prin abordarea sa orientată spre calitate și prin dorința de a îmbunătăți continuu procesele de dezvoltare software, făcând un pas important prin implementarea acestei aplicații de bug tracking.

### 1.2 Scopul Aplicației Propuse

Scopul propus al acestei aplicații de bug tracking este de a crea un sistem centralizat și eficient pentru gestionarea și urmărirea erorilor software. Aplicația intenționează să faciliteze comunicarea între membrii echipei de dezvoltare, să reducă timpul necesar pentru identificarea și rezolvarea problemelor și să asigure o mai bună organizare a proceselor de dezvoltare. Prin oferirea unor funcționalități cum ar fi clasificarea bug-urilor după severitate, prioritate și stadiul rezolvării, aplicația vizează îmbunătățirea transparenței și eficienței în abordarea problemelor software. Acest lucru contribuie nu doar la creșterea calității produselor finale, dar și la optimizarea ciclurilor de dezvoltare și la îmbunătățirea satisfacției clienților.


## 2. Analiza Sistemului Informatic

### 2.1 Schema Bazei de date

![Diagrama Bazei de Date](https://svgshare.com/i/11Lb.svg)

### 2.2 Descrierea bazei de date

# Documentația Prisma Schema

Fișierul `schema.prisma` reprezintă schema bazei de date pentru o aplicație care gestionează proiecte, membrii proiectelor, bug-uri și comentarii. Schema este concepută pentru a fi folosită cu Prisma, un ORM (Object-Relational Mapping) pentru Node.js și TypeScript.

## Generatori

### Prisma Client
```prisma
generator client {
  provider = "prisma-client-js"
}
```
Acest generator specifică că se va genera un client Prisma în JavaScript pentru interacțiunea cu baza de date.

### DBML Generator
```prisma
generator dbml {
  provider = "prisma-dbml-generator"
}
```
Generatorul `dbml` este folosit pentru a crea un model al bazei de date în formatul DBML (Database Markup Language), care poate fi utilizat pentru vizualizarea structurii bazei de date.

## Datasource

```prisma
datasource db {
  provider = "postgresql"
  url = env("DATABASE_URL")
  // directUrl = env("POSTGRES_URL_NON_POOLING")
}
```
Definirea sursei de date indică faptul că se utilizează PostgreSQL ca sistem de gestionare a bazei de date. URL-ul de conexiune este preluat din variabilele de mediu.

## Enumerații

### BugStatus
| Valoare       | Descriere           |
|---------------|---------------------|
| NEW           | Bug nou creat       |
| IN_PROGRESS   | Bug în lucru        |
| RESOLVED      | Bug rezolvat        |
| CLOSED        | Bug închis          |

### BugPriority
| Valoare   | Descriere         |
|-----------|-------------------|
| LOW       | Prioritate redusă |
| MEDIUM    | Prioritate medie  |
| HIGH      | Prioritate înaltă |
| URGENT    | Urgent            |

### ProjectRole
| Valoare   | Descriere        |
|-----------|------------------|
| REPORTER  | Raportor         |
| DEVELOPER | Dezvoltator      |
| MANAGER   | Manager          |
| OWNER     | Proprietar       |

## Modele

### ProjectMembership
Reprezintă membrul unui proiect și rolul său în acel proiect.

| Câmp        | Tip         | Descriere                  |
|-------------|-------------|----------------------------|
| id          | Int         | ID-ul unic al membrului    |
| user_id     | Int         | ID-ul utilizatorului       |
| project_id  | Int         | ID-ul proiectului          |
| role        | ProjectRole | Rolul membrului în proiect |

### User
Reprezintă un utilizator al aplicației.

| Câmp            | Tip       | Descriere                              |
|-----------------|-----------|----------------------------------------|
| id              | Int       | ID-ul unic al utilizatorului           |
| name            | String?   | Numele utilizatorului (opțional)       |
| username        | String?   | Numele de utilizator (opțional)        |
| gh_username     | String?   | Numele de utilizator GitHub (opțional) |
| email           | String?   | Email-ul utilizatorului (opțional)     |
| emailVerified   | DateTime? | Data verificării email-ului (opțional) |
| image           | String?   | Imaginea de profil (opțional)          |
| createdAt       | DateTime  | Data creării contului                  |
| updatedAt       | DateTime  | Data ultimei actualizări a contului    |

### Account
Reprezintă un cont asociat utilizatorului.


| Câmp                     | Tip    | Descriere                                                                    |
|--------------------------|--------|------------------------------------------------------------------------------|
| id                       | Int    | Identificator unic al fiecărui cont, auto-incrementat.                       |
| userId                   | Int    | Identificatorul utilizatorului asociat acestui cont.                         |
| type                     | String | Tipul contului (ex: local, OAuth).                                           |
| provider                 | String | Furnizorul de autentificare (ex: Google, Facebook).                          |
| providerAccountId        | String | ID-ul contului de la furnizor.                                               |
| refresh_token            | String | Token-ul de reîmprospătare (opțional).                                       |
| refresh_token_expires_in | Int    | Timpul de expirare al token-ului de reîmprospătare, în secunde (opțional).   |
| access_token             | String | Token-ul de acces (opțional).                                                |
| expires_at               | Int    | Momentul expirării token-ului de acces, în secunde (opțional).               |
| token_type               | String | Tipul token-ului (ex: Bearer, opțional).                                     |
| scope                    | String | Domeniul de aplicare al token-ului (opțional).                               |
| id_token                 | String | Un token ID JWT (opțional).                                                  |
| session_state            | String | Starea sesiunii între client și server (opțional).                           |
| oauth_token_secret       | String | Secretul token-ului OAuth pentru semnarea și validarea cererilor (opțional). |
| oauth_token              | String | Token-ul OAuth pentru a accesa resursele protejate (opțional).               |


### Session
Reprezintă o sesiune de autentificare a unui utilizator.

| Câmp          | Tip      | Descriere                    |
|---------------|----------|------------------------------|
| id            | String   | ID-ul unic al sesiunii       |
| sessionToken  | String   | Token-ul sesiunii            |
| userId        | Int      | ID-ul utilizatorului asociat |
| expires       | DateTime | Data expirării sesiunii      |

### Bug
Reprezintă un bug asociat unui proiect.

| Câmp             | Tip             | Descriere                                                         |
|------------------|-----------------|-------------------------------------------------------------------|
| id               | Int             | Identificator unic auto-incrementat pentru fiecare bug.           |
| title            | String          | Titlul bug-ului.                                                  |
| description      | String          | Descrierea bug-ului, opțional.                                    |
| reporter_id      | Int             | Identificatorul utilizatorului care a raportat bug-ul.            |
| developer_id     | Int             | Identificatorul dezvoltatorului asignat bug-ului, opțional.       |
| project_id       | Int             | Identificatorul proiectului căruia îi aparține bug-ul.            |
| order_in_column  | Int             | Poziția bug-ului în coloana sa pe tabloul de bord.                |
| status           | BugStatus       | Statusul actual al bug-ului, implicit NEW.                        |
| priority         | BugPriority     | Prioritatea bug-ului, implicit LOW.                               |
| created_at       | DateTime        | Data și ora creării bug-ului, setată automat la momentul creării. |
| updated_at       | DateTime        | Data și ora ultimei actualizări a bug-ului, actualizată automat.  |
| reporter         | User            | Relația cu utilizatorul care a raportat bug-ul.                   |
| developer        | User?           | Relația cu dezvoltatorul asignat bug-ului, opțional.              |
| project          | Project         | Relația cu proiectul căruia îi aparține bug-ul.                   |
| comments         | Comment[]       | Comentariile asociate bug-ului.                                   |
| column           | BoardColumn?    | Colona de pe tabloul de bord unde se află bug-ul, opțional.       |
| column_id        | Int?            | Identificatorul coloanei de pe tabloul de bord, opțional.         |



### Project
Reprezintă un proiect creat de catre un utilizator.

| Câmp                 | Tip                   | Descriere                                                                            |
|----------------------|-----------------------|--------------------------------------------------------------------------------------|
| id                   | Int                   | Identificator unic auto-incrementat pentru fiecare proiect.                          |
| name                 | String                | Numele proiectului.                                                                  |
| description          | String                | Descrierea proiectului, opțional.                                                    |
| slug                 | String                | Slug unic pentru proiect, utilizat pentru identificare în URL-uri și alte referințe. |
| owner_id             | Int                   | Identificatorul proprietarului proiectului.                                          |
| owner                | User                  | Relația cu utilizatorul care deține proiectul.                                       |
| bugs                 | Bug[]                 | Lista de bug-uri asociate cu proiectul.                                              |
| projectMembership    | ProjectMembership[]   | Lista membrilor proiectului.                                                         |
| columns              | BoardColumn[]         | Colonele asociate cu proiectul pe tabloul de bord.                                   |
| projectInvitation    | ProjectInvitation[]   | Invitațiile trimise pentru a adera la proiect.                                       |



### Comment
Reprezintă un comentariu adăugat la un bug.


| Câmp        | Tip       | Descriere                                                              |
|-------------|-----------|------------------------------------------------------------------------|
| id          | Int       | Identificator unic auto-incrementat pentru fiecare comentariu.         |
| body        | String    | Corpul comentariului.                                                  |
| user_id     | Int       | Identificatorul utilizatorului care a creat comentariul.               |
| bug_id      | Int       | Identificatorul bug-ului la care se referă comentariul.                |
| user        | User      | Relația cu utilizatorul care a creat comentariul.                      |
| bug         | Bug       | Relația cu bug-ul la care se referă comentariul.                       |
| created_at  | DateTime  | Data și ora creării comentariului, setată automat la momentul creării. |


### BoardColumn
Reprezintă o coloană într-un board de proiect.

| Câmp        | Tip       | Descriere                                                                                                                                                                                                       |
|-------------|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id          | Int       | Identificator unic auto-incrementat pentru fiecare coloană a tabloului de bord.                                                                                                                                 |
| name        | String    | Numele coloanei.                                                                                                                                                                                                |
| project_id  | Int       | Identificatorul proiectului căruia îi aparține coloana.                                                                                                                                                         |
| project     | Project   | Relația cu proiectul căruia îi aparține coloana. Această legătură include un comportament de tipul 'Cascade' la ștergere, ceea ce înseamnă că dacă proiectul este șters, coloana va fi, de asemenea, eliminată. |
| bugs        | Bug[]     | Lista de bug-uri asociate cu această coloană.                                                                                                                                                                   |
| order       | Int       | Ordinea coloanei în cadrul tabloului de bord, cu o valoare implicită de 1.                                                                                                                                      |



### ProjectInvitation
Reprezintă o invitație la un proiect.

| Câmp        | Tip       | Descriere                                                                                                                                                                                                                 |
|-------------|-----------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| id          | Int       | Identificator unic auto-incrementat pentru fiecare invitație în proiect.                                                                                                                                                  |
| project     | Project   | Relația cu proiectul căruia îi este destinată invitația. Această legătură include un comportament de tipul 'Cascade' la ștergere, ceea ce înseamnă că dacă proiectul este șters, invitația va fi, de asemenea, eliminată. |
| email       | String    | Adresa de email a persoanei invitate.                                                                                                                                                                                     |
| url         | String    | URL-ul prin care se poate accesa invitația.                                                                                                                                                                               |
| expiration  | DateTime  | Data și ora expirării invitației.                                                                                                                                                                                         |
| project_id  | Int       | Identificatorul proiectului căruia îi aparține invitația.                                                                                                                                                                 |



## Relații

Relațiile dintre modele sunt stabilite prin câmpuri ce referă ID-uri ale altor modele și sunt decorate cu directive precum `@relation`. De exemplu, în modelul `ProjectMembership`, câmpurile `user_id` și `project_id` creează legături între un utilizator, un proiect și rolul utilizatorului în acel proiect.

## Directive

Directivele Prisma, precum `@default`, `@unique`, și `@relation`, sunt folosite pentru a configura comportamentul câmpurilor, cum ar fi valoarea implicită, unicitatea și relațiile cu alte modele.


## 3. Descrierea codului sursa

### 3.1 Descrierea fisierelor

1. [next-auth.d.ts](#next-authdts)
2. [middleware.ts](#middlewarets)
3. [index.ts](#indexts)
4. [layout.tsx](#layouttsx)
5. [page.tsx](#pagetsx)
6. [globals.css](#globalscss)
7. [project-magic-link.tsx](#project-magic-linktsx)
8. [TaskCard.tsx](#TaskCardtsx)
9. [LegacyKanbanBoard.tsx](#LegacyKanbanBoardtsx)
10. [AddProject.tsx](#AddProjecttsx)
11. [Icons.tsx](#Iconstsx)
12. [ColumnContainer.tsx](#ColumnContainertsx)
13. [Sidebar.tsx](#Sidebartsx)
14. [AuthProvider.tsx](#AuthProvidertsx)
15. [LoadingBoard.tsx](#LoadingBoardtsx)
16. [UserAuthForm.tsx](#UserAuthFormtsx)
17. [prisma.ts](#prismats)
18. [helpers.ts](#helpersts)
19. [utils.ts](#utilsts)
20. [auth.ts](#authts)
21. [project.observer.ts](#project-observerts)
22. [observer.interface.ts](#observer-interfacets)
23. [index.ts](#indexts-1)
24. [page.tsx](#pagetsx-1)
25. [card.tsx](#cardtsx)
26. [toaster.tsx](#toastertsx)
27. [sheet.tsx](#sheettsx)
28. [label.tsx](#labeltsx)
29. [accordion.tsx](#accordiontsx)
30. [tooltip.tsx](#tooltiptsx)
31. [use-toast.ts](#use-toastts)
32. [sidebar-item.tsx](#sidebar-itemtsx)
33. [avatar.tsx](#avatartsx)
34. [dialog.tsx](#dialogtsx)
35. [badge.tsx](#badgetsx)
36. [separator.tsx](#separatortsx)
37. [button.tsx](#buttontsx)
38. [toast.tsx](#toasttsx)
39. [dropdown-menu.tsx](#dropdown-menutsx)
40. [select.tsx](#selecttsx)
41. [textarea.tsx](#textareatsx)
42. [input.tsx](#inputtsx)
43. [skeleton.tsx](#skeletontsx)
44. [form.tsx](#formtsx)
45. [EditColumn.tsx](#EditColumntsx)
46. [AddBugModal.tsx](#AddBugModaltsx)
47. [SortableItem.tsx](#SortableItemtsx)
48. [BugSection.tsx](#BugSectiontsx)
49. [KanbanBoard.tsx](#KanbanBoardtsx)
50. [InviteUser.tsx](#InviteUsertsx)
51. [BugSheet.tsx](#BugSheettsx)
52. [KanbanColumn.tsx](#KanbanColumntsx)
53. [AddColumn.tsx](#AddColumntsx)
54. [user.service.ts](#user-servicets)
55. [project.service.ts](#project-servicets)
56. [comment.schema.ts](#comment-schemats)
57. [bug.schema.ts](#bug-schemats)
58. [column.schema.ts](#column-schemats)
59. [project.schema.ts](#project-schemats)
60. [route.ts](#route-1ts)
61. [loading.tsx](#loadingtsx)
62. [page.tsx](#page-2tsx)
63. [route.ts](#route-2ts)
64. [route.ts](#route-3ts)
65. [route.ts](#route-4ts)

---

### next-auth.d.ts
```typescript
import {type DefaultSession} from "next-auth"

declare module 'next-auth' {
  interface Session {
    user: User & DefaultSession['user'];
  }

  interface User {
    id: number | undefined
  }
}
```
📄 **Descriere**: Declarația de tipuri pentru biblioteca `next-auth`. Această declarație extinde sesiunea implicită și utilizatorul pentru a include un id de tip număr sau nedefinit.

### middleware.ts
```typescript
import { withAuth } from "next-auth/middleware"
import {getToken} from "next-auth/jwt";
import {NextResponse} from "next/server";
import prisma from "@/lib/prisma";

export default withAuth( async function middleware (req) {
  const session = await getToken({req})
  const url = req.nextUrl;
  // Codul comentat a fost eliminat pentru brevitate
  if(req.nextUrl.pathname.startsWith("/project")) { }
  if(req.nextUrl.pathname.startsWith('/api') && session === null) {
    return NextResponse.json({ msg: "You are not allowed here. :)" }, { status: 403 });
  }
  if(session && req.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', req.url))
  }
  // Restul codului a fost eliminat pentru brevitate
})
```
📄 **Descriere**: Acest middleware protejează anumite rute verificând sesiunea utilizatorului și redirecționând sau răspunzând corespunzător. Dacă ruta începe cu `/project` sau dacă este o rută API fără sesiune validă, utilizatorul este redirecționat sau i se refuză accesul.

### index.ts
```typescript
import {Bug, ProjectRole} from "@prisma/client";

export type Id = string | number;

export type Column = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  columnId: Id;
  content: string;
};

export interface IMember {
  user: {
    name: string | null,
    image: string | null
  }
  id: number,
  user_id: number,
  project_id: number,
  role: ProjectRole
}

export interface IBug extends Bug {
  developer: {
    name: string
    image?: string
  },
  reporter: {
    name: string,
    image?: string
  },
  column: {
    name: string
  }
  comments: {
    body: string
    created_at: Date
    user: {
      name: string
      image?: string
    }
  }[]
}
```
📄 **Descriere**: Acest fișier definește tipuri și interfețe folosite în întreaga aplicație pentru a reprezenta coloane, sarcini (task-uri), membri și bug-uri. Structurile de date sunt extensii ale modelelor de baze de date de la Prisma.

### layout.tsx
```typescript
// Codul a fost eliminat pentru brevitate

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  // Restul codului a fost eliminat pentru brevitate

  return (
    <html lang="en">
      // Continutul a fost eliminat pentru brevitate
    </html>
  )
}
```
📄 **Descriere**: Componenta `RootLayout` este un layout de nivel înalt pentru întreaga aplicație care include stilurile globale, bara laterală și componentele principale ale paginii. Folosește sesiunea utilizatorului pentru a obține proiectele utilizatorului și pentru a afișa bara laterală în consecință.

### page.tsx
```typescript
// Codul a fost eliminat pentru brevitate

export default async function Home() {
  // Restul codului a fost eliminat pentru brevitate

  return (
    <>
      {/* Continutul principal */}
      <div className="flex-1 px-4 pt-4">
        // Continutul a fost eliminat pentru brevitate
      </div>
    </>
  )
}
```
📄 **Descriere**: Pagina principală a aplicației care afișează proiectele utilizatorului și un formular pentru a adăuga un nou proiect. Gestionează crearea unui proiect și afișează proiectele existente.

### globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  // Stilurile CSS au fost eliminate pentru brevitate
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```
📄 **Descriere**: Fișierul de stiluri globale pentru aplicație. Acesta setează stiluri de bază și variabile pentru temele întunecate și luminoase folosind Tailwind CSS.

### project-magic-link.tsx
```typescript
// Codul a fost eliminat pentru brevitate

export const InviteMagicLinkEmail = ({ url }: NotionMagicLinkEmailProps) => (
  <Html>
    // Continutul a fost eliminat pentru brevitate
  </Html>
);

export default InviteMagicLinkEmail;

// Continutul a fost eliminat pentru brevitate
```
📄 **Descriere**: Componenta `InviteMagicLinkEmail` generează un email cu un link magic pentru invitații în proiect. Acesta folosește variabile de mediu pentru URL-ul bazei și include un logo și un text invitațional.

### TaskCard.tsx
```typescript
import { useState } from "react";
import { BsTrash as TrashIcon } from 'react-icons/bs';
import { Id, Task } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Codul a fost eliminat pentru brevitate

export default TaskCard;
```
📄 **Descriere**: Componenta `TaskCard` reprezintă o sarcină individuală în cadrul unei coloane Kanban. Acceptă operații de interfață pentru modificarea, ștergerea și sortarea sarcinilor. Utilizează biblioteca `@dnd-kit` pentru gestionarea operațiilor de tragere și plasare.

### LegacyKanbanBoard.tsx
```typescript
// Codul a fost eliminat pentru brevitate

export default function LegacyKanbanBoard() {
  // Restul codului a fost eliminat pentru brevitate

  return (
    <div className="flex-1 flex min-h-screen m-auto items-center w-full overflow-x-auto overflow-y-hidden px-[40px]">
      // Continutul a fost eliminat pentru brevitate
    </div>
  )
}

// Continutul a fost eliminat pentru brevitate
```
📄 **Descriere**: Componenta `LegacyKanbanBoard` este o implementare veche a unui tablou Kanban cu coloane și sarcini sortabile. Folosește `DndContext` din biblioteca `@dnd-kit` pentru a permite drag and drop între coloane.

### AddProject.tsx
```typescript
// Codul a fost eliminat pentru brevitate

export default function AddProject({handleCreateProject}: Props) {
  // Restul codului a fost eliminat pentru brevitate

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      // Continutul a fost eliminat pentru brevitate
    </Dialog>
  )
}
```
📄 **Descriere**: Componenta `AddProject` afișează o fereastră modală pentru adăugarea unui nou proiect. Gestionează starea de încărcare și trimite datele către server pentru procesare.

### Icons.tsx
```typescript
type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
  // Lista de icoane a fost eliminată pentru brevitate
}

// Continutul a fost eliminat pentru brevitate
```
📄 **Descriere**: Fișierul `Icons.tsx` exportă un obiect `Icons` care conține componente React pentru diferite icoane SVG, fiind folosit pentru a standardiza și reutiliza icoanele în întreaga aplicație.

### ColumnContainer.tsx
```typescript
// Codul a fost eliminat pentru brevitate

export default function ColumnContainer({ column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask, }: Props) {
  // Restul codului a fost eliminat pentru brevitate

  return (
    <div ref={setNodeRef} style={style} className=" bg-columnBackgroundColor w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col ">
      // Continutul a fost eliminat pentru brevitate
    </div>
  );
}
```
📄 **Descriere**: Componenta `ColumnContainer` reprezintă o coloană din tabloul Kanban. Permite adăugarea, editarea și ștergerea sarcinilor, oferind și funcționalități de sortare cu `useSortable`.

### Sidebar.tsx
```typescript
// Codul a fost eliminat pentru brevitate

export default function Sidebar({projects}: {projects: Project[]}) {
  // Restul codului a fost eliminat pentru brevitate

  return <div className="flex-none flex-shrink-0 h-screen w-64 border-r-2 border-r-gray-200">
    // Continutul a fost eliminat pentru brevitate
  </div>
}
```
📄 **Descriere**: Componenta `Sidebar` afișează o bară laterală cu acces rapid la diferite părți ale aplicației, cum ar fi proiectele utilizatorului, mesajele și setările.

### AuthProvider.tsx
```typescript
"use client";
import { SessionProvider } from "next-auth/react";

type Props = { children?: React.ReactNode; };

export const AuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
```
📄 **Descriere**: Componenta `AuthProvider` înconjoară copiii cu un `SessionProvider` care gestionează sesiunea utilizatorului în aplicație.

### LoadingBoard.tsx
```typescript
import {Skeleton} from "@/components/ui/skeleton";
import {Separator} from "@/components/ui/separator";

export default function LoadingBoard() {
  return (
    <div className="flex items-center justify-center w-full">
      // Continutul a fost eliminat pentru brevitate
    </div>
  )
}
```
📄 **Descriere**: Componenta `LoadingBoard` este un placeholder de încărcare care afișează schelete animate pentru a indica încărcarea conținutului.

### UserAuthForm.tsx
```typescript
"use client"
import * as React from "react"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import {signIn} from "next-auth/react";

// Codul a fost eliminat pentru brevitate

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  // Restul codului a fost eliminat pentru brevitate

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      // Continutul a fost eliminat pentru brevitate
    </div>
  )
}
```
📄 **Descriere**: Componenta `UserAuthForm` afișează un formular de autentificare care permite utilizatorilor să se autentifice folosind diferiți furnizori, cum ar fi GitHub sau Google.

### prisma.ts
```typescript
// Codul a fost eliminat pentru brevitate

export default prisma;
```
📄 **Descriere**: Fișierul `prisma.ts` configurează și exportă o instanță PrismaClient pentru a interacționa cu baza de date. Include un sistem de observatori pentru a efectua acțiuni suplimentare la modificările din baza de date.

### helpers.ts
```typescript
"use server"
import {ParsedUrlQueryInput} from "querystring";
import {addHours, isDate} from "date-fns";
import crypto from "crypto"
import queryString from "querystring";

// Codul a fost eliminat pentru brevitate

export async function serializeAndSign<TData extends ParsedUrlQueryInput>(data: TData, expirationTime: number, secret: string) {
  // Restul codului a fost eliminat pentru brevitate
}
```
📄 **Descriere**: Fișierul `helpers.ts` oferă funcții auxiliare pentru a genera și a valida URL-uri semnate, incluzând serializarea și semnarea datelor.

### utils.ts
```typescript
import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```
📄 **Descriere**: Fișierul `utils.ts` oferă funcția `cn` care combină `clsx` și `twMerge` pentru a gestiona claselor CSS într-un mod mai eficient și pentru a preveni conflictele între clasele Tailwind.

### auth.ts
```typescript
import {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {PrismaAdapter} from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  // Codul a fost eliminat pentru brevitate
}
```
📄 **Descriere**: Configurația pentru `next-auth`, inclusiv furnizorul de autentificare Google și opțiunile de sesiune și callback-uri.

### project.observer.ts
```typescript
import { ObserverInterface } from "@/interfaces/observer.interface";
import { Project } from "@prisma/client";
import prisma from "@/lib/prisma";

export default class ProjectObserver implements ObserverInterface<Project> {
  async created(project: Project) {
    // Codul a fost eliminat
  }
}
```



