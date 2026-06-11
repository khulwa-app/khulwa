## Tasks

User will write some tasks, user can select which one to work on now, user can toggle if this task done.
I will need zustand store to handle tasks in general and read in the upnext card

Store Body:

<!-- Task -->

{
id: string
body: string
completed: boolean
isDoingNow: boolean
eta: Date
priority: high | mid | low
}

### Todos

[✅] Scaffold tasks store
[✅] persist store
[✅] mock store with one isDoingNow and test upnext card
[] build change task feature for upnext card  
[] build panel for tasks ( popover )
