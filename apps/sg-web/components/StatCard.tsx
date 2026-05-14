import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function StatCard({ label, value }: { label: string; value: string }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{label}</CardTitle>
            </CardHeader>
            <CardContent>{value}</CardContent>
        </Card>
    );
}
