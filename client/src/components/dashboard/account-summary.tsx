import { LoanDetails } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileDownIcon } from "lucide-react";

interface AccountSummaryProps {
  loanDetails?: LoanDetails;
}

export default function AccountSummary({ loanDetails }: AccountSummaryProps) {
  if (!loanDetails) {
    return <div>Loading account data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-primary text-white">
          <CardTitle>Account Summary</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-bold">Loan Account Number</TableHead>
                <TableHead className="font-bold">Loan Sanctioned(₹)</TableHead>
                <TableHead className="font-bold">Loan Disbursed</TableHead>
                <TableHead className="font-bold">Repayment Tenure(Months)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{loanDetails.loanAccountNumber}</TableCell>
                <TableCell>₹{loanDetails.loanSanctioned}</TableCell>
                <TableCell>₹{loanDetails.loanDisbursed}</TableCell>
                <TableCell>{loanDetails.repaymentTenure}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">₹{loanDetails.loanSanctioned}</TableCell>
                <TableCell className="font-bold">₹{loanDetails.loanDisbursed}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex flex-col items-center mt-6">
        <p className="text-gray-700 mb-4">You can download the Sanction and Agreement Letter here</p>
        <div className="flex space-x-4">
          <Button className="bg-teal-600 hover:bg-teal-700">
            <FileDownIcon className="mr-2 h-4 w-4" />
            Sanction Letter
          </Button>
          <Button className="bg-teal-600 hover:bg-teal-700">
            <FileDownIcon className="mr-2 h-4 w-4" />
            Agreement Letter
          </Button>
        </div>
      </div>
    </div>
  );
}