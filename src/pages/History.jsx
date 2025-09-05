"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { MoreVertical, Eye, Edit, Download, Trash2, Car, Calendar } from "lucide-react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

export default function History() {
  const navigate = useNavigate();
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get("https://car-report-backend-5vpj.onrender.com/api/reports", { withCredentials: true });
        setReports(res.data);
        console.log("res",res)
      } catch (err) {
        console.error("Error fetching reports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  // 👁 View Report
const handleViewReport = (reportId) => {
  navigate(`/car_health_report/${reportId}`)
}

// ✏️ Edit Report
const handleEditReport = (reportId) => {
  navigate(`/edit_report/${reportId}`) // you can build this page later
}

// 🗑 Delete Report
const handleDeleteReport = async (reportId) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this report?")
  if (!confirmDelete) return

  try {
    await axios.delete(`https://car-report-backend-5vpj.onrender.com/api/reports/${reportId}`, { withCredentials: true })
    setReports((prevReports) => prevReports.filter((r) => r._id !== reportId))
  } catch (err) {
    console.error("Error deleting report:", err)
    alert("Failed to delete report. Please try again.")
  }
}

// 📥 Download Report PDF
const handleDownloadPDF = async (reportId) => {
  try {
    const res = await axios.get(`https://car-report-backend-5vpj.onrender.com/api/reports/${reportId}/pdf`, {
      responseType: "blob", // important for file download
      withCredentials: true,
    })

    const url = window.URL.createObjectURL(new Blob([res.data]))
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", `Car_Report_${reportId}.pdf`)
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (err) {
    console.error("Error downloading PDF:", err)
    alert("Failed to download PDF.")
  }
}

// 🛠 Action Handler
const handleAction = (action, reportId) => {
  switch (action) {
    case "view":
      handleViewReport(reportId)
      break
    case "edit":
      handleEditReport(reportId)
      break
    case "delete":
      handleDeleteReport(reportId)
      break
    case "download":
      handleDownloadPDF(reportId)
      break
    default:
      break
  }
}

  const getHealthScoreColor = (score) => {
    const numScore = parseInt(score)
    if (numScore >= 80) return "bg-green-500"
    if (numScore >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Report History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-2">
                <div className="h-4 bg-muted rounded w-3/4"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded w-full"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Report History</h2>
        <Badge variant="secondary" className="text-sm">
          {reports.length} Reports
        </Badge>
      </div>

      {reports.length === 0 ? (
        <Card className="p-8 text-center">
          <div className="flex flex-col items-center space-y-4">
            <Car className="h-12 w-12 text-muted-foreground" />
            <div>
              <h3 className="text-lg font-semibold text-foreground">No Reports Found</h3>
              <p className="text-muted-foreground">Create your first car health report to get started.</p>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
          {reports.map((report) => (
            <Card key={report.reportId} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-sm font-semibold text-foreground truncate">{report.ownerName}</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleAction("view", report._id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("edit", report._id)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleAction("download", report._id)}>
                        <Download className="mr-2 h-4 w-4" />
                        PDF Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleAction("delete", report._id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Car Model</p>
                  <p className="text-sm font-semibold text-foreground truncate">{report.carModel}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Registration</p>
                  <p className="text-sm font-mono text-foreground">{report.registration}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground">Health Score</p>
                    <Badge className={`${getHealthScoreColor(report.healthScore)} text-white text-xs`}>
                      {report.healthScore}%
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      {new Date(report.generatedDate).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
