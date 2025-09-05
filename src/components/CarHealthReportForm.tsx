
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Trash2 } from "lucide-react";
import { CarHealthReportPDF } from "./CarHealthReportPDF";
import { CarHealthPreview } from "./CarHealthPreview";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export interface CarHealthData {
  ownerName: string;
  carModel: string;
  registration: string;
  odometer: string;
  reportId: string;
  healthScore: string;
  batteryStatus: string;
  batteryVoltage: string;
  coolantTemp: string;
  coolantStatus: string;
  engineCodes: string;
  tyreStatus: string;
  lightsStatus: string;
  batteryPrediction: string;
  tyrePrediction: string;
  enginePrediction: string;
  lastWash: string;
  lastScan: string;
  totalReports: string;
  additionalNotes: string;
  generatedDate: string;
  predictiveNotes: string[];
  serviceRecommendations?: string[];
}

export const CarHealthReportForm = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState<CarHealthData>({
    ownerName: "",
    carModel: "",
    registration: "",
    odometer: "",
    reportId: `#AT${new Date().getFullYear()}${String(Date.now()).slice(-3)}`,
    healthScore: "",
    batteryStatus: "",
    batteryVoltage: "",
    coolantTemp: "",
    coolantStatus: "",
    engineCodes: "",
    tyreStatus: "",
    lightsStatus: "",
    batteryPrediction: "",
    tyrePrediction: "",
    enginePrediction: "",
    lastWash: "",
    lastScan: "",
    totalReports: "",
    additionalNotes: "",
    generatedDate: new Date().toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }),
    predictiveNotes: [],
    serviceRecommendations: [],
  });

  const [inputValue, setInputValue] = useState("");
  const [serviceInputValue, setServiceInputValue] = useState("");

  const handleInputChange = (field: keyof CarHealthData, value: string) => {
    setCarData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addNote = () => {
    if (inputValue.trim() !== "") {
      setCarData((prev) => ({
        ...prev,
        predictiveNotes: [...prev.predictiveNotes, inputValue.trim()],
      }));
      setInputValue("");
    }
  };

  const deleteNote = (index: number) => {
    setCarData((prev) => ({
      ...prev,
      predictiveNotes: prev.predictiveNotes.filter((_, i) => i !== index),
    }));
  };

  const addServiceNote = () => {
  if (serviceInputValue.trim() !== "") {
    setCarData((prev) => ({
      ...prev,
      serviceRecommendations: [
        ...(prev.serviceRecommendations || []),
        serviceInputValue.trim(),
      ],
    }));
    setServiceInputValue("");
  }
};

  const deleteServiceNote = (index: number) => {
  setCarData((prev) => ({
    ...prev,
    serviceRecommendations: prev.serviceRecommendations?.filter((_, i) => i !== index),
  }));
};

  const isFormValid = carData.ownerName && carData.carModel && carData.healthScore;

  const saveReport = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/reports", carData,{ withCredentials: true });
      if (response.status === 201) {
        const newReport = response.data;
        toast.success("Car health report saved successfully!");
        navigate(`/car_health_report/${newReport._id}`);
      }
    } catch (error: any) {
      console.error("Error saving report:", error);
      toast.error("Failed to save report. Please try again.");
    }
  };

  const handleGenerateReport = () => {
    if (isFormValid) {
      toast.success("Car health report generated successfully! Click download to save PDF.");
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-slate-800">Car Health Report Generator</h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-black text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Vehicle & Health Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              {/* Vehicle Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Vehicle Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="ownerName">Car Owner *</Label>
                    <Input
                      id="ownerName"
                      value={carData.ownerName}
                      onChange={(e) => handleInputChange("ownerName", e.target.value)}
                      placeholder="Enter owner name"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carModel">Car Model *</Label>
                    <Input
                      id="carModel"
                      value={carData.carModel}
                      onChange={(e) => handleInputChange("carModel", e.target.value)}
                      placeholder="e.g., Hyundai i20 (2021)"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="registration">Registration Number</Label>
                    <Input
                      id="registration"
                      value={carData.registration}
                      onChange={(e) => handleInputChange("registration", e.target.value)}
                      placeholder="e.g., JH05 AB 1234"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="odometer">Odometer Reading</Label>
                    <Input
                      id="odometer"
                      value={carData.odometer}
                      onChange={(e) => handleInputChange("odometer", e.target.value)}
                      placeholder="e.g., 42,350 km"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Health Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Health Parameters</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="healthScore">Health Score (0-100) *</Label>
                    <Input
                      id="healthScore"
                      value={carData.healthScore}
                      onChange={(e) => handleInputChange("healthScore", e.target.value)}
                      placeholder="e.g., 78"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="engineCodes">Engine Codes</Label>
                    <Input
                      id="engineCodes"
                      value={carData.engineCodes}
                      onChange={(e) => handleInputChange("engineCodes", e.target.value)}
                      placeholder="e.g., P0301 - Misfire"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="batteryVoltage">Battery Voltage</Label>
                    <Input
                      id="batteryVoltage"
                      value={carData.batteryVoltage}
                      onChange={(e) => handleInputChange("batteryVoltage", e.target.value)}
                      placeholder="e.g., 12.1V"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batteryStatus">Battery Status</Label>
                    <Select onValueChange={(value) => handleInputChange("batteryStatus", value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select battery status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="healthy">Healthy</SelectItem>
                        <SelectItem value="weak">Weak</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="coolantTemp">Coolant Temperature</Label>
                    <Input
                      id="coolantTemp"
                      value={carData.coolantTemp}
                      onChange={(e) => handleInputChange("coolantTemp", e.target.value)}
                      placeholder="e.g., 88°C"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="coolantStatus">Coolant Status</Label>
                    <Select onValueChange={(value) => handleInputChange("coolantStatus", value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select coolant status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tyreStatus">Tyre Status</Label>
                    <Select onValueChange={(value) => handleInputChange("tyreStatus", value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select tyre status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="worn">Front Worn</SelectItem>
                        <SelectItem value="critical">Needs Replacement</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lightsStatus">Lights/Wipers Status</Label>
                    <Select onValueChange={(value) => handleInputChange("lightsStatus", value)}>
                      <SelectTrigger className="focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="Select lights/wipers status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ok">Ok</SelectItem>
                        <SelectItem value="weak">Weak</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Predictive Maintenance */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Predictive Maintenance</h3>

                {/* Input + Add Button */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter maintenance note"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <Button onClick={addNote} disabled={!inputValue.trim()} className="bg-blue-600 hover:bg-blue-700">
                    +
                  </Button>
                </div>

                {/* Notes List */}
                <ul className="space-y-2 mt-4">
                  {carData.predictiveNotes.map((note, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center bg-slate-100 p-2 rounded-md"
                    >
                      <span>{note}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteNote(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Service Recommendations */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Service Recommendations</h3>

                {/* Input + Add Button */}
                <div className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter service recommendation"
                    value={serviceInputValue}
                    onChange={(e) => setServiceInputValue(e.target.value)}
                  />
                  <Button
                    onClick={addServiceNote}
                    disabled={!serviceInputValue.trim()}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    +
                  </Button>
                </div>

                {/* Notes List */}
                <ul className="space-y-2 mt-4">
                  {carData.serviceRecommendations?.map((note, index) => (
  <li
    key={index}
    className="flex justify-between items-center bg-slate-100 p-2 rounded-md"
  >
    <span>{note}</span>
    <Button
      variant="ghost"
      size="icon"
      onClick={() => deleteServiceNote(index)}
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  </li>
))}
                </ul>
              </div>

              {/* Service History */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-700 border-b pb-2">Service History</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="lastWash">Last Wash Date</Label>
                    <Input
                      id="lastWash"
                      value={carData.lastWash}
                      onChange={(e) => handleInputChange("lastWash", e.target.value)}
                      placeholder="e.g., 29 Aug 2025"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastScan">Last Health Scan</Label>
                    <Input
                      id="lastScan"
                      value={carData.lastScan}
                      onChange={(e) => handleInputChange("lastScan", e.target.value)}
                      placeholder="e.g., 29 Aug 2025"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="totalReports">Total Reports</Label>
                    <Input
                      id="totalReports"
                      value={carData.totalReports}
                      onChange={(e) => handleInputChange("totalReports", e.target.value)}
                      placeholder="e.g., 3"
                      className="focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Additional Notes</Label>
                <Textarea
                  id="additionalNotes"
                  value={carData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Any additional observations or maintenance notes..."
                  className="min-h-24 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={saveReport}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800"
                  disabled={!isFormValid}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Health Report
                </Button>

                {isFormValid && (
                  <PDFDownloadLink
                    document={<CarHealthReportPDF data={carData} />}
                    fileName={`car-health-report-${carData.ownerName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`}
                    className="inline-flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </PDFDownloadLink>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <CarHealthPreview data={carData} />
        </div>
      </div>
    </div>
  );
};
