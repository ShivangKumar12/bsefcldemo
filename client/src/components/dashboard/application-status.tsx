import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle } from "lucide-react";
import applicationImg from "@assets/image_1743923532255.png";

export default function ApplicationStatus() {
  // Sample application stages and their statuses
  const applicationStages = [
    { stage: "Application Received", completed: true, date: "23-Sep-2023" },
    { stage: "Initial Review", completed: true, date: "01-Oct-2023" },
    { stage: "Document Verification", completed: true, date: "15-Oct-2023" },
    { stage: "Credit Assessment", completed: true, date: "05-Nov-2023" },
    { stage: "Loan Approval", completed: true, date: "20-Nov-2023" },
    { stage: "Loan Agreement Execution", completed: true, date: "01-Dec-2023" },
    { stage: "Disbursement Initiated", completed: true, date: "15-Dec-2023" },
    { stage: "Disbursement Completed", completed: true, date: "20-Dec-2023" },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-primary text-white">
          <CardTitle>Loan Application Status</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <div className="text-center mb-4">
                <img 
                  src={applicationImg} 
                  alt="Application Status" 
                  className="mx-auto h-48 object-contain" 
                />
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-green-800">Application ID: 6172140</h3>
                <p className="text-green-700 font-medium mt-2">Current Status: Disbursement Completed</p>
                <p className="text-green-600 mt-1">Updated on: 20-Dec-2023</p>
              </div>
            </div>
            
            <div className="col-span-2">
              <h3 className="text-lg font-semibold mb-4">Application Timeline</h3>
              
              <div className="space-y-0">
                {applicationStages.map((stage, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start">
                      <div className="flex flex-col items-center mr-4">
                        {stage.completed ? 
                          <CheckCircle className="h-6 w-6 text-green-600" /> : 
                          <Circle className="h-6 w-6 text-gray-400" />
                        }
                        {index < applicationStages.length - 1 && (
                          <div className={`w-0.5 h-12 ${stage.completed ? "bg-green-600" : "bg-gray-300"}`}></div>
                        )}
                      </div>
                      <div className="pt-0.5 pb-8">
                        <div className="font-medium">{stage.stage}</div>
                        {stage.completed && (
                          <div className="text-sm text-gray-600">
                            Completed on {stage.date}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}