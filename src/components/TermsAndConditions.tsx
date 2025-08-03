import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const TermsAndConditions = () => {
  const { language } = useLanguage();

  const terms = {
    en: {
      title: "Terms and Conditions",
      intro: "By booking a class, you agree to the following terms:",
      sections: [
        {
          title: "1. Cancellations",
          content: [
            "You can cancel or reschedule a class with at least 12 hours notice.",
            "If you cancel with less than 12 hours notice, no refund or rescheduling will be offered."
          ]
        },
        {
          title: "2. Delays",
          content: [
            "If you don't show up within the first 15 minutes, the class will be considered missed.",
            "If you're going to be more than 15 minutes late, you must notify in advance so the teacher can wait for you."
          ]
        },
        {
          title: "3. Attendance",
          content: [
            "It is your responsibility to attend all booked classes.",
            "No refunds will be given for unnotified absences."
          ]
        },
        {
          title: "4. Schedules and Availability",
          content: [
            "Classes are booked according to the availability shown in the calendar.",
            "Make sure to check the time in your timezone carefully before confirming."
          ]
        },
        {
          title: "5. Private Chat",
          content: [
            "Chat with the teacher is only enabled once you have booked and paid for your first class."
          ]
        },
        {
          title: "6. Class Packages",
          content: [
            "Classes included in a package must be used within the agreed period (check at purchase). They are non-transferable and non-refundable."
          ]
        },
        {
          title: "7. Mutual Respect",
          content: [
            "An environment of respect and cordiality is expected. Learning is more effective when there is good communication and willingness."
          ]
        }
      ]
    },
    es: {
      title: "Términos y Condiciones",
      intro: "Al reservar una clase, aceptas los siguientes términos:",
      sections: [
        {
          title: "1. Cancelaciones",
          content: [
            "Puedes cancelar o reprogramar una clase con al menos 12 horas de anticipación.",
            "Si cancelas con menos de 12 horas, no se realizará reembolso ni reprogramación."
          ]
        },
        {
          title: "2. Retrasos",
          content: [
            "Si no te presentas en los primeros 15 minutos, la clase se considerará perdida.",
            "Si vas a llegar más tarde de 15 minutos, debes avisar con antelación para que la profesora pueda esperarte."
          ]
        },
        {
          title: "3. Asistencia",
          content: [
            "Es tu responsabilidad asistir a todas las clases reservadas.",
            "No se harán reembolsos por inasistencias sin aviso."
          ]
        },
        {
          title: "4. Horarios y disponibilidad",
          content: [
            "Las clases se reservan según la disponibilidad visible en el calendario.",
            "Asegúrate de revisar bien la hora en tu zona horaria antes de confirmar."
          ]
        },
        {
          title: "5. Chat privado",
          content: [
            "El chat con la profesora solo se habilita una vez hayas reservado y pagado tu primera clase."
          ]
        },
        {
          title: "6. Paquetes de clases",
          content: [
            "Las clases incluidas en un paquete deben ser utilizadas dentro del periodo acordado (consultar en la compra). No son transferibles ni reembolsables."
          ]
        },
        {
          title: "7. Respeto mutuo",
          content: [
            "Se espera un ambiente de respeto y cordialidad. El aprendizaje es más efectivo cuando hay una buena comunicación y disposición."
          ]
        }
      ]
    }
  };

  const currentTerms = language === 'es' ? terms.es : terms.en;

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-sarai-text">
          {currentTerms.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <p className="text-gray-600 mb-6">{currentTerms.intro}</p>
          <div className="space-y-6">
            {currentTerms.sections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold text-sarai-text mb-2">{section.title}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-gray-600">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default TermsAndConditions; 