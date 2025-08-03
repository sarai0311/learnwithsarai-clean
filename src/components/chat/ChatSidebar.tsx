
import { User, MessageCircle } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
  online?: boolean;
}

interface ChatSidebarProps {
  students: Student[];
  selectedStudent: Student | null;
  onSelectStudent: (student: Student) => void;
}

const ChatSidebar = ({ students, selectedStudent, onSelectStudent }: ChatSidebarProps) => {
  return (
    <div className="w-1/3 border-r border-gray-200 bg-gray-50">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold text-sarai-primary flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          Mis Estudiantes
        </h2>
      </div>
      
      <div className="overflow-y-auto h-full">
        {students.map((student) => (
          <div
            key={student.id}
            onClick={() => onSelectStudent(student)}
            className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-white ${
              selectedStudent?.id === student.id ? 'bg-white border-l-4 border-l-sarai-primary' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-sarai-primary to-sarai-secondary rounded-full flex items-center justify-center text-white font-semibold">
                  {student.avatar ? (
                    <img src={student.avatar} alt={student.name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </div>
                {student.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900 truncate">{student.name}</h3>
                  {student.unreadCount && student.unreadCount > 0 && (
                    <span className="bg-sarai-primary text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                      {student.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">{student.lastMessage}</p>
                <p className="text-xs text-gray-400 mt-1">{student.lastMessageTime}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
