import { User } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileCardProps {
  profile?: User;
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  if (!profile) {
    return <div>Loading profile data...</div>;
  }

  return (
    <Card className="border-primary">
      <CardHeader className="bg-primary text-white">
        <CardTitle>Profile Summary</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-200">
          <ProfileField label="Name" value={profile.fullName} />
          <ProfileField label="Address" value={profile.address || "S/O: MUNNA KUMAR, ROAD NO-8, NARAYANI NAGAR SANCHIPATTI, HAJIPUR HAJIPUR"} />
          <ProfileField label="Phone number" value={profile.mobile} />
          <ProfileField label="Email id" value={profile.email} />
          <ProfileField 
            label="Co-Applicant Name" 
            value={profile.coApplicantName || "MUNNA KUMAR"} 
          />
          <ProfileField 
            label="Co-Applicant Address" 
            value={profile.coApplicantAddress || "ROAD NO.8, NARAYANI NAGAR, SANCHIPATTI, HAJIPUR, VAISHALI, BIHAR"} 
          />
          <ProfileField 
            label="Co-Applicant Contact Number" 
            value={profile.coApplicantContact || "9931286972"} 
          />
          <ProfileField 
            label="Applied Institute Name" 
            value={profile.instituteName || "CHANDIGARH ENGINEERING COLLEGE"} 
          />
          <ProfileField 
            label="Address of Institute" 
            value={profile.instituteAddress || "LANDRAN, KHARAR-BANUR HIGHWAY, SECTOR-112, GREATER MOHALI, PUNJABLANDRAN, MOHALI-140307(PUNJAB)"} 
          />
          <ProfileField 
            label="Institute Contact Number" 
            value={profile.instituteContact || "1723984200"} 
          />
          <ProfileField 
            label="Applied Course" 
            value={profile.appliedCourse || "B.TECH B.E. B.SC-COMPUTER SCIENCE AND ENGINEERING"} 
          />
          <ProfileField 
            label="Duration of Course (In Months)" 
            value={String(profile.courseDuration || "48")} 
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface ProfileFieldProps {
  label: string;
  value: string;
}

function ProfileField({ label, value }: ProfileFieldProps) {
  return (
    <div className="grid grid-cols-12 py-3 px-4">
      <div className="col-span-4 font-semibold text-primary-700">{label}</div>
      <div className="col-span-8">{value}</div>
    </div>
  );
}