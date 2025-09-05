
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CarHealthData } from "./CarHealthReportForm";

interface CarHealthPreviewProps {
  data: CarHealthData;
}

export const CarHealthPreview = ({ data }: CarHealthPreviewProps) => {
  const getHealthZone = (score: string) => {
    const scoreNum = parseInt(score) || 0;
    if (scoreNum >= 80) return { zone: "Green Zone", color: "text-green-600", status: "Excellent" };
    if (scoreNum >= 60) return { zone: "Yellow Zone", color: "text-yellow-600", status: "Advisory" };
    return { zone: "Red Zone", color: "text-red-600", status: "Critical" };
  };

  const getStatusColor = (status: string) => {
    if (status === "healthy" || status === "good" || status === "normal" || status === "ok") return "text-green-600";
    if (status === "weak" || status === "worn" || status === "medium") return "text-yellow-600";
    return "text-red-600";
  };

  const healthInfo = getHealthZone(data.healthScore);

  return (
    <Card className="shadow-lg border-0">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-black text-white p-4 rounded-t-lg flex justify-between items-center text-sm">
          <div className="font-bold"><img
                          src="./logo_mwg.png"
                          style={{ width: 80, height: 40 }}
                        /></div>
          <div className="text-center font-semibold">Car Health Report</div>
          <div className="text-right text-xs">
            <div>{data.generatedDate}</div>
            <div>Report ID: {data.reportId}</div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Vehicle Information */}
          <div>
            <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
              <div className="w-1 h-5 bg-blue-500 mr-3 rounded"></div>
              Vehicle Information
            </h3>
            <div className="bg-slate-50 p-4 rounded-lg grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Car Owner:</span>
                <span className="font-semibold text-slate-800">{data.ownerName || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Car:</span>
                <span className="font-semibold text-slate-800">{data.carModel || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Registration:</span>
                <span className="font-semibold text-slate-800">{data.registration || "Not specified"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 font-medium">Odometer:</span>
                <span className="font-semibold text-slate-800">{data.odometer || "Not specified"}</span>
              </div>
            </div>
          </div>

          {/* Health Score */}
          {data.healthScore && (
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
                <div className="w-1 h-5 bg-blue-500 mr-3 rounded"></div>
                Overall Health Score
              </h3>
              <div className="flex items-center gap-8">
                <div className="relative w-24 h-24">
                  <div className="rounded-full bg-gradient-conic from-green-500 via-yellow-500 to-red-500 flex items-center justify-center"
                  style={{
              background: 'conic-gradient(#27AE60 0deg 140deg, #F2C94C 140deg 220deg, #EB5757 220deg 360deg)',
              width: '100px',
              height: '100px'
            }}>
                    <div className="bg-white rounded-full flex flex-col items-center justify-center text-center"
                    style={{
              width: '70px',
              height: '70px'
            }}>
                      <div className="text-xl font-bold text-slate-800">{data.healthScore}</div>
                      <div className="text-xs text-slate-500">out of 100</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className={`text-lg font-bold ${healthInfo.color} mb-2`}>{healthInfo.zone}</div>
                  <div className="text-sm text-slate-600">
                    Your car is in <strong>{healthInfo.status} Zone</strong> and needs attention soon. Some components require monitoring and potential replacement in the coming months.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Key Findings */}
          {(data.batteryStatus || data.coolantTemp || data.engineCodes || data.tyreStatus) && (
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
                <div className="w-1 h-5 bg-blue-500 mr-3 rounded"></div>
                Key Findings
              </h3>
              <div className="bg-slate-50 rounded-lg overflow-hidden">
                <div className="grid grid-cols-3 bg-slate-100 p-3 text-xs font-semibold text-slate-600">
                  <div>Parameter</div>
                  <div>Status</div>
                  <div>Note</div>
                </div>
                <div className="p-3 space-y-3 text-sm">
                  {data.batteryStatus && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>🔋 Battery</div>
                      <div className={`font-semibold ${getStatusColor(data.batteryStatus)}`}>
                        {data.batteryStatus} {data.batteryVoltage && `– ${data.batteryVoltage}`}
                      </div>
                      <div className="text-slate-600">May need attention</div>
                    </div>
                  )}
                  {data.coolantTemp && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>🌡️ Coolant Temp</div>
                      <div className={`font-semibold ${getStatusColor(data.coolantStatus)}`}>{data.coolantStatus} {data.coolantTemp && `– ${data.coolantTemp}`}</div>
                      <div className="text-slate-600">All good</div>
                    </div>
                  )}
                  {data.engineCodes && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>⚙️ Engine Codes</div>
                      <div className="font-semibold text-red-600">{data.engineCodes}</div>
                      <div className="text-slate-600">Check recommended</div>
                    </div>
                  )}
                  {data.tyreStatus && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>🛞 Tyres</div>
                      <div className={`font-semibold ${getStatusColor(data.tyreStatus)}`}>{data.tyreStatus}</div>
                      <div className="text-slate-600">Monitor condition</div>
                    </div>
                  )}
                  {data.tyreStatus && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>💡 Lights/Wipers</div>
                      <div className={`font-semibold ${getStatusColor(data.lightsStatus)}`}>{data.lightsStatus}</div>
                      <div className="text-slate-600">Monitor condition</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Predictive Maintenance */}
          {data.predictiveNotes && data.predictiveNotes.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
                <div className="w-1 h-5 bg-blue-500 mr-3 rounded"></div>
                Predictive Maintenance
              </h3>
              <div className="bg-[#fef5e7] p-4  border-l-4 border-[#f2c94c]">
                <ul className="list-inside space-y-1 text-sm text-slate-700">
                  {data.predictiveNotes.map((note, index) => (
                    <li key={index}>⚠️ {note}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Service Recommendations */}
{data.serviceRecommendations && data.serviceRecommendations.length > 0 && (
  <div>
    {/* Section Title */}
    <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
      <div className="w-1 h-5 bg-blue-500 mr-3 rounded"></div>
      Service Recommendations
    </h3>

    {/* Recommendations List */}
    <div className="space-y-3">
  {data.serviceRecommendations?.map((rec, index) => (
    <div
      key={index}
      className="flex items-center bg-slate-50 p-3 rounded-lg border border-slate-200"
    >
      {/* Number */}
      <div className="text-xs font-bold text-white bg-blue-500 w-6 h-6 flex items-center justify-center rounded-full mr-3">
        {index + 1}
      </div>

      {/* Recommendation Text */}
      <div className="flex-1 text-sm text-slate-800">{rec}</div>
    </div>
  ))}
</div>
  </div>
)}


          {/* Service History */}
          {(data.lastWash || data.lastScan || data.totalReports) && (
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
                <div className="w-1 h-5 bg-blue-500 mr-3 rounded"></div>
                Service History Snapshot
              </h3>
              <div className="grid grid-cols-3 gap-4">
                {data.lastWash && (
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🚿</div>
                    <div className="text-xs font-semibold text-slate-800 mb-1">Last Wash</div>
                    <div className="text-xs text-slate-600 mb-1">{data.lastWash}</div>
                    <div className="text-xs text-green-600 font-medium">✅ Complete</div>
                  </div>
                )}
                {data.lastScan && (
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">🔍</div>
                    <div className="text-xs font-semibold text-slate-800 mb-1">Last Health Scan</div>
                    <div className="text-xs text-slate-600 mb-1">{data.lastScan}</div>
                    <div className="text-xs text-green-600 font-medium">✅ Complete</div>
                  </div>
                )}
                {data.totalReports && (
                  <div className="bg-slate-50 p-4 rounded-lg text-center">
                    <div className="text-2xl mb-2">📊</div>
                    <div className="text-xs font-semibold text-slate-800 mb-1">Reports Stored</div>
                    <div className="text-xs text-slate-600 mb-1">Total: {data.totalReports}</div>
                    <div className="text-xs text-green-600 font-medium">📈 Growing</div>
                  </div>
                )}
              </div>
            </div>
          )}

          {data.additionalNotes && (
            <div>
              <h3 className="text-base font-semibold text-slate-800 mb-3 flex items-center">
                <div className="w-1 h-5 bg-blue-500 mr-3 rounded"></div>
                Additional Notes
              </h3>
              <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-slate-700">{data.additionalNotes}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-800 text-white p-4 text-center">
              <div className="text-xs text-slate-300 mb-3 leading-relaxed">
                <strong>Disclaimer:</strong> This is an advisory health report based on OBD scan & visual checks.
                For confirmation, visit an authorized service center.
              </div>
              <div className="flex justify-center gap-5 text-xs">
                <a href="https://wa.me/919429601299" className="text-blue-400 font-medium hover:text-blue-300 flex justify-center items-center gap-1"><img
                              src="/whatsapp.png"
                              style={{ width: 15, height: 15 }}
                            />
                            <p>WhatsApp</p></a>
                <a href="tel:+919429601299" className="text-blue-400 font-medium hover:text-blue-300">📞 Call: +91 9429601299</a>
                <a href="https://www.mrwhitegloves.com" className="text-blue-400 font-medium hover:text-blue-300">🌐 Website</a>
              </div>
            </div>
      </CardContent>
    </Card>
  );
};
