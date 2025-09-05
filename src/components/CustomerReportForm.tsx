import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download } from "lucide-react";
import { CustomerReportPDF } from "./CustomerReportPDF";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { toast } from "sonner";

export interface CustomerData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  company: string;
  reportType: string;
  reportPeriod: string;
  totalRevenue: string;
  projectsCompleted: string;
  satisfactionRating: string;
  notes: string;
  generatedDate: string;
}

export const CustomerReportForm = () => {
  const [customerData, setCustomerData] = useState<CustomerData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    company: "",
    reportType: "",
    reportPeriod: "",
    totalRevenue: "",
    projectsCompleted: "",
    satisfactionRating: "",
    notes: "",
    generatedDate: new Date().toLocaleDateString(),
  });

  const handleInputChange = (field: keyof CustomerData, value: string) => {
    setCustomerData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = customerData.customerName && customerData.company && customerData.reportType;

  const handleGenerateReport = () => {
    if (isFormValid) {
      toast.success("Report generated successfully! Click download to save PDF.");
    } else {
      toast.error("Please fill in all required fields.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-subtle p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Customer Report Generator</h1>
          <p className="text-lg text-corporate-gray">Generate professional PDF reports with selectable text</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form Section */}
          <Card className="shadow-form">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name *</Label>
                  <Input
                    id="customerName"
                    value={customerData.customerName}
                    onChange={(e) => handleInputChange("customerName", e.target.value)}
                    placeholder="Enter customer name"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Email Address</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerData.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    placeholder="customer@company.com"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="customerPhone">Phone Number</Label>
                  <Input
                    id="customerPhone"
                    value={customerData.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    value={customerData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Company name"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reportType">Report Type *</Label>
                  <Select onValueChange={(value) => handleInputChange("reportType", value)}>
                    <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-primary">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="quarterly">Quarterly Review</SelectItem>
                      <SelectItem value="monthly">Monthly Summary</SelectItem>
                      <SelectItem value="annual">Annual Report</SelectItem>
                      <SelectItem value="project">Project Analysis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reportPeriod">Report Period</Label>
                  <Input
                    id="reportPeriod"
                    value={customerData.reportPeriod}
                    onChange={(e) => handleInputChange("reportPeriod", e.target.value)}
                    placeholder="Q1 2024 / Jan-Mar 2024"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="totalRevenue">Total Revenue ($)</Label>
                  <Input
                    id="totalRevenue"
                    value={customerData.totalRevenue}
                    onChange={(e) => handleInputChange("totalRevenue", e.target.value)}
                    placeholder="25,000"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectsCompleted">Projects Completed</Label>
                  <Input
                    id="projectsCompleted"
                    value={customerData.projectsCompleted}
                    onChange={(e) => handleInputChange("projectsCompleted", e.target.value)}
                    placeholder="12"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="satisfactionRating">Satisfaction (1-10)</Label>
                  <Input
                    id="satisfactionRating"
                    value={customerData.satisfactionRating}
                    onChange={(e) => handleInputChange("satisfactionRating", e.target.value)}
                    placeholder="9.5"
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea
                  id="notes"
                  value={customerData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Any additional comments or observations..."
                  className="min-h-24 transition-all duration-200 focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={handleGenerateReport}
                  className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
                  disabled={!isFormValid}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Generate Report
                </Button>
                
                {isFormValid && (
                  <PDFDownloadLink
                    document={<CustomerReportPDF data={customerData} />}
                    fileName={`customer-report-${customerData.customerName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.pdf`}
                    className="inline-flex items-center justify-center rounded-md bg-success px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-success/80 focus:outline-none focus:ring-2 focus:ring-success focus:ring-offset-2"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PDF
                  </PDFDownloadLink>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="shadow-form">
            <CardHeader className="bg-gradient-primary text-primary-foreground">
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 rounded-lg bg-corporate-gray-light p-6">
                <div className="border-b border-border pb-4">
                  <h3 className="text-2xl font-bold text-corporate-blue">Customer Report</h3>
                  <p className="text-sm text-corporate-gray">Generated on {customerData.generatedDate}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-corporate-gray">Customer:</p>
                      <p className="font-semibold">{customerData.customerName || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-corporate-gray">Company:</p>
                      <p className="font-semibold">{customerData.company || "Not specified"}</p>
                    </div>
                  </div>
                  
                  <div className="grid gap-2 md:grid-cols-2">
                    <div>
                      <p className="text-sm font-medium text-corporate-gray">Report Type:</p>
                      <p className="font-semibold">{customerData.reportType || "Not specified"}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-corporate-gray">Period:</p>
                      <p className="font-semibold">{customerData.reportPeriod || "Not specified"}</p>
                    </div>
                  </div>

                  {(customerData.totalRevenue || customerData.projectsCompleted || customerData.satisfactionRating) && (
                    <div className="space-y-2 rounded border bg-background p-4">
                      <h4 className="font-semibold text-corporate-blue">Key Metrics</h4>
                      <div className="grid gap-2 md:grid-cols-3">
                        {customerData.totalRevenue && (
                          <div>
                            <p className="text-sm text-corporate-gray">Revenue</p>
                            <p className="font-bold text-success">${customerData.totalRevenue}</p>
                          </div>
                        )}
                        {customerData.projectsCompleted && (
                          <div>
                            <p className="text-sm text-corporate-gray">Projects</p>
                            <p className="font-bold text-corporate-blue">{customerData.projectsCompleted}</p>
                          </div>
                        )}
                        {customerData.satisfactionRating && (
                          <div>
                            <p className="text-sm text-corporate-gray">Satisfaction</p>
                            <p className="font-bold text-warning">{customerData.satisfactionRating}/10</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {customerData.notes && (
                    <div>
                      <p className="text-sm font-medium text-corporate-gray">Notes:</p>
                      <p className="mt-1 text-sm">{customerData.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};