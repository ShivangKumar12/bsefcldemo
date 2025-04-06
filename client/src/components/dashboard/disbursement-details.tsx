import { DisbursementDetails as DisbursementDetailsType } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface DisbursementDetailsProps {
  disbursementDetails?: DisbursementDetailsType;
}

export default function DisbursementDetails({ disbursementDetails }: DisbursementDetailsProps) {
  if (!disbursementDetails) {
    return <div>Loading disbursement data...</div>;
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary">
        <CardHeader className="bg-primary text-white">
          <CardTitle>Disbursement Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-bold">Disbursement Date</TableHead>
                <TableHead className="font-bold">Amount Disbursed(₹)</TableHead>
                <TableHead className="font-bold">Semester</TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Mode of Payment</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{disbursementDetails.disbursementDate}</TableCell>
                <TableCell>₹{disbursementDetails.loanDisbursed}</TableCell>
                <TableCell>1st Semester</TableCell>
                <TableCell>{disbursementDetails.status}</TableCell>
                <TableCell>{disbursementDetails.modeOfPayment}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold">₹{disbursementDetails.loanDisbursed}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border-primary">
        <CardHeader className="bg-primary text-white">
          <CardTitle>Transaction Details</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-100">
                <TableHead className="font-bold">Beneficiary Name</TableHead>
                <TableHead className="font-bold">Beneficiary Account Number</TableHead>
                <TableHead className="font-bold">IFSC Code</TableHead>
                <TableHead className="font-bold">UTR Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>{disbursementDetails.beneficiaryName}</TableCell>
                <TableCell>{disbursementDetails.accountNo}</TableCell>
                <TableCell>{disbursementDetails.ifscCode}</TableCell>
                <TableCell>{disbursementDetails.utrDdNo}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}