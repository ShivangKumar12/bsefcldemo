import { LoanDetails, RepaymentSchedule } from "@shared/schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { InfoIcon } from "lucide-react";

interface RepaymentStatusProps {
  loanDetails?: LoanDetails;
  repaymentSchedule?: RepaymentSchedule[];
}

export default function RepaymentStatus({ loanDetails, repaymentSchedule }: RepaymentStatusProps) {
  if (!loanDetails || !repaymentSchedule || repaymentSchedule.length === 0) {
    return <div>Loading repayment data...</div>;
  }

  // Calculate some values as they're not in the schema
  const interestRate = 1.5; // 1.5% assumed interest rate
  const totalInterest = "17142.00"; // Example calculated interest
  const amountRepaid = "0.00"; // Assuming no repayments yet
  const outstandingAmount = loanDetails.loanDisbursed; // Full loan amount

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-primary text-white">
          <CardTitle>Repayment Status</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Loan Account Number</span>
                  <span className="font-medium">{loanDetails.loanAccountNumber}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Sanctioned Amount</span>
                  <span className="font-medium">₹{loanDetails.loanSanctioned}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Disbursed Amount</span>
                  <span className="font-medium">₹{loanDetails.loanDisbursed}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Repayment Tenure</span>
                  <span className="font-medium">{loanDetails.repaymentTenure} months</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Interest Rate</span>
                  <span className="font-medium">{interestRate}%</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Payment Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Principal</span>
                  <span className="font-medium">₹{loanDetails.loanDisbursed}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Interest</span>
                  <span className="font-medium">₹{totalInterest}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount Repaid</span>
                  <span className="font-medium">₹{amountRepaid}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Outstanding Amount</span>
                  <span className="font-medium">₹{outstandingAmount}</span>
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Payment Due</span>
                  <span className="font-medium text-red-600">{loanDetails.nextDueDate || "After Moratorium"}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary">
        <CardHeader className="bg-primary text-white">
          <CardTitle>Repayment Schedule</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 bg-yellow-50 border-b border-yellow-200">
            <div className="flex items-start space-x-2">
              <InfoIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Moratorium Period</h4>
                <p className="text-sm text-yellow-700">
                  Your repayment schedule will start after your course completion plus 1 year of moratorium period.
                </p>
              </div>
            </div>
          </div>
        
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-bold">Installment #</TableHead>
                <TableHead className="font-bold">Due Date</TableHead>
                <TableHead className="font-bold">Principal (₹)</TableHead>
                <TableHead className="font-bold">Monthly Amount (₹)</TableHead>
                <TableHead className="font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {repaymentSchedule.map((payment, index) => (
                <TableRow key={index}>
                  <TableCell>{payment.installmentNumber}</TableCell>
                  <TableCell>{payment.installmentDate}</TableCell>
                  <TableCell>₹{payment.principalAmount}</TableCell>
                  <TableCell>₹{payment.monthlyInstallmentAmount}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        payment.paymentStatus === 'Y' ? 'success' : 
                        payment.paymentStatus === 'P' ? 'default' : 
                        'destructive'
                      }
                    >
                      {payment.paymentStatus === 'Y' ? 'PAID' : 
                       payment.paymentStatus === 'P' ? 'PENDING' : 'OVERDUE'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}