import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FirebaseUser } from "@/types/firebase";

interface ProfileCardProps {
  profile?: FirebaseUser;
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
          <ProfileField label="Address" value={profile.address} />
          <ProfileField label="Phone number" value={profile.phone} />
          <ProfileField label="Email id" value={profile.email} />
          <ProfileField label="Registration ID" value={profile.registrationId} />
          <ProfileField label="Institute" value={profile.institute} />
          <ProfileField label="Course" value={profile.course} />
          <ProfileField label="Enrollment Date" value={profile.enrollmentDate} />
          <ProfileField label="Graduation Date" value={profile.graduationDate} />
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