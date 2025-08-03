import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatSidebar from '@/components/chat/ChatSidebar';
import ChatWindow from '@/components/chat/ChatWindow';
import ScrollAnimation from '@/components/ScrollAnimation';

interface Student {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  online?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  isFromTeacher: boolean;
}

const Chat = () => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  
  // Sample data - in a real application this would come from a database
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'María González',
      lastMessage: 'I have a question about the verb assignment',
      lastMessageTime: '10:30 AM',
      unreadCount: 2,
      online: true
    },
    {
      id: '2',
      name: 'Carlos Rodríguez',
      lastMessage: 'Thank you for yesterday\'s explanation',
      lastMessageTime: '9:15 AM',
      unreadCount: 0,
      online: false
    },
    {
      id: '3',
      name: 'Ana Martínez',
      lastMessage: 'Can we review verb tenses?',
      lastMessageTime: 'Yesterday',
      unreadCount: 1,
      online: true
    }
  ]);

  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      senderName: 'María González',
      content: 'Hello Sarai, I have a question about irregular verbs',
      timestamp: '10:25 AM',
      isFromTeacher: false
    },
    {
      id: '2',
      senderId: 'teacher',
      senderName: 'Sarai',
      content: 'Hello María! Of course, tell me what your specific question is',
      timestamp: '10:27 AM',
      isFromTeacher: true
    },
    {
      id: '3',
      senderId: '1',
      senderName: 'María González',
      content: 'I don\'t understand well when to use "ser" and when "estar"',
      timestamp: '10:30 AM',
      isFromTeacher: false
    }
  ]);

  const currentMessages = selectedStudent 
    ? messages.filter(msg => msg.senderId === selectedStudent.id || msg.isFromTeacher)
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />
      
      <main className="pt-20">
        <ScrollAnimation>
          <div className="sarai-container py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-sarai-primary mb-4">
                Student Chat
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Stay connected with your students, resolve doubts, and provide personalized support
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden" style={{ height: '600px' }}>
              <div className="flex h-full">
                <ChatSidebar 
                  students={students}
                  selectedStudent={selectedStudent}
                  onSelectStudent={setSelectedStudent}
                />
                <ChatWindow 
                  selectedStudent={selectedStudent}
                  messages={currentMessages}
                />
              </div>
            </div>
          </div>
        </ScrollAnimation>
      </main>

      <Footer />
    </div>
  );
};

export default Chat;
