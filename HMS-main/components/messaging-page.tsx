import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Send, Paperclip, Phone, Video } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

export function MessagingPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Messaging</h1>
        <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">New Message</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="md:h-[calc(100vh-180px)]">
          <CardHeader className="px-4 py-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search contacts..." className="w-full pl-8" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-250px)]">
              {[
                { name: "Dr. Sarah Johnson", role: "Cardiologist", status: "Online", unread: 2 },
                { name: "Dr. Michael Williams", role: "Neurologist", status: "Away", unread: 0 },
                { name: "Nurse Emily Davis", role: "ICU", status: "Online", unread: 0 },
                { name: "Dr. Robert Brown", role: "Pediatrician", status: "Offline", unread: 0 },
                { name: "Nurse Jessica Wilson", role: "Emergency", status: "Online", unread: 1 },
                { name: "Dr. David Martinez", role: "Surgeon", status: "Away", unread: 0 },
                { name: "Nurse Amanda Lee", role: "Maternity", status: "Online", unread: 0 },
                { name: "Dr. Thomas Anderson", role: "Psychiatrist", status: "Offline", unread: 0 },
              ].map((contact, index) => (
                <div
                  key={index}
                  className={`
                    flex items-center gap-3 p-3 hover:bg-muted cursor-pointer border-l-2
                    ${index === 0 ? "bg-muted border-l-[#4DB6AC]" : "border-l-transparent"}
                  `}
                >
                  <Avatar>
                    <AvatarFallback>
                      {contact.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <p className="font-medium truncate">{contact.name}</p>
                      {contact.unread > 0 && (
                        <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF8A65] text-[10px] font-medium text-white">
                          {contact.unread}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between">
                      <p className="text-sm text-muted-foreground truncate">{contact.role}</p>
                      <p className="text-xs">
                        <span
                          className="inline-block h-2 w-2 rounded-full mr-1"
                          style={{
                            backgroundColor:
                              contact.status === "Online"
                                ? "#4DB6AC"
                                : contact.status === "Away"
                                  ? "#FF8A65"
                                  : "#9e9e9e",
                          }}
                        ></span>
                        {contact.status}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:h-[calc(100vh-180px)] flex flex-col">
          <CardHeader className="px-6 py-4 border-b flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Dr. Sarah Johnson</CardTitle>
                  <p className="text-sm text-muted-foreground">Cardiologist • Online</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 p-0 flex flex-col">
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-4">
                {[
                  {
                    sender: "them",
                    message: "Good morning! I wanted to discuss the lab results for patient John Smith.",
                    time: "09:15 AM",
                  },
                  {
                    sender: "me",
                    message:
                      "Good morning Dr. Johnson. Yes, I've reviewed them. His cholesterol levels are still elevated despite the medication.",
                    time: "09:17 AM",
                  },
                  {
                    sender: "them",
                    message:
                      "I see. Let's adjust his dosage and schedule a follow-up in two weeks. Can you also order an additional lipid panel?",
                    time: "09:20 AM",
                  },
                  {
                    sender: "me",
                    message:
                      "Will do. I'll make those changes to his prescription and schedule the follow-up appointment. Should I notify the patient about these changes?",
                    time: "09:22 AM",
                  },
                  {
                    sender: "them",
                    message:
                      "Yes, please. Also, remind him about the dietary restrictions we discussed during his last visit.",
                    time: "09:25 AM",
                  },
                ].map((message, index) => (
                  <div key={index} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`
                        max-w-[80%] rounded-lg p-3 
                        ${message.sender === "me" ? "bg-[#4DB6AC] text-white" : "bg-[#EEEEEE] text-[#333333]"}
                      `}
                    >
                      <p>{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${message.sender === "me" ? "text-white/70" : "text-muted-foreground"}`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t flex gap-2">
              <Button variant="outline" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input placeholder="Type your message..." className="flex-1" />
              <Button className="bg-[#4DB6AC] hover:bg-[#3da69c]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MessagingPage
